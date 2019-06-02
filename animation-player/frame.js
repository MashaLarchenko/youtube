const frame = document.querySelector('.frame');

const frames = document.querySelector('.frames');
// const main = document.querySelector('.main');
// const deleteButton = document.querySelector('.delete-button');

const addButton = document.querySelector('.addFrames');

let count = 1;

const framesContainer = [frame];


addButton.addEventListener('click', (e) => {
  // console.log(e.target);
  // const newEL = document.createElement('li');
  // console.log(frame);
  // newEL.appendChild(frame);
  count++;
  const newFr = frame.cloneNode(true);
  newFr.className += ` frame${count}`;
  const newButton = newFr.querySelector('.fa-trash-alt');
  newButton.className += ` frame${count}`;
  console.log(newButton);
  frames.appendChild(newFr);
  framesContainer.push(newFr);

  console.log(framesContainer);
});

frames.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-alt')) {
    const item = e.target.classList[2];
    const r = document.getElementsByClassName(item);
     frames.removeChild(r[0]);
  }
});


frames.addEventListener('click', (e) => {
  if (e.target.classList.contains('frame')) {
    e.target.className += ' active';
  }
  console.log(e.target.className);
});
