import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Employe } from './employe';


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
        planification: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Date time is required" },
                notNull: { msg: "Date time is required" }
            }
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Start time is required" },
                notNull: { msg: "Start time is required" }
            }
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "End time is required" },
                notNull: { msg: "End time is required" },
            }
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

export const Meeting = MeetingModel(sequelize);