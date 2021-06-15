import { Resolver, Query, Mutation, Arg, Ctx, ObjectType, Field, UseMiddleware } from 'type-graphql'
import { Container } from "typedi";
import BookService from '../../services/book.service'
import { Context } from '../context';
import {authorization} from '../../middleware/graphQlAuth'
import db from '../../models'

const bookService = Container.get(BookService);

const Book =  db.Book;

@Resolver()
export class BookResolver {
  @Query(() => Book)
  async book(): Promise<any> {
    const book = await bookService.getBook(1);
    return book;
  }

  @Query(() => [Book])
  async books(
    @Ctx() {req}: Context
  ): Promise<any> {
    const result = await bookService.getBooks(req);
    return result;
  }

  @Mutation(() => Book)
  @UseMiddleware(authorization) 
  async create(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('quantity') quantity: number,
    @Arg('flag') flag: string,
    @Arg('price') price: number,
    @Arg('currency') currency: string,
    @Arg('genre') genre: string,
    @Arg('tags') tags: string,
    @Arg('image') image: string,
    @Arg('author') author: string,
    @Ctx() {user}: Context
  ): Promise<any>{
    try {
      const book = await bookService.create({
        title,description,quantity,flag,price,currency,genre,tags,image,author,userId:user!.id
      });
      return book;
    } catch(e) {
     throw new Error(e.message); 
    }
  }
}