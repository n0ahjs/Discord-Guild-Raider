const rl = require("readline-sync");

module.exports.run = async(Client) => {
	return new Promise((resolve, reject) => {
		let targetGuild = rl.question("Guild ID: ");
		let targetChannel = rl.question("Channel ID: ");
		let reaction = rl.question("Reaction name: ");

		Client.Accounts.forEach((account, index) => {
			let instance = account.instance;
			let Guild = instance.guilds.get(targetGuild);
			if(Guild){
				console.log(`Found Guild via ${instance.user.tag}!`);
				let Channel = Guild.channels.get(targetChannel);
				if(Channel){
					console.log(`Found Channel via ${instance.user.tag}!`);
					let message = Channel.fetchMessages({limit: 10}).then(messages => {
						messages.array().forEach(async (message, index) => {
							setTimeout(() => {
								message.react(reaction).then(() => {
									console.log(`Successfully reacted via ${instance.user.tag}!`);
								}).catch(() => { console.log(`Failed to react via ${instance.user.tag}!`) });
							}, index * 1000);
						});
					});
				}
			}
			if(index == Client.Accounts.length - 1) resolve();
		});
		//resolve();
	});
}

module.exports.about = {
	info: "React to the specified message via ID & Reaction (Helps bypass verification channels)",
}