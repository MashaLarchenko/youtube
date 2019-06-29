import Utils from '../utils';

export default class PaintBucket {
  constructor(canvas, ctx, event, state) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.event = event;
    this.state = state;
  }

  fillColor() {
    const colorLayer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const rgbColor = Utils.hexToRgb(this.state.currentcolor);
    const xPage = this.event.offsetX;
    const yPage = this.event.offsetY;
    const pixelStack = [[xPage, yPage]];
    const pixelColorData = this.ctx.getImageData(xPage, yPage, 1, 1);
    const { data } = pixelColorData;
    const startR = data[0];
    const startG = data[1];
    const startB = data[2];
    const startColor = Utils.fullColorHex(startR, startG, startB);
    if (this.state.currentcolor !== startColor) {
      while (pixelStack.length) {
        let newPos = 0;
        let pixelPos; let reachLeft;
        let reachRight;
        newPos = pixelStack.pop();
        let [x, y] = newPos;

        pixelPos = (y * this.canvas.width + x) * 4;
        while (y-- >= 0 && PaintBucket.matchStartColor(pixelPos, colorLayer, startR, startG, startB)) {
          pixelPos -= this.canvas.width * 4;
        }
        pixelPos += this.canvas.width * 4;
        ++y;
        reachLeft = false;
        reachRight = false;
        while (y++ < this.canvas.height - 1 && PaintBucket.matchStartColor(pixelPos, colorLayer, startR, startG, startB)) {
            PaintBucket.colorPixel(pixelPos, colorLayer, rgbColor);
          if (x > 0) {
            if (PaintBucket.matchStartColor(pixelPos - 4, colorLayer, startR, startG, startB)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }

          if (x < this.canvas.width - 1) {
            if (PaintBucket.matchStartColor(pixelPos + 4, colorLayer, startR, startG, startB)) {
              if (!reachRight) {
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }

          pixelPos += this.canvas.width * 4;
        }
      }
      this.ctx.putImageData(colorLayer, 0, 0);
    }
  }

  static matchStartColor(pixelPos, colorLayer, startR, startG, startB) {
    const r = colorLayer.data[pixelPos];
    const g = colorLayer.data[pixelPos + 1];
    const b = colorLayer.data[pixelPos + 2];

    return (r === startR && g === startG && b === startB);
  }


  static colorPixel(pixelPos, colorLayer, rgbColor) {
    colorLayer.data[pixelPos] = rgbColor[0];
    colorLayer.data[pixelPos + 1] = rgbColor[1];
    colorLayer.data[pixelPos + 2] = rgbColor[2];
    colorLayer.data[pixelPos + 3] = 255;
  }
}
