const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/db");
const errorHandler = require("./middlewares/errorhandler");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Start app: connect DB, optionally seed sample users, then attach routes and listen
async function startServer() {
	try {
		// connect to the database
		await connectDB();

		// seed sample users in non-production environments
		if (process.env.NODE_ENV !== "production") {
			try {
				const User = require("./models/user");
				if (User && typeof User.insertSampleUsers === "function") {
					await User.insertSampleUsers();
				}
			} catch (seedErr) {
				console.error("Seeding sample users failed:", seedErr);
			}
		}

		//routes
		app.use("/api/users", userRoutes);

		app.use("/api/products", (req, res) => {
			return res.status(200).json({
				message: "This is new feature change, a new route for products samin",
			});
		});

		//error handler
		app.use(errorHandler);

		//listen to the server
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

startServer();
