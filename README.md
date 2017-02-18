
# plonk

plonk is a JavaScript micro-library that provides creative coding essentials like timers, envelopes, and random generators. It works in both Node.js and the browser.

Check out the [docs](docs/) for more info.

## Why?

Time is hard in JavaScript. Writing time-based applications, like generative A/V art, can be even harder. There are many libraries that deal with math, graphics, audio, even sending OSC values. But time feels left out.

plonk attempts to solve this problem by providing a few nice things like:

* Reliable delays and timer loops that return promises
* Envelopes and modulators that aren't tied to a specific medium
* Accurate time duration reporting via [performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
* Identical API and behavior in both Node.js and the browser
* Functions, like stochastic drunk walk, that aren't available in other libraries

## Cool, what does it look like?

Here's an ASR envelope with an exponential curve:

```javascript
plonk.env(0, 1, 650)
  .progress((val) => {
    doSomething(val);
  })
  .then((val) => {
    doSomething(val);
    return plonk.wait(50);
  })
  .then(() => {
    return plonk.env(1, 0, 1200);
  })
  .progress((val) => {
    doSomething(val);
  })
  .then((val) => {
    doSomething(val);
  });

function doSomething (val) {
  var n = plonk.exp(val);
  console.log(n);
}
```

## Installation

plonk is on [npm](https://www.npmjs.com/package/plonk) and [Bower](https://bower.io/search/?q=plonk). 

Node/Browserify:

```javascript
var plonk = require('plonk');
plonk.ms('60s');
// => 60000
```

ES6/Rollup/Webpack:

```javascript
import { ms } from 'plonk';
ms('60s');
// => 60000
```

Or, grab the UMD build from [dist](dist/) and:

```html
<script src="/path/to/assets/plonk.umd[.min].js"></script>
```

## License

plonk is maintained by Cory O'Brien and distributed under an MIT license
