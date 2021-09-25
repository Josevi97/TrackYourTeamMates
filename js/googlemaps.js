const DEFAULT_POSITION = { lat: 39.466667, lng: -0.375000 };
const DEFAULT_ZOOM = 12;
const MAX_CLUSTER_ZOOM = 14;
const CENTER_ZOOM_IN = 15;

const DEFAULT_ICON = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
const CURRENT_ICON = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

let map = null;
let cluster = null;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: DEFAULT_POSITION,
        zoom: DEFAULT_ZOOM,
    });

    // Al principio tenia que usar esto porque al hacer zoom los clusters desaparecian
    // map.addListener('zoom_changed', () => {
    //     crearCluster();
    // });
}

function insertarMarca(element) {
    // Icono por defecto
    var icon = DEFAULT_ICON;

    // Icono azul para el registro que se acaba de insertar / modificar
    if (getCurrentName() == element.data().nombre)
        icon = CURRENT_ICON;

    // Genera informacion del registro
    const infoWindow = new google.maps.InfoWindow({
        content: generarInfo(element)
    });

    // Se crea el marcador
    var marker = new google.maps.Marker({
        position: { "lat": element.data().lat, "lng": element.data().lon },
        title: element.id,
        icon: icon,
        animation: google.maps.Animation.DROP
    });

    // Le inserta evento on click para mostrar informacion
    marker.addListener('click', () => {
        edit_id = marker.getTitle();
        infoWindow.open(map, marker);
    });

    markers.push(marker);
}

// Devuelve un div con toda la informacion de un registro
function generarInfo(element) {
    const info = (`
        <div class="card border-0">
            <div class="card-header bg-white">
                <h3 class="card-title">${element.data().nombre}</h3>  
                <h5>id: ${element.id}</h5>
            </div> 
            <div class="card-body">
                <p class="card-text">Fecha de conexion: ${element.data().fecha}</p>
                <p class="card-text">Hora de conexion: ${element.data().hora}</p>
            </div>
            <button class="btn btn-primary" data-toggle="modal" data-target="#modal">Editar</button>
        </div>`
    );

    return info;
}

// Limpia y crea un cluster para los marcadores
function crearCluster() {
    if (cluster != null)
        cluster.clearMarkers();

    cluster = new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        zoomOnClic: true,
        fitToMarkers: true,
        averageCenter: true,
        maxZoom: MAX_CLUSTER_ZOOM
    });
}

// Centra la camara en el mapa, hace zoom y te lo visualiza
function centrarCamara(lat, lon) {
    map.setCenter({ lat: lat, lng: lon});
    map.setZoom(CENTER_ZOOM_IN);

    visualizarMapa();
}

// Se pierde referencia de los marcadores
function limpiarMarkers() {
    markers = [];
}