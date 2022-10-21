import React, { useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { setFetching, setGeolocation } from "../features/pinBallLocations";

const FormSearch = ({onSearch}) => {
  const dispatch = useDispatch();
  const [formVal, setFormVal] = useState({lat: '', log: ''});
  const {lat, log} = formVal;

  // set form formSchema
  const formSchema = Yup.object().shape({
    lat: Yup.number().required(),
    log: Yup.number().required()
  });

  // get user location and store the value.
  const getUserLocation = () => {
    dispatch(setFetching({ isFetching: true}));
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        setFormVal({lat: position.coords.latitude,log: position.coords.longitude})
        dispatch(setGeolocation({ geolocation: {lat: position.coords.latitude,log: position.coords.longitude}}));
        dispatch(setFetching({ isFetching: false}));
      }, (error) => {
        console.error("error: ", error)
      })
    }
  }

  return (
  <div className="form-section">
      <Formik
          initialValues={{
            lat: lat ?? undefined,
            log: log ?? undefined,
          }}
          validationSchema={formSchema}
          validateOnMount
          enableReinitialize
          onSubmit={values => {
            onSearch(values);
          }}
        >
          {({ values, setFieldValue, handleSubmit, isValid }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div class="container">
                  <div class="row">
                    <div className="col form-group">
                      <label for="latitudeInput">Latitude</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="latitudeInput" 
                        placeholder="latitude"
                        pattern="[0-9]*" 
                        value={values['lat']}
                        onChange={(e) => setFieldValue('lat', e.target.value)}
                      />
                    </div>
                    <div className="col form-group">
                      <label for="longitudeInput">Longitude</label>
                      <input 
                        type="number" 
                        className="form-control"
                        id="longitudeInput"
                        placeholder="longitude"
                        pattern="[0-9]*" 
                        value={values['log']} 
                        onChange={(e) => setFieldValue('log', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <small id="emailHelp" className="form-text text-muted">We'll never share your location with anyone else.</small>
                <div className="button-section">
                  <button type="button" className="btn btn-primary btn-lg" onClick={getUserLocation}>
                    Auto Fill
                  </button>
                  <button type="submit" className="btn btn-secondary btn-lg" disabled={!isValid}>
                    Search
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
  </div>
)};

export default FormSearch;