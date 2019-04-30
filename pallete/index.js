

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


const stor = JSON.stringify(state);


localStorage.setItem('state', stor);

const s = localStorage.getItem('state');

function changeShape(event) {
  if (event.target.classList.contains('square')) {
    event.target.classList.remove('square');
    event.target.classList.add('circle');
  } else {
    event.target.classList.add('square');
    event.target.classList.remove('circle');
  }
}


function key(ev) {
  if (event.onkeydown = e => e.keyCode === '0x43') {
    console.log(ev);
    return true;
  }
}

figureElem.addEventListener('mousedown', (e) => {
  if (state.currentTool === 'move') {
    e.target.style.position = 'absolute';
    moveAt(e);
    document.body.appendChild(dragEl);
    e.target.style.zIndex = 20;

    function moveAt(e) {
      e.target.style.left = `${e.pageX - e.target.offsetWidth / 2}px`;
      e.target.style.top = `${e.pageY - e.target.offsetHeight / 2}px`;
      e.target.style.zIndex = 50;
    }

    document.onmousemove = function (e) {
      moveAt(e);
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
  // console.log('click', event);
  // console.log(state.currentTool);
});


figureElem.addEventListener('click', (event) => {
  if (state.currentTool === 'paintBucket') {
    const elem = event.target;
    elem.style.backgroundColor = window.getComputedStyle(currentColor).backgroundColor;
  } else if (state.currentTool === 'transform') {
    changeShape(event);
  }
});


document.addEventListener('click', (event) => {
  if (state.currentTool === 'colorPicker') {
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
