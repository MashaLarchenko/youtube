
import Frames from '../../frames/frames';
import PaintBucket from './Backet';
import ColorPicker from './colorPicker';

export default class Tools {
  static start() {
    const primaryColor = document.querySelector('.firstColor');
    const secondaryColor = document.querySelector('.secondColor');
    const tools = document.querySelector('.tools');
    const cleanButton = document.querySelector('.clean');
    const size = document.querySelector('.size_container');
    const toolSize = document.querySelector('.tool-size_container');
    const canvas = document.querySelector('.draw_canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.fillStyle = '#e6e6e6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const state = {
      currentTool: '',
      currentcolor: primaryColor.value,
      previColor: secondaryColor.value,
      canvasSize: 32,
      penSize: 1,
      currentSize: '',
      activeFrame: '',
      activeTool: '',
      activePenSize: '',
      fullCoord: [],
      painting: false,
    };
    const unitSize = canvas.width / state.canvasSize;

    const keycode = {
      code: '',
    };

    const getCode = (e) => {
      keycode.code = e.key;
      if (keycode.code !== e.key) {
        keycode.code = '';
      }
    };
    document.addEventListener('keydown', getCode);
    const draw = (ev) => {
      const x = Math.ceil(ev.offsetX / unitSize) * unitSize;
      const y = Math.ceil(ev.offsetY / unitSize) * unitSize;
      ctx.fillStyle = state.currentcolor;
      ctx.fillRect(x - unitSize, y - unitSize, unitSize * state.penSize, unitSize * state.penSize);
      ctx.fill();
    };
    const clear = (ev) => {
      const x = Math.ceil(ev.offsetX / unitSize) * unitSize;
      const y = Math.ceil(ev.offsetY / unitSize) * unitSize;
      ctx.clearRect(x - unitSize, y - unitSize, unitSize * state.penSize, unitSize * state.penSize);
    };
    const getStartdrawCoord = (ev) => {
      ctx.beginPath();
      const x = Math.ceil(ev.offsetX / unitSize) * unitSize;
      const y = Math.ceil(ev.offsetY / unitSize) * unitSize;
      state.fullCoord.push([x, y]);
      state.painting = true;
    };
    const getEndDrawCoord = (ev) => {
      const x = Math.ceil(ev.offsetX / unitSize) * unitSize;
      const y = Math.ceil(ev.offsetY / unitSize) * unitSize;
      state.fullCoord.push([x, y]);
      state.painting = true;
    };

    tools.addEventListener('click', (event) => {
      state.painting = false;
      if (event.target !== state.activeTool && state.activeTool !== '') {
        state.activeTool.classList.remove('active_tool');
      }
      if (event.target.classList.contains('tool_button')) {
        state.activeTool = event.target;
        state.activeTool.classList.add('active_tool');
      }
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
      } else if (event.target.classList.contains('eraster')) {
        state.currentTool = 'eraster';
      } else if (event.target.classList.contains('drawLine')) {
        state.currentTool = 'drawLine';
      } else {
        state.currentTool = '';
      }
    });

    cleanButton.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    canvas.addEventListener('click', (event) => {
      if (state.currentTool === 'colorPicker' || keycode.code === 'c') {
        const colorPicker = new ColorPicker(event, unitSize, ctx, state, primaryColor);
        colorPicker.getColor();
      }
    });

    primaryColor.addEventListener('input', () => {
      state.currentcolor = primaryColor.value;
    });

    const getSize = () => {
      const { value } = size;
      const sizeValue = value.slice(0, value.indexOf('X'));
      if (state.canvasSize !== sizeValue) {
        if (+state.canvasSize < +sizeValue) {
          const currentImg = canvas.toDataURL('image/png');
          const img = new Image();
          img.src = currentImg;
          const newW = canvas.width / (sizeValue / state.canvasSize);
          const newH = canvas.height / (sizeValue / state.canvasSize);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, newW, newH);
        } else {
          const currentImg = canvas.toDataURL('image/png');
          const img = new Image();
          img.src = currentImg;
          const newW = canvas.width * (state.canvasSize / sizeValue);
          const newH = canvas.height * (state.canvasSize / sizeValue);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, newW, newH);
        }
      }
      state.canvasSize = sizeValue;
    };
    size.addEventListener('input', () => {
      getSize();
    });
    canvas.addEventListener('mousedown', () => {
      if (state.currentTool === 'pen' || keycode.code === 'p') {
        canvas.addEventListener('click', draw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mousemove', () => {
          const currentFrame = Frames.activeFrame;
          const im = canvas.toDataURL('image/png');
          const img = new Image();
          img.src = im;
          const cont = currentFrame.getContext('2d');
          cont.drawImage(img, 0, 0, currentFrame.width, currentFrame.height);
        });
        canvas.addEventListener('mouseup', () => {
          canvas.removeEventListener('mousemove', draw);
          canvas.removeEventListener('click', draw);
        });
      } else if (state.currentTool === 'eraster') {
        canvas.addEventListener('mousemove', clear);
        canvas.addEventListener('mouseup', () => {
          canvas.removeEventListener('mousemove', clear);
        });
      } else if (state.currentTool === 'drawLine') {
        canvas.addEventListener('click', getStartdrawCoord);
        canvas.addEventListener('mouseup', getEndDrawCoord);
        if (state.fullCoord.length !== 0) {
          ctx.strokeStyle = state.currentcolor;
          const coordC = state.fullCoord;
          ctx.lineWidth = unitSize * state.penSize;
          ctx.moveTo(coordC[0][0], coordC[0][1]);
          coordC.forEach((item) => {
            ctx.lineTo(item[0], item[1]);
            ctx.stroke();
          });
          const currentFrame = Frames.activeFrame;
          const im = canvas.toDataURL('image/png');
          const img = new Image();
          img.src = im;
          const cont = currentFrame.getContext('2d');
          cont.drawImage(img, 0, 0, currentFrame.width, currentFrame.height);
          if (!state.painting) {
            canvas.removeEventListener('click', getStartdrawCoord);
            canvas.removeEventListener('mouseup', getEndDrawCoord);
          }
        }
      }
    });
    canvas.addEventListener('click', (event) => {
      if (state.currentTool === 'paintBucket' || keycode.code === 'b') {
        const bucket = new PaintBucket(canvas, ctx, event, state);
        bucket.fillColor();
      }
    });
    toolSize.addEventListener('click', (e) => {
      state.painting = false;

      if (e.target !== state.activePenSize && state.activePenSize !== '') {
        state.activePenSize.classList.remove('active_tool');
      }
      if (e.target.classList.contains('size-one')) {
        state.penSize = 1;
        state.activePenSize = e.target;
        state.activePenSize.classList.add('active_tool');
      } else if (e.target.classList.contains('size-two')) {
        state.penSize = 2;
        state.activePenSize = e.target;
        state.activePenSize.classList.add('active_tool');
      } else if (e.target.classList.contains('size-three')) {
        state.penSize = 3;
        state.activePenSize = e.target;
        state.activePenSize.classList.add('active_tool');
      } else if (e.target.classList.contains('size-four')) {
        state.penSize = 4;
        state.activePenSize = e.target;
        state.activePenSize.classList.add('active_tool');
      }
    });
  }
}
