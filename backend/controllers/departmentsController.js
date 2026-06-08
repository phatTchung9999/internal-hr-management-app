const Department = require('../model/Department');

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        if (!departments) return res.status(204).json({ 'message': 'No departments found.' });
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDepartments
}