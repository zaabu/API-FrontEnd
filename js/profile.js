
function myProfile(){
	if(window.localStorage.getItem('token') ===""){
		redirect : window.location.replace('index.html')
	}
	else{
		var statusCode;
	
		fetch('http://localhost:5000/api/v1/auth/profile',{		
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			}

		})
		.then(result => {
			if(result.status == 401){
				res = confirm("Your session has expired.\nClick OK to go to login.")
				if(res){
					redirect : window.location.replace('index.html')
				}
			}
			else if(result.status == 200){
				return result.json()
			}
		})
		.then(data =>{
			let output = ``;
			output += `
			
			<p>User Details</p>
			</br>
			<p>Name: ${data.firstname.toUpperCase()} ${data.secondname.toUpperCase()}</p>
			</br>
			<p>Email: ${data.email}</p>
			</br>
			<p>Contact: +256 ${data["phone number"]}</p>
			<br>
			<p>Total Entries Created: </p>
			</br>`;
			
			document.getElementById('special').innerHTML = output
		})
		.catch(error => alert(error))

	}
}

console.log(myProfile())