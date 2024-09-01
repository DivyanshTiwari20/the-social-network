// package import
import express from "express"
import dotenv from "dotenv";

// file imports
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

// dmv config
dotenv.config();

app.use(express.json()); // to parse incoming request with JSON payloads(from req.body)

// middleware
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
//    root route http://localhost:5000/
    res.send("Hello World !!");
});


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});