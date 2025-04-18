import { useNavigate } from "react-router-dom";
import createimage from "./images/pen.png"
import createimage2 from "./images/explore.png"
import React, { useState, useEffect, useRef } from 'react';
import TextLoop from 'react-text-loop';

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
                color: '#000000',
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
export default function Header() {
    const navigate = useNavigate(); // Initialize navigation

    return (
        <>
            <div className="Headers" style={{ textAlign: "center" }}>
                <div>
                    <JumpingLetters text="Wanderlust Chronicles" />
                    <span className="Subheading">
                        <TextLoop
                            springConfig={{ stiffness: 180, damping: 8 }}
                            interval={2000}
                            adjustingSpeed={500}
                            mask={true}
                        >
                            <span>Chronicles</span>
                            <span>Adventure Awaits</span>
                            <span>Explore the Extraordinary</span>
                            <span>Wander Often, Wonder Always</span>
                            <span>Journey Beyond Limits</span>
                        </TextLoop>
                    </span>
                </div>

                <div className="Buttons">
                    <button className="Exploring" onClick={() => navigate("/app")}>
                        <img src={createimage2} className="Images" alt="Theimage" />Explore
                    </button>
                    <button className="Exploring" onClick={() => navigate("/app/create")}>
                        <img src={createimage} className="Images" alt="Theimage" />Create
                    </button>
                    <button className="Exploring" onClick={() => navigate("/app/signout")}>
                        Sign Out
                    </button>
                </div>
            </div>

        </ >
    );
}