
const svgContainer = document.querySelector('svg');
const path = document.querySelector('#my-path');


const getPathDParts = () => {
    const d = path.getAttribute('d');
    const ds = d.replace(/\s+/g, ' ').split(' ');
    const parts = [];
    for (let i = 0; i < ds.length; i += 2) {
        if (!ds[i + 1]) {
            break;
        }
        const match = ds[i].match(/^([A-Z])(-?\d+)/);
        const part = {
            c: match[1],
            x: Number(match[2]),
            y: Number(ds[i + 1]),
        };
        parts.push(part);
    }
    return parts;
};

const updateAssistPoint = (parts = getPathDParts()) => {
    parts.forEach((part, idx) => {
        const id = [part.c, idx].join('_');
        let rect = svgContainer.querySelector('#' + id);
        if (!rect) {
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('id', id);
            rect.setAttribute('width', 4);
            rect.setAttribute('height', 4);
            rect.setAttribute('stroke', 'black');
            rect.setAttribute('fill', 'transparent');
            rect.setAttribute('stroke-width', '2');
            svgContainer.appendChild(rect);
        }
        rect.setAttribute('x', part.x - 2);
        rect.setAttribute('y', part.y - 2);
    });
};


let prevX = 0;
let prevY = 0;
const move = (e) => {
    const parts = getPathDParts();
    const deltaX = e.pageX - prevX;
    const deltaY = e.pageY - prevY;
    prevX += deltaX;
    prevY += deltaY;
    const newD = parts.reduce((rs, part) => {
        part.x += deltaX;
        part.y += deltaY;
        if (rs) {
            rs += ' ';
        }
        rs += part.c + (part.x) + ' ' + (part.y);
        return rs;
    }, '') + ' Z';
    path.setAttribute('d', newD);
    updateAssistPoint();
};

path.addEventListener('mousedown', (e) => {
    prevX = e.pageX;
    prevY = e.pageY;
    document.addEventListener('mousemove', move);
});

document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', move);
});



path.addEventListener('click', function () {
    console.log('click');
});

updateAssistPoint();