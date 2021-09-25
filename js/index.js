const MAP_SECTION = '#section2';

let addUserForm = document.getElementById('add_user_form');
let editUserForm = document.getElementById('edit_user_form');

// Variable usada para tener referencia del registro a editar
let edit_id = undefined;

let nombre = '';
let apellido1 = '';
let apellido2 = '';
let anonimato = '';

// Evento onsubmit al insertar un registro desde el formulario de insert
addUserForm.addEventListener('submit', e => {
    e.preventDefault();

    inicializarVariables(addUserForm);
    anonimato = addUserForm.elements['grado_anonimato'].value;

    limpiarCampos(addUserForm);
    guardarEnDatabase();
    visualizarMapa();
});

// Evento onsubmit al editar un registro desde el formulario de edicion
editUserForm.addEventListener('submit', e => {
    e.preventDefault();

    inicializarVariables(editUserForm);
    limpiarCampos(editUserForm);
    editarEnDatabase();
    visualizarMapa();

    edit_id = undefined;
});

// Inicializa variables segun el contenido de un formulario
function inicializarVariables(form) {
    nombre = form.elements['usuario_nombre'].value;
    apellido1 = form.elements['usuario_apellido_1'].value;
    apellido2 = form.elements['usuario_apellido_2'].value;
}

// Limpia los campos de un formulario pasado por parametro
function limpiarCampos(form) {
    form.elements['usuario_nombre'].value = '';
    form.elements['usuario_apellido_1'].value = '';
    form.elements['usuario_apellido_2'].value = '';
}

function getCurrentName() {
    return (nombre + ' ' + apellido1 + ' ' + apellido2);
}

// Alterna entre mensaje de "no contenido" (lista vacia) y tabla (lista) segun si hay datos o no
function alternarLista() {
    const lista = document.getElementById('lista');
    const lista_vacia = document.getElementById('lista_vacia');

    if (document.getElementById('cuerpo').innerHTML) {
        lista.style.position = 'relative';
        lista.style.visibility = 'visible';

        lista_vacia.style.position = 'absolute';
        lista_vacia.style.visibility = 'hidden';
    }
    else {
        lista_vacia.style.position = 'relative';
        lista_vacia.style.visibility = 'visible';

        lista.style.position = 'absolute';
        lista.style.visibility = 'hidden';
    }
}

function visualizarMapa() {
    window.location = MAP_SECTION;
}