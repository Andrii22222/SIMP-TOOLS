//----------------------------------------------------------------------
// Випробування генератора випадкових чисел
//----------------------------------------------------------------------
// import * as sts from './simp-tools.js';
const sts = require('./simp-tools.js');


// Створюємо генератор (фіксований seed)
const myRandom = sts.xorshift32(4222);

// Проводимо випробування
const histogram = sts.testGenerator(myRandom, 5, 20);

// Виводмо результат
for (let i = 0; i < histogram.length; i++) {
  console.log(`basket ${i+1} = ${histogram[i]}`);
}


// THE END
//----------------------------------------------------------------------
