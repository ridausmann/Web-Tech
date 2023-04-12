var email = document.getElementById('input');
var pass = document.getElementById('pass');


console.log(email)
console.log(pass)

function validation() {
    if (email.value) {
        email.classList.remove('error')
        email.classList.add('success')
    }
    else {
        email.classList.remove('success')
        email.classList.add('error')
    }
    if (pass.value) {
        pass.classList.remove('error')
        pass.classList.add('success')
    }
    else {
        pass.classList.remove('success')
        pass.classList.add('error')
    }

}
