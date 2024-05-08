import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const TeamEmployeModel = (sequelize: Sequelize) => {
    return sequelize.define('EmployeTeam', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        team_id: {
            type: DataTypes.UUID,
            allowNull:false
        },
        employe_id: {
            type: DataTypes.UUID,
            allowNull:false
        }
    });
};

export const EmployeTeam = TeamEmployeModel(sequelize);