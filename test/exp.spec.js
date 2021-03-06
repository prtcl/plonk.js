
import test from 'tape';

import exp from '../src/exp';

test('exp', (t) => {
  t.equal(typeof exp, 'function', 'exp is a function');

  const cases = [
    [-1, 0],
    [0, 0],
    [0.25, 0.023090389875362178],
    [0.5, 0.15195522325791297],
    [0.75, 0.45748968090533415],
    [1, 1],
    [2, 1]
  ];

  cases
    .map((d) => [...d, exp(d[0])])
    .forEach((d) => {
      const [i, o, n] = d;

      t.equal(n, o, `exp(${i}) equals ${o}`);
    });

  t.end();
});
