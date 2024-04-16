import React, { useEffect, useState, useRef } from 'react';
import datas from './data';
import ItemStyle from './index.module.less';
import LeftModule from './left-module';
import RightModule from './right-module';
import useDot from './hooks/use-dot';

interface Properties {
  startTime: number;
  accountUuid: string;
  baned: number;
  bannedTime: number;
  createTime: number;
  registerTime: number;
  token?: string;
}
interface EtraProperties {
  accountName: number;
  count: number;
  registerTime: number;
  inBlackList: boolean;
  preProfileVerifyStatus: number;
  zhimaCertification: number;
}

export interface ResponseData {
  id: string;
  labels: string[];
  properties: Properties;
  source: string;
  target: string;
  type: string;
  extraProperties: EtraProperties;
  checked?: boolean;
}

export interface Response {
  nodes: ResponseData[];
  relationships: ResponseData[];
}
const DIRECTIONLEFT = 'left';
const DIRECTIONRIGHT = 'right';
const LINEDATASOURCE = 'source';
const LINEDATATARGET = 'target';

interface State {
  left: ResponseData[];
  right: ResponseData[];
  source: Record<string, (number | string)[]>;
  target: Record<string, (number | string)[]>;
}
export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moduleRef = useRef<HTMLDivElement>(null);

  const refs = useRef<Record<number, HTMLDivElement>[]>([]);

  let targetDotArr = [];
  const [dealData, setDealData] = useState<State>({
    left: [],
    right: [],
    source: {},
    target: {},
  });
  const { setLine } = useDot(refs, canvasRef, moduleRef);

  const dealResponseData = (data: Response) => {
    let state: State = {
      left: [],
      right: [],
      source: {},
      target: {},
    };
    state[DIRECTIONLEFT] = data.nodes.filter((res: Record<string, any>) => {
      return res.labels.includes('Account');
    });
    state[DIRECTIONRIGHT] = data.nodes.filter((res: Record<string, any>) => {
      return res.labels.includes('Equipment');
    });

    const leftIds = state[DIRECTIONLEFT].map((res) => res.id);
    const rightIds = state[DIRECTIONRIGHT].map((res) => res.id);

    data.relationships.forEach((res: ResponseData) => {
      if (leftIds.includes(res.source)) {
        if (!state[LINEDATASOURCE][res.source]) {
          state[LINEDATASOURCE][res.source] = [];
          state[LINEDATASOURCE][res.source].push(res.target);
        } else {
          state[LINEDATASOURCE][res.source].push(res.target);
        }
      }
      if (rightIds.includes(res.target)) {
        if (!state[LINEDATATARGET][res.target]) {
          state[LINEDATATARGET][res.target] = [];
          state[LINEDATATARGET][res.target].push(res.source);
        } else {
          state[LINEDATATARGET][res.target].push(res.source);
        }
      }
    });
    return state;
  };

  const createLine = (id: string, direaction: 'left' | 'right') => {
    // 计算点与点之间的连线关系
    targetDotArr = dealData[
      direaction === DIRECTIONLEFT ? LINEDATASOURCE : LINEDATATARGET
    ][id] as string[];
    // 开始画线
    setLine(id, direaction, targetDotArr);
  };


  const setRef = (item: ResponseData, element: HTMLDivElement) => {
    refs.current[item.id] = element;
  };

  useEffect(() => {
    setTimeout(() => {
      const data = dealResponseData(datas as unknown as Response);
      setDealData(data);
    }, 1000);
  }, []);
  return (
    <>
      <div ref={moduleRef}>
        <canvas
          className="canvas"
          ref={canvasRef}
          width={2000}
          height={2200}
        ></canvas>
        <div className={ItemStyle.contains}>
          <div className={ItemStyle['left-contain']}>
            {dealData.left.map((res, index) => {
              return (
                <LeftModule
                  key={index}
                  ref={(ref) => {
                    setRef(res, ref);
                  }}
                  data={res}
                  createLine={() => {
                    createLine(res.id, 'left');
                  }}
                />
              );
            })}
          </div>
          <div className={ItemStyle['right-contain']}>
            {dealData.right.map((res, index) => {
              return (
                <RightModule
                  key={index}
                  ref={(ref) => {
                    setRef(res, ref);
                  }}
                  data={res}
                  createLine={() => {
                    createLine(res.id, 'right');
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
