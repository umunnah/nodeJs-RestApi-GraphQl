import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import  { ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql'
// import helmet from 'helmet'; 
import db from '../app/models';
import ErrorHandler from '../app/exceptions';
import routes from '../routes';
import { UserResolver, BookResolver} from '../app/graphQl/resolvers'



class App {
  public app: express.Application;

  constructor() {
		this.app = express();

		this.setup();
		this.database();
		this.routers();
		this.graphQl();
	}

	setup() {
		// this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended:true}));
		this.app.use(cors());
	}

	async database() {
    await db.sequelize.sync({logging: false});
	}

	routers() {
		this.app.use("/api/v1",routes);

		this.app.use(ErrorHandler);
	}

	async graphQl() {
		const apolloServer =  new ApolloServer({
			schema: await buildSchema({
				resolvers: [
					UserResolver,
					BookResolver
				]
			}),
			context: ({req, res}) => ({req, res})
		});
		apolloServer.applyMiddleware({app:this.app});
	}
}

export default new App().app;