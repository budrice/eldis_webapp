let jwt = require('jwt-simple');
let bcrypt = require('bcryptjs');
let dateFormat = require('dateformat');

module.exports = function(db){
    
    return {
        Login: Login,
        Register: Register,
        GetUserApps: GetUserApps
    };
    
    function Login(member) {
		let promise = new Promise((resolve, reject) => {
			let response = {};
			Validate(member.username, member.password).then((validObj) => {
				if (validObj.error) {
					reject(validObj);
				}
				else {
					if (validObj.result.islockedout === 1) {
						response.error.message = "Your account is currently locked out.";
						reject(response);
					}
					if (validObj.result.isapproved === 0) {
						response.error.message = "Your account has not been approved.";
						reject(response);
					}
					if (validObj.result.islockedout === 0 && validObj.result.isapproved === 1) {
						response.result = {
							user_id: validObj.result.user_id,
							changepassword: validObj.result.changepassword,
							emailaddress: member.username,
							firstname: validObj.result.firstname,
							lastname: validObj.result.lastname,
							token: validObj.result.token
						};
					}
					resolve(response);
				}
			});
		});
		return promise;
    }
	
    function Validate(username, password) {
		let promise = new Promise((resolve, reject) => {
			let response = {};
			let sql =  "SELECT id AS uid, emailaddress, firstname, lastname, ";
				sql += "isapproved, islockedout, `password`, passwordchange ";
				sql += "FROM member ";
				sql += "WHERE emailaddress = ?;";
			db.query(sql, [username], function(error, result){
				if (error){
					response.error.message = "Query error: " + error;
					reject(response);
				}
				else {
					if (result.length > 0) {
						if (bcrypt.compareSync(password, result[0].password)) {
							
							response.result = {
								user_id	: result[0].uid,
								emailaddress : result[0].emailaddress,
								isapproved: result[0].isapproved,
								islockedout: result[0].islockedout,
								changepassword: result[0].requirespasswordchange,
								firstname: result[0].firstname,
								lastname: result[0].lastname,
								token: (result[0].isapproved == 1) ? genToken(result[0].uid) : null
							};
							
							UpdateLastLogin(result[0].accessid).then((update) => {
								if (update.error) {
									reject(update);
								}
								else {
									resolve(response);
								}
							});
							
						}
						else {
							response.error.message = "Your password is incorrect.";
							reject(response);
						}
					}
					else {
						response.error.message = "Your username is incorrect.";
						reject(response);
					}
				}
			});
		});
		return promise;
    }
	
	function UpdateLastLogin(id) {
		
		let promise = new Promise((resolve, reject) => {
			let now = dateFormat(new Date(), "m/d/yyyy h:MM:ss TT");
			let sql =  "UPDATE member ";
				sql += "SET lastlogin = ? ";
				sql += "WHERE id = ?;";
			db.query(sql, [now, id], function(error) {
				if (error) {
					response.error.message = "Auth.validate() sql2 MySql failure.";
					reject(response);
				}
				else {
					resolve(response);
				}
			});
		});
		return promise;
	}
	
	
    function Register(member) {
		let promise = new Promise((resolve, reject) => {
			let response = {};
            bcrypt.genSalt(10, function(error, salt) {
                bcrypt.hash(member.password, salt, function(error, hash) {
                    let insert = {
                        password: hash,
                        emailaddress: member.emailaddress,
                        firstname: member.firstname,
                        lastname: member.lastname,
                        isapproved: true,
                        islockedout: false,
                        reg_code: salt
                    };
                    var sql = "INSERT INTO member SET ?;";
                    try {
                        db.query(sql, insert, function(error, result) {
                            if (error) {
                                response.error.message = "Auth.register() SQL error: " + error;
								reject(response);
                            }
                            else {
                                response.result = result;
								resolve(response);
                            }
                        });
                    }
                    catch (error) {
                        response.error.message = "Auth.register() MySQL error.";
                        reject(response);
                    }
                });
            });
		});
		return promise;
    }
	
    function GetUserApps(uid) {
		let promise = new Promise((resolve, reject) => {
			let response = {};
            let sql =  "SELECT memberapplications.appid, application.appname, ";
                sql += "application.imageurl, application.script ";
                sql += "FROM memberapplications ";
                sql += "INNER JOIN application ON application.id = memberapplications.appid ";
                sql += "WHERE memberapplications.memberid=? ";
                sql += "ORDER BY application.appname;";
            try {
                db.query(sql, [uid], function(error, result){
                    if (error) {
                        response.error.message = "Auth.getUserApps() sql2 MySql failure.";
						reject(response);
                    }
                    else {
                        response.result = result;
						resolve(response);
                    }
                });
            }
            catch (error) {
                response.error.message = "Auth.getUserApps() MySql failure.";
                reject(response);
            }
		});
		return promise;
    }
};
// private method
function genToken(uid) {
    let expires = expiresIn(7); // 7 days
    let token = jwt.encode({
        exp: expires,
        user_id: uid 
    }, require('../../../config/secret')());

    let token_obj = {
        key: token,
        expires: expires,
        uid: uid
    };

    return token_obj;
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}