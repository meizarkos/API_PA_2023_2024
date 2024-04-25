import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const EmployeModel = (sequelize: Sequelize) => {
    return sequelize.define('Employe', {
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
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Your first name is required" },
                notNull: { msg: "Your first name is required" },
                len: {
                    args: [1, 128], // Minimum and maximum length
                    msg: "Your first must be less than 128 characters"
                }
            }
        },
        lastName: {
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
        RIB:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "The RIB is required" },
                notNull: { msg: "The RIB is required" },
                len: {
                    args: [14,34], // Minimum and maximum length
                    msg: "The RIB must be 14 characters long and less than 34"
                }
            }
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Your location is required" },
                notNull: { msg: "Your location is required" },
                len: {
                    args: [1,1000], // Minimum and maximum length
                    msg: "Your location is required and must be less than 1000 characters"
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"employe"   // all companies start as ban then the admin (iOS side will validate them)
        },
        ticketSolved:{
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue:0
        },
        numberOfDaysOff:{
            type:DataTypes.NUMBER,
            allowNull:false,
            defaultValue:0
        }
    });
};

export const Employe = EmployeModel(sequelize);