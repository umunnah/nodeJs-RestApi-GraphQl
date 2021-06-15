import * as express from "express";
import { Container } from "typedi";
import FormValidations from "../app/middleware/validation";
import Authorization from "../app/middleware/auth";
import UsersValidations from "../app/validations/user.validations";
import BooksValidations from "../app/validations/book.validations";
import VoteValidations from "../app/validations/vote.validations";
import AuthController from "../app/controllers/auth.controller";
import BookController from "../app/controllers/book.controller";
import VoteController from "../app/controllers/vote.controller";
import db from "../app/models";

const { User } = db;
declare global {
	namespace Express {
		export interface Request {
			user: typeof User;
		}
	}
}

// register the controller for Dependency Injection using container
const authController = Container.get(AuthController);
const bookController = Container.get(BookController);
const voteController = Container.get(VoteController);

let router = express.Router();

// auth controller routes
router.post(
	"/register",
	UsersValidations.create,
	FormValidations,
	authController.create
);
router.post(
	"/login",
	UsersValidations.login,
	FormValidations,
	authController.login
);
router.get("/profile", Authorization, authController.profile);

// all routes for book controller
router.post(
	"/book",
	Authorization,
	BooksValidations.create,
	FormValidations,
	bookController.create
);
router.get("/books", bookController.books);
router.get("/book/:id", bookController.book);


// votes routes
router.post("/vote", Authorization, VoteValidations.create, FormValidations,voteController.create);
router.get("/user/votes", Authorization, voteController.userVotes)
router.delete("/vote/:id",Authorization,voteController.deleteVote)

export default router;
