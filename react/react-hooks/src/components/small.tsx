import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Select, Button, Space, Tour, type TourProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const num = 'Jack';
const defaultValue: string[] = ['b11', 'b14'];
// let options: { label: string; value: string }[] = [];

const Demo = () => {
  return <div>demo1</div>;
};

const Demo1 = () => {
  const [text, setText] = useState('lucy');
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  let timeId: string | number | NodeJS.Timeout | undefined;
  const [open, setOpen] = useState<boolean>(false);
  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <>
          <div>323</div>
          <img
            alt="tour.png"
            src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
          />
        </>
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];

  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    [],
  );

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setText(value);
    setText(value + '2');
    setTimeout(() => {
      setText((value) => value + 323);
      getList();
    }, 5000);
  };
  console.log(text);
  

  const getList = () => {
    setTimeout(() => {
      const newOptions = [];
      for (let i = 10; i < 36; i++) {
        newOptions.push({
          value: i.toString(36) + i,
          label: i.toString(36) + i,
        });
      }
      setOptions(newOptions);
      console.log('获取筛选项的接口数据执行咯!');
    }, 4000);
  };

  const dealData = () => {
    console.log('dealData');
    if (timeId) return;
    timeId = setInterval(() => {
      console.log(11);
    }, 2000);
  };

  useEffect(() => {
    console.log('effect不带任何参数,执行一次');
  });

  useEffect(() => {
    dealData();
    return () => {
      console.log('update stop time');
      clearInterval(timeId);
    };
  }, []);
  return (
    <>
      <Button type="primary" onClick={dealData}>
        开始轮训数据
      </Button>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin non-modal Tour
      </Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        mask={false}
        type="primary"
        steps={steps}
      />
      <Select
        defaultValue={num}
        value={text}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        disabled
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        loading
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />
      <Select
        mode="tags"
        style={{ width: 120 }}
        placeholder="请多选!"
        onChange={handleChange}
        options={options}
        defaultValue={defaultValue}
      />
      {options.map((res,index) => {
        return (
          <>
            <div key={index}>
              <span key={index} style={{ color: '#008c8c', fontSize: '20px' }}>
                {res.label}
              </span>
            </div>
          </>
        );
      })}

      <div>-------</div>
      <Button ref={ref1}> Upload</Button>
      <Button ref={ref2} type="primary">
        Save
      </Button>
      <Button ref={ref3} icon={<EllipsisOutlined />} />
    </>
  );
};
export default () => {
  const [visable, setVisable] = useState(false);
  let com;
  if (visable) {
    com = <Demo />;
  } else {
    com = <Demo1 />;
  }
  return (
    <>
      <Button
        onClick={() => {
          setVisable((preVisable) => {
            return !preVisable;
          });
        }}
      >
        切换数据组件
      </Button>
      <div>----------</div>
      {com}
    </>
  );
};
