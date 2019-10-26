import React from 'react';
import {connect} from 'react-redux';
import SudokuCell from './SudokuCell';
import {setGrid, getGrid, toggleLoading} from '../actions';
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/core';
import './SudokuGrid.css'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class SudokuGrid extends React.Component{

    state = {loading:false};

    gridComponent(){
        let componentList = [];
        for(let i = 0;i < 9; i++){
            for(let j = 0; j<9;j++){
                componentList.push(<SudokuCell key={String(i)+String(j)} row = {i} col = {j}/>);
            }
        }
        return componentList;
    }

    checkValid(r, c, val){
        let start_row = Math.floor(r/3)*3;
        let start_col = Math.floor(c/3)*3;
        for(let i = start_row; i<start_row+3;i++){
            for(let j = start_col; j<start_col+3;j++){
                if(this.props.grid[i][j] === val)
                    return false;
            }
        }
        for(let i = 0;i<9;i++){
            if(this.props.grid[r][i] === val || this.props.grid[i][c] === val)
                return false;
        }
        return true;
    }

    solveGrid(){
        let y_shape = this.props.grid.length
        let x_shape = this.props.grid[0].length
        for(let i = 0; i < y_shape; i++){
            for(let j = 0;j < x_shape;j++){
                if(this.props.grid[i][j] === ''){
                    for(let k = 1; k<=9; k++){
                        if(this.checkValid(i, j, String(k))){
                            this.props.grid[i][j] = String(k);
                            if(this.solveGrid(this.props.grid))
                                return true;
                            else{
                                this.props.grid[i][j] = '';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    intialize(){
        this.props.toggleLoading();
        this.solveGrid();
        let grid = [...this.props.grid];
        this.props.setGrid(grid);
        this.props.toggleLoading();
    }

    gridFetch(file){
        console.log('check file',file);
        this.props.toggleLoading();
        this.props.getGrid(file);
        this.props.toggleLoading();
    }

    render(){
        return (
            <div>
                <div id="grid">
                    {this.gridComponent()}
                </div>
                <button onClick={this.intialize.bind(this)}>Solve</button>
                <input type="file" onChange={(e)=>this.gridFetch(e.target.files[0])}/>
                <PacmanLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.props.loading}
                />
            </div>
        );
    }

}


const mapStateToProps=(state)=>{
    return {grid:state.gridSolver.grid, loading:state.gridSolver.loading};
}

export default connect(mapStateToProps,{setGrid, getGrid, toggleLoading})(SudokuGrid)