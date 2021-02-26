
class Cell{
    constructor(row, col, icon){
        this.row = row;
        this.col = col;
        this.icon = icon;
    }

    isAdjacent( other){
        return (this.col == other.col && Math.abs(this.row - other.row) == 1) 
            || (this.row == other.row && Math.abs(this.col - other.col) == 1) 
    }

    print(){
        console.log("col: " + this.col + ", row: " + this.row + ", icon: " + this.icon)
    }
}

class BasicGenerator {
    
    generate = ()=>{
        return Math.floor(Math.random() * 5); 
    }

    initialize = ()=>{
        var size = 8;
        let board = [];
        let line = [];
        for(var i = 0; i<= size * size; i++ ){
            if(i != 0 && i%size == 0){
                board.push(line);
                line = [];
            }
            let rng = Math.floor(Math.random() * 5);
            if(i % size == 0){
                if(i==0){
                    line.push(rng);
                }else{
                    var above = board[board.length -1][i%size];
                    while(rng == above){
                        rng = Math.floor(Math.random() * 5);
                    }
                    line.push(rng);
                }
            }else if(i < size){
                var before = line[i%size -1];
                while(rng == before){
                    rng = Math.floor(Math.random() * 5);
                }
                line.push(rng);
            }else{
                var above = board[board.length -1][i % size];
                var before = line[i%size - 1 ];
                while(rng == above || rng == before){
                    rng = Math.floor(Math.random() * 5);
                }
                line.push(rng);
            }
            line.push();
        }
        return board;
    }
}

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