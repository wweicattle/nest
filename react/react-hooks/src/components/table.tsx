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
import { Button, Checkbox, Table, Form, type FormProps, Input } from 'antd';
import { watch } from 'fs';
import { getMaxListeners } from 'events';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: ForProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  Table.EXPAND_COLUMN,
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 1,
      total: 2,
    },
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys([1, 2]);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 2,
        pageSize: 1,
        total: 2,
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setLoading(true);
    console.log('Success:', values);
    setTimeout(() => {
      setLoading(false);
      const data = dataSource;
      setData(data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 2,
        },
      });
    }, 1000);
  };
  const a = 100;

  useEffect(() => {
    console.log('请求一次数据!');
    onFinish(32);
  }, []);

  return (
    <div className="contain">
      {a}
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 800 }}
        initialValues={{ username: 'wuwei', password: 32323, number: 2121 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item<FieldType>
          label="姓名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="学号"
          name="number"
          rules={[{ required: true, message: 'Please input your number!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
      <div>------------</div>
      <Table
        rowSelection={rowSelection}
        pagination={tableParams.pagination}
        loading={loading}
        dataSource={data}
        columns={columns}
        onChange={rowSelection.onChange}
        scroll={{ y: 240 }}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <div>this is title</div>
              <div>this is ages</div>
            </>
          ),
        }}
      />
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
};
