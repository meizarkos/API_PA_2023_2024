import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const OfferModel = (sequelize: Sequelize) => {
    return sequelize.define('offer', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        annonce_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        situation_id:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        user_id:{
          type: DataTypes.UUID,
          allowNull: false,
        },
        date_start:{
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Date start is required"},
                notNull: { msg: "Date start is required"},
            }
        },
        date_end:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        time_start:{
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Time start is required"},
                notNull: { msg: "Time start is required"},
            }
        },
        time_end:{
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
              notEmpty: { msg: "Time end is required"},
              notNull: { msg: "Time end is required"},
            }
        },
        frequency:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Price is required"},
                notNull: { msg: "Price is required"},
            }
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
        },
    });
};

export const Offer = OfferModel(sequelize);