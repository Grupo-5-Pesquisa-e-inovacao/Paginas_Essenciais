
const hamburguer = document.querySelector(".navigation");
const navMenu = document.querySelector(".nav-menu");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
})

const Entrar = document.querySelector('#entrar')
const Cadastro = document.querySelector('#cadastro')
const btnColor = document.querySelector('.button-cor')
const container = document.querySelector('.container');


function clicarEntrar() {
  Entrar.style.left = "25px";
  Cadastro.style.left = "450px";
  btnColor.style.left = "0px";
  if (window.innerWidth > 768) {
    container.style.height = "60vh";
  } else {
    container.style.height = "35vh";
  }
}




function clicarCadastrar() {
  Entrar.style.left = "-450px";
  Cadastro.style.left = "25px";
  btnColor.style.left = "110px";
  if (window.innerWidth > 768) {
    container.style.height = "90vh";
  } else {
    container.style.height = "63vh";
  }
}


document.querySelector('#btnSignin').addEventListener('click', clicarEntrar);
document.querySelector('#btnSignup').addEventListener('click', clicarCadastrar);


window.addEventListener('resize', () => {
  
  if (window.innerWidth > 768) {
    clicarEntrar();
  } else {
    clicarCadastrar(); 
  }
});


if (window.innerWidth > 768) {
  clicarEntrar(); 
} else {
  clicarCadastrar(); 
}
