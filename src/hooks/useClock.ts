import { reactive, toRaw } from "vue";
import createClock from "../utils/createClock";
import { EarthSetting } from "../utils/planet";
type Options = {
  title?: string;
  graduation?: Graduation;
  setting?: ClockSetting;
} & Partial<DateTimeData>;

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
  const clockInfo = reactive({ ...DEFAULT_OPTIONS, ...options } as Required<Options>);
  let clockControl: ClockControl;

  function bindClockElement(renderFn: Function) {
    let timer: number | null = 0;
    const control: ClockControl = {
      isStop: true,
      stop() {
        timer && clearTimeout(timer);
        this.isStop = true;
        timer = null;
      },
      run() {
        this.isStop = false;
        let { month, second } = clockInfo;
        const setting = clockInfo.setting;
        second += 1;
        if (second >= setting.seconds) {
          clockInfo.second = 0;
          clockInfo.minute++;
        } else {
          clockInfo.second = second;
        }
        if (clockInfo.minute >= setting.minutes) {
          clockInfo.minute = 0;
          clockInfo.hour++;
        }
        if (clockInfo.hour >= setting.hours) {
          clockInfo.hour = 0;
          clockInfo.day++;
        }
        if (clockInfo.day > setting.monthItems[month - 1]) {
          clockInfo.day = 1;
          clockInfo.month++;
        }
        if (clockInfo.month > setting.monthItems.length) {
          clockInfo.month = 1;
          clockInfo.year++;
        }
        renderFn();
        timer = setTimeout(() => {
          this.run();
        }, setting.duration);
      },
      getDateTime() {
        return clockInfo;
      },
      setDateTime(data) {
        Object.assign(clockInfo, data);
        renderFn();
        this.stop();
        timer = setTimeout(() => {
          this.run();
        }, clockInfo.setting.duration);
      },
    };
    return control;
  }

  function renderClock(width: number, height: number, radius: number, mount?: string, timedCallback?: (date: DateTimeData) => void) {
    const { el, run } = createClock(clockInfo.title, width, height, radius, { hour: clockInfo.graduation.hour, minute: clockInfo.graduation.minute });
    mount ? document.querySelector(mount)?.appendChild(el) : document.body.appendChild(el);
    const render = () => {
      run(toRaw(clockInfo));
      timedCallback?.(clockInfo);
    };
    render();
    clockControl = bindClockElement(render);
    clockControl.run();
    return clockControl;
  }

  return {
    renderClock,
  };
}
