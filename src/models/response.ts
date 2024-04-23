import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const responseModel = (sequelize: Sequelize) => {
    return sequelize.define('Response', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Description is a required field"},
                notNull: { msg: "Description is a required field" },
                len: {
                    args: [0, 4000],
                    msg: "Title must be less than 4000 characters"
                }
            }
        },
    });
};

export const Response = responseModel(sequelize);

Response.belongsTo(Response, {
    foreignKey: 'parentResponseId'
});