import * as React from 'react';
import {
  useState,
  useId,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
  memo,
  useRef
} from 'react';
import { Button } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import dataStyle from './css/data-v.module.css';

const ThemeContexts = createContext<Record<string, any>>({});

const List = memo(
  ({ handleSubmit, items }: { items: any; handleSubmit: any }) => {
    const [text, setText] = useState<Record<string, any>>({});
    return (
      <>
        <span>1{text.text}</span>
      </>
    );
  },
);

const GrandSon = () => {
  const theme = useContext(ThemeContexts);
  const ID = useId();
  const IDs = useId();
  const formRef = useRef(100);


  const [text, setText] = useState<Record<string, any>>({});

  const handleSubmit = useCallback(() => {
    console.log('handleSubmit');
  }, [JSON.stringify(text)]);

  const getList = () => {
    setTimeout(() => {
      console.log(1);
      setText({
        name: 'wukai',
        age: 30,
        number: 1995,
      });
      formRef.current=121212
    }, 4000);
  };
  getList();
  const textMemo = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, []);
  return (
    <>
    useRef{formRef.current}--
      <div>{JSON.stringify(text)}</div>; ------
      <List handleSubmit={handleSubmit} items={textMemo} />
      ------ 
      {JSON.stringify(theme)}
      <div>
        生成一个唯一的id={ID}
        {IDs}
      </div>
    </>
  );
};
const GrandFatherSon = () => {
  const ID = useId();
  const theme = useContext(ThemeContexts);

  return (
    <>
      {JSON.stringify(theme)}
      {ID}
      {ID}
      {ID}
    </>
  );
};

const Son = () => {
  const theme = useContext(ThemeContexts);

  return (
    <>
      {Object.keys(theme).map((res) => {
        return (
          <div key={res}>
            {res}
            {theme[res]}
          </div>
        );
      })}
      <div className={dataStyle.contain}>
        我的年龄是父组件传的context值= {theme.name}
      </div>
      <div>下面是外祖父的组件的数据</div>
      <GrandSon />

      <GrandFatherSon />
    </>
  );
};

//使用hooks
export default () => {
  const [text, setText] = useState<Record<string, any>>({
    name: 'wuwei',
    ageL: 28,
    number: 1997,
  });
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    setTimeout(() => {
      console.log('time 要执行了');
      setText({
        name: 'wukai',
        age: 30,
        number: 1995,
      });
    }, 4000);
  };

  return (
    <>
      <ThemeContexts.Provider value={text}>
        <Son />
      </ThemeContexts.Provider>
    </>
  );
};
