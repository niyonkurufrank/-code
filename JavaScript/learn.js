const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15]
console.log(number.length)
const addElement = number.push(16)
number.pop()
console.log(number[9])
number.unshift({car: 'Bugatti',price: 1000000,created: 2024})
number.shift()

const room = []

room[3] = 'Gedeon'
room[1]='manzi'
room[2]='cloude'
room[5]='juayeze'
room[4]='bikora'
room[0]='justin'

console.log(room)


const students = ["Eric", "Alice", "john", "Grace", "David"];

//1
console.log(students.length);

//2
console.log(students.toString());

//3
console.log(students.at(-1));

//4
console.log(students.join(" | "));

//5
students.pop();

//6
students.push("Sarah");

//7
students.shift();

//8
students.unshift("teacher");

//9
console.log(students);

//10
console.log(students.join(" "));

const variableName = "Gedeon"

console.log('my name is ${variableName}')

const paragraph = 'on $(date) I will be going to the market to buy some fruits and vegetables. I will also be visiting my friend who lives nearby. It will be a busy day, but I am looking forward to it.';
console.log(paragraph)