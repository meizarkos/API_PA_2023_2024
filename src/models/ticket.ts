import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { User,Company } from './index';

export const ticketModel = (sequelize: Sequelize) => {
    return sequelize.define('Ticket', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Title is a required field"},
                notNull: { msg: "Title is a required field" },
                len: {
                    args: [0, 256], // Minimum and maximum length
                    msg: "Title must be less than 256 characters"
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Description is a required field"},
                notNull: { msg: "Description is a required field" },
                len: {
                    args: [0, 4000], // Minimum and maximum length
                    msg: "Title must be less than 4000 characters"
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0   // 0 = unsolved 1 = solved
        },
    });
};

export const Ticket = ticketModel(sequelize);