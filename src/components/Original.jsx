import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrchids } from '../features/orchids/orchidsSlice';

export default function Original({ onViewDetail }) {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const orchids = useSelector(state => state.orchids.items);
    const status = useSelector(state => state.orchids.status);
    const naturalOrchids = orchids.filter(orchid => orchid.isNatural === true);

    useEffect(() => {
        if (status === 'idle' || status === 'failed') {
            dispatch(fetchOrchids());
        }
    }, [status, dispatch]);

    if (status === 'loading' || status === 'idle') {
        return (
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!naturalOrchids.length) {
        return (
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
                <h2>No natural orchids found!</h2>
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
            {/* Header Section */}
            <div className="text-center mb-5 mt-4">
                <h1 className="display-4 fw-bold mb-4"
                    style={{
                        color: theme.headerColor,
                        letterSpacing: '2px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}>
                    🌺 Natural Orchids 🌺
                </h1>
            </div>

            <div className='orchids-grid' style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                {naturalOrchids.map((orchid) => (
                    <div className="orchid-card" key={orchid.id}
                        style={{
                            backgroundColor: theme.cardBackground,
                            color: theme.cardText,
                            boxShadow: `0 4px 12px ${theme.shadowColor}`
                        }}>
                        <img src={orchid.image} alt={orchid.name} className='orchid-image' onClick={() => onViewDetail(orchid)} />
                        <div className="orchid-info">
                            <h3 style={{ color: theme.headerColor }}>{orchid.name}</h3>
                            <p style={{ color: theme.cardText }}><strong style={{ color: theme.cardText }}>Origin:</strong> {orchid.origin}</p>
                            <p style={{ color: theme.cardText }}><strong style={{ color: theme.cardText }}>Category:</strong> {orchid.category}</p>
                            <p style={{ color: theme.cardText }}><strong style={{ color: theme.cardText }}>Natural:</strong> {orchid.isNatural ? 'Yes' : 'No'}</p>
                            <p style={{ color: theme.cardText }}><strong style={{ color: theme.cardText }}>Like:</strong> {orchid.numberOfLike}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: theme.cardText }}>
                                <button className='detail-btn' onClick={() => onViewDetail(orchid)}
                                    style={{
                                        backgroundColor: theme.headerColor,
                                        color: theme.backgroundColor,
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '5px'
                                    }}>
                                    Detail
                                </button>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>

    )
}
