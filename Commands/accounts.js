module.exports.run = async(Client, input) => {
	return new Promise((resolve, reject) => {
		Client.Accounts.forEach(async (account) => {
			console.log(`Tag: ${account.instance.user.tag}`);
			console.log(`Token: ${account.token}`);
			console.log("\n");
		});
		resolve();
	});
}

module.exports.about = {
	info: "Displays a list of initalized accounts"
}