document.getElementById('login-form').addEventListener('submit',login);


function login(e) {
    e.preventDefault()
    
    let email = document.getElementById('user-email').value;
    let password = document.getElementById('user-password').value;
    var status_code;
    
    fetch('https://diary-api-v2.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:email,
            password:password
        })
    })
}