const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "User name is required"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

// Sample users for development / seeding
const sampleUsers = [
	{ name: "alice", email: "alice@example.com" },
	{ name: "bob", email: "bob@example.com" },
	{ name: "carol", email: "carol@example.com" },
	{ name: "dave", email: "dave@example.com" },
];

/**
 * Insert sample users into the database. Duplicate key errors are ignored.
 * Usage: await User.insertSampleUsers();
 */
async function insertSampleUsers() {
	try {
		await User.insertMany(sampleUsers, { ordered: false });
		console.log("Sample users inserted (duplicates ignored).");
	} catch (err) {
		// ignore duplicate key errors (11000) but surface others
		if (err && err.code && (err.code === 11000 || err.code === 11001)) {
			console.log("Some sample users already existed; duplicates ignored.");
		} else {
			console.error("Error inserting sample users:", err);
			throw err;
		}
	}
}

// Attach convenience properties to the exported model
User.sampleUsers = sampleUsers;
User.insertSampleUsers = insertSampleUsers;

module.exports = User;
