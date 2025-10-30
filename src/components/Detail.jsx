import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import orchidsData from '../shared/ListOfOrchids';
import './Orchids.css';

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme, dark } = useContext(ThemeContext);

    const orchid = orchidsData.find(o => o.id === id);

    if (!orchid) {
        return (
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
                <h2>Orchid not found!</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <button
                        className="btn btn-outline-primary mb-4"
                        onClick={() => navigate('/')}
                        style={{ borderColor: theme.headerColor, color: theme.headerColor }}
                    >
                        ← Back to Home
                    </button>

                    <div className="card shadow-lg border-0" style={{ backgroundColor: theme.cardBackground }}>
                        <div className="row g-0">
                            {/* Image Section */}
                            <div className="col-12 col-md-6">
                                <iframe
                                    width="100%"
                                    height="500px"
                                    style={{ objectFit: 'cover' }}
                                    src={orchid.videoUrl}
                                    title={orchid.name}
                                    allowFullScreen
                                />
                            </div>

                            {/* Info Section */}
                            <div className="col-12 col-md-6">
                                <div className="card-body p-4" style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.95)' : theme.cardBackground }}>
                                    <h1 className="card-title mb-3" style={{ color: dark ? '#ffffff' : theme.headerColor }}>
                                        {orchid.name}
                                    </h1>

                                    <div className="orchid-details">
                                        <br />
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Origin:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.origin}</span></p>
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Color:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.color}</span></p>
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Category:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.category}</span></p>
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Rating:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.rating} ⭐</span></p>
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Special:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.isSpecial ? 'Yes' : 'No'}</span></p>
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Natural:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.isNatural ? 'Yes' : 'No'}</span></p>
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Likes:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.numberOfLike}</span></p>
                                        <br />
                                        <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}> Description:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.detail}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}