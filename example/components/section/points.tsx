import { Component, createSignal, For, Show } from 'solid-js';

import { SwatChartConfig, SwatChartPoint } from '../../../dist/index';
import { getValueOfSubProperty, subNumber } from '../../helpers/controlsHelper';
import { AddPointModal } from './pointModal';

interface IProps extends SwatChartConfig {
  onChange: (func: (oldSwatChartConfig: SwatChartConfig) => SwatChartConfig) => void;
}

export const PointsSection: Component<IProps> = (props) => {
  const [pointsRadius, setPointsRadius] = createSignal<number>(getValueOfSubProperty(props, 'point', 'radius'));
  const [points, setPoints] = createSignal<Array<SwatChartPoint>>(getValueOfSubProperty(props, 'point', 'points'));

  return (
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
            onChange={subNumber(props.onChange, 'point', 'radius', (newValue) => setPointsRadius(newValue))}
          />
        </label>
        <span>Points:</span>
        <ul>
          <For each={points()}>
            {(item) => (
              <li class="point">
                <Show when={item.label.length > 0}>
                  <span>{item.label}&nbsp;</span>
                </Show>
                <br />
                <span>
                  ({item.percent.x}, {item.percent.y})
                </span>
                <span
                  class="pointer"
                  onClick={() =>
                    setPoints((prev) => {
                      const newValue = prev.filter(
                        (p) => p.label != item.label || p.percent.x != item.percent.x || p.percent.y != item.percent.y,
                      );
                      props.onChange((prev) => ({ ...prev, point: { ...prev.point, points: newValue } }));
                      return newValue;
                    })
                  }
                >
                  &nbsp;🗑️
                </span>
              </li>
            )}
          </For>
          <AddPointModal
            title="Add a Point"
            onAdd={(newTick) => {
              setPoints((prev) => {
                const newValue = [...prev, newTick];
                props.onChange((prev) => ({ ...prev, point: { ...prev.point, points: newValue } }));
                return newValue;
              });
            }}
          />
        </ul>
      </div>
    </details>
  );
};
