# Sudoku Solver
This repo is created as a submission for Qlik interview test. The sudoku_solver folder is the React Web App and the SolveSudoku folder contains the flask server file `app.py` and all the other files required by the flask server. The sudoku solver uses backtracking to solve the puzzle. The flask server can be used to detect all the numbers in the grid of an image making it easier to input the puzzle.

**Instructions**

 - `cd sudoku_solver`
 - `npm install` to install all the react requirements
 - `npm start` to start the React Web App at `localhost:3000`
 - go back to the root folder of the repo `cd ..`
 - `cd SolveSudoku`
 - `python app.py` to start the flask server at `localhost:5000`
 - open the browser and goto `localhost:3000`
 - sudoku grid is initialized with a default grid, click on solve to solve the puzzle
 - puzzle can be added using two methods 1. Edit the grid in the browser, 2. upload an image to the flask server to detect the grid using the `choose file` button
