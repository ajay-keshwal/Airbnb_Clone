
    
    mapboxgl.accessToken =mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: data.geometry.coordinates, // starting position [lng, lat]
        zoom: 9, // starting zoom
    });

    // const marker1 = new mapboxgl.Marker()
    // .setLngLat(coordinates)
    // .addTo(map);



    const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(data.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 2})
    .setHTML(`<h4>${data.location}</h4>Excect location will be provided after booking`))
    .addTo(map);
    
    