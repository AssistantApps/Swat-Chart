import { Component, createSignal, For } from 'solid-js';

import { SwatChartConfig, SwatChartXGridLine, SwatChartYGridLine } from '../../../dist/index';
import { getValueOfSubProperty, subNumber } from '../../helpers/controlsHelper';
import { AddGridLineModal } from './gridLinesModal';

interface IProps extends SwatChartConfig {
  onChange: (func: (oldSwatChartConfig: SwatChartConfig) => SwatChartConfig) => void;
}

export const GridLinesSection: Component<IProps> = (props) => {
  const [gridLinesSpacing, setGridLinesSpacing] = createSignal<number>(
    getValueOfSubProperty(props, 'gridLines', 'spacing'),
  );
  const [xGridLines, setXGridLines] = createSignal<Array<SwatChartXGridLine>>(
    getValueOfSubProperty(props, 'gridLines', 'x'),
  );
  const [yGridLines, setYGridLines] = createSignal<Array<SwatChartYGridLine>>(
    getValueOfSubProperty(props, 'gridLines', 'y'),
  );

  return (
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
            onChange={subNumber(props.onChange, 'gridLines', 'spacing', (newValue) => setGridLinesSpacing(newValue))}
          />
        </label>
        <span>X axis Grid Lines:</span>
        <ul>
          <For each={xGridLines()}>
            {(item) => (
              <li class="grid-lines">
                <span>{item.percent}</span>
                <span
                  class="pointer"
                  onClick={() =>
                    setXGridLines((prev) => {
                      const newValue = prev.filter((p) => p.percent != item.percent);
                      props.onChange((prev) => ({ ...prev, gridLines: { ...prev.gridLines, x: newValue } }));
                      return newValue;
                    })
                  }
                >
                  &nbsp;🗑️
                </span>
              </li>
            )}
          </For>
          <AddGridLineModal
            title="Add X Grid Line"
            hintText="(on the X axis)"
            onAdd={(newTick) => {
              setXGridLines((prev) => {
                const newValue = [...prev, newTick];
                props.onChange((prev) => ({ ...prev, gridLines: { ...prev.gridLines, x: newValue } }));
                return newValue;
              });
            }}
          />
        </ul>
        <span>Y axis Grid Lines:</span>
        <ul>
          <For each={yGridLines()}>
            {(item) => (
              <li class="grid-lines">
                <span>{item.percent}</span>
                <span
                  class="pointer"
                  onClick={() =>
                    setYGridLines((prev) => {
                      const newValue = prev.filter((p) => p.percent != item.percent);
                      props.onChange((prev) => ({ ...prev, gridLines: { ...prev.gridLines, y: newValue } }));
                      return newValue;
                    })
                  }
                >
                  &nbsp;🗑️
                </span>
              </li>
            )}
          </For>
          <AddGridLineModal
            title="Add Y Grid Line"
            hintText="(on the Y axis)"
            onAdd={(newTick) => {
              setYGridLines((prev) => {
                const newValue = [...prev, newTick];
                props.onChange((prev) => ({ ...prev, gridLines: { ...prev.gridLines, y: newValue } }));
                return newValue;
              });
            }}
          />
        </ul>
      </div>
    </details>
  );
};
