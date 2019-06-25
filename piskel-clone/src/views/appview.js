export default class View {
  static render() {
    const fontAwesome = document.createElement('link');
    fontAwesome.type = 'text/css';
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
    fontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
    fontAwesome.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesome);
    const header = '<header><h1>PISKEL</h1><button>Create sprite</button></header>';
    document.body.innerHTML += header;
    View.renderTools();
    View.renderFrames();
    View.renderPreview();
  }

  static renderTools() {
    console.log(1);
    const main = document.createElement('main');
    main.classList.add('main');
    const toolsSection = document.createElement('section');
    toolsSection.classList.add('tools');
    const tool = '<ul class="tools-container"><li class="tool-item" ><button class="paint-bucket"><i class="fas fa-fill-drip paint-bucket" ></i></button></li><li class="tool-item "><button class="choose-color"><i class="fas fa-eye-dropper choose-color"></i></button></li><li class="tool-item"><button class="move"><i class="fas fa-arrows-alt move"></i></button></li><li class="tool-item"><button class="transform"><i class="fas fa-exchange-alt transform"></i></button></li></ul>';
    toolsSection.innerHTML += tool;
    document.body.appendChild(main);
    main.appendChild(toolsSection);
  }

  static renderFrames() {
    const framesContainer = document.createElement('section');
    const main = document.querySelector('main');
    framesContainer.classList.add('frames');
    const deleteButton = '<button class="delete-button"><i class="fas fa-trash-alt"></i></button>';
    const duplicateButton = '<button class="duplicate-button"><i class="fas fa-copy"></i></button>';
    const addButton = '<button class="addFrames"> + Add new frames </button>';
    const frame = `<div class="frame"><canvas class="frame_canvas canvas" width="200px" height="200px"></canvas>${deleteButton}${duplicateButton}</div>`;
    const drawCanvas = '<canvas class="draw_canvas canvas" width= 600px height="600px"></canvas>';
    framesContainer.innerHTML += frame;
    main.appendChild(framesContainer);
    main.innerHTML += addButton;
    main.innerHTML += drawCanvas;
  }

  static renderPreview() {
    const preview = document.createElement('section');
    const main = document.querySelector('main');
    preview.classList.add('animation');
    const animationContainer = '<div><canvas class="prev canvas" width = "300px" height="300px"></canvas><input type="range" name="fps" min ="10" max ="50" id="fps"><label for="fps">FPS</label></div>';
    preview.innerHTML += animationContainer;
    main.appendChild(preview);
  }
}
