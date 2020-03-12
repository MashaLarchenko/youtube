
export default class SearchView {
  static render() {
    const searchWrap = document.createElement('div');
    const searchBox = document.createElement('input');
    const searchButton = document.createElement('button');
    searchButton.innerText = 'Search';
    searchButton.classList.add('search-button');
    searchBox.setAttribute('type', 'text');
    searchBox.setAttribute('name', 'searchText');
    searchBox.classList.add('search-box');
    document.body.appendChild(searchBox);
    document.body.appendChild(searchWrap);
    searchWrap.appendChild(searchBox);
    searchWrap.appendChild(searchButton);
  }
}
