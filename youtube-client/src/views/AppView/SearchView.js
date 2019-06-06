
// import AppModel from '../../models/AppModel';

export default class SearchView {
  static render() {
    const searchWrap = document.createElement('div');
    this.searchBox = document.createElement('input');
    this.searchButton = document.createElement('button');
    // const searchButton = document.createElement('button');
    this.searchBox.setAttribute('type', 'text');
    this.searchBox.setAttribute('name', 'searchText');
    this.searchBox.classList.add('search-box');
    document.body.appendChild(this.searchBox);
    document.body.appendChild(searchWrap);
    searchWrap.appendChild(this.searchBox);
    searchWrap.appendChild(this.searchButton);
  }
}
