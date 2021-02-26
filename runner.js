

var iconmappr = {
    0 :'<div id="XXX" class="col play-col"><img class="jewel" src="./imgs/bootstrap.png" alt=""></div>',
    1 : '<div id="XXX" class="col play-col"><img class="jewel" src="./imgs/php.png" alt=""></div>',
    2 : '<div id="XXX" class="col play-col"><img class="jewel" src="./imgs/python.png" alt=""></div>',
    3 : '<div id="XXX" class="col play-col"><img class="jewel" src="./imgs/html.png" alt=""></div>',
    4 : '<div id="XXX" class="col play-col"><img class="jewel" src="./imgs/css.png" alt=""></div>',
    5 : '<div id="XXX" class="col play-col"><img class="jewel" src="./imgs/js.png" alt=""></div>',
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class Render{
    ConsoleDisplay = (board) =>{
        var table = document.getElementById("Tabuleiro");
        let display = "";
        let posy = 0;
        let posx = 0;
            board.forEach(line => {
                display += '<div id="'+ posy + '" onclick="selectItem(event)" class="row play-row">';
                posy ++;
                posx = 0 ;
                line.forEach(item =>{
                    if(item != null)
                        display += iconmappr[item].replace("XXX", posx) + " ";
                    else
                        display += '<div id="XXX" class="col play-col"></div> '
                    posx ++;
                })
                display += '</div>';
            });
            table.innerHTML = display
            return display
        }

        AsyncDisplay = async (board, time) => {
            await sleep(time);
            this.ConsoleDisplay(board);
        }
    

}

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
        this.moves = 0;
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

    swapCells = (cella, cellb, item1, item2) => {
        var iconb = cellb.icon
        this.board[cellb.row][cellb.col] = cella.icon
        this.board[cella.row][cella.col] = iconb;
        let val1, val2;
        val1 = item1.src;
        val2 = item2.src;

        item1.src = val2;
        item2.src = val1;
    }

    findRuns = async (doMarkAndUpdateScore)=> {
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
                } 
                if (i + 1 < this.board.length && this.board[i][j] == this.board[i + 1][j]) {
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
            console.log("antes")
            await display.AsyncDisplay(game.board, 50);
            console.log("depois")

        }
        console.log(runs)
        return runs;

    }
    select = async (cella, cellb, item1, item2) => {
        let isValid = false;
        if (cella.icon != cellb.icon
            && cella.isAdjacent(cellb)) {
                cella.print();
                cellb.print();
                this.swapCells(cella, cellb, item1, item2)
                var runs = await this.findRuns(false);
                isValid = runs.length > 0;
                if(!isValid){
                    let iconb = cellb.icon;
                    cellb.icon = cella.icon;
                    cella.icon = iconb;
                    this.swapCells(cella, cellb, item1, item2)
                }
        }
        return isValid;
    }


    collapseColumns = async ()=>{
        for (var i = 0; i <  this.board.length; i ++) {
            for (var j = 0; j < this.board.length; j++) {
                if(this.board[j][i] == null && j > 0){
                    this.board[j][i] = this.board[j - 1][i];
                    if(this.board[j - 1][i] != null){
                        this.board[j - 1][i] = null;
                        i = 0;
                        j = 0;
                    }
                    await display.AsyncDisplay(game.board,20);
                }
            }
        }
        
    }

    fillColumns =async () =>{
        for (var i = this.board.length - 1 ; i >= 0; i--) {
            for (var j = 0; j < this.board.length; j++) {
                if(this.board[i][j] == null ){
                    this.board[i][j] = this.generator.generate();
                    await display.AsyncDisplay(game.board, 50)
                }
            }
        }
    }

}

var game = new GameImpl();
var display = new Render();

display.ConsoleDisplay(game.board);


var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

let pos = ""
let direcao = "";
var placar = document.getElementById("Placar");
placar.innerHTML = "Placar:  " + game.score + "<br> Movimentos: " + game.moves;
var selected = []

async function selectItem(event){
    console.log(event.target.src);
    if (selected.length == 0){
        let y = event.target.parentElement.parentElement.id;
        let x = event.target.parentElement.id;
        let cella = new Cell(y, x, game.getIcon(y,x))
        console.log(cella)
        selected.push(cella);
        selected.push(event.target)
        event.target.style.border = "thick solid #0000FF";
    }
    else {
        var first = selected.pop();
        var cella = selected.pop();
        let runs = [];
        let y = event.target.parentElement.parentElement.id;
        let x = event.target.parentElement.id;
        let cellb = new Cell(y, x, game.getIcon(y,x))
        console.log(cellb)
        var curr = event.target
        if(!cellb || cellb.row < 0 || cellb.col < 0 
            || cellb.col > game.board.length  || cellb.row > game.board.length){
                cellb.print()
                cella.print()
                console.log("movimento fora do tabuleiro")
            }else if(await game.select(cella,cellb, first.parentElement, event.target.parentElement)){
                runs = await game.findRuns(true);
                runs = runs.length
                console.log("runs = " + runs)
                game.moves +=1;
                while(runs > 0){
                    console.log("entrei")
                    await game.collapseColumns();
                    await game.fillColumns()
                    console.log("Seu Score é: " + game.score)
                    await display.AsyncDisplay(game.board, 20);
                    var placar = document.getElementById("Placar");
                    placar.innerHTML = "Placar:  " + game.score + "<br> Movimentos: " + game.moves;
                    runs = await game.findRuns(true);
                    runs = runs.length
                }
            }else{
                console.log("movimento não gera mucanca no tabuleiro")
            }
        first.style.border = "";
    }
}

    



