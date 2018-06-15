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
		Update: update,
		BasicSearch: basicSearch
    };
    
    function login(member) {
		let promise = new Promise((resolve, reject) => {
			let response = {};
			validate(member).then((result) => {
				if (result.error) {
					resolve(result);
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
							token: genToken(result.id)
						};
						let update_object = {
							id: result.id,
							is_logged_in: 1,
							token: response.token
						};
						update('authentication', update_object).then((update) => {
							if (update.error) {
								resolve(update);
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
				resolve({ error: { message: "Missing email address and/or username." }});
			}
			let sql =  "SELECT * FROM `authentication` ";
				sql += "WHERE `id` = ?;";
			try {
				db.query(sql, [member.id], function(error, result) {
					if (error){
						let response = {};
						response.error = error;
						resolve(response);
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
								console.log('incorrect password');
								response.error = {};
								response.error.message = "Your password is incorrect.";
								resolve(response);
							}
						}
						else {
							response.error = {};
							response.error.message = "Your username is incorrect.";
							resolve(response);
						}
					}
				});
			}
			catch (error) {
				reject(error);
			}
		});
		return promise;
    }
	
	function update(table, update_object) {
		let promise = new Promise((resolve, reject) => {
			let id = update_object.id;
			delete update_object.id;
			let sql =  "UPDATE `" + table + "` ";
				sql += "SET ? ";
				sql += "WHERE id = " + id +";";
			try {
				db.query(sql, update_object, function(error, result) {
					if (error) {
						let response = {};
						response.error = error;
						resolve(response);
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
		return promise;
	}
	
	function basicSearch(table, search_object) {
		let promise = new Promise((resolve, reject)=> {
			let sql = "SELECT * FROM `" + table;
			console.log(Object.keys(search_object)[0]);
			if (Object.keys(search_object)[0] != 'null') {
				sql += "` WHERE ?;";
			}
			else {
				sql += "`;";
			}
			try {
				console.log(sql);
				db.query(sql, search_object, (error, result)=> {
					if (error) {
						let response = {};
						response.error = error;
						resolve(response);
					}
					else {
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
								let response = {};
								response.error = error;
								resolve(response);
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