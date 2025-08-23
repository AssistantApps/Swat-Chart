import { Component, createSignal } from 'solid-js';

import { SwatChartPoint, SwatChartXTick, SwatChartYTick } from '../../../dist/index';
import { Modal } from '../core/modal';
import { onTargetValue } from '../../helpers/eventHelper';

interface IProps {
  title: string;
  onAdd: (newValue: SwatChartPoint) => void;
}

/**
    label: string;
    colour?: string;
    percent: {
        x: number;
        y: number;
    };
    radius?: number;
    fontSize?: number;
    */

const defaultItem = { label: '', percent: { x: 0, y: 0 } };
export const AddPointModal: Component<IProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [newItem, setNewItem] = createSignal<SwatChartPoint>(defaultItem);

  const onSubmit = () => {
    props.onAdd(newItem());
    setNewItem(defaultItem);
    setIsOpen(false);
  };

  return (
    <>
      <li class="point">
        <span class="pointer" onClick={() => setIsOpen(true)}>
          ➕ Add Point
        </span>
      </li>
      <Modal isOpen={isOpen()} heading={() => props.title} onBackdropClick={() => setIsOpen(false)} size="lg">
        <div class="grid">
          <label>
            Label
            <input
              value={newItem().label}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, label: newValue })))}
            />
          </label>
          <label>
            Colour ({newItem().colour ?? '#000000'})
            <input
              type="color"
              value={newItem().colour ?? '#000000'}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, colour: newValue })))}
            />
          </label>
        </div>
        <div class="grid">
          <label>
            Percent X ({newItem().percent.x})
            <input
              type="number"
              min={0}
              max={100}
              value={newItem().percent.x}
              onChange={onTargetValue((newValue) =>
                setNewItem((prev) => ({ ...prev, percent: { ...prev.percent, x: +newValue } })),
              )}
            />
          </label>
          <label>
            Percent Y ({newItem().percent.y})
            <input
              type="number"
              min={0}
              max={100}
              value={newItem().percent.y}
              onChange={onTargetValue((newValue) =>
                setNewItem((prev) => ({ ...prev, percent: { ...prev.percent, y: +newValue } })),
              )}
            />
          </label>
        </div>
        <div class="grid">
          <label>
            Font size ({newItem().fontSize})
            <input
              type="range"
              min={0}
              max={100}
              value={newItem().fontSize}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, fontSize: +newValue })))}
            />
          </label>
          <label>
            Radius ({newItem().radius})
            <input
              type="range"
              min={0}
              max={50}
              value={newItem().radius}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, radius: +newValue })))}
            />
          </label>
        </div>

        <button style="width: 100%;" onClick={onSubmit}>
          Submit
        </button>
      </Modal>
    </>
  );
};
