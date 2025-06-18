//----------------------------------------------------------------------
// Випробування декоратора
//----------------------------------------------------------------------

// const sts = require('./simp-tools.js');
import * as sts from './simp-tools.js';


function multiple(a, b) {
  return  a * b;
}
const w = sts.createLoggingDecorator(multiple);

console.log(w(2,5));
console.log(w(2,4));
console.log('callCount: ' + w.stats.callCount);


// THE END
//----------------------------------------------------------------------
