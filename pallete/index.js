

const currentColor = document.querySelector('.current-color');

const prevColor = document.querySelector('.prev-color');

const tools = document.querySelector('.tools-container');

const figureElem = document.querySelector('.figure-wrapper');

const customColor = document.getElementById('customColor');

const state = {
  currentTool: '',
  currentcolor: currentColor,
  previColor: prevColor,
};

const keycode = {
  code: '',
};


const stor = JSON.stringify(state);

localStorage.setItem('state', stor);


function changeShape(event) {
  if (event.target.classList.contains('square')) {
    event.target.classList.remove('square');
    event.target.classList.add('circle');
  } else {
    event.target.classList.add('square');
    event.target.classList.remove('circle');
  }
}


function getCode(e) {
  keycode.code = e.keyCode;
  if (keycode.code !== e.keyCode) {
    keycode.code = '';
  }
}


document.addEventListener('keydown', getCode);

let offsetXval;
let offsetYval;

figureElem.addEventListener('dragstart', (e) => {
  offsetXval = e.offsetX;
  offsetYval = e.offsetY;
});


figureElem.addEventListener('dragend', (e) => {
  if (state.currentTool === 'move' || keycode.code === 77) {
    e.target.style.position = 'absolute';
    e.target.style.top = `${(e.pageY - offsetYval)}px`;
    e.target.style.left = `${(e.pageX - offsetXval)}px`;
  }
});


tools.addEventListener('click', (event) => {
  if (event.target.classList.contains('choose-color')) {
    state.currentTool = 'colorPicker';
  } else if (event.target.classList.contains('paint-bucket')) {
    state.currentTool = 'paintBucket';
  } else if (event.target.classList.contains('move')) {
    state.currentTool = 'move';
  } else if (event.target.classList.contains('transform')) {
    state.currentTool = 'transform';
  } else {
    state.currentTool = '';
  }
});


figureElem.addEventListener('click', (event) => {
  if (state.currentTool === 'paintBucket' || keycode.code === 80) {
    const elem = event.target;
    elem.style.backgroundColor = window.getComputedStyle(currentColor).backgroundColor;
  } else if (state.currentTool === 'transform' || keycode.code === 84) {
    changeShape(event);
  }
});


document.addEventListener('click', (event) => {
  if (state.currentTool === 'colorPicker' || keycode.code === 67) {
    keycode.code = '';
    const targetColor = window.getComputedStyle(event.target).backgroundColor;
    state.previColor.style.backgroundColor = state.currentcolor.style.backgroundColor;
    state.currentcolor.style.backgroundColor = targetColor;
  }
});

customColor.addEventListener('input', () => {
  const customValue = document.getElementById('customColor').value;
  state.currentcolor.style.backgroundColor = customValue;
});
