/*jshint esversion: 6 */

document.getElementById('new_entry').addEventListener('submit', newEntry);
function newEntry(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    

    var statusCode;

    if(window.localStorage.getItem('token') ===""){
        result = confirm("You need to log in first.\nPress Ok to go to login");
        if(result){
            redirect : window.location.replace('index.html');
        }
	}
	else{
		
        fetch('http://localhost:5000/api/v1/entries',{		
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: title,
                body: body
            })

        })
        .then((result) => {
            console.log(result);
            statusCode = result.status;
            return result.json();
        })
        .then((data) => {
            
            if(statusCode == 401){
                //result = confirm('Your authorization ' + data['msg'] + '\nClick Ok to go to login');
                result = confirm('Your authorization ' + data.msg + '\nClick Ok to go to login');
                if(result){
                    redirect: window.location.replace('../index.html');
                }
            }
            else {
                //result = alert(data['message']);
                result = alert(data.message);
                redirect: window.location.replace('./viewAllEntries.html');
            }
        });
    }

}

