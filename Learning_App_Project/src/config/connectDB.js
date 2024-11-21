const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('Learning_AppDB', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

module.exports = connectDB;
