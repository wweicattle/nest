import { useState } from 'react';
interface Student<T> {
  name: string;
  age: number;
  num: number;
  descibe: T extends Object ? string : number;
}

export default function table<T>(): [
  Student<number>[],
  (params: Student<number>[]) => void,
] {
  const [value, setValue] = useState<Student<number>[]>([]);

  const updateValue = (params: Student<number>[]): void => {
    setValue(params);
  };

  return [value, updateValue];
}
