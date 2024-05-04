import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const OfferModel = (sequelize: Sequelize) => {
    return sequelize.define('Offer', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        annonceId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        situationId:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        userId:{
          type: DataTypes.UUID,
          allowNull: false,
        },
        dateStart:{
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Date start is required"},
                notNull: { msg: "Date start is required"},
            }
        },
        dateEnd:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        timeStart:{
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Time start is required"},
                notNull: { msg: "Time start is required"},
            }
        },
        timeEnd:{
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