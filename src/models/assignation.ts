import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const AssignationModel = (sequelize: Sequelize) => {
    return sequelize.define('assignation', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        id_cible: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_ticket: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
};

export const Assignation = AssignationModel(sequelize);