const nombre = document.getElementById("myname");
const apellidos = document.getElementById("surname");
const correo = document.getElementById("email");
const celular = document.getElementById("mobile");
const contrasenia = document.getElementById("password");
const contrasenia2 = document.getElementById("repeatPassword");
const terminosYcondiciones = document.getElementById("termsAndConditions");
const form = document.getElementById("form");
const listInputs = document.querySelectorAll(".form-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let condicion = validacionForm();
  if (condicion) {
    guardarDatosFormulario();
    enviarFormulario();
  }
});

function validacionForm() {
  form.lastElementChild.innerHTML = "";
  let condicion = true;
  listInputs.forEach((element) => {
    element.lastElementChild.innerHTML = "";
  });

  if (nombre.value.length < 1 || nombre.value.trim() == "") {
    mostrarMensajeError("myname", "Nombre no válido*");
    condicion = false;
  }
  if (apellidos.value.length < 1 || apellidos.value.trim() == "") {
    mostrarMensajeError("surname", "Apellido no válido");
    condicion = false;
  }
  if (correo.value.length < 1 || correo.value.trim() == "") {
    mostrarMensajeError("email", "Correo no válido*");
    condicion = false;
  }
  if (
    celular.value.length != 9 ||
    celular.value.trim() == "" ||
    isNaN(celular.value)
  ) {
    mostrarMensajeError("mobile", "Celular no válido*");
    condicion = false;
  }
  if (contrasenia.value.length < 1 || contrasenia.value.trim() == "") {
    mostrarMensajeError("password", "Contraseña no válida*");
    condicion = false;
  }
  if (contrasenia2.value != contrasenia.value) {
    mostrarMensajeError("repeatPassword", "Error en la contraseña*");
    condicion = false;
  }
  if (!terminosYcondiciones.checked) {
    mostrarMensajeError("termsAndConditions", "Acepte los términos y condiciones*");
    condicion = false;
  } else {
    mostrarMensajeError("termsAndConditions", "");
  }
  return condicion;
}

function mostrarMensajeError(claseInput, mensaje) {
  let elemento = document.querySelector(`.${claseInput}`);
  elemento.lastElementChild.innerHTML = mensaje;
}

function guardarDatosFormulario() {
  const datosFormulario = {
    nombre: nombre.value,
    apellidos: apellidos.value,
    correo: correo.value,
    celular: celular.value,
    contrasenia: contrasenia.value
  };
  localStorage.setItem("formularioRegistro", JSON.stringify(datosFormulario));
}

function cargarDatosFormulario() {
  const datosFormulario = localStorage.getItem("formularioRegistro");
  if (datosFormulario) {
    const datos = JSON.parse(datosFormulario);
    nombre.value = datos.nombre || "";
    apellidos.value = datos.apellidos || "";
    correo.value = datos.correo || "";
    celular.value = datos.celular || "";
    contrasenia.value = datos.contrasenia || "";
    contrasenia2.value = datos.contrasenia || "";
  }
}

function enviarFormulario() {
  form.reset();
  form.lastElementChild.innerHTML = "¡Listo!";
  localStorage.removeItem("formularioRegistro");
}


cargarDatosFormulario();

