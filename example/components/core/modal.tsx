import { Component, createEffect, JSXElement, Show } from 'solid-js';

import { stopPropagation } from '../../helpers/eventHelper';

interface IProps {
  size?: 'lg' | 'xl' | 'xxl';
  isOpen: boolean;
  heading: () => string | JSXElement;
  children: JSXElement;
  onBackdropClick: () => void;
  renderFooter?: () => JSXElement;
}

export const Modal: Component<IProps> = (props) => {
  createEffect(() => {
    if (props.isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  });

  return (
    <dialog open={props.isOpen} class={`modal ${props.size}`} onClick={props.onBackdropClick}>
      <article onClick={stopPropagation}>
        <header>
          <strong>
            <Show when={props.isOpen} fallback="??">
              {props.heading()}
            </Show>
          </strong>
          <button aria-label="Close" {...{ rel: 'prev' }} onClick={props.onBackdropClick}></button>
        </header>
        {props.children}
        <Show when={props.renderFooter != null}>
          <footer>{props.renderFooter!()}</footer>
        </Show>
      </article>
    </dialog>
  );
};
