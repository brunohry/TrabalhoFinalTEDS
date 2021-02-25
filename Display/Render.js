import iconmappr from "../Object/iconmapper.js"

class Render{
    ConsoleDisplay = board =>{
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        let display = "    ";
        let pos = 0;
        board.forEach(line => {
            display += '<div onclick="selectItem(event)" class="row play-row">';
            pos ++;
            line.forEach(item =>{
                
                display += iconmappr[item] + " ";
            })
            display += '</div>';
        });
        console.log(display);
        return display
    }

}

export default Render