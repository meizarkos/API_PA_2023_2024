import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const InvoiceModel = (sequelize: Sequelize) => {
    return sequelize.define('Invoice', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        proposition_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        price_payed:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price_still_to_pay:{
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