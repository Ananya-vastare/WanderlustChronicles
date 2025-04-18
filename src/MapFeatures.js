import React, { useState, useEffect, useRef } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapFeatures.css';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Red icon for searched location
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [21, 34],
    iconAnchor: [10, 34],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

const touristSpots = [
    { name: 'Konark Sun Temple', lat: 19.8876, lon: 86.0945 },
    { name: 'Victoria Memorial', lat: 22.5448, lon: 88.3426 },
    { name: 'Kaziranga National Park', lat: 26.5775, lon: 93.1711 },
    { name: 'Mysore Palace', lat: 12.3051, lon: 76.6551 },
    { name: 'Hampi', lat: 15.335, lon: 76.4600 },
    { name: 'Taj Mahal', lat: 27.1751, lon: 78.0421 },
    { name: 'Amritsar Golden Temple', lat: 31.6200, lon: 74.8765 },
    { name: 'Manali', lat: 32.2396, lon: 77.1887 }
];

const Recenter = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position);
    }, [position]);
    return null;
};

const MarkerWithInfo = ({ spot }) => {
    const [details, setDetails] = useState({ restaurants: [], others: [] });
    const [image, setImage] = useState(DEFAULT_IMAGE);
    const [loaded, setLoaded] = useState(false);

    const fetchData = async () => {
        if (loaded) return;
        try {
            const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(spot.name)}&format=json`);
            const wikiData = await wikiRes.json();
            const title = wikiData.query.search?.[0]?.title;

            if (title) {
                const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&format=json&titles=${encodeURIComponent(title)}&piprop=thumbnail&pithumbsize=400`);
                const imgData = await imgRes.json();
                const page = Object.values(imgData.query.pages)[0];
                setImage(page?.thumbnail?.source || DEFAULT_IMAGE);
            }

            const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:1000,${spot.lat},${spot.lon})[amenity~"restaurant|cafe|toilets|parking|hospital|atm"];out;`;
            const res = await fetch(overpassUrl);
            const data = await res.json();

            const result = { restaurants: [], others: [] };
            for (const el of data.elements) {
                const name = el.tags?.['name:en'] || el.tags?.name;
                if (!name) continue;
                if (["restaurant", "cafe"].includes(el.tags.amenity) && result.restaurants.length < 3) {
                    result.restaurants.push(name);
                } else if (result.others.length < 3) {
                    result.others.push(`${el.tags.amenity}: ${name}`);
                }
            }

            setDetails(result);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Marker position={[spot.lat, spot.lon]} eventHandlers={{ popupopen: fetchData }}>
            <Popup>
                <div style={{ maxWidth: "220px", textAlign: "center" }}>
                    <h3>{spot.name}</h3>
                    <img src={image} alt={spot.name} style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }} />
                    <strong>Top Restaurants/Cafes:</strong>
                    <ul>{details.restaurants.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    <strong>Nearby Amenities:</strong>
                    <ul>{details.others.map((o, i) => <li key={i}>{o}</li>)}</ul>
                </div>
            </Popup>
        </Marker>
    );
};

const MapComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [position, setPosition] = useState([20.5937, 78.9629]);
    const [searchImage, setSearchImage] = useState(DEFAULT_IMAGE);
    const [searchDetails, setSearchDetails] = useState({ restaurants: [], others: [] });
    const inputRef = useRef(null);

    const handleSearch = async () => {
        if (!searchQuery) return;

        try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const geoData = await geoRes.json();
            if (!geoData.length) return alert("Location not found!");

            const { lat, lon } = geoData[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);

            const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json`);
            const wikiData = await wikiRes.json();
            const title = wikiData.query.search?.[0]?.title;

            if (title) {
                const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&format=json&titles=${encodeURIComponent(title)}&piprop=thumbnail&pithumbsize=400`);
                const imgData = await imgRes.json();
                const page = Object.values(imgData.query.pages)[0];
                setSearchImage(page?.thumbnail?.source || DEFAULT_IMAGE);
            } else {
                setSearchImage(DEFAULT_IMAGE);
            }

            const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:4000,${lat},${lon})[amenity~"restaurant|cafe|toilets|parking|hospital|atm"];out;`;
            const res = await fetch(overpassUrl);
            const data = await res.json();

            const details = { restaurants: [], others: [] };
            for (const el of data.elements) {
                const name = el.tags?.['name:en'] || el.tags?.name;
                if (!name) continue;
                if (["restaurant", "cafe"].includes(el.tags.amenity) && details.restaurants.length < 5) {
                    details.restaurants.push(name);
                } else if (details.others.length < 5) {
                    details.others.push(`${el.tags.amenity}: ${name}`);
                }
            }

            setSearchDetails(details);
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div>
            <br />
            <div className='Searchbox'>
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    placeholder="🔍 Type a tourist place and press Search button..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    style={{ padding: '10px', width: '400px', borderRadius: '6px' }}
                    className='Searchbar'
                />
                <button onClick={handleSearch} className='Search'>
                    Search
                </button>
            </div>

            <MapContainer center={position} zoom={5} className='Map'>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Recenter position={position} />

                {touristSpots.map((spot, idx) => (
                    <MarkerWithInfo key={idx} spot={spot} />
                ))}

                {searchQuery && (
                    <Marker position={position} icon={redIcon}>
                        <Popup>
                            <div style={{ maxWidth: "220px", textAlign: "center" }}>
                                <h3>{searchQuery}</h3>
                                <img src={searchImage} alt={searchQuery} style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }} />
                                <strong>Top Restaurants/Cafes:</strong>
                                <ul>{searchDetails.restaurants.slice(0, 3).map((r, i) => <li key={i}>{r}</li>)}</ul>
                                <strong>Nearby Amenities:</strong>
                                <ul>{searchDetails.others.slice(0, 3).map((o, i) => <li key={i}>{o}</li>)}</ul>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
