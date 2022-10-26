const socket = io()

let naam;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    naam= prompt('Enter your name :')
} while (!naam);


textarea.addEventListener('keyup', (e)=>{

     if(e.key == 'Enter')
     {
        sendMessage(e.target.value)
     }
}) 
  



function sendMessage(message)
{
    let msg = {
        user:naam,
        message:message.trim()
    }

    //append msg

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)
}

function appendMessage(msg, type)
{
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')

    //markup

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}


//receiv msg

socket.on('message',(msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}