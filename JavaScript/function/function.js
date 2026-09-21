function sayHello() { 
    return "Hello World"; 
}

console.log(sayHello())

function sumation() {
    const x = 5;
    const y = 3;
    const z = x - y;
    return z;
}

console.log(sumation())

function sentence() {
    return "Welcome to javascript function.";
}

console.log(sentence());

function numbers() {
    const digits = [1,2,3,4,5]
    const addElement = digits.push(6)
    return digits;
}

console.log(numbers());

function greetUser() {
    const names = {name:'umuyoboro tv'}
    return `Hello, ${names.name}`;
}

console.log(greetUser());

function ageofpoul(presentyeah, birthYear) {
    const age = presentyeah - birthYear;
    return age;
}

console.log(ageofpoul(2026, 2000));

function studentsinformation(name, age, course) {
    const student = {name, age, course}
    return student;
}

console.log(studentsinformation('Gedeon', 24, 'javascript'));
console.log(studentsinformation('Frank', 23, 'Responsive Web Design'));
console.log(studentsinformation('Grace', 22, 'Python Programming'));
console.log(studentsinformation('Adelephine', 21, 'Data Science'));
console.log(studentsinformation('Bikora', 20, 'Machine Learning'));

function numbers (a, b) {
    const sum = a + b;
    return sum;
}

console.log(numbers(5, 7));

function calculateAverage() {
    const a=2
    const b=5
    const c=10

    function sumofNumber() {
        const sum = a + b + c;
        return sum;
    }

    const summationresult = sumofNumber();

    const avrg = summationresult / 3;
    return avrg;
}

console.log(calculateAverage());

function checkGrade(marks) {

    function getGrade() {
        if (marks>=80 && marks <=100) {
            return 'A'
        } else if (marks>=70 && marks <80) {
            return 'B'
        } else if (marks>=60 && marks <70) {
            return 'C'
        } else if (marks<=69) {
            return 'D'
        }
    }

    return getGrade();
}

console.log(checkGrade(90));
console.log(checkGrade(20));
console.log(checkGrade(65));
console.log(checkGrade(32))

function shopingCart() {
    const price1 = 100;
    const price2 = 200;
    const price3 = 300;

    function calculateTotal() {
        const total = price1 + price2 + price3;
        return total;
    }

    return calculateTotal();
}

console.log(shopingCart());

function attendance(student) {
    if (student>= 'present') {
        return 'Active'
    }else if (student>= 'absent') {
        return 'not'
    }
}

console.log(attendance('present'));
console.log(attendance('absent'));

function marialstatus(years) {
    if (years>=22 && years<=130) {
        return 'married'
    }else if (years>=1 && years<=21) {
        return 'not'
    }
}

console.log(marialstatus(17));
console.log(marialstatus(45));

function checkNumber(number) {
    if (number>0) {
        return "positive number"
    }else if (number<0) {
        return "negative number"
    }else {
        return "zero"
    }
}

console.log(checkNumber(5));
console.log(checkNumber(-3));
console.log(checkNumber(0))


function checkVotingAge(age) {
    if (age>=18) {
        return "you are eligible to vote"
    }else if (age<18) {
        return "you are not eligible to vote"
    }
}

console.log(checkVotingAge(20));
console.log(checkVotingAge(15))

function checkResult(marks) {
    if (marks>=50) {
        return "pass"
    }else if (marks<50) {
        return "fail"
    }
}

console.log(checkResult(60));
console.log(checkResult(40));

