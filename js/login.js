// Login
document.getElementById('login-form').addEventListener('submit', login);

function login(e){
    e.preventDefault();
    let email = document.getElementById('user-email').value;
    let password = document.getElementById('user-password').value;
    var status_code;

    fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:email,
            password:password
        })
    })
    .then((result) => {
        console.log(result)
        status_code = result.status;
        return result.json();
    })
    .then((data) =>{
        console.log(data)
        if(status_code >= 400){
            document.getElementById('error').innerHTML = data['message'];
        }
        else{
            //redirect : window.location.replace('viewAllEntries.html')
            // stores tokens to browser session
            window.localStorage.setItem('token', data.token)
            //redirect : window.location.replace('viewAllEntries.html')
			//window.localStorage.setItem('firstname', data.firstname.toUpperCase())
            //window.localStorage.setItem('user_type', data.user_type)
            alert("You have logged in succesfully");
            redirect : window.location.replace('viewAllEntries.html')
           
            //alert("You have logged in succesfully");
            //redirect: window.location.replace("viewAllEntries.html")
            //window.location = 'viewAllEntries.html'
            //window.location = './viewAllEntries.html'
            //redirect : window.location.replace('viewAllEntries.html')
           
        }
    })
}

//console.log(login())

