const inputUser = document.querySelector("#user-name");
const inputPassword = document.querySelector("#user-password");
const botonLogin = document.querySelector("#user-button");
const botonClose = document.querySelector("#user-btn-close");
const login = document.querySelector("#user-login");
const botonUsuario = document.querySelector("#boton-usuario");
const user = document.querySelector("#userModal");


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
})