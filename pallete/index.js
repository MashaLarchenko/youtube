

const currentColor = document.querySelector('.current-color');

const prevColor = document.querySelector('.prev-color');

const tools = document.querySelector('.tools-container');

const figureElem = document.querySelector('.figure-wrapper');

const dragEl = document.querySelector('.figure-item');

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


function moveCoord(e) {
  e.target.style.left = `${e.pageX - e.target.offsetWidth / 2}px`;
  e.target.style.top = `${e.pageY - e.target.offsetHeight / 2}px`;
  e.target.style.zIndex = 50;
}


function getCode(e) {
  keycode.code = e.keyCode;
  if (keycode.code !== e.keyCode) {
    keycode.code = '';
  }
}

document.addEventListener('keydown', getCode);


figureElem.addEventListener('mousedown', (e) => {
  if (state.currentTool === 'move' || keycode.code === 77) {
    e.target.style.position = 'absolute';
    moveCoord(e);
    document.body.appendChild(dragEl);
    e.target.style.zIndex = 20;

    document.onmousemove = function (evt) {
      moveCoord(evt);
    };

    figureElem.onmouseup = function () {
      document.onmousemove = null;
      figureElem.onmouseup = null;
      figureElem.onkeydown = null;
    };

    figureElem.ondragstart = function () {
      return false;
    };
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
    if (event.target === customColor) {
      const customValue = document.getElementById('customColor').value;
      state.currentcolor.style.backgroundColor = customValue;
    } else {
      const targetColor = window.getComputedStyle(event.target).backgroundColor;
      state.previColor.style.backgroundColor = state.currentcolor.style.backgroundColor;
      state.currentcolor.style.backgroundColor = targetColor;
    }
  }
});
