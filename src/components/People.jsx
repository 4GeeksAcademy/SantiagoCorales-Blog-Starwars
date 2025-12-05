import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const People = ({ character }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        fav => fav.uid === character.uid && fav.type === 'character'
    );

    const handleFavoriteClick = () => {
        dispatch({
            type: "toggle_favorite",
            payload: {
                uid: character.uid,
                name: character.name,
                type: 'character'
            }
        });
    };

    return (
        <div className="card shadow-sm h-100" style={{ width: '400px', flexShrink: 0 }}>
            <img
                src={character.image_url}
                className="card-img-top"
                alt={character.name}
                style={{
                   height: '400px',
                }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/big-placeholder.jpg"; }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{character.name}</h5>

                <ul className="list-unstyled mb-3">
                    <li><strong>Gender:</strong> {character.gender || 'N/A'}</li>
                    <li><strong>Hair Color:</strong> {character.hair_color || 'N/A'}</li>
                    <li><strong>Eye Color:</strong> {character.eye_color || 'N/A'}</li>
                </ul>

                <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/single/${character.uid}`} className="btn btn-outline-primary">
                        Leer Más!
                    </Link>

                    <button
                        onClick={handleFavoriteClick}
                        className={isFavorite ? "btn btn-warning" : "btn btn-outline-warning"}
                    >
                        {isFavorite ? " Favorito" : " Favorito"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default People;