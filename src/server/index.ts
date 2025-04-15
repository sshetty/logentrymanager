import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import router from './router';

// establish database connection
AppDataSource
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!")
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err)
	})

const app = express();
const PORT = 8080;

const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
