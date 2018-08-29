/*jshint esversion: 6 */

function redirectUser(){
	confirm("You are not logged in. Please not that you will be redirected to login page when you close the dialog.");
	redirect : window.location.replace('index.html');
}



function logout(){
	var token = window.localStorage.getItem('token');
    
	if(token ==="" || token == null){
		redirectUser();
	}
	
	fetch('https://diary-api-v2.herokuapp.com/api/v1/auth/logout',{		
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			}

		})
		.then((result) => result.json())
		.then((data) => {
			confirm(data.message);
			
			
			window.localStorage.removeItem('token');
			redirect: window.location.replace('./index.html');
		})
		.catch(error => alert(error));
}

function my_entrys(){
	var token = window.localStorage.getItem('token');
	if(token ==="" || token == null){
		redirectUser();
	}
	else{
		var statusCode;
		
		fetch('https://diary-api-v2.herokuapp.com/api/v1/entries',{		
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			}

		})
		.then((result) => {
			console.log(result);
			statusCode = result.status;
			if (result.status == 200){
				return result.json();
			}		
			else if (result.status == 401){
				redirectUser();
			}
			})
		.then((data) =>{
			console.log(data);
			if (statusCode == 404){
				document.getElementById('displayInfo').innerHTML =
				 "You don't have any active entry offer now.";

			}else{
				let output = ``;
				data.forEach(entry => {			
					output += `
					<div id = "entryOne" class = "entries"> 
						  <table>
						  
        					<tr>
          						<td  class = "item"><h5> Title:  ${entry.title}</h5></td>
							</tr>
							

						  </table>
						  <br>
                          <table>
                            <tr>
                                <td class = "item"> <h5 class="entry_body">${entry.body}</h5></td>
                          
                            </tr>
                          
                          
                          </table>

                          <table>
                          <tr>
							<td><button id = "entryButton1" onclick="view_entry(${entry.id})" class = "update2">View</button></td>
                            <td><button id = "entryButton2" onclick="edit_entry(${entry.id})"class="update2" >Edit</button></td>
                            <td><button id = "entryButton3" onclick="delete_entry(${entry.id})"class="delete" >Delete</button></td>
                          
                         </tr>

                          </table>
    				</div>
					`;
				});
				document.getElementById('entries').innerHTML = output;
			}
		})
		.catch(error => alert(error));
	}	
}


function edit_entry(entry_id){
	// open modal to edit diary entry
	var modal = document.getElementById('edit_modal');
	
	modal.style.display = "block";
	
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
	document.getElementById('edit_modal').addEventListener('submit', updateDetail);

	function updateDetail(e){
		e.preventDefault();
		let title = document.getElementById('title').value;
		let body = document.getElementById('body').value;
		
		var statusCode;

		fetch('https://diary-api-v2.herokuapp.com/api/v1/entries/'+parseInt(entry_id),{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			},
			body: JSON.stringify({
				"title": title,
				"body": body,
			})

		})
		.then((result) => {
		
			statusCode = result.status;
			return result.json();
		})
		.then((data) =>{
			
			window.alert(data.message);
			modal.style.display = "none";
			redirect: window.location.replace('./viewAllEntries.html');
			
		});
		
	}
	
}

function delete_entry(entry_id){
	
		var statusCode;
		fetch('https://diary-api-v2.herokuapp.com/api/v1/entries/'+parseInt(entry_id),{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			}
		})
		.then((result) => {
			console.log(result);
			statusCode = result.status;
			return result.json();
		})
		.then((data) =>{
			console.log(data);
			window.alert("entry has been deleted.");
			window.location.reload();
		})
		.catch(error => alert(error));
	}


function view_entry(entry_id){



	var statusCode;
	fetch('https://diary-api-v2.herokuapp.com/api/v1/entries/'+parseInt(entry_id),{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + window.localStorage.getItem('token')
		}
	})
	.then((result) => {
		console.log(result);
		statusCode = result.status;
		return result.json();
	})
	.then((data) =>{
		console.log(data);
		let detail_output =``;
		detail_output += `<form action ="" class="add-content" id="detail_modal" >
						<span class="close">&times;</span>
						<table>
						
							<tr>
								
								
								
								<h2>${data.title}  <i class="fa fa-book" aria-hidden="true"></i></h2> 
								

								
							</tr>
						
						</table>
						
		
	


						<div class ="form-group">
							<label></label>
		
						</div>

						<div class="form-group">
							<label></label>
							<!--<input type = "textarea" class ="input-control" Placeholder ="Subject" />-->
							<p class="subject"></p>

			
						</div>

						<div class="form-group">
							<label></label>
							<!--<textarea id = "noteBody" class ="input-control" Placeholder ="Body" ></textarea>-->
							<h5 class="content2">${data.body}</h5> 
						</div>


	

						
					</form>`;
					document.getElementById('details').innerHTML = detail_output;

					var modal = document.getElementById('detail_modal');
	
					// sow modal box
					modal.style.display = "block";

					var span = document.getElementsByClassName("close")[0];
				
					// When the user clicks on <span> (x), close the modal
					span.onclick = function() {
						modal.style.display = "none";
					};
	
					window.onclick = function(event) {
						if (event.target == modal) {
							modal.style.display = "none";
						}
					};
			
		
	})
	.catch(error => alert(error));
	
}
