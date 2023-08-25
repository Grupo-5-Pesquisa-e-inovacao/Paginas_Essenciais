
const hamburguer = document.querySelector(".navigation");
const navMenu = document.querySelector(".nav-menu");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
})

var Entrar = document.querySelector('#entrar')
var Cadastro = document.querySelector('#cadastro')
var btnColor = document.querySelector('.button-cor')

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    Entrar.style.left = "25px"
    Cadastro.style.left = "450px"
    btnColor.style.left = "0px"
})

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    Entrar.style.left = "-450px"
    Cadastro.style.left = "25px"
    btnColor.style.left = "110px"
})