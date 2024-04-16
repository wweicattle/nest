import React from 'react';
import { Area, Rose ,WordCloud} from '@ant-design/plots';
const colors = [
  '#008c8c',
  '#8a89a6',
  '#7b6888',
  '#6b486b',
  '#a05d56',
  '#d0743c',
  '#ff8c00',
];

const configB = {
  paddingTop: 40,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  layout: { spiral: 'rectangular' },
  colorField: 'text',
};

const configA = {
  width: 600,
  height: 800,
  autoFit: true,
  innerRadius: 0.4,
  data: {
    type: 'fetch',
    value:
      'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/rose-stacked-rose.json',
    transform: [
      {
        type: 'fold',
        fields: [
          'Under 5 Years',
          '5 to 13 Years',
          '14 to 17 Years',
          '18 to 24 Years',
          '25 to 44 Years',
          '45 to 64 Years',
          '65 Years and Over',
        ],
        key: 'Age',
        value: 'Population',
      },
    ],
  },
  xField: 'State',
  yField: 'Population',
  colorField: 'Age',
  stack: true,
  scale: {
    y: { type: 'sqrt' },
    color: {
      range: colors,
    },
  },
  axis: {
    x: { position: 'inner' },
    y: {
      labelFormatter: '~s',
      tickFilter: (_, i) => i !== 0,
      direction: 'center',
    },
  },
  legend: { color: { position: 'center', display: 'grid', gridCol: 1 } },
};
const config = {
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  },
  xField: (d) => new Date(d.date),
  yField: 'unemployed',
  colorField: 'industry',
  shapeField: 'smooth',
  stack: true, // Try to remove this line.
};

export default () => {
  return (
    <>
      <WordCloud {...configB} />
      <Rose {...configA} />
      <Area {...config} />
    </>
  );
};
