import React, { Children, PureComponent } from 'react';
import { Button, type ButtonProps } from 'antd';

interface ButtonType {
  attrs: any;
  children: React.ReactNode;
}
const FormItem = () => {
  return (
    <>
      <div className="items">formItem</div>;
    </>
  );
};

const Form = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>formcontainers</div>
      {children}
    </>
  );
};
Form.Item = FormItem;

//
export default ({ attrs }: any) => {
  console.log(attrs);
  console.log(<div>323</div>);
  const divs = <div>100000</div>;
  const attr: ButtonProps = {
    type: 'dashed',
    onClick() {
      console.log('this is click');
    },
    danger: true,
    disabled: false,
    ghost: true,
    size: 'small',
    style: {
      color: '#008c8c',
      fontSize: '20px',
    },
  };
  return (
    <>
      <Form>
        <Form.Item></Form.Item>
      </Form>
    </>
  );
};
