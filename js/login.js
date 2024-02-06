const inputUser = document.querySelector("#user-name");
const inputPassword = document.querySelector("#user-password");
const botonLogin = document.querySelector("#user-button");
const botonClose = document.querySelector("#user-btn-close");
const login = document.querySelector("#user-login");
const botonUsuario = document.querySelector("#boton-usuario");
const user = document.querySelector("#userModal");
const userLogin = document.querySelector(".user-login");
const barraIconos2 = document.querySelector("#barra-iconos2");
const sessionUsername = document.querySelector("#session-username");
const loggedModal = new bootstrap.Modal("#loggedModal", {});
const userBody = document.querySelector("#user-body");
const botonCerrarSesion = document.querySelector("#boton-cerrar-sesion");
const username = ""

// INICIO DE SESION

botonUsuario.addEventListener("click", () => {
    user.style.display = "flex";
})

botonLogin.addEventListener("click", (e) => {
    e.preventDefault()
    const data = {
        username: inputUser.value,
        password: inputPassword.value,
    }
    
    // if de inicio de sesion correcto e incorrecto
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Sesión iniciada!",
        showConfirmButton: false,
        timer: 2000
    });
    user.style.display = "none";
    
    localStorage.setItem("usuario", JSON.stringify(data.username));
    localStorage.setItem("contraseña", JSON.stringify(data.password));

    console.log(data.username, data.password);
})

botonClose.addEventListener("click", () => {
    user.style.display = "none";
});



const sesionIniciada = () => {
    const username = JSON.parse(localStorage.getItem("usuario"));
    botonUsuario.innerHTML = //html
    `
    <button class="btn-header" id="boton-usuario">
        <a href="#" id="session-username" class="session-username">${username}</a> 
        <img src="../assets/img/user.svg" alt="Icono de Usuario" title="Usuario">
    </button>
    `
}
sesionIniciada();
 
if (sesionIniciada){
    const username = JSON.parse(localStorage.getItem("usuario"));
    botonUsuario.addEventListener("click", () => {
        loggedModal.show()
        user.style.display = "none";

    });
    userBody.innerHTML = //html
    `
    <h2>Usuario: ${username}</h2>
    
    `
}

botonCerrarSesion.addEventListener("click", () => {
    localStorage.setItem("usuario", JSON.stringify());
    localStorage.setItem("contraseña", JSON.stringify());
    loggedModal.hide();
})