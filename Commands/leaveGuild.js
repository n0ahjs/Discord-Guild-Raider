const rl = require("readline-sync");

module.exports.run = async(Client, input) => {
	return new Promise((resolve, reject) => {
		let targetGuildID = rl.question("Guild ID: ");
		if(targetGuildID){
			if(!isNaN(targetGuildID)){
				Client.Accounts.forEach(account => {
					const instance = account.instance;
					let Guild = instance.guilds.get(targetGuildID);
					if(Guild){
						Guild.leave().then(() => {
							console.log(`User ${instance.user.tag} left the Guild!`);
						}).catch(() => {
							console.log(`User ${instance.user.tag} had trouble leaving the Guild!`);
						});
					}
				})
			} else {
				console.log("Guild ID's are not characters!");
				resolve();
			}
		} else {
			console.log("You did not specify a Guild ID!");
			resolve();
		}
	});
}

module.exports.about = {
	info: "Leaves the specified Guild!"
}