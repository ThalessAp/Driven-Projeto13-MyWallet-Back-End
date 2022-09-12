import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "./database/dbService.js";

async function singIn(req, res) {
	// email, senha
	const login = req.body;
	const user = await db.collection("users").findOne(login);

	if (user) {
		const passwordIsValid = bcrypt.compareSync(password, user.password);

		if (user && passwordIsValid) {
			const token = uuid();

			await db.collection("sessions").insertOne({
				userId: user._id,
				token,
			});
			res.send(token);
		} else {
			return res.status(401).send({
				error: "E-mail ou senha inválido",
			});
		}
	} else {
		return res.status(401).send({
			error: "E-mail ou senha inválido",
		});
	}
}

async function createNewUser(req, res) {
	// name, email, password
	const user = req.body;

	const passwordHash = bcrypt.hashSync(user.password, 10);

	try {
		await db.collection("users").insertOne({
			...user,
			password: passwordHash,
		});
		res.sendStatus(201);
	} catch (error) {
		console.error(error.message);
		return res.sendStatus(500);
	}
}

export { singIn, createNewUser };