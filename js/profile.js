/*jshint esversion: 6 */

function myProfile(){
	if(window.localStorage.getItem('token') ===""){
		redirect : window.location.replace('index.html');
	}
	else{
		var statusCode;
	
		fetch('https://diary-api-v2.herokuapp.com/api/v1/auth/profile',{		
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			}

		})
		.then(result => {
			if(result.status == 401){
				res = confirm("Your session has expired.\nClick OK to go to login.");
				if(res){
					redirect : window.location.replace('index.html');
				}
			}
			else if(result.status == 200){
				return result.json();
			}
		})
		.then(data =>{
			let output = ``;
			output += `
			<table>
				<tr>
				<h6>User Details</h6>
				</br>
				</tr>
			
				<tr>
				<h6>Name: ${data.firstname.toUpperCase()} ${data.secondname.toUpperCase()}</h6>
				</br>
				</tr>
				<tr>
				<h6>Email: ${data.email}</h6>
				</br>
				</tr>
				<tr>
				<h6>Contact: +256 ${data["phone number"]}</h6>
				<br>
				</tr>

				<tr>
				<h6>Total Entries Created: </h6>
				</br>
				</tr>
			
			</table>
				`;
			
			document.getElementById('special').innerHTML = output;
		})
		.catch(error => alert(error));

	}
}

console.log(myProfile());