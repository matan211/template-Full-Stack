import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cars';

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        Car_name: '', Efficiency: '', Fast_charge: '', Price: '', Range: '', Top_speed: '', Acceleration: ''
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await axios.get(API_URL);
            setCars(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update existing car
                await axios.put(`${API_URL}/${editingId}`, form);
                setEditingId(null);
            } else {
                // Add new car
                await axios.post(API_URL, form);
            }
            setForm({ Car_name: '', Efficiency: '', Fast_charge: '', Price: '', Range: '', Top_speed: '', Acceleration: '' });
            fetchCars();
        } catch (err) {
            alert(editingId ? 'Error updating car' : 'Error adding car');
        }
    };

    const handleEdit = (car) => {
        setForm({
            Car_name: car.Car_name || '',
            Efficiency: car.Efficiency || '',
            Fast_charge: car.Fast_charge || '',
            Price: car.Price || '',
            Range: car.Range || '',
            Top_speed: car.Top_speed || '',
            Acceleration: car.Acceleration || ''
        });
        setEditingId(car.id || car._id);
    };

    const handleCancel = () => {
        setForm({ Car_name: '', Efficiency: '', Fast_charge: '', Price: '', Range: '', Top_speed: '', Acceleration: '' });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCars();
        } catch (err) {
            alert('Error deleting car');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Electric Cars Manager</h1>

            {/* Form */}
            <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>{editingId ? 'Edit Car' : 'Add New Car'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    <input name="Car_name" placeholder="Car Name" value={form.Car_name} onChange={handleChange} required />
                    <input name="Efficiency" type="number" placeholder="Efficiency" value={form.Efficiency} onChange={handleChange} />
                    <input name="Fast_charge" type="number" placeholder="Fast Charge" value={form.Fast_charge} onChange={handleChange} />
                    <input name="Price" type="number" placeholder="Price" value={form.Price} onChange={handleChange} />
                    <input name="Range" type="number" placeholder="Range" value={form.Range} onChange={handleChange} />
                    <input name="Top_speed" type="number" placeholder="Top Speed" value={form.Top_speed} onChange={handleChange} />
                    <input name="Acceleration" type="number" placeholder="Acceleration" value={form.Acceleration} onChange={handleChange} />
                    <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                        {editingId ? 'Update Car' : 'Add Car'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancel} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Table */}
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: '#007bff', color: 'white' }}>
                        <th>Name</th>
                        <th>Eff.</th>
                        <th>F. Charge</th>
                        <th>Price</th>
                        <th>Range</th>
                        <th>Top Speed</th>
                        <th>Accel.</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id || car._id}>
                            <td>{car.Car_name}</td>
                            <td>{car.Efficiency}</td>
                            <td>{car.Fast_charge}</td>
                            <td>{car.Price}</td>
                            <td>{car.Range}</td>
                            <td>{car.Top_speed}</td>
                            <td>{car.Acceleration}</td>
                            <td style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => handleEdit(car)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(car.id || car._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarsPage;