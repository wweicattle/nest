import * as React from 'react';
import { useState, useEffect } from 'react';
import { Input, Button, QRCode, Space } from 'antd';

export default () => {
  const [text, setText] = useState('https://blog.wwcattle.site/');
  console.log('edit');
  const [size, setSize] = useState(150);
  const expand = () => {
    console.log('exoand');

    setSize((prevSize) => {
      return prevSize + 10;
    });
  };
  const noExpand = () => {
    setSize((prevSize) => {
      return prevSize - 10 || 160;
    });
  };
  // 监听当size大于200执行我要触发了!
  useEffect(() => {
    console.log(size, 'size变化了!');
    if (size > 200) {
      alert('提示大于200了!');
    }
  }, [size]);
  useEffect(() => {
    console.log('我只想要执行一次哈!');
  }, []);

  return (
    <div className="contain">
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="dashed" onClick={expand}>
        放大
      </Button>
      <Button type="text" onClick={noExpand}>
        缩小
      </Button>
      <QRCode color='#008c8c' type="canvas" value={text} size={size} />
    </div>
  );
};
