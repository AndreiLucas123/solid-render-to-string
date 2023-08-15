import { createSignal } from 'solid-js';
import { renderToString } from 'solid-js/web';

function Counter() {
  const [state, setState] = createSignal(0);

  return (
    <div onclick={() => setState((prev) => ++prev)}>Counter {state()}</div>
  );
}

const html = renderToString(() => <Counter />);
console.log('[html]', html);

console.log(() => <Counter />);
