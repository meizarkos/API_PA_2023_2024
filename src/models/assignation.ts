import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const AssignationModel = (sequelize: Sequelize) => {
    return sequelize.define('Assignation', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        idCible: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        idTicket: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
};

export const Assignation = AssignationModel(sequelize);