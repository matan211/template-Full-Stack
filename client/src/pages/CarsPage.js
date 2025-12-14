import React, { useEffect, useState } from 'react';
// axios is a library for making HTTP requests
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cars';

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filters, setFilters] = useState({
        Car_name: '',
        Price_min: '',
        Price_max: '',
        Range_min: '',
        Range_max: '',
        Top_speed_min: '',
        Top_speed_max: '',
        Efficiency_min: '',
        Efficiency_max: ''
    });
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
        // ...form is the rest of the form data
        // [e.target.name] is the name of the input field
        // e.target.value is the value of the input field
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const clearFilters = () => {
        setFilters({
            Car_name: '',
            Price_min: '',
            Price_max: '',
            Range_min: '',
            Range_max: '',
            Top_speed_min: '',
            Top_speed_max: '',
            Efficiency_min: '',
            Efficiency_max: ''
        });
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

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Sort the cars based on the sortConfig
    const sortedCars = [...cars].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle numeric values
        if (sortConfig.key !== 'Car_name') {
            const aNum = parseFloat(aValue) || 0;
            const bNum = parseFloat(bValue) || 0;
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // Handle string values (Car_name)
        const aStr = String(aValue || '').toLowerCase();
        const bStr = String(bValue || '').toLowerCase();
        if (sortConfig.direction === 'asc') {
            return aStr.localeCompare(bStr);
        } else {
            return bStr.localeCompare(aStr);
        }
    });

    // Filter the sorted cars based on filter criteria
    const filteredCars = sortedCars.filter(car => {
        // Filter by car name (case-insensitive partial match)
        if (filters.Car_name && !car.Car_name?.toLowerCase().includes(filters.Car_name.toLowerCase())) {
            return false;
        }

        // Filter by price range
        const price = parseFloat(car.Price) || 0;
        if (filters.Price_min && price < parseFloat(filters.Price_min)) return false;
        if (filters.Price_max && price > parseFloat(filters.Price_max)) return false;

        // Filter by range
        const range = parseFloat(car.Range) || 0;
        if (filters.Range_min && range < parseFloat(filters.Range_min)) return false;
        if (filters.Range_max && range > parseFloat(filters.Range_max)) return false;

        // Filter by top speed
        const topSpeed = parseFloat(car.Top_speed) || 0;
        if (filters.Top_speed_min && topSpeed < parseFloat(filters.Top_speed_min)) return false;
        if (filters.Top_speed_max && topSpeed > parseFloat(filters.Top_speed_max)) return false;

        // Filter by efficiency
        const efficiency = parseFloat(car.Efficiency) || 0;
        if (filters.Efficiency_min && efficiency < parseFloat(filters.Efficiency_min)) return false;
        if (filters.Efficiency_max && efficiency > parseFloat(filters.Efficiency_max)) return false;

        return true;
    });

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
                    {/* If we are editing a car, show the cancel button */}
                    {editingId && (
                        <button type="button" onClick={handleCancel} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Filter Section */}
            <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ marginTop: 0 }}>Filter Cars</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                    <input 
                        name="Car_name" 
                        placeholder="Filter by Car Name" 
                        value={filters.Car_name} 
                        onChange={handleFilterChange}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <input 
                            name="Price_min" 
                            type="number" 
                            placeholder="Min Price" 
                            value={filters.Price_min} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                        <span>-</span>
                        <input 
                            name="Price_max" 
                            type="number" 
                            placeholder="Max Price" 
                            value={filters.Price_max} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <input 
                            name="Range_min" 
                            type="number" 
                            placeholder="Min Range" 
                            value={filters.Range_min} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                        <span>-</span>
                        <input 
                            name="Range_max" 
                            type="number" 
                            placeholder="Max Range"
                            // Assign the value of the input field to the filters.Range_max
                            value={filters.Range_max} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <input 
                            name="Top_speed_min" 
                            type="number" 
                            placeholder="Min Top Speed" 
                            value={filters.Top_speed_min} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                        <span>-</span>
                        <input 
                            name="Top_speed_max" 
                            type="number" 
                            placeholder="Max Top Speed" 
                            value={filters.Top_speed_max} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <input 
                            name="Efficiency_min" 
                            type="number" 
                            placeholder="Min Efficiency" 
                            value={filters.Efficiency_min} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                        <span>-</span>
                        <input 
                            name="Efficiency_max" 
                            type="number" 
                            placeholder="Max Efficiency" 
                            value={filters.Efficiency_max} 
                            onChange={handleFilterChange}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                        />
                    </div>
                </div>
                <button 
                    onClick={clearFilters} 
                    style={{ 
                        background: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        cursor: 'pointer', 
                        borderRadius: '4px' 
                    }}
                >
                    Clear Filters
                </button>
                <span style={{ marginLeft: '15px', color: '#666' }}>
                    Showing {filteredCars.length} of {cars.length} cars
                </span>
            </div>

            {/* Table */}
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: '#007bff', color: 'white' }}>
                        <th 
                            onClick={() => handleSort('Car_name')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            Name {sortConfig.key === 'Car_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th 
                            onClick={() => handleSort('Efficiency')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            Eff. {sortConfig.key === 'Efficiency' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th 
                            onClick={() => handleSort('Fast_charge')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            F. Charge {sortConfig.key === 'Fast_charge' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th 
                            onClick={() => handleSort('Price')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            Price {sortConfig.key === 'Price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th 
                            onClick={() => handleSort('Range')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            Range {sortConfig.key === 'Range' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th 
                            onClick={() => handleSort('Top_speed')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            Top Speed {sortConfig.key === 'Top_speed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th 
                            onClick={() => handleSort('Acceleration')} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            Accel. {sortConfig.key === 'Acceleration' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCars.map(car => (
                        // key is used to identify the row in case of id or _id
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