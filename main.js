window.onload = () => {
  const progress = new ProgressBar('canvas-wrapper');

  progress.init();

  const valueControl = document.getElementsByClassName('controls-value')[0];
  valueControl.onchange = (e) => progress.setPercents(e.target.value);

  const hideControl = document.getElementById('hide');
  hideControl.onchange = () => progress.toggleHidden();

  const animateControl = document.getElementById('animate');
  animateControl.onchange = () => progress.toggleAnimated();

  const progress1 = new ProgressBar('canvas-wrapper1', 75, 'orange');

  progress1.init();

  const valueControl1 = document.getElementsByClassName('controls-value')[1];
  valueControl1.onchange = (e) => progress1.setPercents(e.target.value);

  const hideControl1 = document.getElementById('hide1');
  hideControl1.onchange = () => progress1.toggleHidden();

  const animateControl1 = document.getElementById('animate1');
  animateControl1.onchange = () => progress1.toggleAnimated();
}
