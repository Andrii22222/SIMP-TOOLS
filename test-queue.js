//----------------------------------------------------------------------
// Випробування  двунаправленої черги з пріорітетом
//----------------------------------------------------------------------
const sts = require('./simp-tools.js');




const q = sts.createQueue();
q.enqueue("Ivan",1);
q.enqueue("we",4);
q.enqueue("i",8);
q.enqueue("roma",67);
q.enqueue("vasya",3);
q.dequeue("lower");
console.log(q.peek("highest"));
console.log(q.peek("lower"));
console.log(q.peek("oldest"));
console.log(q.peek("newest"));

