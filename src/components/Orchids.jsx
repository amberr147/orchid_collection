import React, { useState } from 'react';
import './Orchids.css';

export default function Orchids({ orchids }) {
    //copy list orchids to state
    const [orchidList, setOrchidList] = useState(orchids);
    //choose picture to show 
    const [selectedImage, setSelectedImage] = useState(null);

    //handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    //hendle close picture
    const handleClosePicture = () => {
        setSelectedImage(null);
    };

    //handle like
    const handleLike = (id) => {
        const updated = orchidList.map((orchid) =>
            orchid.id === id
                //prev = prev + 1, useState phai lam v tranh bi tac nghen state
                ? { ...orchid, numberOfLike: orchid.numberOfLike + 1 }
                : orchid
        );
        // Sau do goi setOrchids de cap nhat state
        setOrchids(updated);
    };

    return (
        <div className='orchids-grid'>
            {orchidList.map((orchid) => (
                <div className="orchid-card" key={orchid.id}>
                    <img src={orchid.image} alt={orchid.name} className='orchid-image' onClick={() => handleImageClick(orchid.image)} />
                    <div className="orchid-info">
                        <h3>{orchid.name}</h3>
                        <p><strong>Origin:</strong> {orchid.origin}</p>
                        <p><strong>Color:</strong> {orchid.color}</p>
                        <p><strong>Category:</strong> {orchid.category}</p>
                        <p><strong>Rating:</strong> {orchid.rating} ⭐</p>
                        <p><strong>Special:</strong> {orchid.isSpecial ? 'Yes' : 'No'}</p>
                        <p><strong>Natural:</strong> {orchid.isNatural ? 'Yes' : 'No'}</p>

                        <p>
                            <strong>Likes:</strong> {orchid.numberOfLike}
                            <button className='like-btn' onClick={() => handleLike(orchid.id)}>
                                ❤️Like
                            </button>
                        </p>

                    </div>
                </div>
            ))}

            {selectedImage && (
                <div className='modal' onClick={handleClosePicture}>
                    <span className='close'>&times;</span>
                    <img className='modal-content' src={selectedImage} alt="orchid" />
                </div>
            )}

        </div>

    );
}
