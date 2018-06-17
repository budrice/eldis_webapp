let nodemailer = require('nodemailer');
let config = require('./../../../config/config.json');

let transporter = nodemailer.createTransport({
	service: config.email_service,
	auth: {
		user: config.email_service_address,
		pass: config.email_service_password
	}
});


module.exports = function() {
	
	return {
		Send: send
	};
	
	function send(body) {
		return new Promise((resolve, reject)=> {
			let mailOptions = {
				from: body.from,
				to: config.email_service_address,
				subject: body.subject,
				text: body.text
			};
			try {
				transporter.sendMail(mailOptions, (error, info)=> {
					if (error) {
						resolve(error);
					} else {
						console.log('Email sent: ' + info.response);
						resolve({ message: 'Email sent successfully.' });
					}
				});
			}
			catch (error) {
				reject(error);
			}
		});
		
	}
	
};

