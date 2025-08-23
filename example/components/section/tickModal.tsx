import { Component, createSignal } from 'solid-js';

import { SwatChartXTick, SwatChartYTick } from '../../../dist/index';
import { Modal } from '../../components/core/modal';
import { onTargetValue } from '../../helpers/eventHelper';

interface IProps {
  title: string;
  hintText: string;
  onAdd: (newValue: SwatChartXTick | SwatChartYTick) => void;
}

const defaultItem = { label: '', percent: 0 };
export const AddTickModal: Component<IProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [newItem, setNewItem] = createSignal<SwatChartXTick>(defaultItem);

  const onSubmit = () => {
    props.onAdd(newItem());
    setNewItem(defaultItem);
    setIsOpen(false);
  };

  return (
    <>
      <li class="tick">
        <span class="pointer" onClick={() => setIsOpen(true)}>
          ➕ Add Tick
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
            Percent {props.hintText}
            <input
              type="number"
              min={0}
              max={100}
              value={newItem().percent}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, percent: +newValue })))}
            />
          </label>
        </div>
        <div class="grid">
          <label>
            Colour ({newItem().colour ?? '#000000'})
            <input
              type="color"
              value={newItem().colour ?? '#000000'}
              onChange={onTargetValue((newValue) => setNewItem((prev) => ({ ...prev, colour: newValue })))}
            />
          </label>
          <div>
            <label>Hide tick</label>
            <input
              type="checkbox"
              checked={newItem().hideTick}
              onChange={(event) => {
                const hideTick = event.target?.checked;
                setNewItem((prev) => ({ ...prev, hideTick }));
              }}
            />
          </div>
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
            <s>textAnchor</s>
            <input disabled={true} />
          </label>
        </div>

        <button style="width: 100%;" onClick={onSubmit}>
          Submit
        </button>
      </Modal>
    </>
  );
};
