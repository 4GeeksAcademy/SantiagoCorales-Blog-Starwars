import React, { createContext, useContext, useReducer } from 'react';

export const initialStore = () => {
    return {
        message: null,
        todos: [
            { id: 1, title: 'Make the bed', done: false },
            { id: 2, title: 'Do my homework', done: false },
        ],
        character: [], 
        planets: [],   
        favorites: [], 
    }
}

const globalReducer = (state, action = {}) => {
    switch (action.type) {
        case "get_personajes":
            return {
                ...state,
                character: action.payload.personajes
            };
        
        case "get_planets":
            return {
                ...state,
                planets: action.payload.planets
            };

        case "toggle_favorite":
            const { uid, name, type } = action.payload;

            const newFavorite = { uid, name, type };

            const isFavorite = state.favorites.some(
                fav => fav.uid === uid && fav.type === type
            );

            let updatedFavorites;

            if (isFavorite) {
                updatedFavorites = state.favorites.filter(
                    fav => !(fav.uid === uid && fav.type === type)
                );
            } else {
                updatedFavorites = [...state.favorites, newFavorite];
            }

            return {
                ...state,
                favorites: updatedFavorites
            };

        default:
            throw Error('Unknown action.');
    }
}

const GlobalContext = createContext(null);

const useGlobalReducer = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalReducer must be used within a GlobalProvider');
    }
    return context;
};

export const GlobalProvider = ({ children }) => {
    const [store, dispatch] = useReducer(globalReducer, initialStore());

    return (
        <GlobalContext.Provider value={{ store, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default useGlobalReducer;