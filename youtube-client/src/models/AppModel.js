import SearchView from '../views/AppView/SearchView';

import AppView from '../views/AppView/AppView';

import SliderButton from '../views/AppView/SliderButton';

export default class AppModel {
  constructor(state) {
    this.url = state;
    this.id = state;
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
    return responce;
  }

  static async searchById(url, id) {
    const res = await fetch(`${url}&id=${id}`);
    const data = await res.json();
    return data;
  }


  async getClip() {
    const box = document.querySelector('input');
    const button = document.querySelector('.search-button');

    let value = '';
    const { url } = this.url;
    const { id } = this.id;
    const { body } = document;

    button.addEventListener('click', async () => {
      const content = document.querySelector('.card-container');
      value = box.value;
      const resp = await AppModel.searchBy(url, box.value);
      const data = await resp.json();
      const videoId = await AppModel.exstractClipId(data);
      const idResult = await AppModel.searchById(id, videoId);
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
      const card = document.querySelector('.card-wrapper');
      const cardElem = document.querySelector('.card-elem');
      const cardWidth = window.getComputedStyle(cardElem).getPropertyValue('width');
      const width = cardWidth.slice(0, cardWidth.indexOf('p'));
      console.log(width);
      const currentPos = window.getComputedStyle(card).getPropertyValue('left');
      console.log(currentPos);
      let pos = currentPos.slice(0, currentPos.indexOf('p'));
      let isDown = false;
      let start;

      card.addEventListener('mousedown', (e) => {
        isDown = true;
        start = e.pageX;
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
          pos = `${+pos + (width * 4) + 360}`;
          if (pos > 0) {
            card.style.left = '0px';
            pos = 0;
          } else {
            card.style.left = `${pos}px`;
          }
        } else {
          pos = `${+pos - (width * 4) - 360}`;
          card.style.left = `${pos}px`;
        }
        console.log(pos);
        console.log(e.pageX);
        // card.scrollLeft =
      });

      nextButton.addEventListener('click', () => {
        pos = `${+pos - (width * 4) - 360}`;
        console.log(pos);
        card.style.left = `${pos}px`;
      });

      prevButton.addEventListener('click', () => {
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
    });
  }
}
