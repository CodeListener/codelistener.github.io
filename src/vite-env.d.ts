/// <reference types="vite/client" />

type Graduation = {
  hour: number;
  minute: number;
};

type ClockSetting = {
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

type Notice = {
  date: DateTimeData;
  content: string;
  isShow?: boolean;
};
type ClockControl = {
  run: () => void;
  stop: () => void;
  setDateTime: (data: Partial<DateTimeData>) => void;
  getDateTime: () => DateTimeData;
  isStop: boolean;
};
