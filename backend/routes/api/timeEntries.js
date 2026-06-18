const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');
const timeEntriesController = require('../../controllers/timeEntriesController');

router.post(
    '/',
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    timeEntriesController.createTimeEntry
);

router.get(
    '/department/:departmentName',
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    timeEntriesController.getDepartmentSummary
);

router.get(
    '/employee/:employeeId',
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    timeEntriesController.getEmployeeSummary
);

module.exports = router;
