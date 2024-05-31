import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const CompanyModel = (sequelize: Sequelize) => {
    return sequelize.define('Companie', {
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
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "The company name is required" },
                notNull: { msg: "The company name is required" },
                len: {
                    args: [1, 128], // Minimum and maximum length
                    msg: "The company name must be less than 128 characters"
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        siret_number:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Your SIRET number is required" },
                notNull: { msg: "Your SIRET number is required" },
                len: {
                    args: [14,14], // Minimum and maximum length
                    msg: "Your SIRET number must be 14 characters long"
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
            defaultValue:"ban"   // all companies start as ban then the admin (iOS side will validate them)
        },
    });
};

export const Company = CompanyModel(sequelize);