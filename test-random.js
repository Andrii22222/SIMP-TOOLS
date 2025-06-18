//----------------------------------------------------------------------
// Випробування генератора випадкових чисел
//----------------------------------------------------------------------

// const sts = require('./simp-tools.js');
import * as sts from './simp-tools.js';

// Створюємо генератор (фіксований seed)
const myRandom = sts.createGenerator(4222);

// Проводимо випробування
console.log('Start testing..');
const histogram = sts.testGenerator(myRandom, 5, 20);
console.log('Testing complited: ');

// Виводмо результат
for (let i = 0; i < histogram.length; i++) {
  console.log(`basket ${i+1} = ${histogram[i]}`);
}


// THE END
//----------------------------------------------------------------------
