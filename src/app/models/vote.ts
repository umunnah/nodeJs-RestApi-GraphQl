'use strict';

import  {Model} from "sequelize";


interface VoteAttributes {
  id: number;
  userId: string;
  bookId: number;
  value: number;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Vote extends Model<VoteAttributes> implements VoteAttributes{
    id!: number;
    userId!: string;
    bookId!: number;
    value!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, {foreignKey:'userId'})
      this.belongsTo(models.Book, {foreignKey:'bookId'})
    }
  };
  Vote.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true,
    },
    value: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};