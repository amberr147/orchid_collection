// Component hiển thị rating bằng ngôi sao (hỗ trợ nửa sao)
function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <span>
            {[...Array(fullStars)].map((_, i) => (
                <span key={"full" + i} style={{ color: '#FFD700', fontSize: '1.2em' }}>★</span>
            ))}
            {halfStar && <span key="half" style={{ color: '#FFD700', fontSize: '1.2em' }}>⯨</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={"empty" + i} style={{ color: '#ccc', fontSize: '1.2em' }}>★</span>
            ))}
            <span style={{ fontSize: '0.95em', color: '#555', marginLeft: 6 }}>{rating}</span>
        </span>
    );
}
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrchid, fetchOrchids, updateOrchid } from '../features/orchids/orchidsSlice';
import orchidsData from '../service/orchidsService';
import './Orchids.css';

export default function Detail() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const [ratingInput, setRatingInput] = useState(5);
    const [commentInput, setCommentInput] = useState('');
    const [feedbackError, setFeedbackError] = useState(null);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [orchidDetail, setOrchidDetail] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { theme, dark } = useContext(ThemeContext);

    const user = useSelector(state => state.user.user);
    const orchidFromStore = useSelector(state => state.orchids.items.find(o => o.id === id));
    const status = useSelector(state => state.orchids.status);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadOrchid = async () => {
            if (orchidFromStore) {
                setOrchidDetail(orchidFromStore);
            } else {
                try {
                    const data = await orchidsData.fetchOrchidById(id);
                    setOrchidDetail(data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        if (status === 'idle' || status === 'failed') {
            dispatch(fetchOrchids());
        }
        loadOrchid();
    }, [status, dispatch, id, orchidFromStore]);

    const hasFeedbackFromUser =
        user && orchidDetail?.feedback && orchidDetail.feedback.some(f => f.author === user.email);

    const handleSubmitFeedback = async (e) => {
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
                comment: commentInput,
                author: user.email,
                date: new Date().toISOString(),
            };

            const updated = {
                ...orchidDetail,
                feedback: Array.isArray(orchidDetail.feedback)
                    ? [...orchidDetail.feedback, newFeedback]
                    : [newFeedback],
            };

            // Gọi update qua Redux để đồng bộ lại store
            await dispatch(updateOrchid({ id: orchidDetail.id, payload: updated })).unwrap();
            // Lấy lại dữ liệu mới nhất từ store
            setOrchidDetail(updated);
            setCommentInput('');
            setRatingInput(5);
        } catch (err) {
            console.error(err);
            setFeedbackError('Error submitting feedback.');
        } finally {
            setFeedbackLoading(false);
        }
    };

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

    if (status === 'loading' || status === 'idle' || !orchidDetail) {
        return (
            <div className="container-fluid py-5 text-center" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    const orchid = orchidDetail;

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
                                            <p><strong>Origin:</strong> {orchid.origin}</p>
                                            <p><strong>Color:</strong> {orchid.color}</p>
                                            <p><strong>Category:</strong> {orchid.category}</p>
                                            <p><strong>Rating:</strong> <StarRating rating={orchid.rating} /></p>
                                            <p><strong>Likes:</strong> {orchid.numberOfLike}</p>
                                            {orchid.isSpecial && <span className="badge bg-warning text-dark me-2">🌸 Special</span>}
                                            {orchid.isNatural && <span className="badge bg-success">🌿 Natural</span>}
                                            <br /><br />
                                            <p><strong>Description:</strong> {orchid.detail}</p>
                                        </div>

                                        {/* Feedback Section */}
                                        <div className="mt-4">
                                            <h5>Feedback</h5>
                                            {orchid.feedback && orchid.feedback.length > 0 ? (
                                                orchid.feedback.map((f, i) => (
                                                    <div key={i} className="p-2 border rounded mb-2">
                                                        <strong>{f.author}</strong> — <StarRating rating={f.rating} />
                                                        <p className="mb-1">{f.comment}</p>
                                                        <small className="text-muted">{new Date(f.date).toLocaleString()}</small>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No feedback yet.</p>
                                            )}

                                            {user && (
                                                hasFeedbackFromUser ? (
                                                    <div className="alert alert-info mt-3">You already submitted feedback for this orchid.</div>
                                                ) : (
                                                    <form onSubmit={handleSubmitFeedback} className="mt-3">
                                                        <div className="mb-2">
                                                            <label>Rating</label>
                                                            <select
                                                                className="form-select"
                                                                value={ratingInput}
                                                                onChange={e => setRatingInput(e.target.value)}
                                                                style={{ maxWidth: 120 }}
                                                            >
                                                                {[5, 4, 3, 2, 1].map(n => (
                                                                    <option key={n} value={n}>{n}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="mb-2">
                                                            <label>Comment</label>
                                                            <textarea
                                                                className="form-control"
                                                                rows={3}
                                                                value={commentInput}
                                                                onChange={e => setCommentInput(e.target.value)}
                                                            />
                                                        </div>
                                                        {feedbackError && <div className="text-danger mb-2">{feedbackError}</div>}
                                                        <button className="btn btn-primary" disabled={feedbackLoading}>
                                                            {feedbackLoading ? 'Đang gửi...' : 'Gửi feedback'}
                                                        </button>
                                                    </form>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {user && user.role === 'admin' && (
                                        <div className="d-flex justify-content-end gap-3 mt-4">
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => navigate(`/edit/${orchid.id}`)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
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
                            <button className="btn btn-outline-secondary" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(orchid.id)} disabled={deleting}>
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
