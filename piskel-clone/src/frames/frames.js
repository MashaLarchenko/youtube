import Animation from '../model/animation';

export default class Frames {
  constructor() {
    this.activeFrame = '';
  }

  static start() {
    const frame = document.querySelector('.frame');
    const frameCanvas = frame.querySelector('.frame_canvas');
    const frames = document.querySelector('.frames');
    const frameWrapper = document.querySelector('.frame_wrapper');
    const drawCanvas = document.querySelector('.draw_canvas');

    window.addEventListener('resize', () => {
      const drawCanwasWidth = drawCanvas.offsetWidth;
      const drawCanwasHeight = drawCanvas.offsetHeight;
      drawCanvas.setAttribute('width', `${drawCanwasWidth}px`);
      drawCanvas.setAttribute('height', `${drawCanwasHeight}px`);
    });


    const drawCtx = drawCanvas.getContext('2d');
    const framesContainer = [];
    const addButton = document.querySelector('.addFrames');
    this.activeFrame = frameCanvas;
    let count = 1;
    framesContainer.push(frame);


    addButton.addEventListener('click', () => {
      count += 1;
      this.activeFrame.classList.remove('active_tool');
      const newFr = frame.cloneNode(true);
      newFr.className += ` frame${count}`;
      const newframeCanvas = newFr.querySelector('.frame_canvas');
      this.activeFrame = newframeCanvas;
      this.activeFrame.classList.add('active_tool');
      const newButton = newFr.querySelector('.fa-trash-alt');
      const newCopyButton = newFr.querySelector('.fa-copy');
      newCopyButton.className += ` frame${count}`;
      newButton.className += ` frame${count}`;
      frameWrapper.appendChild(newFr);
      framesContainer.push(newFr);
      drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      const animation = new Animation(framesContainer);
      animation.animationRender(framesContainer);
    });
    frames.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-trash-alt')) {
        const item = e.target.classList[2];
        const r = document.getElementsByClassName(item);
        frameWrapper.removeChild(r[0]);
      }
    });

    frames.addEventListener('click', (e) => {
      if (e.target !== this.activeFrame && this.activeFrame !== '') {
        this.activeFrame.classList.remove('active_tool');
      }
      if (e.target.classList.contains('frame_canvas')) {
        this.activeFrame = e.target;
        this.activeFrame.classList.add('active_tool');
      }
      if (e.target.classList.contains('fa-copy')) {
        const numberElement = e.target.classList[2];
        const copyEl = document.getElementsByClassName(numberElement);
        const copy = copyEl[0].cloneNode(true);
        const targetCanvas = copyEl[0].querySelector('.frame_canvas');
        const curCanvas = copy.querySelector('.frame_canvas');
        const copyCtx = curCanvas.getContext('2d');
        const copyImg = targetCanvas.toDataURL('image/png');
        const img = new Image();
        img.src = copyImg;
        drawCtx.imageSmoothingEnabled = false;
        copyCtx.drawImage(img, 0, 0, curCanvas.width, curCanvas.height);
        count += count;
        copy.classList.remove(numberElement);
        copy.classList.add(`frame${count}`);
        const nButton = copy.querySelector('.fa-trash-alt');
        nButton.classList.remove(numberElement);
        nButton.classList.add(`frame${count}`);
        frameWrapper.appendChild(copy);
        framesContainer.push(copy);
      }
    });

    frames.addEventListener('click', () => {
      const currentFrame = this.activeFrame;
      const im = currentFrame.toDataURL('image/png');
      const img = new Image();
      img.src = im;
      drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      drawCtx.imageSmoothingEnabled = false;
      drawCtx.drawImage(img, 0, 0, drawCanvas.width, drawCanvas.height);
    });
  }
}
