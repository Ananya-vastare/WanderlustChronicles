import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import TextLoop from 'react-text-loop';
import axios from "axios";
// JumpingLetters component
const JumpingLetters = ({ text }) => {
    const containerRef = useRef();

    useEffect(() => {
        const letters = containerRef.current.children;
        let index = 0;

        const animate = () => {
            for (let i = 0; i < letters.length; i++) {
                letters[i].style.transform = 'translateY(0)';
            }
            letters[index].style.transform = 'translateY(-10px)';
            index = (index + 1) % letters.length;
            setTimeout(animate, 100);
        };

        animate();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#FFFFFF',
                gap: '1.9px',
                justifyContent: 'center',
                marginBottom: '10px',
            }}
        >
            {text.split('').map((char, i) => (
                <span key={i} style={{ transition: 'transform 0.2s' }}>
                    {char}
                </span>
            ))}
        </div>
    );
};

// LoginPage component
export default function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Redirect to /app if already logged in
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
            navigate("/app");
        }
    }, [navigate]);

    const checkvalidity = async (e) => {
        e.preventDefault();

        console.log("Sending login request:", name, password);

        try {
            const response = await axios.post("http://localhost:5000/login", {
                name: name, // ensure match with backend
                password: password,
            });

            console.log("Server response:", response.data);

            if (response.data.message === "Details are valid") {
                localStorage.setItem("isLoggedIn", "true");
                onLogin(); // custom function from parent
                navigate("/app"); // redirect to app route
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server error. Please try again later.");
            }
            console.error("Axios error:", error);
        }
    };

    return (
        <main>
            <JumpingLetters text="Wanderlust  Chronicles" />
            <p style={{ textAlign: "center" }}>
                <TextLoop>
                    <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Adventure Awaits</span>
                    <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Explore the Extraordinary</span>
                    <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Wander Often, Wonder Always</span>
                    <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Journey Beyond Limits</span>
                    <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Discover the World, One Destination at a Time</span>
                </TextLoop>
            </p>

            <div className="logincontainer">

                <div className="login-box">

                    <form onSubmit={checkvalidity} className='LoginCredentials'>
                        <h2>Login box</h2>
                        <input
                            className='Inputtype'
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            className='Inputtype'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <button type="submit">Login</button>
                        <br />
                        <p>Do not have an account sign up</p>
                        <button type="button" onClick={() => navigate("/SignUp")}>Sign Up</button>
                    </form>

                    <img
                        className="Collage"
                        src="https://i.pinimg.com/736x/57/8e/12/578e12b981531180ca8a6c2f2a6feb66.jpg"
                        alt="The collage"
                    />
                </div>
            </div>
        </main>
    );
}
