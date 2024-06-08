import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Employe } from './employe';

export const LeaveModel = (sequelize: Sequelize) => {
    return sequelize.define('Leave', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        id_employe: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Employe,
                key: 'uuid'
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Start time is required" },
                notNull: { msg: "Start time is required" }
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                //validateur  => valide que ce n'est pas vide
                notEmpty: { msg: "End time is required" },
                notNull: { msg: "End time is required" },
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
    });
};

export const Leave = LeaveModel(sequelize);


Leave.belongsTo(Employe, { foreignKey: 'id_employe'});
Employe.hasMany(Leave, { foreignKey: 'id_employe'});