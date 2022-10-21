import React from "react";
import Map from "./mapLocation";


const PinBallLocations = ({locations, searchStatus}) => {
  
    const buildPinBallList = locations?.map(location => {
        const { city,state,street,zip,phone, name, id, website } = location;
        return (
            <li className="card-item" key={id} >
                <div className="card mb-4 card-location" >
                    <div className="row no-gutters">
                        <div><h5 className="card-header locationName">{name}</h5></div>
                        <div className="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">{`${street}, ${city}, ${state} ${zip} `}</h6>
                            <p className="card-text address"><a href={`tel:${phone}`}>{phone}</a></p>
                            <a href={website} >{website}</a>
                        </div>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div className="pinBallLocations">
            {locations.length ? ( <ul className="card-list">
                {buildPinBallList}
            </ul>
            ): (<div className="not-found"><h2>{ searchStatus ?? 'PinBall Near Me!'}</h2></div>)}
        </div>
    )
};

export default PinBallLocations;