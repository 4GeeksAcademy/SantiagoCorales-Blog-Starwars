import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer'; 

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const favoriteCount = store.favorites.length;

	const removeFavorite = (item) => {
		dispatch({
			type: 'toggle_favorite', 
			payload: { 
                uid: item.uid,
                name: item.name,
                type: item.type 
            }
		});
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Star Wars App</span>
				</Link>

				<div className="ml-auto d-flex"> 
					<div className="dropdown me-3">
						<button
							className="btn btn-primary dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Favoritos <span className="badge bg-secondary">{favoriteCount}</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							{favoriteCount > 0 ? (
								store.favorites.map((item, index) => (
									<li key={index}>
										<div className="d-flex justify-content-between align-items-center dropdown-item">
											<Link to={`/single/${item.uid}`} className="text-decoration-none text-dark">
												{item.name}
											</Link>

											<button
												onClick={() => removeFavorite(item)}
												className="btn btn-danger btn-sm ms-2"
												title="Eliminar favorito"
											>
												❌
											</button>
										</div>
									</li>
								))
							) : (
								<li>
									<span className="dropdown-item">No hay favoritos</span>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};