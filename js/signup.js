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

    fetch('https://diary-api-v2.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify ({
            firstname:firstname,
            secondname:secondname,
            email:email,
            password:password,
            phone:phone,
            confirm_password:confirm_password
        })
    })

    .then((result) => {
        status_code = result.status;
        return result.json();
    })
    .then((data) => {
        if (status_code >= 400) {
            document.getElementById('error').innerHTML = data['message'];

        }
        else {
            
            window.location = './index.html'
            alert('Your account has been created succesfully,please login on the next page');
            

        }
    });

    
}
