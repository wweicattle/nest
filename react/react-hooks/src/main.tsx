import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import Table from './components/table';
// import Code from './components/qr-code';
// import Date from './components/date';
// import Small from './components/small';
// import DateV from './components/data-v';
import Three from './components/Three';
import Line from './components/User-Line';
import Hooks from "./components/hooks/useHookContain"

import './index.css';
const slotData = [
  {
    name: 'wuwei',
    age: 28,
    numer: 1962,
  },
];
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <div className="contain">
      <Hooks />
      {/* <Three>
        <div slot="footer"><div>323</div></div>
      </Three> */}
    </div>
    {/* <App /> */}
    {/* <Table /> */}
    {/* <Code /> */}
  </>,
);
