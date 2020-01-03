
const container = document.querySelector('#container');
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
        let rect = container.querySelector('#' + id);
        if (!rect) {
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('id', id);
            rect.setAttribute('width', 4);
            rect.setAttribute('height', 4);
            rect.setAttribute('stroke', 'black');
            rect.setAttribute('fill', 'transparent');
            rect.setAttribute('stroke-width', '2');
            rect.addEventListener('mousedown', handleRectMouseDown);
            container.appendChild(rect);
        }
        rect.setAttribute('x', part.x - 2);
        rect.setAttribute('y', part.y - 2);
    });
};


let prevX = 0;
let prevY = 0;

const isSamePart = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};


const moveAll = (e) => {
    const deltaX = e.pageX - prevX;
    const deltaY = e.pageY - prevY;
    const transform = container.getAttribute('transform');
    const match = transform.match(/-?\d+/g);
    const x = Number(match[0]);
    const y = Number(match[1]);
    const newTransform = `translate(${x + deltaX},${y + deltaY})`;
    container.setAttribute('transform', newTransform);
    prevX += deltaX;
    prevY += deltaY;

};

const movePart = (e) => {
    const parts = getPathDParts();
    const target = currentRectTarget;
    const partX = Number(target.getAttribute('x'));
    const partY = Number(target.getAttribute('y'));
    const targetPart = parts.find(tmp => {
        return tmp.x - 2 === partX && tmp.y - 2 === partY;
    });
    const deltaX = e.pageX - prevX;
    const deltaY = e.pageY - prevY;
    prevX += deltaX;
    prevY += deltaY;
    const newD = parts.reduce((rs, part) => {
        if (!targetPart || isSamePart(targetPart, part)) {
            part.x += deltaX;
            part.y += deltaY;
        }
        if (rs) {
            rs += ' ';
        }
        rs += part.c + (part.x) + ' ' + (part.y);
        return rs;
    }, '') + ' Z';
    path.setAttribute('d', newD);
    updateAssistPoint();
};

let currentRectTarget = null;

const handleRectMouseDown = (e) => {
    currentRectTarget = e.target;
    prevX = e.pageX;
    prevY = e.pageY;
    document.addEventListener('mousemove', movePart);
};


path.addEventListener('mousedown', (e) => {
    prevX = e.pageX;
    prevY = e.pageY;
    document.addEventListener('mousemove', moveAll);
});

document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveAll);
    document.removeEventListener('mousemove', movePart);
    currentRectTarget = null;
});



path.addEventListener('click', function (e) {
    console.log('click', e.pageX, e.pageY);
});

updateAssistPoint();