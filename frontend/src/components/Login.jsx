import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password,
            });
            navigate("/dashboard"); 
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero is-fullheight is-bold">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-black">Login</h3>
                        <p className="subtitle has-text-black">Please log in to proceed.</p>
                        <div className="box">
                            <form onSubmit={Auth}>
                                <p className="has-text-centered">{msg}</p>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="email" placeholder="Your Email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>

                                <button className="button is-block is-primary is-fullwidth">Login</button>
                            </form>
                            <p className="has-text-center my-2">Not Registered? <Link to={`/register`}>Sign Up</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login