import React, {
  useState,
  useMemo,
  memo,
  CSSProperties,
  useEffect,
  lazy,
  Suspense,
  type ChangeEvent,
} from 'react';
// import ClipLoader from 'react-spinners/ClipLoader';
import { Column, Table } from 'react-virtualized';
// import GridLayout from 'react-grid-layout';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

// const override: CSSProperties = {
//   display: 'block',
//   margin: '0 auto',
//   borderColor: 'red',
// };
const list = [{ name: 'Brian Vaughn', description: 'Software engineer' }];

// const layout = [
//   { i: 'a', x: 0, y: 0, w: 1, h: 2 },
//   { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//   { i: 'c', x: 4, y: 0, w: 1, h: 2 },
//   { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//   { i: 'c', x: 4, y: 0, w: 1, h: 2 },
//   { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//   { i: 'c', x: 4, y: 0, w: 1, h: 2 },
//   { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//   { i: 'c', x: 4, y: 0, w: 1, h: 2 },
// ];

for (let index = 0; index < 10; index++) {
  list[index] = {
    name: 'Brian Vaughn' + index,
    description: 'Software engineer',
  };
}

const Maps = () => {
  return (
    <>
      (
      {list.map((res) => {
        return (
          <div>
            {res.name}-{res.description}
          </div>
        );
      })}
      )
    </>
  );
};

const lazyLoad = (url: string) => {
  const Module = lazy(() => import(`./${url}.tsx`));
  return <Module />;
};
// const Com = lazyLoad('table');

const queryClient = new QueryClient();

const Example = memo(() => {
  const [value, setValue] = useState<string>('');
  const fetchTodos = async ({ queryKey }) => {
    return new Promise((res) => {
      setTimeout(() => {
        res([{ sa: 32 }]);
      }, 4000);
    });
  };

  const as = useMemo(() => {
    return [{ value }];
  }, [value]);
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: as,
    cacheTime: 20000,
    queryFn: fetchTodos,
  });

  return (
    <>
      <div>
        <Maps />
        <input
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
        />
        当前的状态加载={isLoading ? '加载中....' : '加载完成'}
        {JSON.stringify(data)}
      </div>
    </>
  );
});
//   return res.props.slot === 'footer';
type Props = {
  children: React.ReactNode;
};
export default React.FC(({ children }: Props) => {
  // let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('1');
  // const Footer = children.find((res) => {
  //   return res.props.slot === 'footer';
  // });
  // console.log(Footer);
  console.log(children);

  // const children = useMemo(() => {
  //   return new Array(100).fill(undefined).map((val, idx) => {
  //     return (
  //       <div
  //         className="item"
  //         key={idx}
  //         data-grid={{ x: idx, y: 1, w: 1, h: idx }}
  //       >
  //         {idx}
  //       </div>
  //     );
  //   });
  // }, []);

  const getList = () => {
    setColor((value: string) => value + 1);
  };
  useEffect(() => {
    setInterval(() => {
      // getList();
    }, 2000);
  }, []);

  return (
    <>
      {/* <div style={{ color: 'red' }}>{Footer}</div> */}
      {/* <form action={search}>
        <input name="query" />
        <button type="submit">Search</button>
      </form> */}
      <Suspense fallback={<div>Loading...</div>}>
        wuwei{lazyLoad('table')}
      </Suspense>
      <div>请求库</div>
      <div>
        <QueryClientProvider client={queryClient}>
          <Example />
        </QueryClientProvider>
      </div>
      <div>
        {/* <GridLayout
          className="layout"
          layout={layout}
          rowHeight={100}
          width={600}
        >
          {children}
        </GridLayout> */}
        {/* <GridLayout
          className="layout"
          layout={layout}
          rowHeight={200}
          width={1200}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        >
          <div key="a" className="item">
            a
          </div>
          <div key="b" className="item">
            b
          </div>
          <div key="c" className="item">
            c
          </div>
        </GridLayout> */}
      </div>
      <div>表格虚拟</div>
      <Table
        width={300}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
      >
        <Column label="Name" dataKey="name" width={100} />
        <Column width={200} label="Description" dataKey="description" />
      </Table>
      <div>进行拖拽</div>
      {/* {lazyLoad("table")} */}

      <div>
        {/* <div className="sweet-loading">
          <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
          <input
            value={color}
            onChange={(input) => setColor(input.target.value)}
            placeholder="Color of the loader"
          />
          <ClipLoader
            cssOverride={override}
            size={100}
            color={'#008c8c'}
            loading={loading}
            speedMultiplier={2}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div> */}
      </div>
    </>
  );
})
