

export default class Frames {
  constructor() {
    this.activeFrame = '';
  }

  static render() {
    const frame = document.querySelector('.frame');
    const frameCanvas = frame.querySelector('.frame_canvas');
    const anim = document.querySelector('.prev');
    const context = anim.getContext('2d');
    const frames = document.querySelector('.frames');
    const drawCanvas = document.querySelector('.draw_canvas');
    const drawCtx = drawCanvas.getContext('2d');
    // const main = document.querySelector('.main');
    // const deleteButton = document.querySelector('.delete-button');

    const addButton = document.querySelector('.addFrames');
    this.activeFrame = frameCanvas;
    console.log(this.activeFrame);
    let count = 1;

    const framesContainer = [frame];


    addButton.addEventListener('click', (e) => {
      count++;
      this.activeFrame.classList.remove('active_tool');
      const newFr = frame.cloneNode(true);
      newFr.className += ` frame${count}`;
      const newframeCanvas = newFr.querySelector('.frame_canvas');
      this.activeFrame = newframeCanvas;
      this.activeFrame.classList.add('active_tool');
      console.log(this.activeFrame);
      const newButton = newFr.querySelector('.fa-trash-alt');
      const newCopyButton = newFr.querySelector('.fa-copy');
      newCopyButton.className += ` frame${count}`;
      newButton.className += ` frame${count}`;
      console.log(newButton);
      frames.appendChild(newFr);
      framesContainer.push(newFr);
      drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      console.log(this.activeFrame);
    });

    frames.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-trash-alt')) {
        const item = e.target.classList[2];
        const r = document.getElementsByClassName(item);
        frames.removeChild(r[0]);
      }
    });

    frames.addEventListener('click', (e) => {
      console.log(this.activeFrame);
      if (e.target !== this.activeFrame && this.activeFrame !== '') {
        this.activeFrame.classList.remove('active_tool');
      }
      if (e.target.classList.contains('frame_canvas')) {
        this.activeFrame = e.target;
        this.activeFrame.classList.add('active_tool');
      }
      console.log(this.activeFrame);
      if (e.target.classList.contains('fa-copy')) {
        const n = e.target.classList[2];
        console.log(n);
        const copyEl = document.getElementsByClassName(n);
        console.log(copyEl);
        const copy = copyEl[0].cloneNode(true);
        console.log(copy);
        const targetCanvas = copyEl[0].querySelector('.frame_canvas');
        const curCanvas = copy.querySelector('.frame_canvas');
        const copyCtx = curCanvas.getContext('2d');
        const copyImg = targetCanvas.toDataURL('image/png');
        const img = new Image();
        img.src = copyImg;
        drawCtx.imageSmoothingEnabled = false;
        copyCtx.drawImage(img, 0, 0, curCanvas.width, curCanvas.height);
        count++;
        copy.classList.remove(n);
        copy.classList.add(`frame${count}`);
        console.log(copy);
        const nButton = copy.querySelector('.fa-trash-alt');
        nButton.classList.remove(n);
        nButton.classList.add(`frame${count}`);
        frames.appendChild(copy);
        framesContainer.push(copy);
      }

      console.log(e.target.className);
    });

    frames.addEventListener('click', () => {
      const currentFrame = this.activeFrame;
      const im = currentFrame.toDataURL('image/png');
      const img = new Image();
      img.src = im;
      // const cont = currentFrame.getContext('2d');
      drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      drawCtx.imageSmoothingEnabled = false;
      drawCtx.drawImage(img, 0, 0, drawCanvas.width, drawCanvas.height);
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
