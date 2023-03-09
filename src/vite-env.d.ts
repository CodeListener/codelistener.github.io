/// <reference types="vite/client" />

type Graduation = {
  hour: number;
  minute: number;
};

type ClockSetting = {
  baseStartDate: DateTimeData;
  seconds: number;
  minutes: number;
  hours: number;
  monthItems: number[];
  oneHourSeconds: number;
  oneDaySeconds: number;
  oneYearSeconds: number;
  duration: number;
  getTimestamp: (d: DateTimeData) => number;
};

type DateTimeData = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type Notice = DateTimeData;

type ClockControl = {
  run: () => void;
  stop: () => void;
  setDateTime: (data: Partial<DateTimeData>) => void;
  getDateTime: () => DateTimeData;
  isStop: boolean;
  addNotice(n: Notice): void;
};
