export default class SearchView {
  constructor() {
    this.searchWrap = document.createElement('div');
    this.searchBox = document.createElement('input');
    this.searchButton = document.createElement('button');
  }

  render() {
    this.searchBox.setAttribute('type', 'text');
    this.searchBox.setAttribute('name', 'searchText');
    this.searchBox.classList.add('search-box');
   document.body.appendChild(this.searchBox);
    document.body.appendChild(this.searchWrap);
    this.searchWrap.appendChild(this.searchBox);
    this.searchWrap.appendChild(this.searchButton);

    this.searchButton.addEventListener('click', () => {
      const content = document.createElement('ul');
      document.body.appendChild(content);
      this.node = document.createElement('li');
      this.textnode = document.createTextNode(this.val);
      this.node.appendChild(this.textnode);
      content.appendChild(this.node);
    });
    console.log(this.value);
    return value;
  }
}
