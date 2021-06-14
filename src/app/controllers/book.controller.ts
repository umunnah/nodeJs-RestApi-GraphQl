import { Request, Response, NextFunction } from "express";
import { Service} from "typedi";
import BookService from "../services/book.service";

@Service()
class BookController {
	constructor(public bookService: BookService) {
		this.create = this.create.bind(this);
		this.books = this.books.bind(this);
		this.book = this.book.bind(this);
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await this.bookService.create(req);
			res.status(201).json({'message':'success', 'data':book });
		} catch (e) {
			next(e);
		}
	}

	async books(req: Request, res: Response, next: NextFunction) {
		try {
			let books = await this.bookService.getBooks(req);
			res.status(200).json({'message': 'success','data': books});
		} catch (err) {
			next(err);
		}
	}

	async book(req: Request, res: Response, next: NextFunction) {
		try {
      const {id} = req.params;
			let book = await this.bookService.getBook(id);
			res.status(200).json({'message': 'success','data': book});
		} catch (err) {
			next(err);
		}
	}
}

export default BookController;
