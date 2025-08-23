import { Component, createSignal, For, Show } from 'solid-js';

import { SwatChartConfig, SwatChartXTick, SwatChartYTick } from '../../../dist/index';
import { getValueOfSubProperty, subNumber } from '../../helpers/controlsHelper';
import { AddTickModal } from './tickModal';

interface IProps extends SwatChartConfig {
  onChange: (func: (oldSwatChartConfig: SwatChartConfig) => SwatChartConfig) => void;
}

export const TicksSection: Component<IProps> = (props) => {
  const [tickHeight, setTickHeight] = createSignal<number>(getValueOfSubProperty(props, 'ticks', 'height'));
  const [tickWidth, setTickWidth] = createSignal<number>(getValueOfSubProperty(props, 'ticks', 'width'));
  const [tickTextPadding, setTickTextPadding] = createSignal<number>(
    getValueOfSubProperty(props, 'ticks', 'textPadding'),
  );
  const [xTicks, setXTicks] = createSignal<Array<SwatChartXTick>>(getValueOfSubProperty(props, 'ticks', 'x'));
  const [yTicks, setYTicks] = createSignal<Array<SwatChartYTick>>(getValueOfSubProperty(props, 'ticks', 'y'));

  return (
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
            onChange={subNumber(props.onChange, 'ticks', 'height', (newValue) => setTickHeight(newValue))}
          />
        </label>
        <label>
          Width ({tickWidth()})
          <input
            type="range"
            min={0}
            max={20}
            value={tickWidth()}
            onChange={subNumber(props.onChange, 'ticks', 'width', (newValue) => setTickWidth(newValue))}
          />
        </label>
        <label>
          Text Padding ({tickTextPadding()})
          <input
            type="range"
            min={0}
            max={20}
            value={tickTextPadding()}
            onChange={subNumber(props.onChange, 'ticks', 'textPadding', (newValue) => setTickTextPadding(newValue))}
          />
        </label>
        <span>X axis ticks:</span>
        <ul>
          <For each={xTicks()}>
            {(item) => (
              <li class="tick">
                <Show when={item.label.length > 0}>
                  <span>{item.label}&nbsp;</span>
                </Show>
                <span>({item.percent})</span>
                <span
                  class="pointer"
                  onClick={() =>
                    setXTicks((prev) => {
                      const newValue = prev.filter((p) => p.label != item.label || p.percent != item.percent);
                      props.onChange((prev) => ({ ...prev, ticks: { ...prev.ticks, x: newValue } }));
                      return newValue;
                    })
                  }
                >
                  &nbsp;🗑️
                </span>
              </li>
            )}
          </For>
          <AddTickModal
            title="Add X Tick"
            hintText="(on the X axis)"
            onAdd={(newTick) => {
              setXTicks((prev) => {
                const newValue = [...prev, newTick];
                props.onChange((prev) => ({ ...prev, ticks: { ...prev.ticks, x: newValue } }));
                return newValue;
              });
            }}
          />
        </ul>
        <span>Y axis ticks:</span>
        <ul>
          <For each={yTicks()}>
            {(item) => (
              <li class="tick">
                <Show when={item.label.length > 0}>
                  <span>{item.label}&nbsp;</span>
                </Show>
                <span>({item.percent})</span>
                <span
                  class="pointer"
                  onClick={() =>
                    setYTicks((prev) => {
                      const newValue = prev.filter((p) => p.label != item.label || p.percent != item.percent);
                      props.onChange((prev) => ({ ...prev, ticks: { ...prev.ticks, y: newValue } }));
                      return newValue;
                    })
                  }
                >
                  &nbsp;🗑️
                </span>
              </li>
            )}
          </For>
          <AddTickModal
            title="Add Y Tick"
            hintText="(on the Y axis)"
            onAdd={(newTick) => {
              setYTicks((prev) => {
                const newValue = [...prev, newTick];
                props.onChange((prev) => ({ ...prev, ticks: { ...prev.ticks, y: newValue } }));
                return newValue;
              });
            }}
          />
        </ul>
      </div>
    </details>
  );
};
