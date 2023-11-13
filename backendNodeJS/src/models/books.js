'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Books extends Model {
        static associate(models) {
            // define association here
        }
    };
    Books.init({
        title: DataTypes.STRING,
        publication_date: DataTypes.DATE,
        copies_owner: DataTypes.INTEGER,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
        author_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Books',
    });
    return Books;
};