import React from 'react';
import {connect} from 'react-redux';
import {setGrid} from '../actions';
import { withAlert } from 'react-alert';
import './SudokuCell.css'

class SudokuCell extends React.Component{

    checkValid(val){
        let start_row = Math.floor(this.props.row/3)*3;
        let start_col = Math.floor(this.props.col/3)*3;
        for(let i = start_row; i<start_row+3;i++){
            for(let j = start_col; j<start_col+3;j++){
                if(this.props.grid[i][j] === val)
                    return false;
            }
        }
        for(let i = 0;i<9;i++){
            if(this.props.grid[this.props.row][i] === val || this.props.grid[i][this.props.col] === val)
                return false;
        }
        return true;
    }

    showAlert(message){
        this.props.alert.show(message);
    }

    setValue(val){
        if(val === '1' || val === '2' || val === '3' ||val === '4' ||val === '5' ||val === '6' ||val === '7' ||val === '8' ||val === '9' ||val === ''){
            if(val !== ''){
                if(!this.checkValid(val)){
                    this.showAlert('Invalid Value!');
                    console.log('invalid!')
                }
                else{
                    let grid = [...this.props.grid];
                    grid[this.props.row][this.props.col] = val;
                    this.props.setGrid(grid);
                }
            }
            else{
                let grid = [...this.props.grid];
                grid[this.props.row][this.props.col] = val;
                this.props.setGrid(grid);
            }
        }
    }

    render(){
        return (
            <div>
                <input className="singleVal" type="text" value={this.props.grid[this.props.row][this.props.col]} onChange={(e)=>this.setValue(e.target.value)}/>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {grid:state.gridSolver.grid};
}

export default connect(mapStateToProps,{setGrid})(withAlert()(SudokuCell))