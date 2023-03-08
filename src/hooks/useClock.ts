import { computed, reactive, toRaw } from "vue";
import createClock from "../utils/createClock";
import { EarthSetting } from "../utils/planet";
type Options = {
  title?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  graduation?: Graduation;
  setting?: ClockSetting;
};

const currentDate = new Date();
const DEFAULT_OPTIONS: Options = {
  title: "当前地球时间",
  year: currentDate.getFullYear(),
  month: currentDate.getMonth() + 1,
  day: currentDate.getDate(),
  hour: currentDate.getHours(),
  minute: currentDate.getMinutes(),
  second: currentDate.getSeconds(),
  setting: EarthSetting,
  graduation: {
    hour: 12,
    minute: 60,
  },
};
export default function useExoplanetClock(options?: Options) {
  const clockInfo = reactive(Object.assign({}, DEFAULT_OPTIONS, options) as Required<Options>);

  
  // // 相对地球的时间
  // const relativeEarthTimeStamp = computed(() => {
  //   return currentExoplanetTimestamp.value * 0.5 * 1000;
  // });
  // // 与地球的时间戳差值
  // const timeDifferenceWithTheEarth = computed(() => {
  //   const result = Math.abs(relativeEarthTimeStamp.value - new Date("1970-01-01 12:00:00").getTime());
  //   console.warn("相对地球时间：", new Date(relativeEarthTimeStamp.value));
  //   console.warn("和地球时间戳相差数： ", result);
  //   return result;
  // });

  function refreshTime(cb: Function) {
    let { month, second } = clockInfo;
    const setting = clockInfo.setting!;
    second += 1;
    if (second >= setting.SECONDS) {
      clockInfo.second = 0;
      clockInfo.minute++;
    } else {
      clockInfo.second = second;
    }
    if (clockInfo.minute >= setting.MINUTES) {
      clockInfo.minute = 0;
      clockInfo.hour++;
    }
    if (clockInfo.hour >= setting.HOURS) {
      clockInfo.hour = 0;
      clockInfo.day++;
    }
    if (clockInfo.day > setting.MONTH_ITEMS[month - 1]) {
      clockInfo.day = 1;
      clockInfo.month++;
    }
    if (clockInfo.month > setting.MONTH_ITEMS.length) {
      clockInfo.month = 1;
      clockInfo.year++;
    }
    cb();
    setTimeout(() => {
      refreshTime(cb);
    }, setting.DURATION);
  }

  function renderClock(width: number, height: number, radius: number = width / 2) {
    const { el, run } = createClock(clockInfo.title, width, height, radius, { hour: clockInfo.graduation.hour, minute: clockInfo.graduation.minute });
    document.body.appendChild(el);
    run(toRaw(clockInfo));
    refreshTime(() => {
      run(toRaw(clockInfo));
    });
  }

  return {
    // timeDifferenceWithTheEarth,
    // relativeEarthTimeStamp,
    renderClock,
    clockInfo,
  };
}
