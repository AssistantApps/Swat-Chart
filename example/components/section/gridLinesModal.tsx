import { Component, createSignal } from 'solid-js';

import { SwatChartXGridLine, SwatChartYGridLine } from '../../../dist/swat.export';
import { onTargetValue } from '../../helpers/eventHelper';
import { Modal } from '../core/modal';

interface IProps {
  title: string;
  hintText: string;
  onAdd: (newValue: SwatChartXGridLine | SwatChartYGridLine) => void;
}

const defaultItem = { dashArray: '', percent: 0, opacity: 1 };
export const AddGridLineModal: Component<IProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [newItem, setNewItem] = createSignal<SwatChartXGridLine>(defaultItem);

  const onSubmit = () => {
    props.onAdd(newItem());
    setNewItem(defaultItem);
    setIsOpen(false);
  };

  return (
    <>
      <li class="tick">
        <span class="pointer" onClick={() => setIsOpen(true)}>
          ➕ Add Grid Line
        </span>
      </li>
      <Modal isOpen={isOpen()} heading={() => props.title} onBackdropClick={() => setIsOpen(false)} size="lg">
        <div class="grid">
          <label>
            Percent {props.hintText}
            <input
              type="number"
              min={0}
              max={100}
              value={newItem().percent}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, percent: +newValue })))}
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
            Opacity ({newItem().opacity})
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={newItem().opacity}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, opacity: +newValue })))}
            />
          </label>
          <label>
            dashArray
            <input
              value={newItem().dashArray}
              placeholder="5 3"
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, dashArray: newValue })))}
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
