export default class View {
  static render() {
    const fontAwesome = document.createElement('link');
    fontAwesome.type = 'text/css';
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
    fontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
    fontAwesome.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesome);
    const header = '<header><h1>PISKEL</h1></header>';
    document.body.innerHTML += header;
    View.renderTools();
    View.renderFrames();
    View.renderPreview();
    View.colorPicker();
  }

  static renderTools() {
    const main = document.createElement('main');
    main.classList.add('main');
    const toolsSection = document.createElement('section');
    const canvasSize = document.createElement('div');
    const sizeOne = '<div class="size-item size-one"></div>';
    const sizeTwo = '<div class="size-item size-two"></div>';
    const sizeThree = '<div class="size-item size-three"></div>';
    const sizeFour = '<div class="size-item size-four"></div>';
    const toolSize = `<div class="tool-size_container">${sizeOne}${sizeTwo}${sizeThree}${sizeFour}`;
    canvasSize.classList.add('size_wrapper');
    const sizeContainer = '<p class="size_label">Canvas size</p><select class="size_contaner"><option class="size_32">32X32</option><option class="size_64">64X64</option><option class="size_128">128X128</option></select>';
    toolsSection.classList.add('tools');
    const cleanCanvas = '<button class="clean"> Clean </button>';
    const penTool = '<li class="tool-item" ><button class="pen tool_button"><i class="fas fa-pencil-alt pen"></i></button></li>';
    const paintBucket = '<li class="tool-item" ><button class="paint-bucket tool_button"><i class="fas fa-fill-drip paint-bucket" ></i></button></li>';
    const colorPicker = '<li class="tool-item "><button class="choose-color tool_button"><i class="fas fa-eye-dropper choose-color"></i></button></li>';
    const moveTool = '<li class="tool-item"><button class="move tool_button"><i class="fas fa-arrows-alt move"></i></button></li>';
    const eraster = '<li class="tool-item"><button class="eraster tool_button"><i class="fas fa-eraser eraster"></i></button></li>';
    const toolContainer = `<ul class="tools-container">${penTool}${paintBucket}${colorPicker}${moveTool}${eraster}</ul>`;
    toolsSection.innerHTML += toolContainer;
    toolsSection.innerHTML += cleanCanvas;
    canvasSize.innerHTML += sizeContainer;
    main.innerHTML += toolSize;
    document.body.appendChild(main);
    main.appendChild(toolsSection);
    main.appendChild(canvasSize);
  }

  static renderFrames() {
    const framesContainer = document.createElement('section');
    const main = document.querySelector('main');
    framesContainer.classList.add('frames');
    const deleteButton = '<button class="delete-button"><i class="fas fa-trash-alt"></i></button>';
    const duplicateButton = '<button class="duplicate-button"><i class="fas fa-copy"></i></button>';
    const moveButton = '<button class="move-button"><i class="fas fa-arrows-alt"></i></button>';
    const addButton = '<button class="addFrames"> + Add new frames </button>';
    const frame = `<div class="frame_wrapper"><div class="frame" draggable="true"><canvas class="frame_canvas canvas active_tool" width="120px" height="120px"></canvas>${deleteButton}${duplicateButton}${moveButton}</div></div>`;
    const drawCanvas = '<section class="draw_container"><canvas class="draw_canvas canvas" width= 950px height="845px"></canvas></section>';
    framesContainer.innerHTML += frame;
    main.appendChild(framesContainer);
    framesContainer.innerHTML += addButton;
    main.innerHTML += drawCanvas;
  }

  static renderPreview() {
    const preview = document.createElement('section');
    const main = document.querySelector('main');
    const fullScreenButton = '<button class="full_screen">Full Screen</button>';
    preview.classList.add('animation');
    const animationContainer = '<div><canvas class="preview canvas" width = "300px" height="300px"></canvas><input type="range" name="fps" min ="0.1" max ="50" id="fps" class ="fps"><label for="fps">FPS</label></div>';
    preview.innerHTML += animationContainer;
    preview.innerHTML += fullScreenButton;
    main.appendChild(preview);
  }

  static colorPicker() {
    const colorContainer = document.createElement('section');
    colorContainer.classList.add('color_container');
    const main = document.querySelector('main');
    const colors = '<input type="color" class="firstColor"><input type="color" class="secondColor">';
    colorContainer.innerHTML += colors;
    main.appendChild(colorContainer);
  }
}
