export default class AppModel {
  constructor(state) {
    this.state = state;
  }


  static extractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  async getClipName() {
    const { url } = this.state;

    const responce = await fetch(url);
    console.log(1);
    const data = await responce.json();

    return AppModel.extractClipNames(data);
  }
}
