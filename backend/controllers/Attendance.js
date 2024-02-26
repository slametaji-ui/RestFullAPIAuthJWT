import Users from "../models/UserModel.js";
import Attendance from "../models/AttendanceModel.js";

export const getAttendance = async (req, res) => {
    try {
        const attendanceData = await Attendance.findAll({
            attributes: ['id','date', 'checkIn', 'checkOut','location','device'],
            include: [{
                model: Users,
                attributes: ['name', 'email'],
            }]
        });
        res.json(attendanceData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyAttendance = (attendanceData) => {
    if (attendanceData && attendanceData.checkOut !== '00:00:00') {
        return true; 
    } else {
        return false;
    }
};

export const getAttendanceByUserIdAndDate = async (req, res) => {
    const userId = req.query.userId;
    const date = req.query.date;

    try {
        const attendanceData = await Attendance.find({
            attributes: ['date', 'checkIn', 'checkOut', 'location', 'device'],
            where: {
                userId: userId,
                date: date,
            },
        });

        const isAttendanceVerified = verifyAttendance(attendanceData);

        res.json({ attendanceData, isAttendanceVerified });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const postAttendance = async (req, res) => {
    const {userId, date, checkIn, checkOut,location,device } = req.body;
    try {
        await Attendance.create({
            userId: userId,
            date: date,
            checkIn:checkIn,
            checkOut:checkOut,
            location:location,
            device:device,
        });
        res.json({msg: "Presensi Berhasil"});
    } catch (error) {
        console.log(error);
    }
}