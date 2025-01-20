import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/Card.jsx";
import "../../styles/index.css";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.fetchData("people", 1);
		actions.fetchData("vehicles", 1);
		actions.fetchData("planets", 1);
	}, []);

	const handlePageChange = (type, direction) => {
		const currentPage = store.currentPages[type]; 
		const totalPages = store.totalPages[type];

		if (direction === "next" && currentPage < totalPages) {
			actions.fetchData(type, currentPage + 1);
		} else if (direction === "prev" && currentPage > 1) {
			actions.fetchData(type, currentPage - 1);
		}
	};


		return (
			<div className="container-fluid  bg-black">
			
			<h2>Characters</h2>
			<div className="d-flex flex-row overflow-auto">
				{store.people.map((person, index) => (
					<Card key={index} data={person} type="people" />
				))}
			</div>
			<div className="d-flex justify-content-center align-items-center mt-3">
				<button
					className="btn btn-outline-light mx-2"
					onClick={() => handlePageChange("people", "prev")}
					disabled={store.currentPages["people"] === 1}
				>
					<HiOutlineArrowSmLeft size={24} />
				</button>
				<button
					className="btn btn-outline-light mx-2"
					onClick={() => handlePageChange("people", "next")}
					disabled={store.currentPages["people"] === store.totalPages["people"]}
				>
					<HiOutlineArrowSmRight size={24} />
				</button>
			</div>

			
			<h2>Vehicles</h2>
			<div className="d-flex flex-row overflow-auto">
				{store.vehicles.map((vehicle, index) => (
					<Card key={index} data={vehicle} type="vehicles" />
				))}
			</div>
			<div className="d-flex justify-content-center align-items-center mt-3">
				<button
					className="btn btn-outline-light mx-2"
					onClick={() => handlePageChange("vehicles", "prev")}
					disabled={store.currentPages["vehicles"] === 1}
				>
					<HiOutlineArrowSmLeft size={24} />
				</button>
				<button
					className="btn btn-outline-light mx-2"
					onClick={() => handlePageChange("vehicles", "next")}
					disabled={store.currentPages["vehicles"] === store.totalPages["vehicles"]}
				>
					<HiOutlineArrowSmRight size={24} />
				</button>
			</div>

			
			<h2>Planets</h2>
			<div className="d-flex flex-row overflow-auto">
				{store.planets.map((planet, index) => (
					<Card key={index} data={planet} type="planets" />
				))}
			</div>
			<div className="d-flex justify-content-center align-items-center mt-3">
				<button
					className="btn btn-outline-light mx-2"
					onClick={() => handlePageChange("planets", "prev")}
					disabled={store.currentPages["planets"] === 1}
				>
					<HiOutlineArrowSmLeft size={24} />
				</button>
				<button
					className="btn btn-outline-light mx-2"
					onClick={() => handlePageChange("planets", "next")}
					disabled={store.currentPages["planets"] === store.totalPages["planets"]}
				>
					<HiOutlineArrowSmRight size={24} />
				</button>
			</div>
		</div>
	);
};


export default Home;
