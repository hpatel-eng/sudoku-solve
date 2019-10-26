import {combineReducers} from 'redux';

const gridSolveReducer = (state = {grid:[[ '5', '3', '', '', '7', '', '', '', '' ],
    [ '6', '', '', '1', '9', '5', '', '', '' ],
    [ '', '9', '8', '', '', '', '', '6', '' ],
    [ '8', '', '', '', '6', '', '', '', '3' ],
    [ '4', '', '', '8', '', '3', '', '', '1' ],
    [ '7', '', '', '', '2', '', '', '', '6' ],
    [ '', '6', '', '', '', '', '2', '8', '' ],
    [ '', '', '', '4', '1', '9', '', '', '5' ],
    [ '', '', '', '', '8', '', '', '7', '9' ] ], loading:false},action)=>{
    switch(action.type){
        case 'SOLVE_GRID':
            return {...state, grid:action.payload};
            break;
        case 'SET_GRID':
            return {...state, grid:action.payload};
            break;
        case 'TOGGLE_LOADING':
            let f_state = {...state};
            f_state['loading'] = !f_state['loading'];
            console.log(f_state);
            return f_state;
            break;
        default:
            return state;
    }
}

export default combineReducers({
    'gridSolver':gridSolveReducer
});