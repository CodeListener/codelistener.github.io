import { computed, reactive, toRaw } from "vue";
import createClock from "../utils/createClock";
export type Options = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
};

const DEFAULT_OPTIONS: Options = {
  year: 2800,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
};
export default function useExoplanetClock(options: Options) {
  const clockInfo = reactive(Object.assign({}, DEFAULT_OPTIONS, options) as Required<Options>);
  const SECOND_TOTAL = 90;
  const MINUTE_TOTAL: number = 90;
  const HOUR_TOTAL: number = 36;

  // 每月天数
  const MONTH_ITEMS = [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38];
  // 一天的秒数
  const ONE_DAY_SECONDS = HOUR_TOTAL * MINUTE_TOTAL * SECOND_TOTAL;
  // 一年的秒数
  const ONE_YEAR_SECONDS = MONTH_ITEMS.reduce((prev, cur) => prev + cur * ONE_DAY_SECONDS, 0);

  // 当前星球的时间戳
  const currentExoplanetTimestamp = computed(() => {
    const { month, year, day, hour, minute, second } = clockInfo;
    // 今年开始到上一个月结束天数
    const curYearMonths = MONTH_ITEMS.slice(0, month - 1);
    // 到上一年已流失的时间
    const toPreTotalSeconds = ONE_YEAR_SECONDS * (year - 1);
    // 今年已经流逝的时间
    const curYearPrevMonthTotalSeconds = curYearMonths.reduce((prev, days) => prev + days * ONE_DAY_SECONDS, 0);
    // 今年这个月流逝的时间
    const curMonthSeconds = (day - 1) * ONE_DAY_SECONDS + hour * minute * second + minute * second + second;
    const result = toPreTotalSeconds + curYearPrevMonthTotalSeconds + curMonthSeconds;
    return result;
  });

  // 相对地球的时间
  const relativeEarthTimeStamp = computed(() => {
    return currentExoplanetTimestamp.value * 0.5 * 1000;
  });
  // 与地球的时间戳差值
  const timeDifferenceWithTheEarth = computed(() => {
    const result = Math.abs(relativeEarthTimeStamp.value - new Date("1970-01-01 12:00:00").getTime());
    console.warn("相对地球时间：", new Date(relativeEarthTimeStamp.value));
    console.warn("和地球时间戳相差数： ", result);
    return result;
  });

  function refreshTime(cb: Function) {
    let { month, second } = clockInfo;
    second += 1;
    if (second >= SECOND_TOTAL) {
      clockInfo.second = 0;
      clockInfo.minute++;
    } else {
      clockInfo.second = second;
    }
    if (clockInfo.minute >= MINUTE_TOTAL) {
      clockInfo.minute = 0;
      clockInfo.hour++;
    }
    if (clockInfo.hour >= HOUR_TOTAL) {
      clockInfo.hour = 0;
      clockInfo.day++;
    }
    if (clockInfo.day > MONTH_ITEMS[month - 1]) {
      clockInfo.day = 1;
      clockInfo.month++;
    }
    if (clockInfo.month > MONTH_ITEMS.length) {
      clockInfo.month = 1;
      clockInfo.year++;
    }
    cb();
    setTimeout(() => {
      refreshTime(cb);
    }, 500);
  }

  function renderClock(width: number, height: number, radius: number = width / 2) {
    const { el, run } = createClock("外星钟",width, height, radius);
    document.body.appendChild(el);
    run(toRaw(clockInfo));
    refreshTime(() => {
      run(toRaw(clockInfo));
    });
  }

  return {
    timeDifferenceWithTheEarth,
    relativeEarthTimeStamp,
    renderClock,
    clockInfo,
  };
}
