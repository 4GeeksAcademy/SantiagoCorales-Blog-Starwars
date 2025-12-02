import React from "react";
import { Link, useParams, useLocation } from "react-router-dom"; 
import useGlobalReducer from "../hooks/useGlobalReducer";

const getEntityConfig = (type) => {
    if (type === 'character') {
        return {
            title: 'Personaje',
            dataStoreKey: 'character', 
            details: [
                { label: 'Name', key: 'name' },
                { label: 'Birth Year', key: 'birth_year' },
                { label: 'Gender', key: 'gender' },
                { label: 'Height', key: 'height' },
                { label: 'Skin Color', key: 'skin_color' },
                { label: 'Eye Color', key: 'eye_color' },
            ]
        };
    } else if (type === 'planet') {
        return {
            title: 'Planeta',
            dataStoreKey: 'planets', 
            details: [
                { label: 'Name', key: 'name' },
                { label: 'Population', key: 'population' },
                { label: 'Terrain', key: 'terrain' },
                { label: 'Climate', key: 'climate' },
                { label: 'Diameter', key: 'diameter' },
                { label: 'Gravity', key: 'gravity' },
            ]
        };
    }
    return null; 
};


export const Presentation = () => {
    const { store } = useGlobalReducer();
    const { theId } = useParams();
    const location = useLocation(); 

    const entityType = location.pathname.includes('/planet/') ? 'planet' : 
                     (location.pathname.includes('/single/') ? 'character' : null);
    
    const config = getEntityConfig(entityType);

    if (!config) {
        return <div className="text-center mt-5">Error: Entidad no válida en la URL.</div>;
    }

    const entityDetails = store[config.dataStoreKey].find(item => item.uid === theId);


    if (!entityDetails) {
        return (
            <div className="text-center mt-5">
                <h1>Cargando {config.title}...</h1>
                <p>No se encontraron datos de {config.title} con ID: {theId}.</p>
                <Link to="/" className="btn btn-primary mt-3">Volver a Home</Link>
            </div>
        );
    }
    
    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                
                <div className="col-12 col-md-6 mb-4">
                    <img 
                        src={entityDetails.image_url} 
                        className="img-fluid rounded shadow-lg" 
                        alt={entityDetails.name}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/big-placeholder.jpg"; }}
                    />
                </div>
                
                <div className="col-12 col-md-6 mb-4 text-center text-md-start">
                    <h1 className="display-4">{entityDetails.name}</h1>
                    <p className="lead">
                        Información detallada sobre **{entityDetails.name}**, un(a) **{config.title.toLowerCase()}** clave 
                        del universo de Star Wars.
                    </p>
                    <p className="text-muted">
                        Tipo de entidad: **{config.title}**. ID de la Galaxia: **{entityDetails.uid}**.
                    </p>
                </div>
            </div>

            <hr className="my-5 border-danger border-3" /> 
            <div className="d-flex justify-content-start text-center overflow-auto p-3">
                
                {config.details.map((detail, index) => (
                    <div key={index} className="px-3" style={{ minWidth: '150px' }}>
                        <h5 className="text-danger">{detail.label}</h5>
                        <p className="text-muted">{entityDetails[detail.key] || 'Desconocido'}</p>
                    </div>
                ))}

            </div>
            
            <div className="text-center mt-5">
                <Link to="/" className="btn btn-primary btn-lg">
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};

export default Presentation;