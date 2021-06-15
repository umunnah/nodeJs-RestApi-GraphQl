import { check } from "express-validator";

export default {
	create: [
		check("title").isString().withMessage("Book Title is required"),
		check("description").isString().withMessage("Description is required"),
		check("quantity").isNumeric().withMessage("Quantity is required"),
		check("flag").isString().withMessage("Flag is required"),
		check("price").isDecimal().withMessage("Price is required"),
		check("currency").isString().withMessage("Currency is required"),
		check("genre").isString().withMessage("Genre is required"),
		check("tags").isString().withMessage("Tags is required"),
		check("image").isString().withMessage("Image is required"),
		check("author").isString().withMessage("Author is required"),
	],

	update: [
		check("title").isString().withMessage("Book Title is required"),
		check("description").isString().withMessage("Description is required"),
		check("quantity").isNumeric().withMessage("Quantity is required"),
		check("flag").isString().withMessage("Flag is required"),
		check("price").isDecimal().withMessage("Price is required"),
		check("currency").isString().withMessage("Currency is required"),
		check("genre").isString().withMessage("Genre is required"),
		check("tags").isString().withMessage("Tags is required"),
		check("author").isString().withMessage("Author is required"),
	],
};
