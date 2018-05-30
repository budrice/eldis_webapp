let jwt = require('jwt-simple');
let bcrypt = require('bcryptjs');
let dateFormat = require('dateformat');

module.exports = function(db){
    
    return {
        Login: login,
        Register: register,
		GetUser: getUser
    };
    
    function login(member) {
		
		console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
		console.log(member);
		console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
		let promise = new Promise((resolve, reject) => {
			let response = {};
			validate(member.username, member.password).then((validObj) => {
				if (validObj.error) {
					reject(validObj);
				}
				else {
					if (validObj.result.access_level === 0) {
						response.error = {};
						response.error.message = "Your account is currently locked out.";
						reject(response);
					}
					if (validObj.result.access_level === 1) {
						response.error = {};
						response.error.message = "Your account has not been approved.";
						reject(response);
					}
					if (validObj.result.access_level === 3) {
						response.result = {
							user_id: validObj.result.id,
							emailaddress: member.email_address,
							username: validObj.result.username,
							token: validObj.result.token
						};
					}
					resolve(response);
				}
			});
		});
		return promise;
    }
	
    function validate(emailaddress, username, password) {
		emailaddress = (emailaddress === undefined) ? null: emailaddress;
		username = (username === undefined) ? null : username;
		let promise = new Promise((resolve, reject) => {
			if (!emailaddress && !username) {
				reject("Missing email address or username.");
			}
			let response = {};
			let sql =  "SELECT `id`, `emailaddress`, `username`, ";
				sql += "`password`, `access_level`, `is_logged_in` ";
				sql += "FROM `authentication` ";
				sql += "WHERE `emailaddress` = ? OR `username` = ?;";
			db.query(sql, [email_address, username], function(error, result){
				if (error){
					response.error = {};
					response.error.message = "Query error: " + error;
					reject(response);
				}
				else {
					if (result.length > 0) {
						if (bcrypt.compareSync(password, result[0].password)) {
							
							response.result = {
								id	: result[0].id,
								email_address : result[0].email_address,
								access_level: result[0].access_level,
								username: result[0].username,
								is_logged_in: result[0].is_logged_in,
								token: (result[0].access_level == 3) ? genToken(result[0].id) : null
							};
							
							updateLastLogin(result[0].id).then((update) => {
								if (update.error) {
									reject(update);
								}
								else {
									resolve(response);
								}
							});
							
						}
						else {
							response.error = {};
							response.error.message = "Your password is incorrect.";
							reject(response);
						}
					}
					else {
						response.error = {};
						response.error.message = "Your username is incorrect.";
						reject(response);
					}
				}
			});
		});
		return promise;
    }
	
	function updateLastLogin(id) {
		
		let promise = new Promise((resolve, reject) => {
			let now = dateFormat(new Date(), "m/d/yyyy h:MM:ss TT");
			let sql =  "UPDATE authentication ";
				sql += "SET date_last_log = ? ";
				sql += "WHERE id = ?;";
			db.query(sql, [now, id], function(error) {
				if (error) {
					response.error = {};
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
	
	
    function register(member) {
		let promise = new Promise((resolve, reject) => {
			console.log(member);
			let response = {};
            bcrypt.genSalt(10, function(error, salt) {
                bcrypt.hash(member.password, salt, function(error, hash) {
                    let insert = {
                        password: hash,
                        email_address: member.email_address,
                        username: member.username,
                        access_level: 1,
                        reg_code: salt
                    };
                    var sql = "INSERT INTO authentication SET ?;";
                    try {
                        db.query(sql, insert, function(error, result) {
                            if (error) {
								response.error = {};
                                response.error.message = "Auth.Register() SQL error: " + error;
								reject(response);
                            }
                            else {
                                response.result = result;
								resolve(response);
                            }
                        });
                    }
                    catch (error) {
						response.error = {};
                        response.error.message = "Auth.Register() MySQL error.";
                        reject(response);
                    }
                });
            });
		});
		return promise;
    }
	
	function getUser(username) {
		let promise = new Promise((resolve, reject)=> {
			let sql = "SELECT * FROM authentication WHERE `username` = ?;";
			db.query(sql, [username], (error, result)=> {
				if (error) {
					reject(error);
				}
				else {
					resolve(result);
				}
			});
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