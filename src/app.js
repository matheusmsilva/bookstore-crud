import express from 'express';
import connectInDatabase from './config/dbConnect.js';
import routes from "./routes/index.js"

const connection = await connectInDatabase();

connection.on("error", (error) => {
    console.error("@@@ Connection error: ", error)
});

connection.once("open", () => {
    console.log("Database connected.")
});

const app = express();
routes(app);

export default app;
