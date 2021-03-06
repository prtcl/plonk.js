
import test from 'tape';

import * as plonk from '../src';

test('plonk', (t) => {

  const METHODS = [
    'clamp',
    'Deferred',
    'delay',
    'drunk',
    'dust',
    'env',
    'exp',
    'frames',
    'metro',
    'ms',
    'now',
    'rand',
    'scale',
    'sine',
    'Timer',
    'toMilliseconds',
    'toNumber',
    'wait',
    'walk'
  ];

  METHODS.forEach((name) => {
    t.equal(typeof plonk[name], 'function', `plonk.${name} is a function`);
  });

  t.end();
});
