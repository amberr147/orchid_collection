// Orhids.jsx (replace your current file)
import { useContext, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrchids } from '../features/orchids/orchidsSlice';
import './Orchids.css';
import { ThemeContext } from './ThemeContext';

export default function Orchids({ onViewDetail }) {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const orchids = useSelector(state => state.orchids.items);
    const status = useSelector(state => state.orchids.status);

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (status === 'idle' || status === 'failed') {
            dispatch(fetchOrchids());
        }
    }, [status, dispatch]);

    // Extract categories from data
    const categories = useMemo(() => {
        const setCat = new Set();
        orchids.forEach(o => o.category && setCat.add(o.category));
        return ['', ...Array.from(setCat)];
    }, [orchids]);

    const filtered = useMemo(() => {
        return orchids.filter(o =>
            o.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
            && (category ? o.category === category : true)
        );
    }, [orchids, searchTerm, category]);

    if (status === 'loading' || status === 'idle') {
        return (
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-3" style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            minHeight: '100vh',
            transition: 'all 0.3s ease'
        }}>
            <div className="text-center mb-4 mt-2">
                <h1 className="display-4 fw-bold mb-3" style={{ color: theme.headerColor }}>🌺 Orchid Collection 🌺</h1>

                {/* Search + Filter */}
                <div className="d-flex justify-content-center gap-2 mb-3" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <input
                        className="form-control"
                        placeholder="Search orchid by name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ maxWidth: 420 }}
                    />
                    <select className="form-select" value={category} onChange={e => setCategory(e.target.value)} style={{ maxWidth: 220 }}>
                        <option value="">All categories</option>
                        {categories.filter(c => c).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button className="btn btn-outline-secondary" onClick={() => { setSearchTerm(''); setCategory(''); }}>
                        Reset
                    </button>
                </div>
            </div>

            <div className='orchids-grid' style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                {filtered.map((orchid) => (
                    <div className="orchid-card" key={orchid.id} style={{
                        backgroundColor: theme.cardBackground,
                        color: theme.cardText,
                        boxShadow: `0 4px 12px ${theme.shadowColor}`,
                        position: 'relative',
                        height: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        overflow: 'hidden'
                    }}>
                        <img src={orchid.image} alt={orchid.name} className='orchid-image' onClick={() => onViewDetail(orchid)} />
                        <div className="orchid-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <h3 style={{ color: theme.headerColor }}>{orchid.name}</h3>
                            <p style={{ color: theme.cardText }}><strong>Origin:</strong> {orchid.origin}</p>
                            <p style={{ color: theme.cardText }}><strong>Category:</strong> {orchid.category}</p>
                            <div style={{ display: 'flex', gap: '8px', margin: '10px 0 18px 0' }}>
                                {orchid.isSpecial && <span style={{ /* same style as before */ }}>🌸 Special</span>}
                                {orchid.isNatural && <span style={{ /* same style as before */ }}>🌿 Natural</span>}
                            </div>
                            <div style={{ position: 'absolute', right: '16px', bottom: '16px' }}>
                                <button className='detail-btn' onClick={() => onViewDetail(orchid)} style={{
                                    backgroundColor: theme.headerColor,
                                    color: theme.backgroundColor,
                                    border: 'none',
                                    padding: '5px 14px',
                                    borderRadius: '8px',
                                    fontSize: '0.92em',
                                    fontWeight: 600,
                                }}>
                                    DETAIL
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
