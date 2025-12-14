import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarsPage from './pages/CarsPage';
import GraphPage from './pages/GraphPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Future routes*/}
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/graph" element={<GraphPage />} />
            </Routes>
        </Router>
    );
}

export default App;