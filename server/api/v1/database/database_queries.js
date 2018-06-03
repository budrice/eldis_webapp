let jwt = require('jwt-simple');
let bcrypt = require('bcryptjs');
var mysql = require('mysql');
var config = require('./../../../config/config.json');

var db = mysql.createPool({
    connectionLimit: config.connectionLimit,
    connectTimeout: config.connectTimeout,
    multipleStatements: config.multipleStatements,
    host: config.dbServerIP,
    user: config.dbUser,
    password: config.dbPass,
    database: config.db
});
db.on('error', (error)=> {
    console.log(error);
});

module.exports = function() {
    
    return {
        Login: login,
        Register: register,
		//GetUsername: getUsername,
		//GetEmailAddress: getEmailAddress,
		Update: update,
		BasicSearch: basicSearch
    };
    
    function login(member) {
		console.log('@login');
		let promise = new Promise((resolve, reject) => {
			console.log(member);
			let response = {};
			validate(member).then((result) => {
				console.log(result);
				if (result.error) {
					reject(result);
				}
				else {
					
					if (result.access_level === 0) {
						response.error = {};
						response.error.message = "Your account is currently locked out.";
						resolve(response);
					}
					//if (result.access_level === 1) {
					//	response.error = {};
					//	response.error.message = "Your account has not been approved.";
					//	resolve(response);
					//}
					else {
						response = {
							user_id: result.id,
							emailaddress: result.email_address,
							username: result.username,
							is_logged_in: 1,
							access_level: result.access_level,
							token: result.token
						};
						let update_object = {
							id: result.id,
							is_logged_in: 1
						};
						
						//resolve(response);
						
						update(update_object, 'authentication').then((update) => {
							if (update.error) {
								reject(update);
							}
							else {
								resolve(response);
							}
						}, (error)=> {
							reject(error);
						});
					}
				}
			});
		});
		return promise;
    }
	
    function validate(member) {
		let promise = new Promise((resolve, reject) => {
			if (!member.email_address && !member.username) {
				reject("Missing email address and/or username.");
			}
			let sql =  "SELECT * FROM `authentication` ";
				sql += "WHERE `id` = ?;";
			db.query(sql, [member.id], function(error, result){
				if (error){
					reject(error);
				}
				else {
					let response = {};
					if (result.length > 0) {
						if (bcrypt.compareSync(member.password, result[0].password)) {
							response.result = {};
							response = result[0];
							response.token = (result[0].access_level > 2) ? genToken(result[0].id) : null;
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
	
	function update(update_object, table) {
		
		let promise = new Promise((resolve, reject) => {
			let id = update_object.id;
			delete update_object.id;
			let sql =  "UPDATE `" + table + "` ";
				sql += "SET ? ";
				sql += "WHERE id = " + id +";";
			db.query(sql, update_object, function(error, result) {
				if (error) {
					console.log(error);
					reject(error);
				}
				else {
					resolve(result);
				}
			});
		});
		return promise;
	}
	
	function basicSearch(table, search_object) {
		let promise = new Promise((resolve, reject)=> {
			let sql = "SELECT * FROM `" + table + "` WHERE ?;";
			try {
				db.query(sql, search_object, (error, result)=> {
					if (error) {
						reject(error);
					}
					else {
						console.log(result);
						if (result.length > 0) {
							if (result[0].password){
								delete result[0].password;
							}
						}
						resolve(result);
					}
				});
			}
			catch (error) {
				reject(error);
			}
		});
		return promise;
	}
	
	/**
	 * register
	 * @param {Object} member: authentication dataset
	 * @return {Promise} insert result
	 */
    function register(member) {
		let promise = new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(error, salt) {
                bcrypt.hash(member.password, salt, function(error, hash) {
                    let insert_object = {
                        password: hash,
                        email_address: member.email_address,
                        username: member.username,
                        access_level: 1,// limited access until upgrade level.
                        reg_code: salt
                    };
                    var sql = "INSERT INTO authentication SET ?;";
                    try {
                        db.query(sql, insert_object, function(error, result) {
                            if (error) {
								reject(error);
                            }
                            else {
								resolve(result);
                            }
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            });
		});
		return promise;
    }
	
	//function getUsername(username) {
	//	let promise = new Promise((resolve, reject)=> {
	//		let sql = "SELECT * FROM authentication WHERE `username` = ?;";
	//		db.query(sql, [username], (error, result)=> {
	//			if (error) {
	//				reject(error);
	//			}
	//			else {
	//				resolve(result);
	//			}
	//		});
	//	});
	//	return promise;
	//}
	//
	//function getEmailAddress(email_address) {
	//	let promise = new Promise((resolve, reject)=> {
	//		let sql = "SELECT * FROM authentication WHERE `email_address` = ?;";
	//		db.query(sql, [email_address], (error, result)=> {
	//			if (error) {
	//				reject(error);
	//			}
	//			else {
	//				resolve(result);
	//			}
	//		});
	//	});
	//	return promise;
	//}
	
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