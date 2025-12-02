import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import People from "../components/People.jsx";
import Planets from "../components/Planets.jsx";

const IMAGE_BASE_URL = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const characters = store.character;

	async function getPeople() {
		try {

			const listResponse = await fetch("https://www.swapi.tech/api/people/")
			const listData = await listResponse.json()
			const charactersList = listData.results

			const detailedFetches = charactersList.map(async (character) => {
				const imageUrl = `${IMAGE_BASE_URL}${character.uid}.jpg`;

				const detailResponse = await fetch(`https://www.swapi.tech/api/people/${character.uid}`)
				const detailData = await detailResponse.json()

				return {
					...character,
					...detailData.result.properties,
					image_url: imageUrl
				};
			});

			const detailedCharacters = await Promise.all(detailedFetches);

			dispatch({
				type: "get_personajes",
				payload: { personajes: detailedCharacters }
			})

		} catch (error) {
			console.error("Error al encontrar los personajes:", error)
		}
	}

	const PLANET_IMAGE_BASE_URL = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets/";

	async function getPlanets() {
		try {
			const listResponse = await fetch("https://www.swapi.tech/api/planets/");
			const listData = await listResponse.json();
			const planetsList = listData.results;

			const detailedFetches = planetsList.map(async (planet) => {
				const imageUrl = `${PLANET_IMAGE_BASE_URL}${planet.uid}.jpg`;

				const detailResponse = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
				const detailData = await detailResponse.json();

				return {
					...planet,
					...detailData.result.properties,
					image_url: imageUrl
				};
			});

			const detailedPlanets = await Promise.all(detailedFetches);

			dispatch({
				type: "get_planets",
				payload: { planets: detailedPlanets }
			});

		} catch (error) {
			console.error("Error al encontrar los planetas:", error);
		}
	}

	useEffect(() => {if (store.character.length === 0) {
        getPeople();
    }
    if (store.planets.length === 0) {
        getPlanets();
    }
}, [])

	console.log(store.character)

	return (
		<div className="container mt-5">
            <h1 className="text-center mb-5">Explorando la Galaxia de Star Wars</h1>
            <h2 className="mb-3">Personajes</h2>
            <div className="d-flex overflow-auto p-3 mb-5" style={{ gap: '1.5rem' }}>
                {store.character.length === 0 ? (
                    <div className="text-center">Cargando personajes de la Alianza...</div>
                ) : (
                    store.character.map((personaje) => (
                        <People key={personaje.uid} character={personaje} /> 
                    ))
                )}
            </div>
            <h2 className="mb-3">Planetas</h2>
            <div className="d-flex overflow-auto p-3" style={{ gap: '1.5rem' }}>
                {store.planets.length === 0 ? (
                    <div className="text-center">Cargando planetas remotos...</div>
                ) : (
                    store.planets.map((planet) => (
                        <Planets key={planet.uid} planet={planet} />
                    ))
                )}
            </div>
        </div>
	);
}; 