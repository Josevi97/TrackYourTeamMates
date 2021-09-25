const midbconfig = {
    apiKey: "AIzaSyA0CUNL7XpCjbvCgRKVciRdPhmx9KIt6oU",
    authDomain: "dawproject-ccfeb.firebaseapp.com",
    projectId: "dawproject-ccfeb",
    storageBucket: "dawproject-ccfeb.appspot.com",
    messagingSenderId: "137978463603",
    appId: "1:137978463603:web:f37d4cfefbc55d9e84b106"
};

const classdbconfig = {
    apiKey: "AIzaSyCRd10hzoqrduHmD-hgIpQ3ND3dGmoh99Q",
    authDomain: "entorno-3a5a6.firebaseapp.com",
    projectId: "entorno-3a5a6",
    storageBucket: "entorno-3a5a6.appspot.com",
    messagingSenderId: "527542953300",
    appId: "1:527542953300:web:a4526a62bdc3561bf494c1"
};

firebase.initializeApp(midbconfig);

const db = firebase.firestore();
const coleccion = 'users';

// Limpia e inserta los datos en la lista y se marcan las ubicaciones de los registros
db.collection(coleccion).onSnapshot((query) => {
    const cuerpo = document.getElementById('cuerpo');
    cuerpo.innerHTML = '';

    limpiarMarkers();

    // Usado para la columna # de la tabla (no es el id)
    var contador = 0;

    query.forEach((element) => {
        insertarMarca(element);
        contador++;

        cuerpo.innerHTML += `
            <tr class="${element.data().nombre == getCurrentName() ? 'bg-danger' : ''}" onclick="centrarCamara(${element.data().lat}, ${element.data().lon})">
                <td>${contador}</td>
                <td>${element.data().nombre}</td>
                <td>${element.data().fecha}</td>
                <td>${element.data().hora}</td>
            </tr>`
    });

    crearCluster();
    alternarLista();
});

function guardarEnDatabase() {
    var options = {
        "enableHighAccuracy": true,
        "timeout": 5000,
        "maximumAge": 0
    };

    navigator.geolocation.getCurrentPosition(position => {
        // Se coge referencia de la posicion actual
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        // Se coge referencia de la fecha y hora actual
        const date = new Date();
        const fecha = date.toLocaleDateString();
        const hora = (date.getHours() + ':' + date.getMinutes());

        // Desvia la localizacion si el usuario lo desea
        if (anonimato != 'normal') {
            lat += Math.random() - Math.random()
            lon += Math.random() - Math.random()
        }

        // Inserta el registro en la base de datos
        db.collection(coleccion).add({
            "nombre": getCurrentName(),
            "lat": lat,
            "lon": lon,
            "fecha": fecha,
            "hora": hora
        })
            .then(value => {
                alert('Registro insertado correctamente');
            })
            .catch(value => {
                alert('No se ha podido insertar el registro');
            });

        // Posiciona la camara del mapa sobre la posicion actual
        centrarCamara(lat, lon);
    }, null, options)
}

function editarEnDatabase() {
    db.collection(coleccion).doc(edit_id).update({
        "nombre": getCurrentName()
    })
        .then(value => {
            alert('Registro actualizado correctamente');
        })
        .catch(value => {
            alert('No se ha podido actualizar el registro');
        });
}