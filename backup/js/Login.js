const navigaion = document.querySelector(".navigation")
const navMenu = document.querySelector(".nav-menu")

navigation.addEventListener("click", () => {
    navigation.classList.toggle('active');
    navMenu.classList.toggle('active');
})

const signUpButton = document.getElementById("signUp")
const signInButton = document.getElementById("signIn")
const container = document.getElementById("container")

signUpButton.addEventListener("click", () =>{
    container.classList.add("right-panel-active")
})

signInButton.addEventListener("click", () =>{
    container.classList.remove("right-panel-active")
})

