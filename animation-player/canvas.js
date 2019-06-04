

const canvas = document.querySelector('.draw_canvas');
const active = document.querySelector('.active');

const currentFrame = document.querySelector('.frames');





 const frc = document.querySelector('.frame_canvas');
const c = frc.getContext('2d');
const ctx = canvas.getContext('2d');

const draw = (ev) => {
  const x = ev.offsetX;
  const y = ev.offsetY;
  ctx.fillRect(x - 5, y - 5, 10, 10);
  ctx.fill();
};



canvas.addEventListener('mousedown', (e) => {
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', (e) => {

  currentFrame.addEventListener('click', (e) => {
  const im = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = im;

    const cont = e.target.getContext('2d');
    cont.drawImage(img, 0, 0, 200, 200);
  })
 canvas.removeEventListener('mousemove', draw);
  });
});

console.log(c);

console.log(framesContainer);
