const request = require("request");
const rl = require("readline-sync");

module.exports.run = async(Client, input) => {
	return new Promise((resolve, reject) => {
		Client.Accounts.forEach(account => {
			const instance = account.instance;
			const inviteCode = rl.question("Invite code: ");
			if(inviteCode){
				Client.Accounts.forEach(async (account, I) => {
					setTimeout(() => {
						request.post(`https://discordapp.com/api/invites/${inviteCode}`, {
							headers: {
								"Authorization": account.token,
							},
						}, (err, response, body) => {
							if(err){
								console.log(err);
							}
							console.log(body, response.statusMessage, response.statusCode);
						});
					}, I * 200);
				});
				resolve();
			} else {
				console.log("You did not specify a token!");
				resolve();
			}
		});
	})
}

module.exports.about = {
	info: "Joins the specified code via Guild invite code (Only accepts a code not entire url/link)"
}