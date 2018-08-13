document.getElementById('signup-form').addEventListener("submit",signup);

function signup (e) {
    e.preventDefault();

    error = document.getElementById('error');
    var status_code;

    //Get form data
    let firstname  = document.getElementById('firstname').value;
    let secondname = document.getElementById('secondname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let password = document.getElementById('password').value;
    let confirm_password =  document.getElementById('confirm_password').value;



    
}
