// let title = document.getElementByClassName("title")
// let subtitle = document.getElementById("subtitle")
// let description = document.getElementsByTagName("h3")

let hello = document.querySelector("h1")
hello.innerHTML = "Hello DOM"

let subtitle = document.querySelector("#subtitle")
subtitle.innerHTML = "This is a subtitle"

let description = document.querySelector("h3")
description.innerHTML = "This is a description"

function checkResult() {
    let marks = document.getElementById("marks").value;
    let resultText = document.getElementById("result");

    if(marks === "") {
        resultText.innerText = "Please enter marks";
        resultText.style.color = "red";
    }
    else if(marks >= 50 && marks < 79) {
        resultText.innerText = "Result: PASS ✅";
        resultText.style.color = "green";
    }
    else if(marks < 50) {
        resultText.innerText = "Result: FAIL ❌";
        resultText.style.color = "red";
    }else if(marks >= 80) {
        resultText.innerText = "Result: PASS with distinction 🌟";
        resultText.style.color = "green";
    }
}


function checkPalindrome() {
    let text = document.getElementById("textInput").value;
    let result = document.getElementById("results");

    if(text === "") {
        result.innerText = "Not checks yet!!";
        result.style.color = "red";
    } else {
        result.innerText = text;
        result.style.color = "blue";
    }
}


// Fata ibintu byose
let passwordInput = document.getElementById("password");
let checkbox = document.getElementById("showPassword");

// Iyo ukoze kuri checkbox
checkbox.addEventListener("change", function() {
    
    if (checkbox.checked == true) {
        // Niba ari checked → EREKEZA PASSWORD
        passwordInput.type = "text";
    } else {
        // Niba itari checked → BISHE PASSWORD  
        passwordInput.type = "password";
    }

});