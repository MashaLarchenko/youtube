

import Frames from './frames/frame';
import View from './view';
import Tools from './model/tool';

export default class App {
  static start() {
    View.render();
    Frames.start();
    Tools.start();
  }
}
