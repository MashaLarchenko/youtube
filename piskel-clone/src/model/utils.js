export default class Utils {
  static rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  }

  static fullColorHex(r, g, b) {
    const red = Utils.rgbToHex(r);
    const green = Utils.rgbToHex(g);
    const blue = Utils.rgbToHex(b);
    return `#${red}${green}${blue}`;
  }

  static hexToRgb(hex) {
    let r = 0;
    let g = 0;
    let b = 0;
    if (hex.length === 4) {
      r = `0x${hex[1]}${hex[1]}`;
      g = `0x${hex[2]}${hex[2]}`;
      b = `0x${hex[3]}${hex[3]}`;
    } else if (hex.length === 7) {
      r = `0x${hex[1]}${hex[2]}`;
      g = `0x${hex[3]}${hex[4]}`;
      b = `0x${hex[5]}${hex[6]}`;
    }
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  }
}
