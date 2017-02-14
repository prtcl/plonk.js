
import clamp from '../math/clamp';
import metro from './metro';
import noop from '../util/noop';
import scale from '../math/scale';
import toNumber from '../util/toNumber';

const SINE_PERIOD = (Math.PI * 2) - 0.0001;

/**
 * A sine LFO where `period` is the time in milliseconds of one full cycle. The current `value` of the sine is passed to both `callback` and `.progress()`, and is in the `-1...1` range.
 *
 * In addition to the sine `value`, the `callback` function is passed `cycle` (time elapsed in the current cycle), `elapsed` (total running time), and a `stop()` function. The return value of `callback` will set a new cycle duration.
 * @static
 * @memberof plonk
 * @name sine
 * @param {number} period
 * @param {function} callback
 * @returns {promise}
 * @example
 * plonk.sine(300, function (value, cycle, elapsed, stop) {
 *   if (elapsed >= 10000) return stop('some return value');
 *   if (cycle === 0) {
 *     // set a new duration at the begining of every cycle
 *     return plonk.rand(250, 350);
 *   }
 * })
 * .progress(function (value) {
 *   console.log(value);
 *   // => 0
 *   //    0.12071966755713318
 *   //    0.48600214034421146
 *   //    0.5692098047602766
 *   //    0.635380313957961
 *   //    ...
 * })
 * .then(function (val) {
 *   console.log(val);
 *   // => 'some return value'
 * });
 */
export default function sine (time, callback = noop) {
  time = toNumber(time, 0);

  var cycle = 0;

  return metro(1000 / 60, (interval, i, elapsed, stop) => {
    if (cycle >= time) {
      cycle = 0;
    } else {
      cycle += interval;
    }

    const rad = scale(cycle, 0, time, 0, SINE_PERIOD),
          sin = clamp(Math.sin(rad), -1, 1);

    const progress = callback(sin, cycle, elapsed, stop);
    time = toNumber(progress, time);

    return sin;
  });
}