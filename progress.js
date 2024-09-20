class ProgressBar {
  constructor(
    canvasWrapperId, 
    initialPercents = 0, 
    color = "rgb(22, 119, 255)"
  ) {
    this._canvasWrapperId = canvasWrapperId;
    this._percents = initialPercents;
    this._mainColor = color;
    this._animated = false;
    this._hidden = false;
    this._changesAccumulated = false;
  }

  drawCircle({
    canvas = this.frontCircle,
    x,
    y,
    radius,
    percents = this._percents,
    lineWidth = 8,
    color = this._mainColor,
  }) {
    if (canvas.getContext) {
      console.log("redrawing");
      const ctx = canvas.getContext("2d");
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
  
      x = x || canvas.width / 2;
      y = y || canvas.height / 2;
      radius = radius || canvas.height / 2 - lineWidth / 2;

      const endAngleRadians = Math.PI * percents * 0.02;
  
      ctx.arc(x,y, radius, 0, endAngleRadians, 0);
  
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
    else {
      console.error("canvas error")
    }
  }

  init() {
    const wrapper = document.getElementById(this._canvasWrapperId);
    const backCircleCanvas = document.createElement('canvas');
    backCircleCanvas.classList.add('back-circle');
    backCircleCanvas.width = 120;
    backCircleCanvas.height = 120;
    wrapper.appendChild(backCircleCanvas);
    this.backCircle = backCircleCanvas;

    this.drawCircle({
      canvas: this.backCircle,
      percents: 100,
      color: "rgba(0, 0, 0, 0.06)",
    });

    const frontCircleCanvas = document.createElement('canvas');
    frontCircleCanvas.classList.add('front-circle');
    frontCircleCanvas.width = 120;
    frontCircleCanvas.height = 120;
    wrapper.appendChild(frontCircleCanvas);
    this.frontCircle = frontCircleCanvas;

    this.drawCircle({});
  }

  setPercents(percents) {
     if (this._hidden && this.percents != percents)
      this._changesAccumulated = true;

    if (percents >= 0 && percents <= 100)
      this._percents = percents;

    else {
      this._percents = 0;
      console.error('invalid percents value');
    }

    if (!this._hidden) {
      this.drawCircle({})
    }
  }

  toggleHidden() {
    this._hidden = !this._hidden;
    this.backCircle.classList.toggle('progress-hidden')
    this.frontCircle.classList.toggle('progress-hidden')

    if (!this._hidden && this._changesAccumulated) {
      this.drawCircle({})
      this._changesAccumulated = false;  
    }
  }

  toggleAnimated() {
    this._animated = !this._animated;
    this.frontCircle.classList.toggle('progress-animated');
  }
}
