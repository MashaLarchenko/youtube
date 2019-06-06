import AppModel from '../models/AppModel';
import AppView from '../views/AppView/AppView';
import SearchView from '../views/AppView';

export default class App {
  constructor() {
    this.search = new SearchView();
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyApVW9-OFfLCgxS70keWhMQ1iLmhwOttII&type=video&part=snippet&maxResults=15',
    };
  }

  async start() {
    // AppView.basic();
    SearchView.render();
    const model = new AppModel(this.state);
    const data = await model.getClipName();
  }
}

  // static getREC() {
  //   const box = document.querySelector('input');
  //   const button = document.querySelector('button');
  //   let value = '';
  //   let dataR = '';
  //   return button.addEventListener('click', async () => {
  //     const content = document.createElement('ul');
  //     document.body.appendChild(content);
  //     const node = document.createElement('li');
  //     value = box.value;
  //     const { url } = this.state;
  //     const resp = await AppModel.searchBy(url, value);
  //     dataR = await resp.json();
  //     const textnode = document.createTextNode(value);
  //     node.appendChild(textnode);
  //     content.appendChild(node);
  //     console.log(value); // return dataR;
  //   });
  // }


  // static async start() {
  //   SearchView.render();
  //   const model = await App.getREC();
  //   console.log(model);
  //   const data = await model.getClipName();
  //   console.log(data);
  //   const view = new AppView(data);


  //   view.render();
  // }
  // getClipName() {
  //   const box = document.querySelector('input');
  //   const button = document.querySelector('button');
  //   let dataR = '';

  //   console.log(button);
  //   console.log(box);
  //   let value = '';
  //   const { url } = this.state;
  //   // let responce = '';

  //   button.addEventListener('click', async () => {
  //     const content = document.createElement('ul');
  //     document.body.appendChild(content);
  //     const node = document.createElement('li');
  //     value = box.value;
  //     const resp = await AppModel.searchBy(url, value);
  //     dataR = await resp.json();
  //     const textnode = document.createTextNode(value);
  //     node.appendChild(textnode);
  //     content.appendChild(node);
  //     console.log(value); // return dataR;
  //   });


  //   // eslint-disable-next-line no-console
  //   console.log(dataR);
  //   return AppModel.extractClipNames(dataR);
  // }


  // static async searchBy(url, req) {
  //   const response = await fetch(`${url}&q=${req}`);
  //   console.log(response);
  //   return response;
  // }



