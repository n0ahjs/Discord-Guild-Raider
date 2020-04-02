module.exports.run = async(Client, input) => {
	console.log("Goodbye!");
	setTimeout(process.exit, 1000);
}

module.exports.about = {
	info: "Terminates the Node application"
}