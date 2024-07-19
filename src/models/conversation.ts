import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const ConversationModel = (sequelize: Sequelize) => {
    return sequelize.define('conversation', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        first_conv_id:{ //to find the first conversation and the following one
            type: DataTypes.UUID,
            allowNull: true,
        },
        sender_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        target_id:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        annonce_id:{
          type: DataTypes.UUID,
          allowNull: false,
        },
        message:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "It cannot be empty" },
                notNull: { msg: "It cannot be empty" },
                len: {
                  args: [0, 1000],
                  msg: "It must be less than 1000 characters"
              },
            }
        },
        isFirst:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
};

export const Conversation = ConversationModel(sequelize);