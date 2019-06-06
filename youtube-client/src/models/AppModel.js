import SearchView from '../views/AppView/SearchView';

import AppView from '../views/AppView/AppView';

export default class AppModel {
  constructor(state) {
    this.state = state;
    this.search = new SearchView();
    this.data = '';
  }


  static extractClipNames(data) {
    // console.log(data);
    // const ob = {
    //   title: data.items.map(clip => clip.snippet.title),
    //   description: data.items.map(clip => clip.snippet.description),
    //   published: data.items.map(clip => clip.snippet.publishedAt),
    // };
    return data.items.map(clip => clip.snippet);
  }


  static async searchBy(url, req) {
    const responce = await fetch(`${url}&q=${req}`);
    return responce;
  }

  // async getjSON(resp) {
  //   const dataR = await resp.json();
  //   console.log(dataR);
  //   return AppModel.extractClipNames(dataR);
  // }

  async getClipName() {
    const box = document.querySelector('input');
    const button = document.querySelector('button');
    // const cardContainer = document.createElement('section');
    // cardContainer.classList.add('card-container');
    // document.body.appendChild(cardContainer);

    let value = '';
    const { url } = this.state;

    button.addEventListener('click', async () => {
      // SearchView.render();
      // const content = document.createElement('ul');
      // document.body.appendChild(content);
      // const node = document.createElement('li');
      const conte = document.querySelector('.card-container');
      value = box.value;
      const resp = await AppModel.searchBy(url, box.value);
      const data = await resp.json();
      const d = await AppModel.extractClipNames(data);
      console.log(d);
      const v = new AppView(d);
      v.render();
      // const textnode = document.createTextNode(value);
      // node.appendChild(textnode);
      // content.appendChild(node);
      // console.log(value);
      while (conte.firstChild) {
        conte.removeChild(conte.firstChild);
      }
      document.body.removeChild(conte);
    });
  }
}

//   async getClipName() {
//     const box = document.querySelector('input');
//     const button = document.querySelector('button');

//     console.log(button);
//     console.log(box);
//     let value = '';
//     const { url } = this.state;
//     // let responce = '';

//     button.addEventListener('click', async () => {
//       const content = document.createElement('ul');
//       document.body.appendChild(content);
//       const node = document.createElement('li');
//       value = box.value;
//       const resp = await AppModel.searchBy(url, box.value);
//       const textnode = document.createTextNode(value);
//       node.appendChild(textnode);
//       content.appendChild(node);
//       console.log(value);
//     });

//   }

//   async getjSON (resp){
//
//     // eslint-disable-next-line no-console
//     console.log(dataR);
//     return AppModel.extractClipNames(dataR);
//   }
//   static async searchBy(url, req) {
//     consonce = await fetch(`${url}&q=${req}`);
//     console.log(responce);
//     return responce;
//   }
// }
