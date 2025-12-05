import React from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

export const Planets = ({ planet }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        fav => fav.uid === planet.uid && fav.type === 'planet'
    );

    const handleFavoriteClick = () => {
        dispatch({
            type: 'toggle_favorite',
            payload: {
                uid: planet.uid,
                name: planet.name,
                type: 'planet'
            }
        });
    };

    return (
        <div className="card shadow-sm h-100" style={{ width: '400px', flexShrink: 0 }}>
            <img
                src={planet.image_url}
                className="card-img-top"
                alt={planet.name}
                style={{
                    height: '400px',
                }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/big-placeholder.jpg"; }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{planet.name}</h5>

                <ul className="list-unstyled mb-3">
                    <li><strong>Population:</strong> {planet.population || 'N/A'}</li>
                    <li><strong>Terrain:</strong> {planet.terrain || 'N/A'}</li>
                </ul>

                <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/planet/${planet.uid}`} className="btn btn-outline-primary">
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

export default Planets;