import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const InvoiceModel = (sequelize: Sequelize) => {
    return sequelize.define('Invoice', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        propositionId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        pricePayed:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        priceStillToPay:{
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        frequency:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};

export const Invoice = InvoiceModel(sequelize);