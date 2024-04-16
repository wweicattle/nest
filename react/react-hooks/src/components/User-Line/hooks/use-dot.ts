// import { HTMLAttributes } from '@vue/runtime-dom'
// import { DireactionType, DotType, CombineType } from '../type'
// import { DIRECTION } from '../enum'
type DireactionType = 'left' | 'right';
type DotType = [number, number];
const DIRECTIONLEFT = 'left';
const DIRECTIONRIGHT = 'right';
const getOps = (div: HTMLElement, direaction: DireactionType): DotType => {
  let rect = div?.getBoundingClientRect(); // 获取元素的位置和大小信息
  let leftMidX = 0;
  let leftMidY = 0;
  if (direaction === DIRECTIONLEFT) {
    leftMidX = rect.right; // 获取元素右边的 x 坐标
  } else {
    leftMidX = rect.left;
  }
  leftMidY = rect.top + rect.height / 2; // 获取元素中间的 y 坐标

  return [leftMidX, leftMidY];
};

export default (
  refs: { current: any },
  canvasRef: { current: HTMLCanvasElement | null },
  moduleRef: { current: HTMLDivElement | null },
) => {
  console.log(refs, canvasRef);

  let positionDot: { left: number; top: number } = { left: 0, top: 0 };
  let context: CanvasRenderingContext2D;

  //减去筛选项高度
  const FORMBOXHEIGHT = 0;

  // 点与点开始画
  const crateLineElement = (lineStart: DotType, targetDot: DotType) => {
    // 给定的坐标点
    let point1 = { x: lineStart[0], y: lineStart[1] };
    let point2 = { x: targetDot[0], y: targetDot[1] };

    context.setLineDash([5, 3]);
    context.beginPath();

    context.moveTo(
      point1.x - positionDot.left,
      point1.y - positionDot.top + moduleRef.current?.scrollTop - FORMBOXHEIGHT,
    );
    context.lineTo(
      point2.x - positionDot.left,
      point2.y - positionDot.top + moduleRef.current?.scrollTop - FORMBOXHEIGHT,
    );
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    context.stroke();
  };
  //
  const handleMouseMove = (
    clickID: string,
    direaction: DireactionType,
    targetDotArr: string[],
  ) => {
    console.log(refs.current[clickID]);

    const anotherDreaction =
      direaction === DIRECTIONLEFT ? DIRECTIONRIGHT : DIRECTIONLEFT;
    const beginDot: DotType = getOps(refs.current[clickID], direaction);
    targetDotArr.forEach((val) => {
      const lineDot = getOps(refs.current[val], anotherDreaction);
      crateLineElement(beginDot, lineDot);
    });
  };

  // 初始化
  const init = () => {
    if (!context || Object.keys(context).length === 0) {
      context = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    }
    const { left = 0, top = 0 } = moduleRef.current?.getBoundingClientRect();
    positionDot = { left, top };
  };

  //开始画线
  const setLine = (
    id: string,
    direaction: DireactionType,
    targetDotArr: string[],
  ) => {
    initCanvasRect();
    handleMouseMove(id, direaction, targetDotArr);
  };

  // 初始化
  const initCanvasRect = () => {
    init();
    context.clearRect(
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height,
    );
  };
  return {
    setLine,
    initCanvasRect,
  };
};
