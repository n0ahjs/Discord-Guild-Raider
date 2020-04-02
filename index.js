const Discord = require("discord.js");
const Client = new Discord.Client();

const fs = require("fs");
const rl = require("readline-sync");

Client.Commands = new Discord.Collection();
Client.Accounts = [];

fs.readdir("./Commands/", (err, files) => {
	if(err) console.log(err);
	files.forEach(file => {
		if(!file.endsWith(".js")) return;
		let prop = require(`./Commands/${file}`);
		let command = file.split(".")[0];
		console.log(`Loading command: ${command}`);
		Client.Commands.set(command.toLowerCase(), prop);
	});
	initalizeTokens().then(() => {
		module.exports.main();
	});
});

function initalizeTokens(){
	return new Promise((resolve, reject) => {
		fs.readFile("./tokens", "utf8", (err, data) => {
			if(err) console.log(err);
			data.split(/\r?\n/).forEach(token => {
				let instance = new Discord.Client();
				instance.login(token.toString());
				instance.on("ready", () => {
					console.log(`User ${instance.user.tag} successfully logged in!`);
					let newObj = {
						token: token,
						instance: instance,
					}
					Client.Accounts.push(newObj);
				});
			});
		});
		setTimeout(resolve, 3000);
	});
}

module.exports = {
	main: function(){
		let input = rl.question("Input: ");
		let command = Client.Commands.get(input.toLowerCase().split(" ")[0]);
		if(command){
			command.run(Client, input).then(() => { setTimeout(this.main, 2000)});
		} else {
			console.log(`Unknown Command!`);
			setTimeout(this.main, 2000);
		}
	}
}