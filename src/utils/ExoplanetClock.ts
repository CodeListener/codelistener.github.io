export default class ExoplanetClock {
  public year: number;
  public month: number;
  public day: number;
  public hour: number;
  public minute: number;
  public second: number;
  // base setting info
  private SECOND_TOTAL: number = 90;
  private MINUTE_TOTAL: number = 90;
  private HOUR_TOTAL: number = 36;

  // 每月天数
  get MONTH_ITEMS() {
    return [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38];
  }
  // 一天的秒数
  get ONE_DAY_SECONDS() {
    return this.HOUR_TOTAL * this.MINUTE_TOTAL * this.SECOND_TOTAL;
  }
  // 一年的秒数
  get ONE_YEAR_SECONDS() {
    return this.MONTH_ITEMS.reduce((prev, cur) => prev + cur * this.ONE_DAY_SECONDS, 0);
  }

  constructor(year: number, month: number, day: number, hour: number, minute: number, second: number) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.run();
  }

  // 获取当前星球时间戳
  getCurrentTimeWidthTheExoplane() {}

  // 相对地球的时间
  get relativeEarthTimeStamp() {
    // 今年开始到上一个月结束天数
    const curYearMonths = this.MONTH_ITEMS.slice(0, this.month - 1);
    // 到上一年已流失的时间
    const toPreTotalSeconds = this.ONE_YEAR_SECONDS * (this.year - 1);
    // 今年已经流逝的时间
    const curYearPrevMonthTotalSeconds = curYearMonths.reduce((prev, days) => prev + days * this.ONE_DAY_SECONDS, 0);
    // 今年这个月流逝的时间
    const curMonthSeconds = (this.day - 1) * this.ONE_DAY_SECONDS + this.hour * this.minute * this.second + this.minute * this.second + this.second;
    // 转成地球时间流逝的时间戳
    const result = ((toPreTotalSeconds + curYearPrevMonthTotalSeconds + curMonthSeconds) / 0.5) * 1000;
    return result;
  }
  // 与地球的时间戳差值
  get timeDifferenceWithTheEarth() {
    const result = Math.abs(this.relativeEarthTimeStamp - new Date("1970-01-01 12:00:00").getTime());
    console.warn("相对地球时间：", new Date(this.relativeEarthTimeStamp));
    console.warn("和地球时间戳相差数： ", result);
    return result;
  }

  setCurrentTime() {}

  createClock(width: number, height: number, radius: number = width / 2) {
    const CIRCLE = 2 * Math.PI;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    function draw() {
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
      requestAnimationFrame(draw);
    }
    document.body.appendChild(canvas);
    draw();
  }
}
