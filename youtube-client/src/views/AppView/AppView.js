import CardView from './CardView';

export default class AppView {
  constructor(data, currentPage, count) {
    this.data = data;
    this.currentPage = currentPage;
    this.count = count;
    this.lastInPage = [];
  }

  render() {
    const cardContainer = document.createElement('section');
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper');
    cardContainer.classList.add('card-container');
    document.body.appendChild(cardContainer);
    cardContainer.appendChild(cardWrapper);
    this.renderCurrentClip();
    // cardWrapper.innerHTML = null;
    // const start = this.currentPage * 4;
    // const end = start + 4;
    // const currentItems = this.data.slice(start, end);
    // const list = AppView.renderClip(currentItems);
    // cardWrapper.innerHTML = list;
    // console.log(currentItems, list);
  }

  renderCurrentClip() {
    const cardWrapper = document.querySelector('.card-wrapper');
    cardWrapper.innerHTML = null;
    const start = this.currentPage === 1 ? this.currentPage - 1 : (this.currentPage - 1) * 4;
    console.log(start);
    const end = start + 4;
    const currentItems = this.data.slice(start, end);
    if (this.lastInPage) {
      currentItems.unshift(...this.lastInPage);
    }
    if (this.count % 4 === 0) {
      this.lastInPage = currentItems;
    }
    const list = AppView.renderClip(currentItems);
    cardWrapper.innerHTML = list;
    console.log(111, currentItems, this.lastInPage);
  }

  renderPreviousClip() {
    const cardWrapper = document.querySelector('.card-wrapper');
    cardWrapper.innerHTML = null;
    const start = this.currentPage === 1 ? this.currentPage + 4 : (this.currentPage - 1) * 4;
    // console.log(start);
    const end = start - 4;
    const currentItems = this.data.slice(end, start);
    console.log(start, end);
    const list = AppView.renderClip(currentItems);
    cardWrapper.innerHTML = list;
  }

  static renderClip(currentItems) {
    return currentItems
      .map((card) => {
        const cardEl = new CardView(card);
        return `${cardEl.render()}`;
      })
      .join('');
  }

  renderNextPage() {
    console.log(222);
    const cardWrapper = document.querySelector('.card-wrapper');
    cardWrapper.innerHTML = null;
    const start = this.currentPage === 1 ? this.currentPage - 1 : (this.currentPage - 1) * 4;
    const end = start + 4;
    const currentItems = this.data.slice(start, end);
    console.log(111, currentItems, this.lastInPage);
    if (this.lastInPage) {
      currentItems.unshift(...this.lastInPage);
    }
    const nextlist = AppView.renderClip(currentItems);
    cardWrapper.innerHTML += nextlist;
  }
}
