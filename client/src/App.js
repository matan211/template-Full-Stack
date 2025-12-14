import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarsPage from './pages/CarsPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Future routes*/}
                <Route path="/cars" element={<CarsPage />} />
            </Routes>
        </Router>
    );
}

export default App;