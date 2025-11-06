import Orchids from './Orchids';
import orchidsData from '../service/orchidsService';
import { useNavigate, useLocation } from 'react-router-dom';
import Natural from './Original';
import Special from './Special';
import { useEffect, useState } from 'react';

// Container logic: quản lý data, state, và các handlers
export default function OrchidsContainer() {
    const [orchids, setOrchids] = useState([]);

    useEffect(() => {
        const getAllOrchids = async () => {
            try {
                const data = await orchidsData.fetchAll();
                setOrchids(data);
            } catch (error) {
                console.error("Error fetching orchids:", error);
            }
        }
        getAllOrchids();
    }, [])

    // Chuyến đến detail page khi click vào orchid item
    const navigate = useNavigate();
    const location = useLocation();

    // Handler xem chi tiết
    const handleViewDetail = (orchid) => {
        navigate(`/detail/${orchid.id}`)
    }

    const pages = {
        '/': Orchids,
        '/natural': Natural,
        '/special': Special,
    }

    const CurrentPage = pages[location.pathname] || Orchids;

    return (
        <div>
            <CurrentPage
                orchidList={orchids}
                onViewDetail={handleViewDetail}
            />
        </div>
    );
}
