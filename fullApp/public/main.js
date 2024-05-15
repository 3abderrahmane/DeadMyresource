///Sending a put/update request
const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

///this for put request to pass data to the server
update.addEventListener('click', _ => {
    fetch('/Input', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Arnoub Chagour',
            quote: 'I am also a resident.',
          })
      })
      .then(res => {
        if (res.ok){     
           window.location.reload(true)
           return res.json()
        }
       else {
            throw new Error('something went wrong!')
            }
      })
      .then(response => {
        console.log(response)//loged into console of the browser not the vcode terminal:this will
        ///come from the server response of the put request
      })
});

deleteButton.addEventListener('click', _ => {
  fetch('/dataDelete', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Arnoub'
    })
  })
  .then(res => {
      if (res.ok) return res.json()
  })
  .then(response => {
    if (response === 'No quote to delete') {
        messageDiv.textContent = 'Done Deleting!!!'
    } else {
       window.location.reload(true)
    }
  })
})

