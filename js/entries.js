function retrieveEntries() {
	if(window.localStorage.getItem('token') === "") {
		redirect: window.location.replace('../index.html')
	}
	else {
		fetch('https://https://diary-api-v2.herokuapp.com/api/v1/entries', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem('token')
			}
		})
		.then((result) => {
			if (result.status == 200) {
				return result.json()
			}
			else if (result.status >= 401) {
				return "login failed"

			}
		})
		.then((data) => {
			if (data.length == 0) {
				document.getElementById('displayInfo').innerHTML = "You have not created any diary entries";

			} else {
				let entries ='';
				data.forEach(entry => {
					entries +=`

					<div  class = "entries"> 
      					<table>
        					<tr>
          						<td class = "item">${entry.title}</td>
          						<td><button id = "entryButton1" class = "update2">View</button></td>
          						<td><button id = "entryButton2" class="update2">Edit</button></td>
          						<td></td>
          						<td></td>
        					</tr>
      					</table>
    				</div>`
    				;

				});
				document.getElementById('entries').innerHTML = entries;
			}

		})
	}
}







