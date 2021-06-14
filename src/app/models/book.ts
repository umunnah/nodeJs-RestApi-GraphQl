'use strict';

import  {Model} from "sequelize";
import { Field,ObjectType} from 'type-graphql';


interface BookAttributes {
  id: number;
  title: string;
  description: string;
  quantity: number;
  flag: boolean;
  price: number;
  currency: string;
  genre: string;
  tags: string;
  author: string;
  image: string;
  userId: string;
}

module.exports = (sequelize: any, DataTypes:any) => {
  @ObjectType()
  class Book extends Model<BookAttributes> implements BookAttributes {
    @Field()
    id!: number;
    @Field()
    title!: string;
    @Field()
    description!: string;
    @Field()
    quantity!: number;
    @Field()
    flag!: boolean;
    @Field()
    price!: number;
    @Field()
    currency!: string;
    @Field()
    genre!: string;
    @Field()
    tags!: string;
    @Field()
    author!: string;
    @Field()
    image!: string;
    @Field()
    userId!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, {foreignKey:'userId'})
      this.hasMany(models.Vote, {sourceKey:'id',foreignKey:'bookId',as:'ratings'})
    }
  };
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true,
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
    {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};