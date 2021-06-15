import { Resolver, Query, Mutation, Arg, Ctx, ObjectType, Field, UseMiddleware } from 'type-graphql'
import { Container } from "typedi";
import UserService from '../../services/user.service'
import { Context } from '../context';
import {authorization} from '../../middleware/graphQlAuth'
import db from '../../models'

const userService = Container.get(UserService);

const User =  db.User;

@ObjectType()
class LoginReponse {
  @Field()
  accessToken!: string;
}

@Resolver()
export  class UserResolver {
  @Query(() => User)
  @UseMiddleware(authorization) 
  async profile(
    @Ctx() {user}: Context
  ): Promise<any> {
    await userService.getUser(user!.id);
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('email') email: string,
    @Arg('first_name') first_name: string,
    @Arg('last_name') last_name: string,
    @Arg('password') password: string,
    @Ctx() {req}: Context
  ): Promise<any>{
    try {
      const user = await userService.create({email,first_name,last_name,password});
      return user;
    } catch(e) {
     throw new Error(e.message); 
    }
  }

  @Mutation(() => LoginReponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {res}: Context
  ): Promise<LoginReponse> {
    try {
      const token = await userService.login(email,password);
      res.cookie("uT",token,{httpOnly:true});
      return {accessToken:token};
    } catch(e) {
     throw new Error(e.message); 
    }
  }

}