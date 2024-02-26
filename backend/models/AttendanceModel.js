import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Attendance = db.define('attendance', {
    userId: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    },
    checkIn: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    checkOut: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    device: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

export default Attendance;

Attendance.belongsTo(Users, { foreignKey: 'userId' });