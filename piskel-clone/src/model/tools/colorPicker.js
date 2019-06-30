import Utils from '../utils';

export default class ColorPicker {
  constructor(event, unitSize, ctx, state, primaryColor) {
    this.event = event;
    this.unitSize = unitSize;
    this.ctx = ctx;
    this.state = state;
    this.primaryColor = primaryColor;
  }

  getColor() {
    const { unitSize } = this;
    const x = Math.ceil(this.event.offsetX / unitSize) * unitSize;
    const y = Math.ceil(this.event.offsetY / unitSize) * unitSize;
    const pixelColorData = this.ctx.getImageData(x - unitSize, y - unitSize, unitSize, unitSize);
    const { data } = pixelColorData;
    const red = data[0];
    const green = data[1];
    const blue = data[2];
    const hexColor = Utils.fullColorHex(red, green, blue);
    this.primaryColor.value = hexColor;
    this.state.currentcolor = this.primaryColor.value;
  }
}
