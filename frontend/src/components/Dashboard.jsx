import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [userId, setId] = useState('');
    const [location, setLocation] = useState(null);
    const [device, setDevice] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [msg, setMsg] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:5000';

    const axiosJWT = axios.create();

    // Intercept requests to refresh the token if necessary
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            try {
                const response = await axios.get(`${API_BASE_URL}/token`);
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwtDecode(response.data.accessToken);
                setName(decoded.name);
                setId(decoded.userId);
                setExpire(decoded.exp);
            } catch (error) {
                console.error('Error refreshing token:', error);
                navigate('/');
            }
        }
        return config;
    }, (error) => Promise.reject(error));


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`${latitude},${longitude}`);
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/token`);
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setId(decoded.userId);
            setExpire(decoded.exp);
        } catch (error) {
            console.error('Error fetching token:', error);
            if (error.response) {
                navigate('/');
            }
        }
    };


    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/attendance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAttendance(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckInOrOut = async (checkType) => {
        try {
            setLoading(true);
            const formattedDate = moment().toISOString();
            const requestData = {
                userId: userId,
                date: formattedDate,
                checkIn: checkType === 'checkIn' ? moment().format('HH:mm:ss') : '',
                checkOut: checkType === 'checkOut' ? moment().format('HH:mm:ss') : '',
                location: location,
                device: device
            };

            const response = await axios.post(`${API_BASE_URL}/post-attendance`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchAttendance();
            setMsg(response.data.msg);
        } catch (error) {
            console.error(`Error during ${checkType}:`, error);
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshToken();
        setDevice(navigator.platform);
        getLocation();
        fetchAttendance();

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const isAfterNoon = currentTime.getHours() >= 12;

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="title">Welcome {name}</h1>
                <p>{msg}</p>
                <div className="is-flex">
                    {!isAfterNoon && (
                        <button className="button is-warning" onClick={() => handleCheckInOrOut('checkIn')}>Check-In</button>
                    )}
                    {isAfterNoon && (
                        <button className="button is-success ml-2" onClick={() => handleCheckInOrOut('checkOut')}>Check-Out</button>
                    )}
                </div>

                {loading && <p>Loading attendance data...</p>}

                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Location</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((att, index) => (
                            <tr key={att.id}>
                                <td>{index + 1}</td>
                                <td>{att.user.name}</td>
                                <td>{att.user.email}</td>
                                <td>{att.checkIn}</td>
                                <td>{att.checkOut}</td>
                                <td>{att.location}</td>
                                <td>{att.device}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
