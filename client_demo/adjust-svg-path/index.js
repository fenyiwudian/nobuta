
const container = document.querySelector('#container');
const assistPoints = document.querySelector('#assist-points');
const assistLines = document.querySelector('#assist-lines');
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

const addPoint = (e) => {
    const parts = getPathDParts();
    const index = Number(e.target.getAttribute('id').split('_')[1]);
    const { x, y } = getTransform();
    const newPart = {
        c: 'L',
        x: e.pageX - x,
        y: e.pageY - y,
    };
    parts.splice(index + 1, 0, newPart);
    updateMainPath(parts);
    updateAssist(parts);
};

const updateAssist = (parts = getPathDParts()) => {
    const lines = [];
    parts.forEach((part, idx) => {
        const next = parts[idx + 1] || parts[0];
        lines.push({ from: part, to: next });
        const id = [part.c, idx].join('_');
        let rect = assistPoints.querySelector('#' + id);
        if (!rect) {
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('id', id);
            rect.setAttribute('width', 6);
            rect.setAttribute('height', 6);
            rect.addEventListener('mousedown', handleRectMouseDown);
            assistPoints.appendChild(rect);
        }
        rect.setAttribute('x', part.x - 3);
        rect.setAttribute('y', part.y - 3);
    });

    lines.forEach((line, index) => {
        const { from, to } = line;
        const id = from.c + to.c + '_' + index;
        let linePath = assistLines.querySelector('#' + id);
        if (!linePath) {
            linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            linePath.setAttribute('stroke', 'transparent');
            linePath.setAttribute('stroke-width', '4');
            linePath.setAttribute('id', id);
            linePath.addEventListener('click', addPoint);
            assistLines.appendChild(linePath);
        }
        linePath.setAttribute('d', `M${from.x} ${from.y} L${to.x} ${to.y} Z`);
    });
};


let prevX = 0;
let prevY = 0;

const isSamePart = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const getTransform = () => {
    const transform = container.getAttribute('transform');
    const match = transform.match(/-?\d+/g);
    const x = Number(match[0]);
    const y = Number(match[1]);
    return { x, y };
};


const moveAll = (e) => {
    const deltaX = e.pageX - prevX;
    const deltaY = e.pageY - prevY;
    const { x, y } = getTransform();
    const newTransform = `translate(${x + deltaX},${y + deltaY})`;
    container.setAttribute('transform', newTransform);
    prevX += deltaX;
    prevY += deltaY;
};

const updateMainPath = (parts) => {
    const newD = parts.reduce((rs, part) => {
        if (rs) {
            rs += ' ';
        }
        rs += part.c + (part.x) + ' ' + (part.y);
        return rs;
    }, '') + ' Z';
    path.setAttribute('d', newD);
};


const movePart = (e) => {
    const parts = getPathDParts();
    const target = currentRectTarget;
    const partX = Number(target.getAttribute('x'));
    const partY = Number(target.getAttribute('y'));
    const targetPart = parts.find(tmp => {
        return tmp.x - 3 === partX && tmp.y - 3 === partY;
    });
    const deltaX = e.pageX - prevX;
    const deltaY = e.pageY - prevY;
    prevX += deltaX;
    prevY += deltaY;
    if (targetPart) {
        for (const temp of parts) {
            if (isSamePart(temp, targetPart)) {
                temp.x += deltaX;
                temp.y += deltaY;
            }
        }
    }
    updateMainPath(parts);
    updateAssist(parts);
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

updateAssist();