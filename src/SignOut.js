import React from "react";

export default function SignOut() {
    return (
        <>
            <br />
            <br />
            <div
                className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-orange-300/30 backdrop-blur-sm"></div>

                {/* Sign Out Card */}
                <div className="relative z-10 bg-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full text-center text-black animate-fadeIn border border-white/20 mt-10">
                    <div className="text-6xl mb-4 animate-wave">👋</div>
                    <h1 className="text-4xl font-extrabold mb-3 drop-shadow-md">Safe Travels!</h1>
                    <p className="text-lg mb-6 opacity-90 drop-shadow-sm">
                        You’ve signed out. We hope your journey continues with joy.
                    </p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition"
                    >
                        ⬅ Back to Home
                    </a>
                </div>

                {/* Custom animations */}
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 1.2s ease-out;
                    }
                    @keyframes wave {
                        0%, 60%, 100% { transform: rotate(0deg); }
                        10% { transform: rotate(14deg); }
                        20% { transform: rotate(-8deg); }
                        30% { transform: rotate(14deg); }
                        40% { transform: rotate(-4deg); }
                        50% { transform: rotate(10deg); }
                    }
                    .animate-wave {
                        display: inline-block;
                        animation: wave 2s infinite;
                    }
                `}</style>
            </div>
        </>
    );
}
