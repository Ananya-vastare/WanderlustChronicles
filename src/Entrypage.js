// Entrypage.js
import React, { useEffect, useRef } from "react"; // ✅ Import useEffect, useRef, and React
import { useNavigate } from "react-router-dom";
import TextLoop from "react-text-loop"; // ✅ Import TextLoop
import "./App.css";
import Carousel from "./Carousel"
// ✅ JumpingLetters component
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

// ✅ HomePage component
export default function HomePage({ onLogout }) {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <>
            <JumpingLetters text="Wanderlust  Chronicles" />
            {/* Button beside the text */}
            <button onClick={handleGoToLogin} style={{
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: "#ffcb77",
                border: "none",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                marginLeft: '1300px',
                marginTop: '-50px'
            }}>
                Go to Login
            </button>
            <div className="Heading">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px', // space between text and button
                        height: '0vh',
                        width: '100%',
                        flexWrap: 'wrap', // optional, allows wrapping on small screens
                    }}
                >
                    {/* Looping Text */}
                    <div className="Subheading" style={{ textAlign: 'center' }}>
                        <TextLoop>
                            <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Adventure Awaits</span>
                            <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Explore the Extraordinary</span>
                            <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Wander Often, Wonder Always</span>
                            <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Journey Beyond Limits</span>
                            <span style={{ color: "maroon", fontWeight: "bold", fontSize: "24px" }}>Discover the World, One Destination at a Time</span>
                        </TextLoop>
                    </div>
                </div>
            </div>


            <br />
            <Carousel />
            <br />
            <br />
            <h2 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#800000',
                fontFamily: "'Pacifico', cursive",
                fontSize: '24px',
                fontWeight: 'bold'
            }}>Eternal Riches</h2>
            <br />
            <div className="masonry">
                <div className="Cardtemplates">
                    <img className="img1" src="https://i.pinimg.com/736x/36/d8/74/36d874809e17991213e45b57645f91fd.jpg" alt="Image 1" />
                </div>
                <div className="Cardtemplates">
                    <img className="img2" src="https://i.pinimg.com/736x/b2/a9/32/b2a932c50ab1fb02e1d7b11445abf0ab.jpg" alt="Image 2" />
                </div>
                <div className="Cardtemplates">
                    <img className="img2" src="https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/06/Mehrangarh-Fort-Jodhpur-Rajasthan.jpg" alt="Image 2" />
                </div>
                <div className="Cardtemplates">
                    <img className="" src="https://i.pinimg.com/736x/4d/d7/48/4dd7480cdbb5bbcd4ffc9f888e549e86.jpg" alt="Image 3" />
                </div>
                <div className="Cardtemplates">
                    <iframe src="https://assets.pinterest.com/ext/embed.html?id=3377768466474093" height="600" width="345" frameborder="0" scrolling="no" ></iframe>
                </div>
                <div className="Cardtemplates">
                    <iframe src="https://assets.pinterest.com/ext/embed.html?id=88946161386395977" height="600" width="345" frameborder="0" scrolling="no" ></iframe>
                </div>
                <div className="Cardtemplates">
                    <img className="img3" src="https://i.pinimg.com/736x/9c/ec/e3/9cece37e0eee13ed5512aed4c4e5878a.jpg" alt="Image 3" />
                </div>
            </div>


        </>
    );
}
