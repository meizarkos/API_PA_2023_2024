import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const TeamModel = (sequelize: Sequelize) => {
    return sequelize.define('Team', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Team name is required" },
                notNull: { msg: "Team name is required" },
                len: {
                    args: [1, 128], // Minimum and maximum length
                    msg: "Team name must be less than 128 characters"
                }
            }
        }
    });
};

export const Team = TeamModel(sequelize);