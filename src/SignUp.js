import "./SignUp.css";
import React, { useRef, useEffect, useState } from "react";
import TextLoop from "react-text-loop";
import { useNavigate } from "react-router-dom";

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

export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                    dateofbirth: dateOfBirth
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Signup successful!");
                navigate("/login");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Error connecting to server");
        }
    };

    return (
        <>
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

            <div className="logincontainer1">
                <div className="login-box1">
                    <form className="LoginCredentials1" onSubmit={handleSubmit}>
                        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Sign Up</p>

                        <input
                            className="Inputtype"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        /><br />

                        <input
                            className="Inputtype"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /><br />

                        <input
                            className="Inputtype"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        /><br />

                        <input
                            className="Inputtype"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        /><br />

                        <button type="submit">Register</button><br />
                        <button onClick={handleGoBack}>Go Back to Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
