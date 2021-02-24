import BasicGenerator from "./BasicGenerator.js";
import Render from "../Display/Render.js"
import Cell from "../Object/Cell.js"

class GameImpl {
    constructor() {
        this.score = 0;
        this.baseScore = 10;
        this.generator = new BasicGenerator();
        this.board = this.generator.initialize()
    }

    getIcon = (l, c) => {
        if (this.board.length >= c && this.board.length >= l)
            return this.board[l][c]
        else return null
    }

    setIcon = (l, c, icon) =>
        this.board[c][l] = icon;

    getScore = () => { return score }

    swapCells = (cella, cellb) => {
        var iconb = cellb.icon
        this.board[cellb.row][cellb.col] = cella.icon
        this.board[cella.row][cella.col] = iconb;
    }

    findRuns = (doMarkAndUpdateScore) => {
        let runs = [];
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board.length; j++) {
                var baseIcon = this.board.icon;
                if (j + 1 < this.board.length && this.board[i][j] == this.board[i][j + 1]) {
                    if (j + 2 < this.board.length && this.board[i][j] == this.board[i][j + 2]) {
                        let cell = new Cell(i, j, this.board[i][j]);
                        runs.push(cell);
                        cell = new Cell(i, j + 1, this.board[i][j]);
                        runs.push(cell);
                        cell = new Cell(i, j + 2, this.board[i][j]);
                        runs.push(cell);
                    }
                } else if (i + 1 < this.board.length && this.board[i][j] == this.board[i + 1][j]) {
                    if (i + 2 < this.board.length && this.board[i][j] == this.board[i + 2][j]) {
                        let cell = new Cell(i, j, this.board[i][j]);
                        runs.push(cell);
                        cell = new Cell(i + 1, j, this.board[i][j]);
                        runs.push(cell);
                        cell = new Cell(i + 2, j, this.board[i][j]);
                        runs.push(cell);
                    }
                }
            }
        }
        if(doMarkAndUpdateScore){
            runs.forEach(cell =>{
                if(this.board[cell.row][cell.col] != null){
                    this.score += this.baseScore;
                }
                this.board[cell.row][cell.col] = null;
            })
        }
        return runs;

    }
    select = (cella, cellb) => {
        let isValid = false;
        if (cella.icon != cellb.icon
            && cella.isAdjacent(cellb)) {
                cella.print();
                cellb.print();
                this.swapCells(cella, cellb)
                var runs = this.findRuns(false);
                isValid = runs.length > 0;
                if(!isValid){
                    let iconb = cellb.icon;
                    cellb.icon = cella.icon;
                    cella.icon = iconb;
                    this.swapCells(cella, cellb)
                }
        }
        return isValid;
    }

    collapseColumns =()=>{
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board.length; j++) {
                if(this.board[i][j] == null && i > 0){
                    this.board[i][j] = this.board[i - 1][j];
                    this.board[i - 1][j] = null;
                }
            }
        }
        
    }

    fillColumns =() =>{
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board.length; j++) {
                if(this.board[i][j] == null ){
                    this.board[i][j] = this.generator.generate();
                }
            }
        }
    }

}

export default GameImpl