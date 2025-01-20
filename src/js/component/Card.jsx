import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = ({ data, type }) => {
    const
        { actions } = useContext(Context);

        const imageType = actions.mapTypeToImagen(type);
    return (
        <div className="cold-md-4 my-3 ">
            <div className="card mx-2" style={{ width: "18rem", backgroundColor: "#333" }}>
                <img
                    src={`https://starwars-visualguide.com/assets/img/${imageType}/${data.uid}.jpg`}
                    className="card-img-top"
                    alt={data.name}
                    onError={(e) => console.log(`Error loading image: ${e.target.src}`)}
                />
                <div className="card-body home">
                    <h5 className="card-title">{data.name}</h5>
                    
                    <div className="d-flex justify-content-between">
                        <Link to={`/${type}/${data.uid}`} className="btn btn-primary">
                            Learn more
                        </Link>
                        <button className="btn btn-warning" onClick={() => actions.toggleFavorite(data)}>
                            <i className="fas fa-star"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Card;