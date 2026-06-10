const express = require('express');
const router = express.Router();
const path = require('path');
const verifyRoles = require('../../middleware/verifyRoles');
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');


router.route('/')
    .get(verifyRoles(ROLES_LIST.User), employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);


module.exports = router;
