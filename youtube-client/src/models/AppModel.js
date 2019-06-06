import SearchView from '../views/AppView/SearchView';

import AppView from '../views/AppView/AppView';

export default class AppModel {
  constructor(state) {
    this.url = state;
    this.id = state;
    this.search = new SearchView();
    this.data = '';
  }


  static extractClipItems(data) {
    return data.items;
  }

  static exstractClipId(data) {
    return data.items.map(clip => clip.id.videoId);
  }


  static async searchBy(url, req) {
    const responce = await fetch(`${url}&q=${req}`);
    return responce;
  }

  static async searchById(url, id) {
    const res = await fetch(`${url}&id=${id}`);
    const data = await res.json();
    return data;
  }


  async getClipName() {
    const box = document.querySelector('input');
    const button = document.querySelector('button');
    let value = '';
    const { url } = this.url;
    const { id } = this.id;

    button.addEventListener('click', async () => {
      const content = document.querySelector('.card-container');
      value = box.value;
      const resp = await AppModel.searchBy(url, box.value);
      const data = await resp.json();
      const videoId = await AppModel.exstractClipId(data);
      const idResult = await AppModel.searchById(id, videoId);
      const clipInfo = await AppModel.extractClipItems(idResult);
      const clip = new AppView(clipInfo);
      clip.render();

      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }

      const { body } = document;
      if (body.contains(content)) document.body.removeChild(content);
    });
  }
}
