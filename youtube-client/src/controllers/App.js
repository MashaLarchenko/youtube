/* eslint-disable no-unused-vars */
import AppModel from '../models/AppModel';
import SearchView from '../views/AppView';
import SliderButton from '../views/AppView/SliderButton';

export default class App {
  constructor() {
    this.search = new SearchView();
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyApVW9-OFfLCgxS70keWhMQ1iLmhwOttII&type=video&part=snippet&maxResults=15',
      statisticUrl: 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyApVW9-OFfLCgxS70keWhMQ1iLmhwOttII&part=snippet,statistics',
    };
  }

  async start() {
    SearchView.render();
    // SliderButton.render();
    const model = new AppModel(this.state);
    // const buttonContainer = document.createElement('div');
    // buttonContainer.classList.add('button-container');
    // document.body.appendChild(buttonContainer);
    // const buttonSlider = SliderButton.render();
    // buttonContainer.innerHTML += buttonSlider;
    const box = document.querySelector('input');
    await model.getClip();
    box.addEventListener('change', async () => {
      await model.getClip();
    });
    // const data = await model.getClip();
  }
}
