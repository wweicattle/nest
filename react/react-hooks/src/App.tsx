import * as React from 'react';
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ChangeEvent,
  memo,
  useCallback,
  useMemo,
} from 'react';

interface Props {
  src: string;
  onSubmit: () => void;
  memosData: number[];
}
interface Options {
  label: number;
  value: number;
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Son = () => {
  let [faNum, setNum] = useState(1);
  return (
    <>
      <div>我是son的子组件</div>
      <button
        onClick={() => {
          const num = ++faNum;
          setNum(num);
        }}
      >
        改变按钮的num值={faNum}
      </button>
      ----下面是SonGreetVideoPlayering 的组件内容----
      <SonGreetVideoPlayering src="https://www.wwcattle.site.com" />
    </>
  );
};

const SonGreetVideoPlayering = ({ src = 'www' }: Props) => {
  const hRef = useRef<any>(null);
  const sonRefs = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Options[]>([]);
  let [userId, setId] = useState(0);
  console.log('son组件重新渲染啦');

  useEffect(() => {
    getList();
    const timeId = setInterval(() => {
      console.log('time 执行了一次!');
    }, 2000);
    return () => {
      console.log('清除了');
      clearInterval(timeId);
    };
  }, [userId]);


  useEffect(() => {
    console.log('点击按钮+1 触发的effect2');
    return () => {};
  }, [userId]);


  useEffect(() => {
    console.log('触发的effect3');
  },[]);


  const getList = async () => {
    console.log('去请求远程数据!');
    const datas = await new Promise<Options[]>((res) => {
      const data = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ];
      res(data);
    });
    setTimeout(() => {
      setData(datas);
    }, 4000);
  };

  const handleSubmit = useCallback(() => {
    console.log('请求数据');
  }, []);
  const memosData = useMemo(() => {
    console.log('memos改变了');
    const data = [1, 2, 3, 4];
    return data;
  }, []);

  console.log(handleSubmit);

  const onAdd = () => {
    const num = ++userId;
    setId(num);
    setId((num) => num + 1);
    if (hRef.current) {
      hRef.current.style.color = 'red';
    }
  };

  return (
    <div>
      <h1 ref={hRef}>欢迎来到我的应用</h1>
      <div>我的num = {userId}</div>
      <button onClick={onAdd}>改变userID -add +1</button>
      父组件传过来的props数据
      <a href={src}>点击跳转</a>
      <div>请求返回回来的数据</div>
      {data.map((res, index) => {
        return (
          <div key={index}>
            {res.label}-{res.value}
          </div>
        );
      })}
      <div>---我是son的son的区域---</div>
      <div
        onClick={() => {
          sonRefs.current?.focus();
        }}
      >
        获取焦点
      </div>
      <RefSon
        ref={sonRefs}
        src={src}
        onSubmit={handleSubmit}
        memodatas={memosData}
      />
    </div>
  );
};

const RefSon = memo(
  forwardRef<HTMLInputElement, InputProps & { memodatas: number[] }>(
    (props, ref) => {
      const [values, setValue] = useState('100');
      console.log('input的组件重新渲染!');

      return (
        <>
          <input
            type="text"
            value={values}
            ref={ref}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue(e.target?.value);
            }}
            {...props}
          />
          <div>我是son 的son-input的value是{values}</div>
        </>
      );
    },
  ),
);

export default Son;
