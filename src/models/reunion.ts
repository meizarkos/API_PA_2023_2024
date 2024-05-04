import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const MeetingModel = (sequelize: Sequelize) => {
    return sequelize.define('Meeting', {
        //User donne users in db
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "Location is a required field"},
                notNull: { msg: "Location is a required field" },
                len: {
                    args: [0, 128], // Minimum and maximum length
                    msg: "Location must be less than 128characters"
                },
            }
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Start time is required" },
                notNull: { msg: "Start time is required" }
            }
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "End time is required" },
                notNull: { msg: "End time is required" },
            }
        }
    });
};

export const Meeting = MeetingModel(sequelize);