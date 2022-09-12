async function homePage(req, res) {
	const { authorization } = req.header;
	const token = authorization?.replace("Bearer ", "");

	if (!token) return res.sendStatus(401);

	try {
		const session = await db.collection("sessions").findOne({ token });

		if (!session) return res.sendStatus(401);

		const user = await db.collection("users").findOne({ _id: session.user_id });

		res.send(user);
	} catch (error) {
		console.error(error.message);
	}
}

async function newEntry(req, res) {
	const { authorization } = req.header;
	const entry = req.body;

	const validation = EntrySchema.validate(entry);
	if (validation.error) {
		const erros = validation.error.details.map((detail) => detail.message);
		res.status(422).send(erros);
		return;
	}

	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);

	try {
		const session = await db.collection("sessions").findOne({ token });
		if (!session) return res.sendStatus(401);

		const user = await db.collection("users").findOne({
			_id: session.user_id,
		});

		await user.updateOne({
			...user,
			entrys: { $push: { entry } },
		});
	} catch (error) {
		console.error(error.message);
	}
}

export { homePage, newEntry };