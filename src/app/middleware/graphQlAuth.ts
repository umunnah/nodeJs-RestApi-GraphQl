import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import {Context} from '../graphQl/context'
import { UnAuthenticatedException } from '../../libraries/exceptions';
import UserRepository from '../repository/user.repository'

// Protect routes
export const authorization: MiddlewareFn<Context> = async ({context}, next) => {
	let token; 
  const req = context.req;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} 
	if (!token) {
		throw new UnAuthenticatedException('Not authorize to access this route');
	}

	try {
		// verify token
		const decoded = jwt.verify(token,`${process.env.JWT_SECRET}`);
    const id = (<any>decoded).id;
    const repo = new UserRepository();
		context.user = await repo.getUser(id);
		return next();
	} catch (err) {
		throw new UnAuthenticatedException('Not authorize to access this route');
	}
};