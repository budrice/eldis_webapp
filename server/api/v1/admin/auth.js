let jwt = require('jwt-simple');
let bcrypt = require('bcryptjs');
let dateFormat = require('dateformat');

module.exports = function(db){
    
    return {
        Login: login,
        Register: register,
		GetUsername: getUsername,
		GetEmailAddress: getEmailAddress
    };
    
    function login(member) {
		let promise = new Promise((resolve, reject) => {
			//console.log(member);
			let response = {};
			validate(member).then((result) => {
				//console.log(result);
				if (result.error) {
					reject(result);
				}
				else {
					if (result.access_level === 0) {
						response.error = {};
						response.error.message = "Your account is currently locked out.";
						resolve(response);
					}
					if (result.access_level === 1) {
						response.error = {};
						response.error.message = "Your account has not been approved.";
						resolve(response);
					}
					if (result.access_level > 2) {
						response = {
							user_id: result.id,
							emailaddress: result.email_address,
							username: result.username,
							is_logged_in: 1,
							access_level: result.access_level,
							token: result.token
						};
						updateLastLogin(result.id).then((update) => {
							if (update.error) {
								reject(update);
							}
							else {
								resolve(response);
							}
						});
					}
				}
			});
		});
		return promise;
    }
	
    function validate(member) {
		//member.email_address = (member.email_address === undefined) ? null: member.email_address;
		//member.username = (member.username === undefined) ? null : member.username;
		let promise = new Promise((resolve, reject) => {
			if (!member.email_address && !member.username) {
				reject("Missing email address or username.");
			}
			let response = {};
			let sql =  "SELECT `id`, `email_address`, `username`, ";
				sql += "`password`, `access_level`, `is_logged_in` ";
				sql += "FROM `authentication` ";
				sql += "WHERE `id` = ?;";
			db.query(sql, [member.id], function(error, result){
				if (error){
					response.error = {};
					response.error.message = "Query error: " + error;
					reject(response);
				}
				else {
					if (result.length > 0) {
						if (bcrypt.compareSync(member.password, result[0].password)) {
							response = {
								id	: result[0].id,
								email_address : result[0].email_address,
								access_level: result[0].access_level,
								username: result[0].username,
								is_logged_in: result[0].is_logged_in,
								token: (result[0].access_level > 2) ? genToken(result[0].id) : null
							};
							resolve(response);
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
			let response = {};
			let sql =  "UPDATE authentication ";
				sql += "SET access_level = 3 ";
				sql += "WHERE id = ?;";
			db.query(sql, [id], function(error) {
				if (error) {
					console.log(error);
					response.error = {};
					response.error.message = error;
					reject(response);
				}
				else {
					resolve(true);
				}
			});
		});
		return promise;
	}
	
	
    function register(member) {
		let promise = new Promise((resolve, reject) => {
			//console.log(member);
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
	
	function getUsername(username) {
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
	
	function getEmailAddress(email_address) {
		let promise = new Promise((resolve, reject)=> {
			let sql = "SELECT * FROM authentication WHERE `email_address` = ?;";
			db.query(sql, [email_address], (error, result)=> {
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
function genToken(id) {
    let expires = expiresIn(1); // 7 days
    let token = jwt.encode({
        exp: expires,
        id: id 
    }, require('../../../config/secret')());

    let token_obj = {
        key: token,
        expires: expires,
        id: id
    };

    return token_obj;
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}