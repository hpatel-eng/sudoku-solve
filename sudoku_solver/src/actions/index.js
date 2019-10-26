import axios from '../api';
import {Base64} from '../helpers/base64';

export const getGrid = (image)=>{
    return async (dispatch, getState)=>{
        let b_image = await Base64(image);
        let results = await axios.post('/', {image:b_image}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        dispatch({type:'SOLVE_GRID', payload:results.data.grid});
    };
};

export const setGrid = (grid)=>{
    return {
        type:'SET_GRID',
        payload:grid
    };
};

export const toggleLoading = ()=>{
    return {
        type:'TOGGLE_LOADING'
    }
}