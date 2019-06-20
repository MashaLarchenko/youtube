import SearchView from '../views/AppView/SearchView';

import AppView from '../views/AppView/AppView';

import SliderButton from '../views/AppView/SliderButton';

export default class AppModel {
  constructor(state) {
    this.url = state;
    this.statisticUrl = state;
    this.search = new SearchView();
    this.data = '';
  }


  static extractClipItems(data) {
    return data.items;
  }

  static exstractClipId(data) {
    return data.items.map(clip => clip.id.videoId);
  }


  static async searchBy(url, req) {
    const responce = await fetch(`${url}&q=${req}`);
    const responsData = responce.json();
    return responsData;
  }

  static async searchById(url, id) {
    const res = await fetch(`${url}&id=${id}`);
    const data = await res.json();
    return data;
  }

  async nextPage(data, url, req) {
    const { statisticUrl } = this.statisticUrl;
    const token = data.nextPageToken;
    const responce = await fetch(`${url}&q=${req}&pageToken=${token}`);
    const responsData = await responce.json();
    console.log(responsData);
    const videoId = await AppModel.exstractClipId(responsData);
    const idResult = await AppModel.searchById(statisticUrl, videoId);
    console.log(idResult);
    const clipInfo = await AppModel.extractClipItems(idResult);
    console.log(clipInfo);
    return clipInfo;
  }

  static swipeSlide(card, pos, width) {
    let position = pos;
    let isDown = false;
    let start;
    card.addEventListener('mousedown', (e) => {
      isDown = true;
      start = e.pageX - card.offsetLeft;
      scroll
      console.log(start);
    });
    card.addEventListener('mouseleave', () => {
      isDown = false;
    });
    card.addEventListener('mouseup', () => {
      isDown = false;
    });
    card.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      if (start < e.pageX) {
        position = `${+position + (width * 4) + 360}`;
        if (position > 0) {
          card.style.left = '0px';
          position = 0;
        } else {
          card.style.left = `${position}px`;
        }
      } else {
        position = `${+position - (width * 4) - 360}`;
        card.style.left = `${position}px`;
      }
    });
  }


  async getData(url, statisticUrl, body, box, value) {
    const content = document.querySelector('.card-container');
    value = box.value;
    const data = await AppModel.searchBy(url, box.value);
    const videoId = await AppModel.exstractClipId(data);
    const idResult = await AppModel.searchById(statisticUrl, videoId);
    const clipInfo = await AppModel.extractClipItems(idResult);
    const clip = new AppView(clipInfo);
    clip.render();

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    document.body.appendChild(buttonContainer);
    const buttonSlider = SliderButton.render();
    buttonContainer.innerHTML += buttonSlider;
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const currentPage = document.querySelector('.current');
    const card = document.querySelector('.card-wrapper');
    const cardElem = document.querySelector('.card-elem');
    const cardWidth = window.getComputedStyle(cardElem).getPropertyValue('width');
    const width = cardWidth.slice(0, cardWidth.indexOf('p'));
    console.log(width);
    const currentPos = window.getComputedStyle(card).getPropertyValue('left');
    console.log(currentPos);
    let pos = currentPos.slice(0, currentPos.indexOf('p'));
    AppModel.swipeSlide(card, pos, width);

    let count = 1;
    currentPage.innerHTML = count;

    nextButton.addEventListener('click', async () => {
      count++;
      currentPage.innerHTML = count;
      if (count % 4 === 0) {
        const nextData = await this.nextPage(data, url, value);
        const nextClip = new AppView(nextData);
        nextClip.renderNextPage();
        console.log(nextClip);
      } else {
        pos = `${+pos - (width * 4) - 360}`;
        console.log(pos);
        card.style.left = `${pos}px`;
      }
    });

    prevButton.addEventListener('click', () => {
      count--;
      currentPage.innerHTML = count;
      console.log(pos);
      pos = `${+pos + (width * 4) + 360}`;
      console.log(pos);
      if (pos > 0) {
        card.style.left = '0px';
        pos = 0;
      } else {
        card.style.left = `${pos}px`;
      }
    });
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    if (body.contains(content)) {
      document.body.removeChild(content);
      document.body.removeChild(buttonContainer);
    }
  }



  async getClip() {
    const box = document.querySelector('input');
    const searchButton = document.querySelector('.search-button');

    const value = '';
    const { url } = this.url;
    const { statisticUrl } = this.statisticUrl;
    const { body } = document;

    const searchData = this.getData.bind(this, url, statisticUrl, body, box, value);

    searchButton.addEventListener('click', searchData);
  }
}
