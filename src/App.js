// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MapComponent from './MapFeatures';
import Header from './Header';
import Create from './Create'; // ✅ Correct import path
import Footer from './footer';
import SignOut from './SignOut';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapComponent />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signout" element={<SignOut />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
