import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassoword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
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
                        <h3 className="title has-text-black">Sign Up</h3>
                        <p className="subtitle has-text-black">Join with us.</p>
                        <div className="box">
                            <form onSubmit={Register}>
                                <p className="has-text-centered m-2">{msg}</p>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Your Fullname" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="password" placeholder="Confirm Your Password" value={confPassword} onChange={(e) => setConfPassoword(e.target.value)} />
                                    </div>
                                </div>

                                <button className="button is-block is-primary is-fullwidth">Login</button>
                            </form>
                            <p className="has-text-center my-2">Have an account? <Link to={`/`}>Sign In</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register