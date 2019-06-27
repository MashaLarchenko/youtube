export default class Tools {
  static getColor() {
    const primaryColor = document.querySelector('.firstColor');
    const secondaryColor = document.querySelector('.secondColor');
    const tools = document.querySelector('.tools');
    const size = document.querySelector('.size_contaner');
    const toolSize = document.querySelector('.tool-size_container');
    console.log(size.value);
    const canvas = document.querySelector('.draw_canvas');

    const frc = document.querySelector('.frame_canvas');
    const c = frc.getContext('2d');
    const ctx = canvas.getContext('2d');
    const state = {
      currentTool: '',
      currentcolor: primaryColor.value,
      previColor: secondaryColor.value,
      canvasSize: 32,
      penSize: 1,
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
      if (event.target.classList.contains('choose-color')) {
        state.currentTool = 'colorPicker';
      } else if (event.target.classList.contains('paint-bucket')) {
        state.currentTool = 'paintBucket';
      } else if (event.target.classList.contains('move')) {
        state.currentTool = 'move';
      } else if (event.target.classList.contains('transform')) {
        state.currentTool = 'transform';
      } else if (event.target.classList.contains('pen')) {
        state.currentTool = 'pen';
        console.log(event.target);
      } else if (event.target.classList.contains('eraster')) {
        state.currentTool = 'eraster';
        console.log(event.target);
      } else {
        state.currentTool = '';
      }
    });
    document.addEventListener('click', (event) => {
      if (state.currentTool === 'colorPicker' || keycode.code === 67) {
        keycode.code = '';
        const targetColor = window.getComputedStyle(event.target).backgroundColor;
        console.log(targetColor);
        // const hexColor = ColorPicker.convertColor(targetColor);


        // const hexColor = (targetColor) => {
        //   targetColor = targetColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
        //   function hex(x) {
        //     return (`0${  parseInt(x).toString(16)}`).slice(-2);
        //   }
        //   return `#${  hex(targetColor[1])  }${hex(targetColor[2])  }${hex(targetColor[3])}`;
        // };
        // //   state.previColor.style.backgroundColor = state.currentcolor.style.backgroundColor;
        // primaryColor.value = hexColor;
      }
    });
    primaryColor.addEventListener('input', () => {
      state.currentcolor = primaryColor.value;
    });

    size.addEventListener('input', () => {
      const { value } = size;
      const sizeValue = value.slice(0, value.indexOf('X'));
      //   if (state.canvasSize !== sizeValue) {
      //     if (state.canvasSize < sizeValue) {
      //       ctx.scal(2, 0, 0, 2, 0, 0);
      //       ctx.fill();
      //     }
      //   }
      state.canvasSize = sizeValue;
    });


    canvas.addEventListener('mousedown', (e) => {
      if (state.currentTool === 'pen') {
        canvas.addEventListener('click', draw);
        // console.log(state.currentTool);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', (e) => {
        //   currentFrame.addEventListener('click', (e) => {
        //     const im = canvas.toDataURL('image/png');
        //     const img = new Image();
        //     img.src = im;

          //     const cont = e.target.getContext('2d');
          //     cont.drawImage(img, 0, 0, 200, 200);
          //   });
          canvas.removeEventListener('mousemove', draw);
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

  static convertColor(rgb) {
    const srgb = rgb.toString().split(',');
    const r = srgb[0].substring(4);
    const g = srgb[1].substring(1);
    const b = srgb[2].substring(1, srgb[2].length - 1);
    return (`#${ColorPicker.checkNumber((r * 1).toString(16))}${ColorPicker.checkNumber((g * 1).toString(16))}${ColorPicker.checkNumber((b * 1).toString(16))}`).toUpperCase();
  }

  static checkNumber(i) {
    const ni = i.toString();
    if (ni.length === 1) return `0${ni}`;
    return ni;
  }
}
