import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PinBallLocations from "./pinBallLocations";
import FormSearch from "./formSearch";
import LoadingSpinner from "./loadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { setFetching, setPinBallLocations, setSearchStatus } from "../features/pinBallLocations";
import GoogleMapReact from 'google-map-react';
import Marker from "./pinBallMarker";

const Body = () => {
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const {locations, isFetching, geolocation, message} = useSelector(({pinBallLocations}) => ({
    locations: pinBallLocations.value.locations,
    geolocation: pinBallLocations.value.geolocation,
    isFetching: pinBallLocations.value.isFetching,
    message: pinBallLocations.value.message
  }));
  
  // get locations form pinballmap.com based on lat&log.
  const getpinBallLocations = async (val) => {
    const {lat, log} = val;
    dispatch(setFetching({ isFetching: true}));
    const res = await axios.get(`https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json`, {
      params: {
        lat: lat,
        lon: log,
        max_distance: "50",
        send_all_within_distance: "1"
      }
    }).catch(err => alert(err));
    console.log('res', res)
    const {locations, errors} = res?.data;
    if(locations) dispatch(setPinBallLocations({ locations }));
    if(errors) dispatch(setSearchStatus({ errors }));
    dispatch(setFetching({ isFetching: false}));
  }

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(locations.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(locations.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, locations]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % locations.length;
    setItemOffset(newOffset);
  };
console.log('currentItems', currentItems)
  return (
    <div className="app-body">
      <div className="content">
        <div className="header-section"><h1>PINBALL MAP</h1></div>
        <div className="container">
          <div className="row">
            <div className="col form-wrapper">
              <FormSearch onSearch={(val) => getpinBallLocations(val)}/>
              <PinBallLocations locations={currentItems} searchStatus={message}/>
              <ReactPaginate
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
            <div className="col google-map">
              <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                  center={{lat: geolocation?.lat || 38.252666, lng: geolocation?.log || -85.758453}}
                  defaultZoom={11}
                  bootstrapURLKeys={{key: ''}}
                >
                  {currentItems.map(({ lat, lon, id, name, num_machines, street }) => {
                    return (
                      <Marker key={id} lat={lat} lng={lon} text={num_machines} tooltip={{id, name, num_machines, street }} />
                    );
                  })}
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFetching && <LoadingSpinner />}
    </div>
  )
}

export default Body;