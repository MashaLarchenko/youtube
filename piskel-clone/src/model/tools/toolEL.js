export default class Tools {
  static getColor() {
    const primaryColor = document.querySelector('.firstColor');
    const secondaryColor = document.querySelector('.secondColor');
    const tools = document.querySelector('.tools');
    console.log(tools);
    const canvas = document.querySelector('.draw_canvas');

    const frc = document.querySelector('.frame_canvas');
    console.log(frc);
    const c = frc.getContext('2d');
    const ctx = canvas.getContext('2d');
    const state = {
      currentTool: '',
      currentcolor: primaryColor.value,
      previColor: secondaryColor.value,
    };
    const draw = (ev) => {
      const x = ev.offsetX;
      const y = ev.offsetY;
      ctx.fillStyle = state.currentcolor;
      ctx.fillRect(x - 5, y - 5, 10, 10);
      ctx.fill();
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

    canvas.addEventListener('mousedown', (e) => {
      if (state.currentTool === 'pen') {
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
