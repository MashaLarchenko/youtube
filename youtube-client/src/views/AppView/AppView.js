import CardView from './CardView';

export default class AppView {
  constructor(data) {
    this.data = data;
  }
  
  render() {
    const cardContainer = document.createElement('section');
    cardContainer.classList.add('card-container');
    document.body.appendChild(cardContainer);

    const list = this.renderClip(this.data);
    cardContainer.innerHTML = list;
  }

  renderClip() {
    return this.data.map((card) => {
      const cardEl = new CardView(card);
      return `${cardEl.render()}`;
    }).join('');
  }
}
