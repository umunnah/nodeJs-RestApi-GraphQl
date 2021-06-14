import { Service } from "typedi";
import db from "../models";
import { Op } from "sequelize";
import { ModelNotFoundException } from "../../libraries/exceptions";

@Service()
class BookRepository {
	public model: any;
	constructor() {
		this.model = db.Book;
	}

	async create(data: any) {
		try {
			const book = await this.model.create(data);
			return book;
		} catch (e) {
			throw new Error(e);
		}
	}

	async getBooks(req: any) {
		const { page, size, search } = req.query;
		let whereClause: any;
		const newSize = parseInt(size);
		const newPage = parseInt(page);
		const { limit, offset } = this.getPagination(newPage, newSize);
		if (search && search != "") {
			whereClause = {
				[Op.or]: {
					title: { [Op.iLike]: `%${search}%` },
					content: { [Op.iLike]: `%${search}%` },
				},
			};
		}
		try {
			const data = await this.model.findAndCountAll({
				where: whereClause,
				offset: offset,
				limit: limit,
				order: [["createdAt", "DESC"]],
			});
			return this.getPagingData(data, newPage, limit);
		} catch (err) {
			// sqlite3 throws an error when there is no value for such operation
			return [];
			throw new ModelNotFoundException(err, 1);
		}
	}

	async getBook(id: string | number) {
		try {
			const book = await this.model.findOne({
				where: { id: id },
				include: [this.model.associations.User],				
			});
			if (book != null) return book;
			throw new ModelNotFoundException("Book", id);
		} catch (err) {
			throw new ModelNotFoundException("Book", id);
		}
	}
	getPagingData(data: any, page: number, limit: number) {
		const { count: totalItems, rows: Books } = data;
		const currentPage = page ? +page : 0;
		const totalPages = Math.ceil(totalItems / limit);

		return { totalItems, Books, totalPages, currentPage };
	}
	getPagination(page: number, size: number) {
		const limit = size ? size : 15;
		const offset = page && page > 1 ? (page - 1) * limit + 1 : 0;

		return { limit, offset };
	}
}

export default BookRepository;
