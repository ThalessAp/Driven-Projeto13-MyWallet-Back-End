import joi from "joi";

async function validateLogin(req, res, next) {
	const LoginSchema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required(),
	});

	const login = req.body;
	const validation = LoginSchema.validate(login);

	if (validation.error) {
		console.error(validation.error.details);
		return res.sendStatus(422);
	}
	next();
}

async function validateCad(req, res, next) {
	const CadSchema = joi.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required(),
	});

	const login = req.body;
	const validation = CadSchema.validate(login);

	if (validation.error) {
		console.error(validation.error.details);
		return res.sendStatus(422);
	}
	next();
}

async function validateNewEntry(req, res, next) {
	const EntrySchema = joi.object({
		value: joi.number().required(),
		description: joi.string().required(),
		type: joi.alternatives([plus, minus]).required(),
	});

	const entry = req.body;
	const validation = EntrySchema.validate(entry);

	if (validation.error) {
		console.error(validation.error.details);
		return res.sendStatus(422);
	}
	next();
}

export { validateLogin, validateCad, validateNewEntry };
