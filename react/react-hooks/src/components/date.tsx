import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  DatePicker,
  type DatePickerProps,
  type TimeRangePickerProps,
  Button,
} from 'antd';
import dayjs,{type Dayjs} from 'dayjs';

const { RangePicker } = DatePicker;
export default () => {
  const [text, setText] = useState<Dayjs>(dayjs());
  const monthFormat = 'YYYY/MM';

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    console.log('我只想要执行一次哈!');
  }, []);

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: '最近7天s', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];
  const editTime = (_:Event, date: string) => {
    console.log(_,date,dayjs(date, monthFormat));
    const newTime = dayjs(date)
    setText(newTime);
  };

  return (
    <>
      <DatePicker onChange={onChange} />
      <DatePicker
        defaultValue={text}
        value={text}
        onChange={onChange}
      />
      <DatePicker
        defaultValue={dayjs('2015/01', monthFormat)}
        onChange={onChange}
        picker="year"
      />

      <RangePicker presets={rangePresets} />
      <RangePicker
        picker="month"
        defaultValue={[
          dayjs('2012/01', monthFormat),
          dayjs('2015/01', monthFormat),
        ]}
      />
      <RangePicker
        picker="quarter"
        defaultValue={[
          dayjs('2012/01', monthFormat),
          dayjs('2015/06', monthFormat),
        ]}
      />
      <Button onClick={(_) => editTime(_, '2023/5/11')}>修改时间</Button>
    </>
  );
};
