import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrchid, fetchOrchids } from '../features/orchids/orchidsSlice';
import { auth } from '../firebase';
import './Orchids.css';

export default function Detail() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { theme, dark } = useContext(ThemeContext);
    const orchid = useSelector(state => state.orchids.items.find(o => o.id === id));
    const status = useSelector(state => state.orchids.status);

    const [ratingInput, setRatingInput] = useState(5);
    const [txtComment, setTxtComment] = useState('');
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [feedbackError, setFeedbackError] = useState(null);

    const hasFeedbackFromUser = user && orchid.feedback && orchid.feedback.some(f => f.author === user.email);

    // Handle submit feedback
    async function handleSubmitFeedback(e) {
        e.preventDefault();
        if (!user) return;

        if (hasFeedbackFromUser) {
            setFeedbackError('You have already submitted feedback for this orchid.');
            return;
        }
        setFeedbackLoading(true);
        setFeedbackError(null);
        try {
            const newFeedback = {
                rating: Number(ratingInput),
                comment: txtComment,
                author: user.email,
                date: new Date().toISOString()
            };

            const updated = {
                ...orchid,
                feedback: Array.isArray(orchid.feedback) ? [...orchid.feedback, newFeedback] : [newFeedback]
            };



        } catch (error) {

        }
    }


    const user = useSelector(state => state.user.user);

    // Tự động fetchOrchids nếu chưa có dữ liệu và cuộn lên đầu trang khi vào Detail
    useEffect(() => {
        window.scrollTo(0, 0);
        if (status === 'idle' || status === 'failed') {
            dispatch(fetchOrchids());
        }
    }, [status, dispatch]);

    async function handleDelete(deleteId) {
        setDeleting(true);
        setDeleteError(null);
        try {
            await dispatch(deleteOrchid(deleteId)).unwrap();
            setDeleting(false);
            setShowDeleteModal(false);
            navigate('/');
        } catch (error) {
            setDeleteError('Delete failed!');
            setDeleting(false);
        }
    }

    if (status === 'loading' || status === 'idle') {
        return (
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

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
                    <div className="d-flex justify-content-start align-items-center mb-4">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/')}
                            style={{ borderColor: theme.headerColor, color: theme.headerColor, fontWeight: '500', padding: '8px 22px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                        >
                            <span style={{ fontSize: '1.1em', marginRight: '6px' }}>&larr;</span> Back to Home
                        </button>
                    </div>

                    <div className="card shadow-lg border-0" style={{ backgroundColor: theme.cardBackground, position: 'relative' }}>
                        <div className="row g-0">
                            {/* Image/Video Section */}
                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" style={{ minHeight: '500px', background: '#000' }}>
                                {orchid.videoUrl ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style={{ display: 'block', maxWidth: '100%', maxHeight: '500px', margin: 'auto', background: '#000', border: 'none' }}
                                        src={orchid.videoUrl}
                                        title={orchid.name}
                                        allowFullScreen
                                    />
                                ) : (
                                    <img
                                        src={orchid.image}
                                        alt={orchid.name}
                                        style={{ display: 'block', maxWidth: '100%', maxHeight: '500px', margin: 'auto', objectFit: 'cover', background: '#000' }}
                                    />
                                )}
                            </div>

                            {/* Info Section */}
                            <div className="col-12 col-md-6 position-relative" style={{ minHeight: '600px' }}>
                                <div className="card-body p-4 d-flex flex-column justify-content-between h-100" style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.95)' : theme.cardBackground }}>
                                    <div>
                                        <h1 className="card-title mb-3" style={{ color: dark ? '#ffffff' : theme.headerColor }}>
                                            {orchid.name}
                                        </h1>
                                        <div className="orchid-details">
                                            <br />
                                            <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}>Origin:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.origin}</span></p>
                                            <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}>Color:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.color}</span></p>
                                            <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}>Category:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.category}</span></p>
                                            <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}>Rating:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.rating} ⭐</span></p>
                                            <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}>Likes:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.numberOfLike}</span></p>
                                            <div style={{ display: 'flex', gap: '8px', margin: '10px 0 18px 0' }}>
                                                {orchid.isSpecial && (
                                                    <span style={{ background: 'linear-gradient(90deg,#ffb347,#ffcc33)', color: '#333', fontWeight: 600, borderRadius: '14px', padding: '4px 16px', fontSize: '0.95em', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', minWidth: '80px', textAlign: 'center', display: 'inline-block' }}>
                                                        🌸 Special
                                                    </span>
                                                )}
                                                {orchid.isNatural && (
                                                    <span style={{ background: 'linear-gradient(90deg,#a8e063,#56ab2f)', color: '#fff', fontWeight: 600, borderRadius: '14px', padding: '4px 16px', fontSize: '0.95em', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', minWidth: '80px', textAlign: 'center', display: 'inline-block' }}>
                                                        🌿 Natural
                                                    </span>
                                                )}
                                            </div>
                                            <br />
                                            <p><strong style={{ color: dark ? '#ffffff' : theme.cardText }}>Description:</strong> <span style={{ color: dark ? '#ffffff' : theme.cardText }}>{orchid.detail}</span></p>
                                        </div>
                                    </div>
                                    {user && (
                                        <div className="d-flex justify-content-end gap-3 mt-4">
                                            <button
                                                className="btn btn-outline-primary"
                                                style={{ fontWeight: '500', padding: '6px 18px', borderRadius: '7px', color: theme.headerColor, borderColor: theme.headerColor, fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                                                onClick={() => navigate(`/edit/${orchid.id}`)}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                style={{ fontWeight: '500', padding: '6px 18px', borderRadius: '7px', color: '#d9534f', borderColor: '#d9534f', fontSize: '0.95em', letterSpacing: '0.5px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                                                onClick={() => setShowDeleteModal(true)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)', padding: '32px 28px', minWidth: '320px', maxWidth: '90vw', textAlign: 'center' }}>
                        <h5 style={{ marginBottom: '18px', color: '#d9534f', fontWeight: 700 }}>Delete Orchid?</h5>
                        <p style={{ marginBottom: '24px', color: '#333' }}>Are you sure you want to delete <b>{orchid.name}</b>? This action cannot be undone.</p>
                        {deleteError && <div style={{ color: '#d9534f', marginBottom: '12px' }}>{deleteError}</div>}
                        <div className="d-flex justify-content-center gap-3">
                            <button
                                className="btn btn-outline-secondary"
                                style={{ padding: '6px 18px', borderRadius: '7px', fontSize: '0.95em' }}
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ padding: '6px 18px', borderRadius: '7px', fontSize: '0.95em', fontWeight: 500 }}
                                onClick={() => handleDelete(orchid.id)}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}