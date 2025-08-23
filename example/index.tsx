/* @refresh reload */
import { render } from 'solid-js/web';

import { TestShell } from './components/testShell';

const root = document.getElementById('swat-chart-test');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <TestShell />, root!);
