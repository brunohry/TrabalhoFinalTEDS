class Demo{
    ConsoleDisplay = board =>{
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        let display = "    ";
        let pos = 0;
        for(var i = 0; i < board.length; i++){
            display += i + " ";
        }
        display += "\n";
        display += "\n";
        board.forEach(line => {
            display += alphabet[pos] + "   ";
            pos ++;
            line.forEach(item =>{
                var charMap = [ "@", "#", "$", "%", "&", "*"]; 
                display += charMap[item] + " ";
            })
            display += "\n";
        });
        console.log(display)
    }

}

export default Demo