import React, { forwardRef } from 'react';
import ItemStyle from './index.module.less';
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

type ComBineType = { data: ResponseData; createLine: () => void };
export default forwardRef<HTMLDivElement, ComBineType>((props, ref) => {
  const { createLine, data } = props;
  return (
    <>
      <div ref={ref} className={ItemStyle.item} onClick={createLine}>
        {JSON.stringify(data)}
      </div>
    </>
  );
});
