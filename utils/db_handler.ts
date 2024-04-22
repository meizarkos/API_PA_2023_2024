import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize('promocare','root','', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
})


export const startOfDatabase = async () => {
  sequelize
      .sync({})
      .then(() => {
          console.log('Database and tables have been synchronized');
      })
      .catch((err) => {
          console.error('An error occurred while synchronizing the database:', err);
      });
};