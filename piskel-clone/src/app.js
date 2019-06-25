import Canvas from './canvas/canvas';
import Frames from './frames/frames';
import View from './views';

export default class App {
  static start() {
    View.render();
    Canvas.render();
    Frames.render();
  }
}
