import { Component, createSignal, For, Show } from 'solid-js';
import {
  packagesUsed,
  SwatChartConfig,
  SwatChartPoint,
  SwatChartXGridLine,
  SwatChartXTick,
  SwatChartYGridLine,
  SwatChartYTick,
} from '../../dist/index';

import { Modal } from '../components/core/modal';
import { TicksSection } from './section/ticks';
import { GridLinesSection } from './section/gridLines';
import { PointsSection } from './section/points';
import {
  getValueOfSubProperty,
  getValueOfSubSubProperty,
  subNumber,
  subString,
  subSubNumber,
} from '../helpers/controlsHelper';
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

  const [isPackagesModalOpen, setIsPackagesModalOpen] = createSignal(false);
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
              onChange={subNumber(props.onChange, 'chart', 'borderRadius', (newValue) => setBorderRadius(newValue))}
            />
          </label>
          <label>
            Line width ({lineWidth()})
            <input
              type="range"
              min={0}
              max={10}
              value={lineWidth()}
              onChange={subNumber(props.onChange, 'chart', 'lineWidth', (newValue) => setLineWidth(newValue))}
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
                onChange={subSubNumber(props.onChange, 'chart', 'padding', 'x', (newValue) => setPaddingX(newValue))}
              />
              <input
                type="number"
                min={0}
                max={1000}
                value={paddingY()}
                onChange={subSubNumber(props.onChange, 'chart', 'padding', 'y', (newValue) => setPaddingY(newValue))}
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
              onChange={subNumber(props.onChange, 'chart', 'arrowWidth', (newValue) => setArrowWidth(newValue))}
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
              onChange={subString(props.onChange, 'colour', 'stroke', (newValue) => setChartStroke(newValue))}
            />
          </label>
          <label>
            Background Fill ({backgroundFill()})
            <input
              type="color"
              value={backgroundFill()}
              onChange={subString(props.onChange, 'colour', 'backgroundFill', (newValue) =>
                setBackgroundFill(newValue),
              )}
            />
          </label>
          <label>
            Top Left Background ({topLeftBackground()})
            <input
              type="color"
              value={topLeftBackground()}
              onChange={subString(props.onChange, 'colour', 'topLeftBackground', (newValue) =>
                setTopLeftBackground(newValue),
              )}
            />
          </label>
          <label>
            Top Right Background ({topRightBackground()})
            <input
              type="color"
              value={topRightBackground()}
              onChange={subString(props.onChange, 'colour', 'topRightBackground', (newValue) =>
                setTopRightBackground(newValue),
              )}
            />
          </label>
          <label>
            Bottom Left Background ({bottomLeftBackground()})
            <input
              type="color"
              value={bottomLeftBackground()}
              onChange={subString(props.onChange, 'colour', 'bottomLeftBackground', (newValue) =>
                setBottomLeftBackground(newValue),
              )}
            />
          </label>
          <label>
            Bottom Right Background ({bottomRightBackground()})
            <input
              type="color"
              value={bottomRightBackground()}
              onChange={subString(props.onChange, 'colour', 'bottomRightBackground', (newValue) =>
                setBottomRightBackground(newValue),
              )}
            />
          </label>
        </div>
      </details>
      <hr />

      <TicksSection {...props} />
      <hr />

      <GridLinesSection {...props} />
      <hr />

      <PointsSection {...props} />
      <hr />

      <button class="outline" style="width: 100%" onClick={clickCopyConfig}>
        <Show when={isClicked()} fallback={<span>Copy current config</span>}>
          <span>Config copied!</span>
        </Show>
      </button>
      <a
        class="secondary outline"
        role="button"
        style="width: 100%; margin-top: 0.75em"
        href="https://github.com/AssistantApps/Swat-Chart/blob/main/README.md#install"
        target="_blank"
      >
        How to use this chart
      </a>
      <button
        class="secondary outline"
        style="width: 100%; margin-top: 0.75em"
        onClick={() => setIsPackagesModalOpen(true)}
      >
        Packages Used
      </button>
      <Modal
        isOpen={isPackagesModalOpen()}
        heading={() => 'Packages Used'}
        onBackdropClick={() => setIsPackagesModalOpen(false)}
        size="lg"
      >
        <p>Generated on: {packagesUsed().generatedDate}</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Version</th>
              <th scope="col">Licence type</th>
            </tr>
          </thead>
          <tbody>
            <For each={packagesUsed().list}>
              {(item) => (
                <tr>
                  <th scope="row">{item.name}</th>
                  <td>{item.version}</td>
                  <td>
                    <a href={item.licenceUrl ?? '#'}>{item.licenseType}</a>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
