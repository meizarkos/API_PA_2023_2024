import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Employe } from './employe';
import { Team } from './team';

export const TeamEmployeModel = (sequelize: Sequelize) => {
    return sequelize.define('employe_team', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        team_id: {
            type: DataTypes.UUID,
            allowNull:false,
            references: {
                model: Team,
                key: 'uuid'
            },
        },
        employe_id: {
            type: DataTypes.UUID,
            allowNull:false,
            references: { //pour faire la relation
                model: Employe,
                key: 'uuid'
            },
        }
    });
};

export const EmployeTeam = TeamEmployeModel(sequelize);

EmployeTeam.belongsTo(Employe, { foreignKey: 'employe_id' }); //pour les requete avec include
Employe.hasMany(EmployeTeam, { foreignKey: 'employe_id' });

EmployeTeam.belongsTo(Team, { foreignKey: 'team_id' });
Team.hasMany(EmployeTeam, { foreignKey: 'team_id' });
