import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

 export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-dark bg-dark px-5 navbar-principal">
			<Link className="navbar-brand" to="/"> <img src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254" alt="Star Wars Logo"></img> </Link>
			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Favorites ({store.favorites.length})
				</button>
				< ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark py-2" aria-labelledby="dropdownMenuButton">
					{store.favorites.length > 0 ? (
						store.favorites.map((item) => (
							<li key={item.uid} className="dropdowm-item d-flex justify-content-between py-2 px-2">
								{item.name}
								<button
									className="btn btn-danger btn-sm"
									onClick={() => actions.toggleFavorite(item)}
								>
									
									<i className="fas fa-trash-alt"></i>
								</button>
							</li>
						))
					) : (
						<li className="dropdown-item"> No favorites added yet.</li>
					)}
				</ul>


			</div>
		</nav>
	);
};
 export default Navbar;