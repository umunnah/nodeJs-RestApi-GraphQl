import { check, param} from "express-validator";
import { ModelNotFoundException } from "../../libraries/exceptions";
import BookRepository from "../repository/book.repository";

const bookRepository = new BookRepository();

export default {
	create: [
		check("value")
			.exists()
			.withMessage("Value is Requiered")
			.isIn([-1, 1])
			.withMessage("Value must either be 1 or -1"),

		check("bookId")
			.isNumeric()
			.withMessage("book Id is required")
			.custom(async (bookId: number) => {
				try {
					await bookRepository.getBook(bookId);
					return true;
				} catch (e) {
					throw new ModelNotFoundException("book", bookId);
				}
			}),
	],
	getbookVote: [
		param('bookId')
		.isNumeric()
		.withMessage("book Id is required")
		.custom(async (bookId: number) => {
			try {
				await bookRepository.getBook(bookId);
				return true;
			} catch (e) {
				throw new ModelNotFoundException("book", bookId);
			}
		}),
	]
};
