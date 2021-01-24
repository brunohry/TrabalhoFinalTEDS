import GameImpl from "./Logic/GameImpl.js";
import Demo from "./Display/Demo.js";
import Cell from "./Object/Cell.js"
import readline from 'readline-sync';

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
var display = new Demo();
var game = new GameImpl();

display.ConsoleDisplay(game.board);
let pos = ""
let direcao = "";
while(true){
    console.log("Seu Score é: " + game.score)
    pos = readline.question("A posicao da peca que ira mover(ex: A1) \n");
    let cella = new Cell(alphabet.indexOf(pos[0].toUpperCase()), pos[1], game.getIcon(alphabet.indexOf(pos[0].toUpperCase()), pos[1]))
    direcao  = readline.question("Digite a direcao (cima, baixo , esquera ou direita) \n");
    let cellb;
    switch(direcao){
        case "cima":
            cellb = new Cell(parseInt(cella.row) - 1, cella.col, game.getIcon(parseInt(cella.row) - 1, cella.col));
            break;
        case "baixo":
            cellb = new Cell(parseInt(cella.row) + 1, cella.col, game.getIcon(parseInt(cella.row) + 1, cella.col));
            break;
        case "esquerda":
            cellb = new Cell(cella.row, parseInt(cella.col) - 1, game.getIcon(cella.row, parseInt(cella.col) - 1 ));
            break;
        case "direita":
            cellb = new Cell(cella.row, parseInt(cella.col) + 1, game.getIcon(cella.row, parseInt(cella.col) + 1));
            break;
        default:
            console.log("direcao invalida")
    }
    if(!cellb || cellb.row < 0 || cellb.col < 0 
    || cellb.col > game.board.length  || cellb.row > game.board.length){
        cellb.print()
        cella.print()
        console.log("movimento fora do tabuleiro")
    }else if(game.select(cella,cellb)){
        while(game.findRuns(true).length > 0){
            game.collapseColumns();
            game.fillColumns()
            console.log("Seu Score é: " + game.score)
            display.ConsoleDisplay(game.board);
        }
    }else{
        console.log("movimento não gera mucanca no tabuleiro")
    }
    
}


