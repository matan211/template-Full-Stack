import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    LineChart,
    Line,
    Cell
} from 'recharts';

const API_URL = 'http://localhost:5000/api/cars';

const GraphPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopFastestCars();
    }, []);

    const fetchTopFastestCars = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/top-fastest`);
            setCars(res.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    // Color palette for bars
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#6c757d'];

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                <h1>Top 10 Fastest Cars (Efficiency &gt; 170)</h1>
                <p>Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                <h1>Top 10 Fastest Cars (Efficiency &gt; 170)</h1>
                <p style={{ color: 'red' }}>{error}</p>
                <button 
                    onClick={fetchTopFastestCars}
                    style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        marginTop: '10px'
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (cars.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                <h1>Top 10 Fastest Cars (Efficiency &gt; 170)</h1>
                <p>No cars found matching the criteria.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <h1 style={{ marginBottom: '30px', color: '#333' }}>
                Top 10 Fastest Cars (Efficiency &gt; 170)
            </h1>

            {/* Summary Cards */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '15px', 
                marginBottom: '30px' 
            }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Cars</h3>
                    <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
                        {cars.length}
                    </p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '14px' }}>Max Top Speed</h3>
                    <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
                        {Math.max(...cars.map(c => c.Top_speed || 0))} km/h
                    </p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '14px' }}>Avg Efficiency</h3>
                    <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
                        {Math.round(cars.reduce((sum, c) => sum + (c.Efficiency || 0), 0) / cars.length)}
                    </p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: 0, color: '#666', fontSize: '14px' }}>Avg Top Speed</h3>
                    <p style={{ margin: '10px 0 0 0', fontSize: '32px', fontWeight: 'bold', color: '#dc3545' }}>
                        {Math.round(cars.reduce((sum, c) => sum + (c.Top_speed || 0), 0) / cars.length)} km/h
                    </p>
                </div>
            </div>

            {/* Top Speed Bar Chart */}
            <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Top Speed Comparison</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={cars}>
                        {/* CartesianGrid is the grid that helps us to see the data better */}
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* XAxis is the axis that goes across the bottom of the chart */}
                        <XAxis 
                            dataKey="Car_name" 
                            // angle is the angle of the text on the x-axis
                            angle={-45}
                            // textAnchor is the position of the text on the x-axis
                            textAnchor="end"
                            // height is the height of the x-axis
                            height={100}
                            interval={0}
                        />
                        {/* YAxis is the axis that goes up the side of the chart */}
                        <YAxis label={{ value: 'Top Speed (km/h)', angle: -90, position: 'insideLeft' }} />
                        {/* Tooltip is the small box that appears when you hover over a data point */}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Top_speed" fill="#007bff" name="Top Speed (km/h)">
                            {cars.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Efficiency Bar Chart */}
            <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Efficiency Comparison</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={cars}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="Car_name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                        />
                        <YAxis label={{ value: 'Efficiency', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Efficiency" fill="#28a745" name="Efficiency">
                            {cars.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Top Speed vs Efficiency Scatter Chart */}
            <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Top Speed vs Efficiency</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            type="number" 
                            dataKey="Efficiency" 
                            name="Efficiency"
                            label={{ value: 'Efficiency', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="Top_speed" 
                            name="Top Speed"
                            label={{ value: 'Top Speed (km/h)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="Cars" data={cars} fill="#007bff">
                            {cars.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* Combined Line Chart */}
            <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Top Speed & Efficiency Trend</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={cars}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="Car_name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                        />
                        <YAxis yAxisId="left" label={{ value: 'Top Speed (km/h)', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="Top_speed" 
                            stroke="#007bff" 
                            strokeWidth={2}
                            name="Top Speed (km/h)"
                            dot={{ fill: '#007bff', r: 4 }}
                        />
                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="Efficiency" 
                            stroke="#28a745" 
                            strokeWidth={2}
                            name="Efficiency"
                            dot={{ fill: '#28a745', r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Data Table */}
            <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflowX: 'auto'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Detailed Data</h2>
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#007bff', color: 'white' }}>
                            <th style={{ padding: '10px' }}>Rank</th>
                            <th style={{ padding: '10px' }}>Car Name</th>
                            <th style={{ padding: '10px' }}>Top Speed (km/h)</th>
                            <th style={{ padding: '10px' }}>Efficiency</th>
                            <th style={{ padding: '10px' }}>Price</th>
                            <th style={{ padding: '10px' }}>Range</th>
                            <th style={{ padding: '10px' }}>Fast Charge</th>
                            <th style={{ padding: '10px' }}>Acceleration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, index) => (
                            <tr key={car.id || car._id || index}>
                                <td style={{ padding: '10px' }}>{index + 1}</td>
                                <td style={{ padding: '10px', fontWeight: 'bold' }}>{car.Car_name}</td>
                                <td style={{ padding: '10px' }}>{car.Top_speed}</td>
                                <td style={{ padding: '10px' }}>{car.Efficiency}</td>
                                <td style={{ padding: '10px' }}>{car.Price ? `$${car.Price.toLocaleString()}` : 'N/A'}</td>
                                <td style={{ padding: '10px' }}>{car.Range ? `${car.Range} km` : 'N/A'}</td>
                                <td style={{ padding: '10px' }}>{car.Fast_charge ? `${car.Fast_charge} km/h` : 'N/A'}</td>
                                <td style={{ padding: '10px' }}>{car.Acceleration ? `${car.Acceleration} s` : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GraphPage;

