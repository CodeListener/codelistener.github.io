export default function createClock(width: number, height: number, radius = width / 2, defaultTimeStamp: number, onTimestampChange: (t: number) => void) {
  const CIRCLE = 2 * Math.PI;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  let _timestamp = defaultTimeStamp || 0;
  function draw(delay: number) {
    console.log(delay);
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.save();

    // 外圆
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    // 中心点
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    const time = new Date();
    const hour = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    ctx.rotate((CIRCLE / 12) * hour + (CIRCLE / 12) * (minutes / 60) - Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(40, 0);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();

    ctx.rotate((CIRCLE / 60) * minutes + (CIRCLE / 60) * (seconds / 60) - Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(60, 0);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();

    ctx.rotate((CIRCLE / 60) * seconds - Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(80, 0);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();

    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      ctx.rotate((2 * Math.PI) / 60);
      ctx.beginPath();
      ctx.moveTo(90, 0);
      ctx.lineTo(100, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
    ctx.save();

    ctx.lineWidth = 4;
    for (let i = 0; i < 12; i++) {
      ctx.rotate((2 * Math.PI) / 12);
      ctx.beginPath();
      ctx.moveTo(80, 0);
      ctx.lineTo(100, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
    ctx.restore();
    onTimestampChange((_timestamp = _timestamp + delay));
    setTimeout(draw, delay, delay);
  }
  return {
    el: canvas,
    run: (delay: number) => draw(delay),
  };
}
