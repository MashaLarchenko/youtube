

export default class Frames {
  static render() {
    const frame = document.querySelector('.frame');
    const anim = document.querySelector('.prev');
    const context = anim.getContext('2d');

    const frames = document.querySelector('.frames');
    // const main = document.querySelector('.main');
    // const deleteButton = document.querySelector('.delete-button');

    const addButton = document.querySelector('.addFrames');

    let count = 1;

    const framesContainer = [frame];


    addButton.addEventListener('click', (e) => {
      console.log(2);
      count++;
      const newFr = frame.cloneNode(true);
      newFr.className += ` frame${count}`;
      const newButton = newFr.querySelector('.fa-trash-alt');
      const newCopyButton = newFr.querySelector('.fa-copy');
      newCopyButton.className += ` frame${count}`;
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
      if (e.target.classList.contains('fa-copy')) {
        const n = e.target.classList[2];
        const copyEl = document.getElementsByClassName(n);
        console.log(copyEl);
        const copy = copyEl[0].cloneNode(true);
        count++;
        copy.className += ` frame${count}`;
        const nButton = copy.querySelector('.fa-trash-alt');
        nButton.className += ` frame${count}`;
        frames.appendChild(copy);
        framesContainer.push(copy);
      }


      if (e.target.classList.contains('frame')) {
        e.target.className += ' active';
      }
      console.log(e.target.className);
    });

    requestAnimationFrame(() => {
      framesContainer.forEach((el) => {
        const pro = el.children[0].toDataURL('image/png');
        const image = new Image();
        image.src = pro;
        context.drawImage(image, 0, 0, 300, 300);
      });
    });
  }
}
