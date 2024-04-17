import * as React from 'react';
import useWWCookie from './useCookie';
import { Button, type ButtonProps } from 'antd';

import { useCookie } from 'react-use';
import useTable from './useTable';
import HOC from './HOC';
console.log(HOC);

interface Student<T> {
  name: string;
  age: number;
  num: number;
  descibe: T extends Object ? string : number;
}
// export  () => {
//   const [realValue, realUpdateCookie, realDeleteCookie] = useCookie('name');
//   const [value, updateCookie, deleteCookie] = useWWCookie('ge');

//   const [tableValue, updateTableValue] = useTable();
//   const dealFn = <T extends String>(params: T) => {
//     return params;
//   };
//   function as<T extends Student<number>>(a: T): T {
//     return a;
//   }

//   dealFn<string>('323');

//   const editCookies = () => {
//     // updateCookie({ sa: 323 });
//   };

//   const attr: ButtonProps = {
//     type: 'dashed',
//     onClick() {
//       console.log('this is click');
//     },
//     danger: true,
//     disabled: false,
//     ghost: true,
//     size: 'small',
//     style: {
//       color: '#008c8c',
//       fontSize: '20px',
//     },
//   };

//   return (
//     <>
//       <HOC attrs={(arr :any)=>{return <Button {...arr}>Father send</Button>}}>HOC装饰</HOC>
//       <div>
//         table {JSON.stringify(tableValue)}
//         <Button
//           onClick={() => {
//             updateTableValue([
//               { name: 'wuwei', age: 323, descibe: '32323', num: 323 },
//             ]);
//           }}
//         >
//           修改table
//         </Button>
//       </div>
//       <div>
//         new --{JSON.stringify(realValue)}--
//         <Button
//           onClick={() => {
//             realUpdateCookie(JSON.stringify({ as: 323 }));
//           }}
//         >
//           修改cookie
//         </Button>
//         <Button
//           onClick={() => {
//             realDeleteCookie();
//           }}
//         >
//           delcookie
//         </Button>
//       </div>
//       {/* <Cookie></Cookie> */}
//       <Button
//         onClick={() => {
//           deleteCookie();
//         }}
//       >
//         清除cookie
//       </Button>
//       <Button onClick={editCookies}>修改cookie</Button>
//       <div>test{value}</div>
//     </>
//   );
// };

function withWindowWidth(BaseComponent) {
  console.log(BaseComponent, BaseComponent({ as: 32 }));

  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
    };
    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      });
    };
    componentDidMount() {
      window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
    render() {
      return (
        <>
          {BaseComponent({ as: 32 })}
          <BaseComponent {...this.props} {...this.state} />
        </>
      );
    }
  }
  return DerivedClass;
}
const MyComponent = (props) => {
  return (
   <div>{JSON.stringify(props)}</div>
  );
};
export default withWindowWidth(MyComponent);
