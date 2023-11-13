'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Loans extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Loans.init({
        loan_day: DataTypes.DATE,
        return_day: DataTypes.DATE,
        due_day: DataTypes.DATE,
        book_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Loans',
    });
    return Loans;
};