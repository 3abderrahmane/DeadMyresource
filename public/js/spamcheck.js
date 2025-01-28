let captcha;
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
console.log(alphabets.length);
let status = document.getElementById('status');
status.innerText = "Spam Check";
let spam = document.getElementById('submit');
let newgen = document.getElementById('gen');

 generate = () => {
// console.log(status)
let first = alphabets[Math.floor(Math.random() * alphabets.length)];
let second = Math.floor(Math.random() * 10);
let third = Math.floor(Math.random() * 10);
let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
captcha = first.toString()+second.toString()+third.toString()+fourth.toString();
console.log(captcha);
document.getElementById('generated-captcha').value = captcha;
document.getElementById("entered-captcha").value = '';
status.innerText = "Spam Check";
}

 check = () => {
// console.log(status)
    let userValue = document.getElementById("entered-captcha").value;
    console.log(captcha);
    console.log(userValue);
    if(userValue == captcha){
        status.innerText = "";
        spam.style.visibility = "visible";
        newgen.style.visibility ="hidden";
    }else{
        status.innerText = "Incorrect Code!!"
        document.getElementById("entered-captcha").value = '';
    }
}
