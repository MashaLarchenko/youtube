export default class CardView {
  constructor(card) {
    this.title = card.title;
    this.description = card.description;
    this.date = new Date(card.publishedAt);
    this.cannel = card.channelTitle;
    this.tumb = card.thumbnails.medium.url;
  }

  image() {
    // const image = new Image();
    // image.url = this.tumb;
    return `<div class="clip-image_container"><img class = "clip-image" src ="${this.tumb}"></div>`;
  }

  getInfo() {
    // console.log(`${this.title}${this.cannel}${this.date}${this.description}`);
    return `<div class="card-info">
    <p class="card-title">${this.title}</p>
    <p class="card-channel">${this.cannel}</p>
    <p class="card-date">${this.date}</p>
    <p class="card-description">${this.description}</p>`;
  }

  render() {
    return `<article class="card-elem">${this.image()}${this.getInfo()}</article>`;
  }
}
