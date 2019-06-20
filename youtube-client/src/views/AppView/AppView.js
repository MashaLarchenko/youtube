import CardView from './CardView';

export default class AppView {
  constructor(data) {
    this.data = data;
  }

  render() {
    const cardContainer = document.createElement('section');
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper');
    cardContainer.classList.add('card-container');
    document.body.appendChild(cardContainer);
    cardContainer.appendChild(cardWrapper);

    const list = this.renderClip(this.data);
    cardWrapper.innerHTML = list;
  }

  renderClip() {
    return this.data.map((card) => {
      const cardEl = new CardView(card);
      return `${cardEl.render()}`;
    }).join('');
  }

  renderNextPage() {
    const nextlist = this.renderClip(this.data);
    console.log(nextlist);
    const cardWrapper = document.querySelector('.card-wrapper');
    console.log(cardWrapper);
    cardWrapper.innerHTML += nextlist;
    console.log(cardWrapper);
  }
}
