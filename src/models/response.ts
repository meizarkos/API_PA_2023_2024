import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const responseModel = (sequelize: Sequelize) => {
    return sequelize.define('response', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Description is a required field"},
                notNull: { msg: "Description is a required field" },
                len: {
                    args: [0, 4000],
                    msg: "Title must be less than 4000 characters"
                }
            }
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 40],
                    msg: "Status must be less than 40 characters"
                }
            },
            defaultValue : "user",
        },
        creator_id:{
            type: DataTypes.UUID,
            allowNull : false
        },
        ticket_id:{
            type: DataTypes.UUID,
            allowNull : false
        }
    });
};

export const Response = responseModel(sequelize);