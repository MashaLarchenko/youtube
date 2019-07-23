import Prewiew from './preview';

export default class Animation {
  constructor(frames) {
    this.frames = frames;
    this.imagesFrames = [];
  }


  animationRender() {
    const previewCanvas = document.querySelector('.preview');
    const that = this;
    let count = 0;
    let timeBefore = 0;
    const fps = document.querySelector('.fps');
    const fpsValue = document.querySelector('.fps_value');
    let interval = fps.value * 100;
    fps.addEventListener('input', () => {
      interval = fps.value * 100;
      fpsValue.innerHTML = fps.value;
    });
    function animate(time) {
      if ((time - timeBefore) >= interval) {
        const images = that.imagesFrames;
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        ctx.drawImage(images[count], 0, 0, previewCanvas.width, previewCanvas.height);
        if (count === images.length - 1) {
          count = 0;
        } else {
          count += 1;
        }
        timeBefore = time;
      }
      requestAnimationFrame(animate);
    }
    this.frames.forEach((item) => {
      const canvas = item.querySelector('.frame_canvas');
      const im = canvas.toDataURL('image/png');
      const img = new Image();
      img.src = im;
      this.imagesFrames.push(img);
      this.frames = [];
    });
    requestAnimationFrame(animate);
    Prewiew.changeScreen();
  }
}
