export default class CardView {
  constructor(card) {
    this.id = card.id;
    this.title = card.snippet.title;
    this.description = card.snippet.description;
    this.date = card.snippet.publishedAt;
    this.cannel = card.snippet.channelTitle;
    this.tumb = card.snippet.thumbnails.medium.url;
    this.view = card.statistics.viewCount;
  }

  image() {
    return `<div class="clip-image_container"><a href="https://www.youtube.com/watch?v=${this.id}" class="video-link">${this.title}</a>
    <img class = "clip-image" src ="${this.tumb}"></div>`;
  }

  getCardInfo() {
    const date = this.date;
    const stringDate = date.slice(0, date.indexOf('T'));
    return `<div class="card-info">
    <p class="card-channel"><i class="fas fa-user-alt"></i>${this.cannel}</p>
    <p class="card-date"><i class="fas fa-calendar-alt"></i>${stringDate}</p>
    <p class="card-view">${this.view}</p>
    <p class="card-description">${this.description}</p>`;
  }

  render() {
    return `<article class="card-elem">${this.image()}${this.getCardInfo()}</article>`;
  }
}
