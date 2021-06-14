// import supertest from "supertest";
// import app from "../src/bootstrap/app";
// import UserRepository from '../src/app/repository/user.repository';
// import db from '../src/app/models'

// const request = supertest.agent(app);

// const defaultUser = {
// 	first_name: "lawrence",
// 	last_name: "Umunnah",
// 	email: "default@example.com",
// 	password: "password",
// };
// const defaultbook = {
//   "title": "First title",
//   "content": "First content"
// }

// let token: string;
// let testAccount: any;


// describe("Book Controller", () => {
//   beforeEach(async () => {
//     await db.sequelize.sync({force: true, logging: false});
//     const userRepository = new UserRepository();
//     testAccount = await userRepository.create(defaultUser);
//     token = await userRepository.login(defaultUser.email,defaultUser.password)
//   })
// 	describe("Create book", () => {
// 		it("auth middleware", (done) => {
// 			request.post("/api/v1/book").then((res) => {
// 				expect(res.status).toEqual(403);
// 				done();
// 			});
// 		});
// 		it("validation", async(done) => {
// 			request
// 				.post("/api/v1/book")
//         .set('Authorization', `Bearer ${token}`)
// 				.then((res) => {
// 					expect(res.status).toEqual(422);
// 					done();
// 				});
// 		});
// 		it("create book", async(done) => {
// 			request
// 				.post("/api/v1/book")
//         .set('Authorization', `Bearer ${token}`)
// 				.send(defaultbook)
// 				.then((res) => {
// 					expect(res.status).toEqual(201);
// 					done();
// 				});
// 		});
// 	});
//   describe("Get books", () => {
//     it("get books", (done) => {
// 			request
// 				.get("/api/v1/books")
// 				.then((res) => {
// 					expect(res.status).toEqual(200);
// 					done();
// 				});
// 		});
//     it("get books with search query", (done) => {
// 			request
// 				.get("/api/v1/books?search=title")
// 				.then((res) => {
// 					expect(res.status).toEqual(200);
// 					done();
// 				});
// 		});
//   });
//   describe("Get book a single book", () => {
//     it("get book with invalid id", (done) => {
// 			request
// 				.get("/api/v1/book/10")
// 				.then((res) => {
// 					expect(res.status).toEqual(404);
// 					done();
// 				});
// 		});
//     it("get book with valid id", async(done) => {
//       const book = await db.Book.create({ 
//         title: defaultbook.title,
//         content: defaultbook.content,
//         userId: testAccount.id
//       });
// 			request
// 				.get(`/api/v1/book/${book.id}`)
// 				.then((res) => {
// 					expect(res.status).toEqual(200);
// 					done();
// 				});
// 		});
//   });
// });
