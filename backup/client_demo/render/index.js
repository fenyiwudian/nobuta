const blocks = [];
let currentTop = 0;
let currentStep = 2;
let reverseTime = 0;

function random255() {
  return Math.round(Math.random() * 255);
}

function init() {
  for (let i = 0; i < 1000; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.background = `rgb(${random255()},${random255()},${random255()})`;
    blocks.push(block);
    document.body.appendChild(block);
  }
}

function update() {
  if (currentTop >= 500) {
    currentStep = -2;
  } else if (currentTop <= 0) {
    reverseTime += 1;
    currentStep = 2;
  }
  currentTop += currentStep;
  blocks.forEach((block, i) => {
    const top = currentTop ;
    const left = currentTop * (i + 1) / blocks.length;
    const br = currentTop / 50;
    block.style.top = `${top}px`;
    block.style.left = `${left}px`;
    block.style.borderRadius = `${br}px`;
  });
}
let animating = false;
let startTime = 0;
function animate() {
  window.setTimeout(() => {
    update();
    if (reverseTime < 3) {
      animate();
    } else {
      animating = false;
      console.log(`animation time:${Date.now() - startTime}`);
    }
  }, 16.67);
}
init();
document.body.querySelector('button').addEventListener('click', () => {
  if (animating) {
    return;
  }
  startTime = Date.now();
  animating = true;
  reverseTime = 0;
  animate();
});
