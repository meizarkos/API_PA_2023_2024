import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const InviteModel = (sequelize: Sequelize) => {
    return sequelize.define('invite', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        reunion_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        invite_id:{
            type: DataTypes.UUID,
            allowNull: false,
        }
    });
};

export const Invite = InviteModel(sequelize);