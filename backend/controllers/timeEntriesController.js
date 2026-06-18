const mongoose = require('mongoose');
const Employee = require('../model/Employee');
const TimeEntry = require('../model/TimeEntry');

const ONE_DAY = 24 * 60 * 60 * 1000;

const getDateRange = (query) => {
    const to = query.to ? new Date(query.to) : new Date();
    const from = query.from
        ? new Date(query.from)
        : new Date(to.getTime() - (29 * ONE_DAY));

    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
        return null;
    }

    from.setUTCHours(0, 0, 0, 0);
    to.setUTCHours(23, 59, 59, 999);

    return from <= to ? { from, to } : null;
};

const calculateHours = (entry) => {
    const workedMinutes = Math.max(
        0,
        (entry.clockOut.getTime() - entry.clockIn.getTime()) / 60000
    );
    const effectiveMinutes = Math.max(0, workedMinutes - entry.breakMinutes);

    return {
        workedHours: workedMinutes / 60,
        effectiveHours: effectiveMinutes / 60
    };
};

const createTimeEntry = async (req, res) => {
    const {
        employeeId,
        date,
        clockIn,
        clockOut,
        breakMinutes = 0
    } = req.body;

    if (!employeeId || !clockIn || !clockOut) {
        return res.status(400).json({
            message: 'Employee ID, clock-in, and clock-out are required.'
        });
    }

    if (!mongoose.isValidObjectId(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID.' });
    }

    const parsedClockIn = new Date(clockIn);
    const parsedClockOut = new Date(clockOut);
    const parsedDate = date ? new Date(date) : new Date(clockIn);
    const parsedBreakMinutes = Number(breakMinutes);

    if (
        Number.isNaN(parsedClockIn.getTime()) ||
        Number.isNaN(parsedClockOut.getTime()) ||
        Number.isNaN(parsedDate.getTime())
    ) {
        return res.status(400).json({ message: 'Invalid date or time value.' });
    }

    if (parsedClockOut <= parsedClockIn) {
        return res.status(400).json({
            message: 'Clock-out must be later than clock-in.'
        });
    }

    if (!Number.isFinite(parsedBreakMinutes) || parsedBreakMinutes < 0) {
        return res.status(400).json({
            message: 'Break minutes must be zero or greater.'
        });
    }

    const workedMinutes = (parsedClockOut - parsedClockIn) / 60000;
    if (parsedBreakMinutes > workedMinutes) {
        return res.status(400).json({
            message: 'Break minutes cannot exceed worked minutes.'
        });
    }

    const employee = await Employee.findById(employeeId).select('_id');
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
    }

    parsedDate.setUTCHours(0, 0, 0, 0);

    const timeEntry = await TimeEntry.create({
        employee: employeeId,
        date: parsedDate,
        clockIn: parsedClockIn,
        clockOut: parsedClockOut,
        breakMinutes: parsedBreakMinutes
    });

    const hours = calculateHours(timeEntry);
    return res.status(201).json({
        ...timeEntry.toObject(),
        ...hours
    });
};

const buildSummary = async (employees, range) => {
    const employeeIds = employees.map(employee => employee._id);
    const entries = employeeIds.length
        ? await TimeEntry.find({
            employee: { $in: employeeIds },
            date: { $gte: range.from, $lte: range.to }
        }).lean()
        : [];

    const employeeTotals = new Map(
        employees.map(employee => [
            employee._id.toString(),
            {
                employeeId: employee._id.toString(),
                firstname: employee.firstname,
                lastname: employee.lastname,
                hourlyRate: employee.rate || 0,
                workedHours: 0,
                effectiveHours: 0,
                payroll: 0
            }
        ])
    );
    const dailyTotals = new Map();

    entries.forEach(entry => {
        const hours = calculateHours(entry);
        const employeeSummary = employeeTotals.get(entry.employee.toString());
        const day = entry.date.toISOString().slice(0, 10);

        if (employeeSummary) {
            employeeSummary.workedHours += hours.workedHours;
            employeeSummary.effectiveHours += hours.effectiveHours;
            employeeSummary.payroll += hours.workedHours * employeeSummary.hourlyRate;
        }

        const dailySummary = dailyTotals.get(day) || {
            date: day,
            workedHours: 0,
            effectiveHours: 0,
            payroll: 0
        };
        dailySummary.workedHours += hours.workedHours;
        dailySummary.effectiveHours += hours.effectiveHours;
        dailySummary.payroll += hours.workedHours * (employeeSummary?.hourlyRate || 0);
        dailyTotals.set(day, dailySummary);
    });

    const roundHours = value => Math.round(value * 100) / 100;

    return {
        from: range.from.toISOString(),
        to: range.to.toISOString(),
        employees: Array.from(employeeTotals.values()).map(summary => ({
            ...summary,
            workedHours: roundHours(summary.workedHours),
            effectiveHours: roundHours(summary.effectiveHours),
            payroll: roundHours(summary.payroll)
        })),
        dailyTotals: Array.from(dailyTotals.values())
            .sort((a, b) => a.date.localeCompare(b.date))
            .map(summary => ({
                ...summary,
                workedHours: roundHours(summary.workedHours),
                effectiveHours: roundHours(summary.effectiveHours),
                payroll: roundHours(summary.payroll)
            }))
    };
};

const getDepartmentSummary = async (req, res) => {
    const range = getDateRange(req.query);
    if (!range) {
        return res.status(400).json({ message: 'Invalid date range.' });
    }

    const departmentName = req.params.departmentName;
    const employees = await Employee.find({
        department: {
            $regex: `^${departmentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
            $options: 'i'
        }
    }).select('_id firstname lastname rate');

    const summary = await buildSummary(employees, range);
    return res.json({
        department: departmentName,
        ...summary
    });
};

const getEmployeeSummary = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID.' });
    }

    const range = getDateRange(req.query);
    if (!range) {
        return res.status(400).json({ message: 'Invalid date range.' });
    }

    const employee = await Employee.findById(req.params.employeeId)
        .select('_id firstname lastname rate');

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
    }

    const summary = await buildSummary([employee], range);
    return res.json(summary);
};

module.exports = {
    createTimeEntry,
    getDepartmentSummary,
    getEmployeeSummary
};
