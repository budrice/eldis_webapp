var bcrypt = require('bcryptjs');

//var userlist = [];

module.exports = function(db){
    
    return {
        getUsers: getUsers,
        userLock: userLock,
        disableMember: disableMember,
        employeeEmailSearch: employeeEmailSearch,
        getMemberAppArrays: getMemberAppArrays,
        getMemberInfo: getMemberInfo,
        insertAppAccess: insertAppAccess,
        deleteAppAccess: deleteAppAccess,
        updateMember: updateMember,
        getApplicationPermissionsByAppId: getApplicationPermissionsByAppId,
        getUserApplicationPermissions: getUserApplicationPermissions,
        insertUserPermission: insertUserPermission,
        deleteUserPermission: deleteUserPermission
    };
    
    function getUsers(callback) {
        var response = {};
        if (callback && typeof callback == 'function') {
            //userlist = [];
            var sql = "SELECT id, firstname, lastname, \
                       emailaddress, islockedout \
                       FROM member \
                       ORDER BY member.emailaddress;";
            try {
                db.query(sql, function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.getUsers() SQL error.'
                        }
                    }
                    else {
                        response.result = result;
                    }
                    //userlist = result;
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.getUsers() MySQL error.'
                };
                callback(response);
            }
        }
    }
    function userLock(lockObj, callback) {
        var response = {};
        if (lockObj && typeof lockObj == 'function') {
            callback = lockObj;
            response.error = {
                id: 2004,
                message: 'Admin.userLock() missing parameters'
            };
            callback(response);
        }
        else {
            var sql = "UPDATE member SET member.islockedout=? WHERE member.id=?;";
            try {
                db.query(sql, [lockObj.lockstate, lockObj.id], function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.userLock() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.userLock() MySQL error.'
                };
                callback(response);
            }
        }
    }
    function disableMember(where, callback) {
        var error = null;
        var result = true;
        callback(error, result);
    }
    function employeeEmailSearch(where, callback) {
        var response = {};
        if (where && typeof where == 'function') {
            calback = where;
            response.error = {
                id: 2004,
                message: 'Admin.employeeEmailSearch() missing parameters.'
            };
            callback(response);
        }
        else {
            var sql = "SELECT id FROM member WHERE ?;";
            try {
                db.query(sql, where, function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.employeeEmailSearch() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.employeeEmailSearch() MySql error.'
                };
                callback(response);
            }
        }
    }
    function getMemberAppArrays(id, callback) {
        var response = {};
        if (id && typeof id == 'function') {
            callback = id;
            response.error = {
                id: 2004,
                message: 'Admin.getMemberAppArrays() missing parameters.'
            };
            callback(response);
        }
        else {
            var sql = "SELECT application.id, application.appname \
                       FROM application \
                       ORDER BY application.appname;\
                       \
                       SELECT memberapplications.appid, application.appname \
                       FROM memberapplications \
                       INNER JOIN application \
                       ON memberapplications.appid=application.id \
                       WHERE memberapplications.memberid=? \
                       ORDER BY application.appname;";
            try {
                db.query(sql, [id], function(error, result) {
                    if (error) {
                        reponse.eror = {
                            id: 2001,
                            message: 'Admin.getMemberAppArrays() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.getMemberAppArrays() MySql error.'
                };
                callback(response);
            }
        }
    }
    function getMemberInfo(id, callback) {
        var response = {};
        if (id && typeof id == 'function') {
            callback = id;
            response.error = {
                id: 2004,
                message: 'Admin.getMemberInfo() missing parameters.'
            };
            callback(response);
        }
        else {
            var sql = "SELECT firstname, lastname, emailaddress, islockedout \
                       FROM member \
                       WHERE id=?;";
            try {
                db.query(sql, [id], function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.getMemberInfo() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.getMemberInfo() MySql error.'
                };
                callback(response);
            }
        }
    }
    function insertAppAccess(values, callback) {
        console.log('appaccessvalues');
        console.log(values);
        var response = {};
        if (values && typeof values == 'function') {
            callback = values;
            response.error = {
                id: 2004,
                message: 'Admin.insertAppAccess() missing parameters.'
            };
            callback(response);
        }
        else {
            var sql = "INSERT INTO memberapplications SET ?";
            try {
                db.query(sql, values, function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.insertAppAccess() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.insertAppAccess() MySql error.'
                };
                callback(response);
            }
        }
    }
    function deleteAppAccess(body, callback) {
        // mysql trigger -  deletememberpermission
        var response = {};
        if (body && typeof body == 'function') {
            callback = body;
            response.error = {
                id: 2004,
                message: 'Admin.deleteAppAccess() missing parameters.'
            };
            callback(response);
        }
        else {
            var sql = "DELETE FROM memberapplications WHERE appid = ? AND memberid = ?;";
            try {
                db.query(sql, [body.appid, body.memberid], function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.deleteAppAccess() SQL error: ' + error
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.deleteAppAccess() MySql error.'
                };
                callback(response);
            }
        }
    }
    function updateMember(member, callback) {
        console.log(member);
        var response = {};
        if (member && typeof member == 'function') {
            callback = member;
            response.error = {
                id: 2004,
                message: 'Admin.updateMember() missing parameters.'
            };
            callback(response);
        }
        else {
            console.log(member);
            var values = {
                emailaddress: member.emailaddress,
                firstname: member.firstname,
                lastname: member.lastname
            };
            var where = {
                id: member.uid
            };
            var sql = "UPDATE member SET ? WHERE ?;";
            if (member.password) {
                bcrypt.genSalt(10, function(salterror, salt) {
                    if(salterror) {
                        response.error = {
                            id: 2008,
                            messaage: 'Admin.updateMember() bcrypt.genSalt() error.'
                        };
                        callback(response);
                    }
                    else {
                        bcrypt.hash(member.password, salt, function(hasherror, hash) {
                            if (hasherror) {
                                response.error = {
                                    id: 2009,
                                    message: 'Admin.updateMember() bcrypt.hash() error.'
                                };
                                callback(response);
                            }
                            else {
                                values.password = hash;
                                values.reg_code = salt;
                                try {
                                    db.query(sql, [values, where], function(error1, result) {
                                        if (error) {
                                            response.error = {
                                                id: 2001,
                                                message: 'Admin.updateMember() SQL error.'
                                            };
                                        }
                                        else {
                                            response.result = result;
                                        }
                                        callback(response);
                                    });
                                }
                                catch (error) {
                                    response.error = {
                                        id: 2002,
                                        message: 'Admin.updateMember() MySql error.'
                                    };
                                    callback(response);
                                }
                            }
                        });
                    }
                });
            }
            else {
                try {
                    db.query(sql, [values, where], function(error1, result) {
                        if (error1) {
                            reponse.error = {
                                id: 2001,
                                message: 'Admin.updateMember() SQL error.'
                            };
                        }
                        else {
                            response.result = result;
                        }
                        callback(response);
                    });
                }
                catch (error) {
                    response.error = {
                        id: 2002,
                        message: 'Admin.updateMember() MySql error.'
                    };
                    callback(response);
                }
            }
        }
    }
    function getApplicationPermissionsByAppId(where, callback) {
        var response = {};
        if (where && typeof where == 'function') {
            callback = where;
            response.error = {
                id: 2004,
                messdage: 'Admin.getApplicationPermissionsByAppId() missing parameters.'
            };
            callback(response);
        }
        else {
            console.log('getApplicationPermissionsByAppId WHERE:');
            console.log(where);
            var sql = "SELECT * FROM permissions WHERE ?";
            try {
                db.query(sql, where, function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.getApplicationPermissionsByAppId() SQL error.'
                        };
                    }
                    else {
                        console.log(result);
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.getApplicationPermissionsByAppId() MySql error.'
                };
                callback(response);
            }
        }
    }
    function getUserApplicationPermissions(body, callback) {
        var response = {};
        if (body && typeof body == 'function') {
            callback = body;
            response.error = {
                id: 2004,
                message: 'Admin.getUserApplicationPermissions() missing parameters.'
            };
            callback(response);
        }
        else {
            var permissionIdArray = [];
            var i = 0;
            var len = body.length;
            for(i = 0; i < len; i++) {
                permissionIdArray.push(body[i].pid);
            }
            var sql = "SELECT permissionid \
                       FROM memberpermissions \
                       WHERE memberid=" + body[0].uid + " \
                       AND permissionid IN (" + permissionIdArray.join() + ");";
            try {
                db.query(sql, function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.getUserApplicationPermissions() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.getUserApplicationPermissions() MySql error.'
                };
                callback(response);
            }
        }
    }
    function insertUserPermission(values, callback) {
        var response = {};
        if (values && typeof values == 'function') {
            callback = values;
            response.error = {
                id: 2004,
                message: 'Admin.insertUserPermission() missing parameters.'
            };
            callback(response);
        }
        else {
            var sql = "INSERT INTO memberpermissions SET ?;";
            try {
                db.query(sql, values, function(error, result) {
                    if (error) {
                        response.error = {
                            id: 2001,
                            message: 'Admin.insertUserPermission() SQL error.'
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                reponse.error = {
                    id : 2002,
                    message: 'Admin.insertUserPermission() MySql error.'
                };
                callback(response);
            }
        }
    }
    function deleteUserPermission(values, callback) {
        var response = {};
        if (values && typeof values == 'function') {
            callback = values;
            response.error = {
                id: 2004,
                message: 'Admin.deleteUserPermission() missing parameters.'
            };
            callback(response);
        }
        else {
            console.log('deleteUserPermission values:');
            console.log(values.memberid);
            console.log(values.permissionid);
            
            
            
            var sql = "DELETE FROM memberpermissions WHERE memberid=? AND permissionid=?;";
            try {
                db.query(sql, [values.memberid, values.permissionid], function(error, result) {
                    if (error) {
                        console.log(error);
                        response.error = {
                            id: 2001,
                            message: 'Admin.deleteUserPermission() query error: ' + error
                        };
                    }
                    else {
                        response.result = result;
                    }
                    callback(response);
                });
            }
            catch (error) {
                response.error = {
                    id: 2002,
                    message: 'Admin.deleteUserPermission() MySql error.'
                };
                callback(response);
            }
        }
    }

};