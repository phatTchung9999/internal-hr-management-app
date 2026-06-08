const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const departmentsController = require('../../controllers/departmentsController');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), departmentsController.getAllDepartments);

module.exports = router;