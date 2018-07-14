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
		Search: search
    };
    
    function login(member) {
		return new Promise((resolve, reject)=> {
			let response = {};
			validate(member).then((result)=> {
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
							is_logged_in: 1,
							token: response.token
						};
						update('authentication', result.id, update_object).then((update) => {
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
								delete result[0].password;
								delete result[0].reg_code;
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
	
	function update(table, id, update_object) {
		return new Promise((resolve, reject) => {
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
	}
	
	function search(table, search_object) {
		
		return new Promise((resolve, reject)=> {
			showColumns(table, (error)=> { reject(error); })
			.then(buildQuery, (error)=> { reject(error); })
			.then(select, (error)=> { reject(error); })
			.then((result)=> { resolve(result); }, (error)=> { reject(error); });
		});
		
		function showColumns(table) {
			return new Promise((resolve, reject)=> {
				let sql = "SHOW COLUMNS FROM " + table + ";";
				try {
					db.query(sql, (error, result)=> {
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
		}
		
		function buildQuery(col_props) {
			return new Promise((resolve)=> {
				let where_str = '';
				Object.keys(search_object).forEach((key)=> {
					let field_type = findFieldType(col_props, key);
					where_str += (where_str.length > 0) ? where_str + ", " :  "WHERE (";
					if (field_type == 'blob' ||
						field_type == 'char' ||
						field_type == 'date' ||
						field_type == 'datetime' ||
						field_type == 'text' ||
						field_type == 'timestamp' ||
						field_type.startsWith('varchar') ||
						field_type == 'year') {
						where_str += key + "='" + search_object[key] + "'";
					}
					else {
						where_str += key + "=" + search_object[key];
					}
					
				});
				let query = "SELECT * FROM " + table + " " + where_str + ");";
				resolve(query);
			});
				
		}
		
		function select(sql_query) {
			
			console.log(sql_query);
			
			return new Promise((resolve, reject)=> {
				let response = {};
				try {
					db.query(sql_query, (error, result)=> {
						if (error) {
							response.error = 'Server Error: ' + error;
							resolve(response);
						}
						else {
							console.log(result);
							let cleaned = cleanPasswords(result);
							resolve(cleaned);
						}
					});
				}
				catch (error) {
					reject(error);
				}
				
			});
			
		}
		
		function findFieldType(properties, field) {
            let response = null;
            let fndFld = function(data) {
                return data.Field == field;
            };
            let i = properties.findIndex(fndFld);
            if (i >= 0) {
                response = properties[i].Type;
            }
            return response;
        }
		
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
	
	//function showColumns(table) {
	//	return new Promise((resolve, reject)=> {
	//		let sql = "SHOW COLUMNS FROM " + table + ";";
	//		try {
	//			db.query(sql, (error, result)=> {
	//				if (error) {
	//					let response = {};
	//					response.error = error;
	//					resolve(response);
	//				}
	//				else {
	//					resolve(result);
	//				}
	//			});
	//		}
	//		catch (error) {
	//			reject(error);
	//		}
	//	});
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

function cleanPasswords(db_array) {
	db_array.forEach((dataset, i, array)=> {
		if (dataset.password) {
			delete array[i].password;
		}
		if (dataset.reg_code) {
			delete array[i].reg_code;
		}
	});
	return db_array;
}

//function whereValues(object) {
//	let where_array = [];
//	let temp_object = {};
//	Object.keys(object).forEach((key)=> {
//		
//		if (isNaN(object[key]))
//		
//		temp_object[key] = object[key];
//		where_array.push(temp_object);
//	});
//	return where_array;
//}

















