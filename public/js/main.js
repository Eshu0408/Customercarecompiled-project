const toggleButton=document.getElementsByClassName('toggle-button')[0];
const navbar=document.getElementsByClassName('navbar')[0];


toggleButton.addEventListener('click',()=>{
     navbar.classList.toggle('active')
})


let menuClicked=document.getElementsByClassName('navbar-list')[0];


menuClicked.addEventListener('click',()=>{
     navbar.classList.toggle('active')
})
 