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
export default BasicGenerator;