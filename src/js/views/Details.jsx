import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";


const Details = () => {
    const { type, id } = useParams();
    const { store, actions } = useContext(Context);
    const [details, setDetails] = useState(null);


    const imageType = actions.mapTypeToImagen(type);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                const data = await response.json();
                setDetails(data.result.properties);
            } catch (error) {
                console.error("Error fetching details D:", error)
            }
        };

        fetchDetails();

    }, [type, id]);

    if (!details) {
        return <div className="text-center my-5">La fuerza es intensa en ti</div>;
    }

    return (
        <div className="container-black">
            <div className="card card-custom">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`}
                            className="img-fluid rounded-start"
                            alt={details.name || "Star Wars entity"}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    <div className="col-md-6 informacion">
                        <div className="card-body">
                            <h1 className="card-title">{details.name}</h1>
                            <p className="card-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, necessitatibus consequatur. Dicta veritatis amet in libero ea, assumenda quibusdam minima rerum eos animi rem ducimus corrupti iusto, maiores quae error?
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <div className="row text-center">
                        {Object.entries(details).map(([key, value]) => (
                            <div className="col-6 col-md-3 my-2" key={key}>
                               
                                <strong className="key">{key.replace("_", " ").toUpperCase()}:</strong> <br />
                                
                                <span className="value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;