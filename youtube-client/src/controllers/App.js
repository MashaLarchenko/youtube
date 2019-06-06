import AppModel from '../models/AppModel';
import SearchView from '../views/AppView';

export default class App {
  constructor() {
    this.search = new SearchView();
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyApVW9-OFfLCgxS70keWhMQ1iLmhwOttII&type=video&part=snippet&maxResults=15',
      id: 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyApVW9-OFfLCgxS70keWhMQ1iLmhwOttII&part=snippet,statistics',
    };
  }

  async start() {
    SearchView.render();
    const model = new AppModel(this.state);
    const data = await model.getClipName();
  }
}
