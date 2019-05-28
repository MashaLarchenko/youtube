import AppModel from '../models/AppModel';
import AppView from '../views/AppView/AppView';
import SearchView from '../views/AppView';

export default class App {
  constructor(r) {
    this.r = r;
    this.state = {
      url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyApVW9-OFfLCgxS70keWhMQ1iLmhwOttII&type=video&part=snippet&maxResults=15&q=${this.r}`,
    };
  }


  async start() {
    SearchView.render();
    const model = new AppModel(this.state);
    const data = await model.getClipName();
    const view = new AppView(data);


    view.render();
  }

}
