const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
        const employees = await Employee.find();
        if (!employees) return res.status(204).json({'message': 'No employees found.'});
        res.json(employees)
    }

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.email || !req?.body?.mobileNumber || !req?.body?.title || !req?.body?.department) {
        return res.status(400).json({ message: 'Firstname, lastname, email, mobile number, title, and department are required.' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            ethnicity: req.body.ethnicity,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            address: req.body.address,
            title: req.body.title,
            rate: req.body.rate,
            department: req.body.department,
            manager: req.body.manager,
            hireDate: req.body.hireDate,
            employmentStatus: req.body.employmentStatus,
            recruiter: req.body.recruiter,
            photo: req.body.photo,
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateEmployee = async (req, res) => {
    const employeeId = req?.params?.id || req?.body?.id;

    if (!employeeId) {
        return res.status(400).json({'message': 'ID parameter is required.'})
    }

    const employee = await Employee.findOne({ _id: employeeId }).exec();

    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${employeeId} not found` });
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'firstname')) employee.firstname = req.body.firstname;
    if (Object.prototype.hasOwnProperty.call(req.body, 'checked')) employee.checked = req.body.checked;

    const result = await employee.save();
    res.json(result);
    }

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({'message': 'ID parameter is required.'})
    
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    
    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const result = await Employee.deleteOne({_id: req.body.id});

    res.json(result);
    }

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'ID parameter is required.'})

    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
    }


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
