const rl = require("readline-sync");

module.exports.run = async(Client, message) => {
	return new Promise((resolve, reject) => {
		let targetGuild = rl.question("Guild ID: ");
		let targetChannel = rl.question("Channel ID/Name: ");
		let message = rl.question("Message: ");

		if(targetGuild){
			if(targetChannel){
				if(message){
					raidGuild(Client, targetGuild, targetChannel, message).then(() => { resolve() });
				} else {
					console.log("You did not specify a message!");
					resolve();
				}
			} else {
				console.log("You did not specify a Channel ID or name!");
				resolve();
			}
		} else {
			console.log("You did not specify a Guild ID!");
			resolve();
		}
	});

	function raidGuild(Client, targetGuild, targetChannel, message){
		return new Promise((resolve, reject) => {
			for(var I = 0; I < 100; I++){
				setTimeout(async () => {
					Client.Accounts.forEach(async (account, arrPos) => {
						const instance = account.instance;
						let Guild = instance.guilds.get(targetGuild);
						if(Guild){
							if(!isNaN(targetChannel)){
								let Channel = Guild.channels.get(targetChannel);
								if(Channel) Channel.send(message);
							} else {
								let Channel = Guild.channels.find(channel => channel.name.toLowerCase() == targetChannel.toLowerCase());
								if(Channel) Channel.send(message);
							}
						}
					});
				}, I * 700);
			}
		});
	}
}

module.exports.about = {
	info: "Raids the specified Guild!"
}