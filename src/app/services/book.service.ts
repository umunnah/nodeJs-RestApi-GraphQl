import { Service } from 'typedi';
import BookRepository from "../repository/book.repository"

@Service()
class BookService {
  constructor(public bookRepository: BookRepository) {
    this.create = this.create.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.getBook = this.getBook.bind(this);
  }

  async create(req: any){
    const {title,content} = req.body;
    const userId = req.user.id;
    const data = {title,content,'userId':userId}
    return await this.bookRepository.create(data);
  }

  async getBooks(req: any) {
    return await this.bookRepository.getBooks(req);
  }

  async getBook(id:any) {
    return await this.bookRepository.getBook(id);
  }
}

export default BookService;

