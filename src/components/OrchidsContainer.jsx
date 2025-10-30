import Orchids from './Orchids';
import orchidsData from '../shared/ListOfOrchids';
import { useNavigate, useLocation } from 'react-router-dom';
import Natural from './Original';
import Special from './Special';
import Detail from './Detail';

// Container logic: quản lý data, state, và các handlers
export default function OrchidsContainer() {

    // Chuyến đến detail page khi click vào orchid item
    const navigate = useNavigate();
    const location = useLocation();

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
        <CurrentPage
            orchids={orchidsData}
            onViewDetail={handleViewDetail}
        />
    )
}
