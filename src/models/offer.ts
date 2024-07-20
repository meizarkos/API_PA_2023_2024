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
        user_id:{
          type: DataTypes.UUID,
          allowNull: false,
        },
        text:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
        },
    });
};

export const Offer = OfferModel(sequelize);