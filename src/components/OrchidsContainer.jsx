import React from 'react';
import Orchids from './Orchids';
import orchidsData from '../shared/ListOfOrchids'; // lấy data

export default function OrchidsContainer() {
    // Container lo phần "logic": lấy data, chuẩn bị state, xử lý...
    return <Orchids orchids={orchidsData} />; // Truyền xuống presentational component
}
