import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import OrchidForm from './OrchidForm';
import { createOrchid, updateOrchid, fetchOrchids } from '../features/orchids/orchidsSlice';

export default function OrchidEditor({ mode = 'create' }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orchid = useSelector((state) => state.orchids.items.find((o) => o.id === id));
    const orchidsLoaded = useSelector((state) => state.orchids.items.length > 0);

    // Nếu người dùng truy cập trực tiếp vào /edit/:id mà chưa load danh sách
    // thì tự fetch danh sách --> hiển thị form edit
    useEffect(() => {
        if (mode === 'edit' && !orchidsLoaded) {
            dispatch(fetchOrchids());
        }
    }, [mode, orchidsLoaded, dispatch]);

    const handleCreate = async (values) => {
        await dispatch(createOrchid(values)).unwrap();
        navigate('/');
    };

    const handleUpdate = async (values) => {
        await dispatch(updateOrchid({ id, payload: values })).unwrap();
        navigate(`/detail/${id}`);
    };

    if (mode === 'edit' && !orchid) {
        return <div className="container py-5">Loading orchid to edit...</div>;
    }

    return (
        <OrchidForm
            initialValues={mode === 'edit' ? orchid : null}
            onSubmit={mode === 'edit' ? handleUpdate : handleCreate}
            submitLabel={mode === 'edit' ? 'Update' : 'Create'}
        />
    );
}
