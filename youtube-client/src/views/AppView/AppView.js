import CardView from './CardView';

export default class AppView {
  constructor(data, currentPage) {
    this.data = data;
    this.currentPage = currentPage;
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
    const list = AppView.renderClip(currentItems);
    cardWrapper.innerHTML = list;
    console.log(this.data);
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
    const cardWrapper = document.querySelector('.card-wrapper');
    cardWrapper.innerHTML = null;
    const start = this.currentPage === 1 ? this.currentPage - 1 : (this.currentPage - 1) * 4;
    const end = start + 4;
    const currentItems = this.data.slice(start, end);
    const nextlist = AppView.renderClip(currentItems);
    // console.log(nextlist);
    // console.log(cardWrapper);
    cardWrapper.innerHTML += nextlist;
    // console.log(cardWrapper);
    console.log(this.data);
  }
}
