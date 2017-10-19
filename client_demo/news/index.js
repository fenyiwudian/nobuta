var down = false;
var handler = function(e){
    if(e.type === 'mousemove' && !down){
        return;
    }
    if(e.type === 'mousedown'){
        down = true;
    }
    if(e.type === 'mouseup'){
        down = false;
    }

    var div = document.createElement('div');
    div.textContent = e.type;
    document.body.appendChild(div);
    
}

window.addEventListener('touchstart', handler);
window.addEventListener('mousedown', handler);
window.addEventListener('touchmove', handler);
window.addEventListener('mousemove', handler);
window.addEventListener('touchend', handler);
window.addEventListener('mouseup', handler);
window.addEventListener('click', handler);