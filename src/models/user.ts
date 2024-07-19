import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Ticket } from './ticket';

export const UserModel = (sequelize: Sequelize) => {
    return sequelize.define('user', {
        //User donne users in db
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'unique_email_constraint',
                msg: 'This email adress is already use'
            },
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Email is a required field"},
                notNull: { msg: "Email is a required field" },
                len: {
                    args: [0, 128], // Minimum and maximum length
                    msg: "Email must be less than 128characters"
                },
                isEmail: { msg: "Please use a valid email format" }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Password is required" },
                notNull: { msg: "Password is required" }
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "First name is required" },
                notNull: { msg: "First name is required" },
                len: {
                    args: [1, 128], // Minimum and maximum length
                    msg: "First name must be less than 128 characters"
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Last name is required" },
                notNull: { msg: "Last name is required" },
                len: {
                    args: [1, 128], // Minimum and maximum length
                    msg: "Last name must be less than 128 characters"
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"user"
        },
    });
};

export const User = UserModel(sequelize);