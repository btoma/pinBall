import { createSlice } from '@reduxjs/toolkit';


export const pinBallLocationsSlice = createSlice({
    name: 'pinBallLocations',
    initialState: { 
        value: { 
            locations: [],
            geolocation: {lat: '',log: ''},
            isFetching: false
        }
    },
    reducers: {
        setPinBallLocations: (state, action) => {
            const { locations } = action.payload;
            state.value = { ...state.value, locations: locations }
        },
        setGeolocation: (state, action) => {
            const { geolocation } = action.payload;
            state.value = { ...state.value, geolocation: geolocation }
        },
        setFetching: (state, action) => {
            const { isFetching } = action.payload;
            state.value = { ...state.value, isFetching: isFetching }
        },
        setSearchStatus: (state, action) => {
            const { errors } = action.payload;
            state.value = { ...state.value, message: errors }
        }
    }
});


export const { setPinBallLocations, setGeolocation, setFetching, setSearchStatus } = pinBallLocationsSlice.actions;

export default pinBallLocationsSlice.reducer;