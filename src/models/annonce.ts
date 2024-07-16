import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const AnnonceModel = (sequelize: Sequelize) => {
    return sequelize.define('Annonce', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        company_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "A title is required" },
                notNull: { msg: "A title is required" },
                len: {
                  args: [0, 100],
                  msg: "Title must be less than 100 characters"
              },
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "A description is required" },
                notNull: { msg: "A description is required" },
                len: {
                  args: [0, 2500],
                  msg: "Description must be less than 2500 characters"
              },
            }
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "A type is required" },
                notNull: { msg: "A type is required" },
                len: {
                  args: [0, 100],
                  msg: "Type must be less than 100 characters"
              },
            }
        },
        location:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                  args: [0, 500],
                  msg: "Location must be less than 500 characters"
              },
            }
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "A price is required" },
                notNull: { msg: "A price is required" },
                min: {
                  args: [0],
                  msg: "Price must be greater than 0"
              },
            }
        },
        promo:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "You cannot post an announce without a promotion" },
                notNull: { msg: "You cannot post an announce without a promotion" },
                min: {
                  args: [0],
                  msg: "Promo must be greater than 0"
                },
                max: {
                  args: [100],
                  msg: "Promo must be less than 100"
                } 
            }
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "ok",
        },
        view_time:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });
};

export const Annonce = AnnonceModel(sequelize);