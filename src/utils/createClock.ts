function fullZero(v: number) {
  return `${v}`.padStart(2, "0");
}

type Options = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};
export default function createClock(title: string, width: number, height: number, radius: number, graduation: Graduation) {
  const CIRCLE = 2 * Math.PI;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  function draw(timeInfo: Options) {
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.font = "18px sans-serif";
    ctx.fillText(title, radius * 2 + 50, height / 2 - 30);

    ctx.font = "16px sans-serif";
    ctx.fillText(`${timeInfo.year} 年 ${fullZero(timeInfo.month)} 月 ${fullZero(timeInfo.day)} 日`, radius * 2 + 50, height / 2 - 0);
    ctx.font = "14px sans-serif";
    ctx.fillText(`${fullZero(timeInfo.hour)} : ${fullZero(timeInfo.minute)} : ${fullZero(timeInfo.second)}`, radius * 2 + 50, height / 2 + 20);
    ctx.translate(radius, height / 2);
    ctx.save();

    // 外圆
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    // 中心点
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    const hour = timeInfo.hour % graduation.hour;
    const minutes = timeInfo.minute;
    const seconds = timeInfo.second;

    // 时针
    ctx.rotate((CIRCLE / graduation.hour) * hour + (CIRCLE / graduation.hour) * (minutes / graduation.minute) - Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(radius * 0.4, 0);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();

    // 分针
    ctx.rotate((CIRCLE / graduation.minute) * minutes + (CIRCLE / graduation.minute) * (seconds / graduation.minute) - Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(radius * 0.6, 0);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();

    // 秒针
    ctx.rotate((CIRCLE / graduation.minute) * seconds - Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(radius * 0.8, 0);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();

    ctx.lineWidth = 1;
    for (let i = 0; i < graduation.minute; i++) {
      ctx.rotate((CIRCLE / graduation.minute) * i - Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(radius * 0.9, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      ctx.save();
    }
    ctx.restore();
    ctx.save();

    for (let i = 0; i < graduation.hour; i++) {
      ctx.lineWidth = 3;
      ctx.rotate((CIRCLE / graduation.hour) * i - Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(radius * 0.7, 0);
      ctx.lineTo(radius * 0.88, 0);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      ctx.save();
    }
    ctx.restore();
    ctx.restore();
  }
  return {
    el: canvas,
    run: draw,
  };
}
