var selected = []



function checkBoundaries(item1, item2){
    var playArea = document.getElementsByClassName("playarea")[0]
    var h = playArea.offsetHeight / 8
    var w = playArea.offsetWidth / 8
    
    if(Math.abs(item1.offsetLeft - item2.offsetLeft) > w || Math.abs(item1.offsetTop - item2.offsetTop) > h){
        console.log('NOT OK');
        return false
    }
    console.log("OK");
    return true
}

function swap(item1, item2) {
    console.log(item1, item2);
    let val1, val2;
    val1 = item1.src;
    val2 = item2.src;

    item1.src = val2;
    item2.src = val1;
}

