import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
	validateLogin,
	validateCad,
	validateNewEntry,
} from "./middlewares/validateShema.js";
import { singIn, createNewUser } from "./controllers/authController.js";
import { homePage, newEntry } from "./controllers/userControllers.js";
dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(authController);
// Login
server.post("/sign-in", validateLogin, singIn);
// Cadastro
server.post("/sign-up", validateCad, createNewUser);

server.use(userControllers);
// Home
server.get("/", homePage);
// New entrys
server.put("/entry",validateNewEntry, newEntry);

server.listen(process.env.PORT, () => {
	console.log("listening on port" + process.env.PORT);
});
