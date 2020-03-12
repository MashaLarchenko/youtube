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
    this.count = 1;
    this.clickCount = 1;
    this.clipInfo = [];
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
    const responce = await fetch(`${url}&q=${req}&pageToken=${this.token}`);
    const responsData = await responce.json();
    this.token = responsData.nextPageToken;
    const videoId = await AppModel.exstractClipId(responsData);
    const idResult = await AppModel.searchById(statisticUrl, videoId);
    this.clipInfo = await AppModel.extractClipItems(idResult);
    this.allData.push(...this.clipInfo);
    return this.clipInfo;
  }

  async getNextData(currentPage, data, url, value, box) {
    this.count++;
    if (this.clickCount === 4) {
      this.clickCount = 1;
    } else {
      this.clickCount++;
    }
    currentPage.innerHTML = this.count;
    if (this.count % 3 === 0) {
      const nextData = await this.nextPage(data, url, box);
      const lastData = this.clipInfo.slice(-3);
      lastData.push(...nextData);
      this.clipInfo = lastData;
      const nextClip = new AppView(this.clipInfo, this.clickCount, this.count);
      nextClip.renderCurrentClip();
    } else {
      const nextPageClip = new AppView(this.clipInfo, this.clickCount, this.count);
      nextPageClip.renderCurrentClip();
    }
  }

  getPrevData(currentPage) {
    if (this.count > 1) {
      this.count--;
    }
    if (this.clickCount !== 1) {
      this.clickCount--;
    }
    currentPage.innerHTML = this.count;
    const prevClip = new AppView(this.allData, this.count);
    prevClip.renderPreviousClip();
  }

  swipeSlide(card, pos, width, params) {
    let isDown = false;
    let start;
    card.addEventListener('mousedown', (e) => {
      isDown = true;
      start = e.pageX;
    });
    card.addEventListener('mouseleave', () => {
      isDown = false;
    });
    card.addEventListener('mouseup', (e) => {
      isDown = false;
      if (start < e.pageX) {
        this.getPrevData(params[0]);
      } else {
        this.getNextData(...params);
      }
    });
    card.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
    });
  }


  async getData(url, statisticUrl, value) {
    this.data = '';
    this.token = '';
    this.allData = [];
    this.count = 1;
    this.clickCount = 1;
    this.clipInfo = [];
    const btnContainer = document.querySelector('.button-container');
    if (!btnContainer) {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
      document.body.appendChild(buttonContainer);
      const buttonSlider = SliderButton.render();
      buttonContainer.innerHTML += buttonSlider;
    }
    const currentPage = document.querySelector('.current');
    currentPage.innerHTML = this.count;
    const data = await AppModel.searchBy(url, value);
    this.token = data.nextPageToken;
    const videoId = await AppModel.exstractClipId(data);
    const idResult = await AppModel.searchById(statisticUrl, videoId);
    this.clipInfo = await AppModel.extractClipItems(idResult);
    this.allData.push(...this.clipInfo);
    const clip = new AppView(this.clipInfo, this.count);
    clip.renderCurrentClip();
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const card = document.querySelector('.card-wrapper');
    const cardElem = document.querySelector('.card-elem');
    const cardWidth = window.getComputedStyle(cardElem).getPropertyValue('width');
    const width = cardWidth.slice(0, cardWidth.indexOf('p'));
    const currentPos = window.getComputedStyle(card).getPropertyValue('left');
    const pos = currentPos.slice(0, currentPos.indexOf('p'));
    const params = [currentPage, data, url, value];
    this.swipeSlide(card, pos, width, params);
    nextButton.addEventListener('click', (e) => {
      const box = document.querySelector('input');
      e.stopImmediatePropagation();
      this.getNextData(...params, box.value);
    });
    prevButton.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      this.getPrevData(currentPage);
    });
  }

  async getClip() {
    const box = document.querySelector('input');
    const searchButton = document.querySelector('.search-button');
    const { url } = this.url;
    const { statisticUrl } = this.statisticUrl;
    searchButton.addEventListener('click', (e) => {
      if (box.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.getData(url, statisticUrl, box.value);
      }
    });
    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && box.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.getData(url, statisticUrl, box.value);
      }
    });
  }
}
