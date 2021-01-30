console.log('Client side js file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    //console.log(weatherForm.location.value)

    messageOne.textContent = 'Searching...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?search=${weatherForm.location.value}`)
    .then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(!data.error){
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecast    
            } else
            {
                messageOne.textContent = data.error
            }
        })        
    })
    .catch((error) => {
            messageOne.textContent = error
            console.log('erro: '+ error)
    })
    

})
