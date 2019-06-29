
import Frames from '../../frames/frames';

export default class Tools {
  static getColor() {
    const primaryColor = document.querySelector('.firstColor');
    const secondaryColor = document.querySelector('.secondColor');
    const currentFrame = document.querySelector('.frames');
    const tools = document.querySelector('.tools');
    const size = document.querySelector('.size_contaner');
    const toolSize = document.querySelector('.tool-size_container');
    console.log(size.value);
    const canvas = document.querySelector('.draw_canvas');

    const framesCanvas = document.querySelectorAll('.frame_canvas');
    const ctx = canvas.getContext('2d');
    const state = {
      currentTool: '',
      currentcolor: primaryColor.value,
      previColor: secondaryColor.value,
      canvasSize: 32,
      penSize: 1,
      currentSize: '',
      activeFrame: '',
      activeTool: '',
    };
    console.log(state.canvasSize);

    const draw = (ev) => {
      const unitSize = canvas.width / state.canvasSize;
      const x = Math.ceil(ev.offsetX / unitSize) * unitSize;
      const y = Math.ceil(ev.offsetY / unitSize) * unitSize;
      ctx.fillStyle = state.currentcolor;
      ctx.fillRect(x - unitSize, y - unitSize, unitSize * state.penSize, unitSize * state.penSize);
      ctx.fill();
      console.log(unitSize);
    };

    const clear = (ev) => {
      const unitSize = canvas.width / state.canvasSize;
      const x = Math.ceil(ev.offsetX / unitSize) * unitSize;
      const y = Math.ceil(ev.offsetY / unitSize) * unitSize;
      ctx.clearRect(x - unitSize, y - unitSize, unitSize * state.penSize, unitSize * state.penSize);
    };

    const keycode = {
      code: '',
    };
    tools.addEventListener('click', (event) => {
      console.log(event.target);
      if (event.target !== state.activeTool && state.activeTool !== '') {
        state.activeTool.classList.remove('active_tool');
      }
      if (event.target.classList.contains('tool_button')) {
        state.activeTool = event.target;
        state.activeTool.classList.add('active_tool');
      }
      if (event.target.classList.contains('choose-color')) {
        state.currentTool = 'colorPicker';
        console.log(state.currentTool);
      } else if (event.target.classList.contains('paint-bucket')) {
        state.currentTool = 'paintBucket';
      } else if (event.target.classList.contains('move')) {
        state.currentTool = 'move';
      } else if (event.target.classList.contains('transform')) {
        state.currentTool = 'transform';
      } else if (event.target.classList.contains('pen')) {
        state.currentTool = 'pen';
      } else if (event.target.classList.contains('eraster')) {
        state.currentTool = 'eraster';
      } else {
        state.currentTool = '';
      }
    });


    // canvas.addEventListener('click', () => {
    //   if (state.currentTool === 'paint-bucket') {

    //   }
    // });

    canvas.addEventListener('click', (event) => {
      if (state.currentTool === 'colorPicker' || keycode.code === 67) {
        keycode.code = '';
        const unitSize = canvas.width / state.canvasSize;
        const x = Math.ceil(event.offsetX / unitSize) * unitSize;
        const y = Math.ceil(event.offsetY / unitSize) * unitSize;
        const pixelColorData = ctx.getImageData(x - unitSize, y - unitSize, unitSize, unitSize);
        const { data } = pixelColorData;
        console.log(pixelColorData);
        console.log(data);
        const red = data[0];
        const green = data[1];
        const blue = data[2];
        const hexColor = Tools.fullColorHex(red, green, blue);
        console.log(red, green, blue);
        console.log(hexColor);
        primaryColor.value = `#${hexColor}`;
        console.log(primaryColor.value);
      }
    });
    primaryColor.addEventListener('input', () => {
      state.currentcolor = primaryColor.value;
    });

    size.addEventListener('input', () => {
      const { value } = size;
      const sizeValue = value.slice(0, value.indexOf('X'));
      if (state.canvasSize !== sizeValue) {
        if (state.canvasSize < sizeValue) {
          const im = canvas.toDataURL('image/png');
          console.log(im);
          const img = new Image();
          img.src = im;
          console.log(img);
          const newW = canvas.width / (sizeValue / state.canvasSize);
          const newH = canvas.height / (sizeValue / state.canvasSize);
          //   ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, 400, 400);
        }
      }
      state.canvasSize = sizeValue;
    });


    canvas.addEventListener('mousedown', () => {
      if (state.currentTool === 'pen') {
        canvas.addEventListener('click', draw);
        // console.log(state.currentTool);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mousemove', (e) => {
          const currentFrame = Frames.activeFrame;
          const im = canvas.toDataURL('image/png');
          const img = new Image();
          img.src = im;
          const cont = currentFrame.getContext('2d');
          cont.drawImage(img, 0, 0, currentFrame.width, currentFrame.height);
        });
        canvas.addEventListener('mouseup', () => {
        //   currentFrame.addEventListener('click', (e) => {
        //     const im = canvas.toDataURL('image/png');
        //     const img = new Image();
        //     img.src = im;

          //     const cont = e.target.getContext('2d');
          //     cont.drawImage(img, 0, 0, 200, 200);
          //   });
          canvas.removeEventListener('mousemove', draw);
          canvas.removeEventListener('click', draw);
        });
      } else if (state.currentTool === 'eraster') {
        console.log(state.currentTool);

        canvas.addEventListener('mousemove', clear);
        canvas.addEventListener('mouseup', () => {
          canvas.removeEventListener('mousemove', clear);
        });
      }
    });


    toolSize.addEventListener('click', (e) => {
      if (e.target.classList.contains('size-one')) {
        state.penSize = 1;
      } else if (e.target.classList.contains('size-two')) {
        state.penSize = 2;
      } else if (e.target.classList.contains('size-three')) {
        state.penSize = 3;
      } else if (e.target.classList.contains('size-four')) {
        state.penSize = 4;
      }
    });
  }

  static rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  }

  static fullColorHex(r, g, b) {
    const red = Tools.rgbToHex(r);
    const green = Tools.rgbToHex(g);
    const blue = Tools.rgbToHex(b);
    return `${red}${green}${blue}`;
  }
}
