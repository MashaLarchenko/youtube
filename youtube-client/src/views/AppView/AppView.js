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
    console.log(list);
    cardContainer.innerHTML = list;
  }

  renderClip() {
    return this.data.map((card) => {
      const cardEl = new CardView(card);
      console.log(cardEl);
      //  cardEl.render();
      // cardContainer.appendChild(cardEl);
      return `${cardEl.render()}`;
    }).join('');
  //  let title = this.data.title.map(titles => `<li>${titles}</li>`).join('');
  //   let des = this.data.description.map(description => `<li>${description}</li>`).join('');
  //   let publishData = this.data.published.map(published => `<li>${published}</li>`).join('');
  //   document.body.appendChild(content);
  //   content.appendChild(title);
  //   content.appendChild(des);
  //   content.appendChild(publishData);
  }

  // static cardsView(cardInfo) {
  //   const cardItem = document.createElement('div');
  //   card.classList.add('card-item');
  // }
}
