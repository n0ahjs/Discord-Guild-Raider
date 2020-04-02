let fs = require("fs");

module.exports.run = async(Client, input) => {
	return new Promise((resolve, reject) => {
		fs.readdir("./Commands/", (err, files) => {
			if(err) console.log(err);
			files.forEach(file => {
				if(!file.endsWith(".js")) return;
				let info = require(`./${file}`).about.info;
				if(info){
					console.log(`Command: ${file.split(".")[0]}`);
					console.log(`Info: ${info}`);
					console.log("\n");
				}
			});
		});
		resolve();
	});
}

module.exports.about = {
	info: "Displays a list of available Commands!"
}