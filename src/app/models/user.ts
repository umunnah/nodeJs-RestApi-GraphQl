"use strict";

import { Model, UUIDV4} from "sequelize";
import { Field, ObjectType} from 'type-graphql';
import models from ".";

interface UserAttributes {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	@ObjectType()
	class User extends Model<UserAttributes> implements UserAttributes {
		@Field()
		id!: string;
		@Field()
		firstName!: string;
		@Field()
		lastName!: string;
		@Field()
		email!: string;
		password!: string;
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models: any) {
		  // define association here
		  this.hasMany(models.Book, {sourceKey:'id',foreignKey:'userId',as:'books'}),
			this.hasMany(models.Vote, {sourceKey:'id',foreignKey:'userId',as:'votes'})
		}

		toJSON() {
			return { ...this.get(), password: undefined };
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
