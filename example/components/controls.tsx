import { Component, createSignal, For, Show } from 'solid-js';

import {
  SwatChartConfig,
  SwatChartPoint,
  SwatChartXGridLine,
  SwatChartXTick,
  SwatChartYGridLine,
  SwatChartYTick,
} from '../../dist/index';
import { defaultChartConfig } from '../constants/defaultChart';
import { onTargetValue } from '../helpers/eventHelper';

interface IProps extends SwatChartConfig {
  onChange: (func: (oldSwatChartConfig: SwatChartConfig) => SwatChartConfig) => void;
  copyConfig: () => void;
}

export const Controls: Component<IProps> = (props) => {
  const [borderRadius, setBorderRadius] = createSignal<number>(getValueOfSubProperty(props, 'chart', 'borderRadius'));
  const [lineWidth, setLineWidth] = createSignal<number>(getValueOfSubProperty(props, 'chart', 'lineWidth'));
  const [paddingX, setPaddingX] = createSignal<number>(getValueOfSubSubProperty(props, 'chart', 'padding', 'x'));
  const [paddingY, setPaddingY] = createSignal<number>(getValueOfSubSubProperty(props, 'chart', 'padding', 'y'));
  const [arrowWidth, setArrowWidth] = createSignal<number>(getValueOfSubProperty(props, 'chart', 'arrowWidth'));

  const [chartStroke, setChartStroke] = createSignal<string>(getValueOfSubProperty(props, 'colour', 'stroke'));
  const [backgroundFill, setBackgroundFill] = createSignal<string>(
    getValueOfSubProperty(props, 'colour', 'backgroundFill'),
  );
  const [topLeftBackground, setTopLeftBackground] = createSignal<string>(
    getValueOfSubProperty(props, 'colour', 'topLeftBackground'),
  );
  const [topRightBackground, setTopRightBackground] = createSignal<string>(
    getValueOfSubProperty(props, 'colour', 'topRightBackground'),
  );
  const [bottomLeftBackground, setBottomLeftBackground] = createSignal<string>(
    getValueOfSubProperty(props, 'colour', 'bottomLeftBackground'),
  );
  const [bottomRightBackground, setBottomRightBackground] = createSignal<string>(
    getValueOfSubProperty(props, 'colour', 'bottomRightBackground'),
  );
  const [tickHeight, setTickHeight] = createSignal<number>(getValueOfSubProperty(props, 'ticks', 'height'));
  const [tickWidth, setTickWidth] = createSignal<number>(getValueOfSubProperty(props, 'ticks', 'width'));
  const [tickTextPadding, setTickTextPadding] = createSignal<number>(
    getValueOfSubProperty(props, 'ticks', 'textPadding'),
  );
  const [xTicks, setXTicks] = createSignal<Array<SwatChartXTick>>(getValueOfSubProperty(props, 'ticks', 'x'));
  const [yTicks, setYTicks] = createSignal<Array<SwatChartYTick>>(getValueOfSubProperty(props, 'ticks', 'y'));

  const [gridLinesSpacing, setGridLinesSpacing] = createSignal<number>(
    getValueOfSubProperty(props, 'gridLines', 'spacing'),
  );
  const [xGridLines, setXGridLines] = createSignal<Array<SwatChartXGridLine>>(
    getValueOfSubProperty(props, 'gridLines', 'x'),
  );
  const [yGridLines, setYGridLines] = createSignal<Array<SwatChartYGridLine>>(
    getValueOfSubProperty(props, 'gridLines', 'y'),
  );

  const [pointsRadius, setPointsRadius] = createSignal<number>(getValueOfSubProperty(props, 'point', 'radius'));
  const [points, setPoints] = createSignal<Array<SwatChartPoint>>(getValueOfSubProperty(props, 'point', 'points'));

  const subValue =
    <TIn, TOut>(manipulateValue: (orig: TIn) => TOut) =>
    (propName: string, subPropName: string, displayFunc: (newValue: TOut) => void) =>
    (event: any) => {
      const func = onTargetValue((newValue: TIn) =>
        props.onChange((prev: any) => {
          displayFunc(manipulateValue(newValue));
          const propValue = prev[propName];
          return { ...prev, [propName]: { ...propValue, [subPropName]: manipulateValue(newValue) } };
        }),
      );
      func(event);
    };
  const subSubValue =
    <TIn, TOut>(manipulateValue: (orig: TIn) => TOut) =>
    (propName: string, subPropName: string, subSubPropName: string, displayFunc: (newValue: TOut) => void) =>
    (event: any) => {
      const func = onTargetValue((newValue: TIn) =>
        props.onChange((prev: any) => {
          displayFunc(manipulateValue(newValue));
          const propValue = prev[propName];
          const propSubValue = propValue[subPropName];
          return {
            ...prev,
            [propName]: {
              ...propValue,
              [subPropName]: { ...propSubValue, [subSubPropName]: manipulateValue(newValue) },
            },
          };
        }),
      );
      func(event);
    };

  const subNumber = subValue<string, number>((val) => +val);
  const subSubNumber = subSubValue<string, number>((val) => +val);
  const subString = subValue<string, string>((val) => val);

  const [isClicked, setIsClicked] = createSignal<boolean>(false);

  const clickCopyConfig = () => {
    if (isClicked() == true) return;
    try {
      setIsClicked(true);
      props.copyConfig();

      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    } catch {
      setIsClicked(false);
      alert('Something went wrong');
    }
  };

  return (
    <div class="controls">
      <details name="chart">
        <summary>Chart</summary>

        <div class="content">
          <label>
            Border radius ({borderRadius()})
            <input
              type="number"
              min={0}
              max={1000}
              value={borderRadius()}
              onChange={subNumber('chart', 'borderRadius', (newValue) => setBorderRadius(newValue))}
            />
          </label>
          <label>
            Line width ({lineWidth()})
            <input
              type="range"
              min={0}
              max={10}
              value={lineWidth()}
              onChange={subNumber('chart', 'lineWidth', (newValue) => setLineWidth(newValue))}
            />
          </label>
          <label>
            Padding (X: {paddingX()}, Y: {paddingY()})
            <div class="grid">
              <input
                type="number"
                min={0}
                max={1000}
                value={paddingX()}
                onChange={subSubNumber('chart', 'padding', 'x', (newValue) => setPaddingX(newValue))}
              />
              <input
                type="number"
                min={0}
                max={1000}
                value={paddingY()}
                onChange={subSubNumber('chart', 'padding', 'y', (newValue) => setPaddingY(newValue))}
              />
            </div>
          </label>
          <label>
            Arrow width ({arrowWidth()})
            <input
              type="range"
              min={0}
              max={10}
              value={arrowWidth()}
              onChange={subNumber('chart', 'arrowWidth', (newValue) => setArrowWidth(newValue))}
            />
          </label>
        </div>
      </details>
      <hr />

      <details name="colour">
        <summary>Colour</summary>
        <div class="content">
          <label>
            Stroke ({chartStroke()})
            <input
              type="color"
              value={chartStroke()}
              onChange={subString('colour', 'stroke', (newValue) => setChartStroke(newValue))}
            />
          </label>
          <label>
            Background Fill ({backgroundFill()})
            <input
              type="color"
              value={backgroundFill()}
              onChange={subString('colour', 'backgroundFill', (newValue) => setBackgroundFill(newValue))}
            />
          </label>
          <label>
            Top Left Background ({topLeftBackground()})
            <input
              type="color"
              value={topLeftBackground()}
              onChange={subString('colour', 'topLeftBackground', (newValue) => setTopLeftBackground(newValue))}
            />
          </label>
          <label>
            Top Right Background ({topRightBackground()})
            <input
              type="color"
              value={topRightBackground()}
              onChange={subString('colour', 'topRightBackground', (newValue) => setTopRightBackground(newValue))}
            />
          </label>
          <label>
            Bottom Left Background ({bottomLeftBackground()})
            <input
              type="color"
              value={bottomLeftBackground()}
              onChange={subString('colour', 'bottomLeftBackground', (newValue) => setBottomLeftBackground(newValue))}
            />
          </label>
          <label>
            Bottom Right Background ({bottomRightBackground()})
            <input
              type="color"
              value={bottomRightBackground()}
              onChange={subString('colour', 'bottomRightBackground', (newValue) => setBottomRightBackground(newValue))}
            />
          </label>
        </div>
      </details>
      <hr />

      <details name="ticks">
        <summary>Ticks</summary>
        <div class="content">
          <label>
            Height ({tickHeight()})
            <input
              type="range"
              min={0}
              max={30}
              value={tickHeight()}
              onChange={subNumber('ticks', 'height', (newValue) => setTickHeight(newValue))}
            />
          </label>
          <label>
            Width ({tickWidth()})
            <input
              type="range"
              min={0}
              max={20}
              value={tickWidth()}
              onChange={subNumber('ticks', 'width', (newValue) => setTickWidth(newValue))}
            />
          </label>
          <label>
            Text Padding ({tickTextPadding()})
            <input
              type="range"
              min={0}
              max={20}
              value={tickTextPadding()}
              onChange={subNumber('ticks', 'textPadding', (newValue) => setTickTextPadding(newValue))}
            />
          </label>
          <span>~WIP~ X axis ticks:</span>
          <ul>
            <For each={xTicks()}>
              {(item) => (
                <li class="tick">
                  <span>📝&nbsp;</span>
                  <Show when={item.label.length > 0}>
                    <span>{item.label}&nbsp;</span>
                  </Show>
                  <span>({item.percent})</span>
                </li>
              )}
            </For>
          </ul>
          <span>Y axis ticks:</span>
          <ul>
            <For each={yTicks()}>
              {(item) => (
                <li class="tick">
                  <span>📝&nbsp;</span>
                  <Show when={item.label.length > 0}>
                    <span>{item.label}&nbsp;</span>
                  </Show>
                  <span>({item.percent})</span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </details>
      <hr />

      <details name="grid lines">
        <summary>Grid Lines</summary>
        <div class="content">
          <label>
            gridLinesSpacing ({gridLinesSpacing()})
            <input
              type="range"
              min={0}
              max={50}
              value={gridLinesSpacing()}
              onChange={subNumber('gridLines', 'spacing', (newValue) => setGridLinesSpacing(newValue))}
            />
          </label>
          <span>~WIP~ X axis Grid Lines:</span>
          <ul>
            <For each={xGridLines()}>
              {(item) => (
                <li class="grid-lines">
                  <span>📝&nbsp;</span>
                  <span>{item.percent}</span>
                </li>
              )}
            </For>
          </ul>
          <span>~WIP~ Y axis Grid Lines:</span>
          <ul>
            <For each={yGridLines()}>
              {(item) => (
                <li class="grid-lines">
                  <span>📝&nbsp;</span>
                  <span>{item.percent}</span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </details>
      <hr />

      <details name="points">
        <summary>Points</summary>
        <div class="content">
          <label>
            Default Radius ({pointsRadius()})
            <input
              type="range"
              min={0}
              max={50}
              value={pointsRadius()}
              onChange={subNumber('point', 'radius', (newValue) => setPointsRadius(newValue))}
            />
          </label>
          <span>~WIP~ Points:</span>
          <ul>
            <For each={points()}>
              {(item) => (
                <li class="point">
                  <span>📝&nbsp;</span>
                  <Show when={item.label.length > 0}>
                    <span>{item.label}&nbsp;</span>
                  </Show>
                  <br />
                  <span>
                    ({item.percent.x}, {item.percent.y})
                  </span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </details>
      <hr />

      <button class="secondary outline" style="width: 100%" onClick={clickCopyConfig}>
        <Show when={isClicked()} fallback={<span>Copy current config</span>}>
          <span>Config copied!</span>
        </Show>
      </button>
      <button class="outline" style="width: 100%; margin-top: 0.75em" onClick={props.copyConfig}>
        How to use this chart
      </button>
    </div>
  );
};

const getValueOfSubProperty = (chart: any, propName: string, subPropName: string) =>
  chart?.[propName]?.[subPropName] ?? (defaultChartConfig as any)[propName]?.[subPropName];

const getValueOfSubSubProperty = (chart: any, propName: string, subPropName: string, subSubPropName: string) =>
  chart?.[propName]?.[subPropName]?.[subSubPropName] ??
  (defaultChartConfig as any)[propName]?.[subPropName]?.[subSubPropName];
