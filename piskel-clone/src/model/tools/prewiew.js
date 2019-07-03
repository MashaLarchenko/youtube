

export default class Prewiew {
  static async fullScreen() {
    const previewCanvas = document.querySelector('.preview');
    if (!previewCanvas.fullscreenElement) {
      await previewCanvas.requestFullscreen();
      // alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    } else {
      previewCanvas.exitFullscreen();
    }
  }

  static changeScreen() {
    const fullScreenButton = document.querySelector('.full_screen');
    fullScreenButton.addEventListener('click', Prewiew.fullScreen);
  }
}
