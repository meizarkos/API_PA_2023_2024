import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const InviteModel = (sequelize: Sequelize) => {
    return sequelize.define('Invite', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        reunionId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        inviteId:{
            type: DataTypes.UUID,
            allowNull: false,
        }
    });
};

export const Invite = InviteModel(sequelize);