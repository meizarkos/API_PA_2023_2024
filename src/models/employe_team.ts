import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Employe } from './employe';
import { Team } from './team';

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

EmployeTeam.belongsTo(Employe, { foreignKey: 'employe_id' });
Employe.hasMany(EmployeTeam, { foreignKey: 'employe_id' });
EmployeTeam.belongsTo(Team, { foreignKey: 'team_id' });
Team.hasMany(EmployeTeam, { foreignKey: 'team_id' });
