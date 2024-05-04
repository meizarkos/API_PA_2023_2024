import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const SituationModel = (sequelize: Sequelize) => {
    return sequelize.define('Situation', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        idUser: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        situation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "It cannot be empty" },
                notNull: { msg: "It cannot be empty" },
                len: {
                  args: [0, 10000],
                  msg: "It must be less than 10000 characters"
              },
            }
        },
    });
};

export const Situation = SituationModel(sequelize);