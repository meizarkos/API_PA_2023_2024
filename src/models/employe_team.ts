import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const TeamEmployeModel = (sequelize: Sequelize) => {
    return sequelize.define('Team', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        teamId: {
            type: DataTypes.UUID,
            allowNull:false
        },
        employeId: {
            type: DataTypes.UUID,
            allowNull:false
        }
    });
};

export const TeamEmploye = TeamEmployeModel(sequelize);