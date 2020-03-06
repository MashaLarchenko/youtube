/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import SearchView from '../views/AppView/SearchView';

import AppView from '../views/AppView/AppView';

import SliderButton from '../views/AppView/SliderButton';

export default class AppModel {
  constructor(state) {
    this.url = state;
    this.statisticUrl = state;
    this.search = new SearchView();
    this.data = '';
    this.token = '';
    this.allData = [];
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
    // console.log(data);
    const responce = await fetch(`${url}&q=${req}&pageToken=${this.token}`);
    const responsData = await responce.json();
    this.token = responsData.nextPageToken;
    // console.log(responsData);
    const videoId = await AppModel.exstractClipId(responsData);
    const idResult = await AppModel.searchById(statisticUrl, videoId);
    // console.log(idResult);
    const clipInfo = await AppModel.extractClipItems(idResult);
    // console.log(clipInfo, responsData, responce, 1111);
    this.allData.push(...clipInfo);
    console.log(this.allData);
    return clipInfo;
  }

  static swipeSlide(card, pos, width) {
    let position = pos;
    let isDown = false;
    let start;
    // let scrollLeft;
    card.addEventListener('mousedown', (e) => {
      isDown = true;
      start = e.pageX;
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
        position = `${+position + (width * 4) + 105}`;
        if (position > 0) {
          card.style.left = '0px';
          position = 0;
        } else {
          card.style.left = `${position}px`;
        }
      } else {
        position = `${+position - (width * 4) - 105}`;
        card.style.left = `${position}px`;
      }
    });
  }


  async getData(url, statisticUrl, body, box, value) {
    const content = document.querySelector('.card-container');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    document.body.appendChild(buttonContainer);
    const buttonSlider = SliderButton.render();
    buttonContainer.innerHTML += buttonSlider;
    const currentPage = document.querySelector('.current');
    value = box.value;
    let count = 1;
    currentPage.innerHTML = count;
    const data = await AppModel.searchBy(url, box.value);
    this.token = data.nextPageToken;
    const videoId = await AppModel.exstractClipId(data);
    const idResult = await AppModel.searchById(statisticUrl, videoId);
    let clipInfo = await AppModel.extractClipItems(idResult);
    console.log(clipInfo);
    this.allData.push(...clipInfo);
    const clip = new AppView(clipInfo, count);
    clip.render();

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const card = document.querySelector('.card-wrapper');
    const cardElem = document.querySelector('.card-elem');
    const cardWidth = window.getComputedStyle(cardElem).getPropertyValue('width');
    const width = cardWidth.slice(0, cardWidth.indexOf('p'));
    const currentPos = window.getComputedStyle(card).getPropertyValue('left');
    const pos = currentPos.slice(0, currentPos.indexOf('p'));
    AppModel.swipeSlide(card, pos, width);
    let clickCount = 1;
    nextButton.addEventListener('click', async () => {
      count++;
      if (clickCount === 4) {
        clickCount = 1;
      } else {
        clickCount++;
      }
      currentPage.innerHTML = count;
      if (count % 4 === 0) {
        const nextData = await this.nextPage(data, url, value);
        clipInfo = nextData;
        const nextClip = new AppView(clipInfo, clickCount);
        nextClip.renderCurrentClip();
        console.log(clipInfo, nextData);
      } else {
        const nextPageClip = new AppView(clipInfo, clickCount);
        nextPageClip.renderCurrentClip();
      }
    });

    prevButton.addEventListener('click', () => {
      count--;
      if (count < 0) {
        count = 0;
      }
      if (clickCount !== 1) {
        clickCount--;
      }
      currentPage.innerHTML = count;

      const prevClip = new AppView(this.allData, count);
      prevClip.renderPreviousClip();
      // pos = `${+pos + (width * 4) + 105}`;
      // if (pos > 0) {
      //   card.style.left = '0px';
      //   pos = 0;
      // } else {
      //   card.style.left = `${pos}px`;
      // }
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
