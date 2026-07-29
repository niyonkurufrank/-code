
let courses = ["Figma", "Linux", "HTML", "CSS", "JavaScript"];

console.log("Initial courses:", courses);

// 1.
console.log("\n1. All courses:");
console.log(courses);

// 2.
courses.push("Git");
console.log("\n2. After push('Git'):", courses);

// 3. 
courses.pop();
console.log("\n3. After pop():", courses);

// 4. 
courses.unshift("Git");
console.log("\n4. After unshift('Git'):", courses);

// 5. 
courses.shift();
console.log("\n5. After shift():", courses);

// 6. 
console.log("\n6. Total number of courses:", courses.length);

// 7.
let joinedCourses = courses.join(" | ");
console.log("\n7. Courses joined:", joinedCourses);

// 8.
function displayCourses(arr) {
  console.log("\n8. Inside displayCourses function:");
  for(let i = 0; i < arr.length; i++) {
    console.log(`${i + 1}. ${arr[i]}`);
  }
}


function calculateAverage() {
    const a=10
    const b=20
    const c=30
    const d=40
    const e=50

    function sumofNumber() {
        const sum = a + b + c + d + e;
        return sum;
    }

    const summationresult = sumofNumber();

    const avrg = summationresult / 5;
    return avrg;
}

console.log("\n1. display average:", calculateAverage());

function productandprices () {
  let products = ["Sugar", "Rice", "Liquid soap", "Cooking oil", "Milk", "Eggs", "tea"];
  let prices = ["RWF 4,800", "RWF 2,500", "RWF 2,100", "RWF 7,000", "RWF 1,500", "RWF 900", "RWF 3,200"];

  console.log("PRODUCT LIST AND PRICES:");
  
  for(let i = 0; i < products.length; i++) {
    console.log(`${i + 1}. ${products[i]} - ${prices[i]}`); // ← HANO NIHO WAKOSOJE
  }
}

productandprices();

const seats = ["reserved", "occupied", "reserved", "reserved", "available", "reserved"];

let index = 0; //2


while(index < seats.length && seats[index]!== "available") {
  console.log(`Checking seat ${index + 1}: ${seats[index]}`);
  index++;
}

  // 4
  console.log(`Checking seat ${index + 1}: ${seats[index]}`);
  console.log(`Available seat is at position: ${index + 1}`);
  

// CINEMA HALL
const hallSeats = [
    { owner: 'MANZI', price: 100, category: 'VVIP', status: 'OCCUPIED' },  // $ twakuwe
    { owner: 'MUTONI', price: 25, category: 'REGULAR', status: 'RESERVED' },
    { owner: 'EGIDE', price: 50, category: 'VIP', status: 'RESERVED' },
    { owner: null, price: 100, category: 'VVIP', status: 'AVAILABLE' },
    { owner: 'JUSTIN', price: 25, category: 'REGULAR', status: 'OCCUPIED' },
]

// 1. Message ya MANZI
let personMessage;

// 2. Total ya OCCUPIED na RESERVED
let total = 0;

hallSeats.forEach((seat, index) => {
    if(seat.owner === 'MANZI') {
        personMessage = `Hey Jose, ${seat.owner} already entered and his in ${seat.category} of $${seat.price}.`;
    }

    // Kubara Total
    if(seat.status !== 'AVAILABLE') {
        total = total + seat.price;
    }
})

let seatMessage = `Finding Total Price Seats CINEMA HALL will make for all OCCUPIED and RESERVED: $${total}`;

console.log(personMessage);
console.log(seatMessage);