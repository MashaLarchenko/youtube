const colorPicker = document.querySelector('.choose-color');

const paintBucket = document.querySelector(".paint-bucket");

const move = document.querySelector(".move");

const transfotm = document.querySelector(".transfotm");

const currentColor = document.querySelector('.current-color');

const prevColor = document.querySelector(".prev-color");

const tools = document.querySelector(".tools-container");

const figureElem = document.querySelector(".figure-wrapper");

// const fugot = document.querySelector('.figure-item');

const customColor = document.querySelector('input[type="color"]').value;

const state = {
    currentTool: ''
};

tools.addEventListener('click', (event) => {
    if (event.target === colorPicker) {
        state.currentTool = 'colorPicker';
    } else if (event.target.classList.contains('paint-bucket')) {
        state.currentTool = 'paintBucket';
    } else if (event.target === move) {
        state.currentTool = 'move';
    } else if (event.target === transfotm) {
        state.currentTool = 'transform';
    } else {
        state.currentTool = '';
    }
    console.log('click', event);
    console.log(state.currentTool);
});


figureElem.addEventListener('click', (event) => {
    if (state.currentTool === 'paintBucket') {
        let elem = event.target;
        elem.style.backgroundColor = window.getComputedStyle(currentColor).backgroundColor;
        console.log(elem.style.backgroundColor);
    }
});



document.addEventListener('click', (event) => {
    if (state.currentTool === 'colorPicker') {
        let ccolor = window.getComputedStyle(event.target).backgroundColor;
        prevColor.style.backgroundColor = currentColor.style.backgroundColor;
        currentColor.style.backgroundColor = ccolor;
    }
});






// document.addEventListener ('click', (event) => {
//    if(event.target == colorPicker) {
//        state.currentTool = 'colorPicker';
//    } 
//    if (event.target ===  paintBucket) {
//     state.currentTool = 'paintBucket';
//    }
// });


