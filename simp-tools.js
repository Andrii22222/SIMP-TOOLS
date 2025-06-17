//----------------------------------------------------------------------
// Москаленко Андрій 
// Група ІМ-42, КПІ, 2025
//----------------------------------------------------------------------

// Створю генератор випадкових чисел
function createGenerator( seed ) {
  // JavaScript зберігає всі числа як 64-бітні числа з плаваючою комою, 
  // але побітові операції працюють з 32-бітними цілими.
  // приведення до беззнакового 32-бітного числа (uint32)
  let x = seed >>> 0; 

  // Видає значення в діапазоні [0, 1)
  //  << — лівий побітовий зсув
  // >>> — правий побітовий зсув без збереження знаку
  //   ^ — побітове виключне АБО (XOR)
  // повертає 1, якщо біти різні
  // повертає 0, якщо біти однакові
  return function () {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      // нормалізація в діапазон [0, 1)
      return (x >>> 0) / 0xFFFFFFFF; 
  };
}

// Ітератор для перевірки якості генератора випадкових чисел
function testGenerator(generate, timeout, baskets) {
  // generate - генератор випадкових чисел
  // timeout - час на виконання
  // baskets - кількість кошиків у гістограммі
  const result = new Array(baskets).fill(0);
  const start = Date.now();
  let duration = 0;
  // 
  while (duration < timeout) {
    // Обробляємо 1000 значень
    for (let i = 0; i < 1000; i++) {
      const basketIndex =  Math.ceil(generate() * baskets) - 1;
      result[basketIndex]++;
    }
    duration = (Date.now() - start) / 1000;
  }
  // Готова гістограма
  return result;
}


// Створює двунаправлену чергу з пріорітетом
function createQueue() {
  return {
    items: [],
    prioritis: [],
    // Додати елемент в чергу
    enqueue: function (item = null, priority = -1) {
      if(typeof priority !== 'number' || isNaN(priority)) {
        priority = -2;
      }
      this.items.push(item);
      this.prioritis.push(priority);
    },
    // Прибрати елемент із черги
    dequeue: function (discipline = "oldest") {
      // highest, lower, oldest, newest
      if(this.items.length == 0) {
        return;
      }
      switch(discipline) {
        case "highest":
          const max = Math.max(...this.prioritis);
          const maxIndex = this.prioritis.indexOf(max);
          this.items.splice(maxIndex, 1);
          this.prioritis.splice(maxIndex, 1);
          break;
        case "lower":
          const min = Math.min(...this.prioritis);
          const minIndex = this.prioritis.indexOf(min);
          this.items.splice(minIndex, 1);
          this.prioritis.splice(minIndex, 1);
          break;  
        case "oldest":
          this.items.shift();
          this.prioritis.shift();
          break;
        case "newest": 
          this.items.pop();  
          this.prioritis.pop();
          break;
      }
    },
    // Подивитись елемент черги
    peek: function (discipline = "newest") {
      if(this.items.length === 0) {
        return;
      }
      switch(discipline) {
        case "highest":
          const max = Math.max(...this.prioritis);
          const maxIndex = this.prioritis.indexOf(max);
          return this.items[maxIndex];
        case "lower":
          const min = Math.min(...this.prioritis);
          const minIndex = this.prioritis.indexOf(min);
          return this.items[minIndex];  
        case "oldest":
          return this.items[0];
        case "newest":
          return this.items[this.items.length-1];
      }
    },
  };
} 


// Створює wrapper (логуючий зі статистикою)
function createLoggingDecorator(func) {
  // Об'єкт для накопичення статистики
  const stats = {
    callCount: 0,
    totalTime: 0,
    avgTime: 0,
    lastArgs: null,
    lastResult: null
  };

  // Обгортка робочої функції
  function wrapper(...args) {
    // Виконуємо робочу функцію і збираємо статитстику
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    const duration = end - start;
    // Оновлюємо статистику
    stats.callCount += 1;
    stats.totalTime += duration;
    stats.avgTime = stats.totalTime / stats.callCount;
    stats.lastArgs = args;
    stats.lastResult = result;
    // Логування
    console.log(` Called ${func.name || 'anonymous'}(${args.join(', ')})`);
    console.log(` Result: ${result}`);
    console.log(` Execution time: ${duration.toFixed(2)}ms`);
    // 
    return result;
  }

  // Додаємо у wrapper доступ до статистики
  wrapper.stats = stats;
  // 
  return wrapper;
}


// EXPORT
//----------------------------------------------------------------------
module.exports = { createGenerator, testGenerator, createQueue, createLoggingDecorator };


// THE END
//----------------------------------------------------------------------