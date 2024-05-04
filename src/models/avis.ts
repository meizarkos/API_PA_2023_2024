import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const AvisModel = (sequelize: Sequelize) => {
    return sequelize.define('Avis', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        annonceId:{
          type: DataTypes.UUID,
          allowNull: false,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "It cannot be empty" },
                notNull: { msg: "It cannot be empty" },
                len: {
                  args: [0, 1000],
                  msg: "It must be less than 1000 characters"
              },
            }
        },
        note:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "You have to give a note" },
                notNull: { msg: "You have to give a note" },
                min: {
                  args: [0],
                  msg: "It must be greater than 0"
              },
              max: {
                args: [5],
                msg: "It must be less than 6"
              },
            }
        }
    });
};

export const Avis = AvisModel(sequelize);