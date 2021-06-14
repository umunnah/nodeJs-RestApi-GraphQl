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

  @Mutation(() => Book)
  @UseMiddleware(authorization) 
  async create(
    @Arg('email') email: string,
    @Arg('first_name') first_name: string,
    @Arg('last_name') last_name: string,
    @Arg('password') password: string,
    @Ctx() {user}: Context
  ): Promise<any>{
    try {
      const book = await bookService.create({email,first_name,last_name,password});
      return book;
    } catch(e) {
     throw new Error(e.message); 
    }
  }
}