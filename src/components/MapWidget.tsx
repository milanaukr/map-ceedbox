import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapWidgetProps {
    positions: {
        lat: number;
        lon: number;
        // portname: string;
    }[];

    positions2: {
        lat: number;
        lon: number;
    }[];
}

function RouteLine({
                       positions,
                       color = "red"
                   }: {
    positions: { lat: number; lon: number }[];
    color?: string;
}) {
    const map = useMap();

    useEffect(() => {
        const routeCoords = positions.map(p => [p.lat, p.lon] as [number, number]);

        const route = L.polyline(routeCoords, {
            color,
            weight: 3,
            opacity: 0.7
        }).addTo(map);

        map.fitBounds(route.getBounds(), { padding: [40, 40] });

        return () => {
            map.removeLayer(route);
        };
    }, [positions, color, map]);

    return null;
}
export default function MapWidget({ positions, positions2}: MapWidgetProps) {

    const customIconStop = new Icon({
        iconUrl: 'stop-icon.png',
        iconSize: [10, 10],
    });

    const customIconVessel = new Icon({
        iconUrl: '/vessel-icon.png',
        iconSize: [30, 30],
    });

    const customIconChina = new Icon({
        iconUrl: '/china-flag.svg',
        iconSize: [30, 30],
    });

    const customIconUk = new Icon({
        iconUrl: '/uk-flag.svg',
        iconSize: [30, 30],
    });

    const customIconPort = new Icon({
        iconUrl: '/port-icon.png',
        iconSize: [30, 30],
    });

    return (
        <section className="map-component" style={{ height: '100%', width: '100%' }}>
            <div className="map" style={{ height: '100%', width: '100%' }}>
                <MapContainer
                    center={[52.51, 13.38]}
                    zoom={6}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution="© OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                        position={[35.65043329, -13.70045169]}
                        icon={customIconVessel}>
                        <Popup>Vessel</Popup>
                    </Marker>

                    {positions.map((pos, index) => (
                        <Marker
                            key={index}
                            position={[pos.lat, pos.lon]}
                            icon={customIconStop}
                        >
                            {/*<Popup>Port name: {pos.portname}</Popup>*/}
                        </Marker>
                    ))}
                    
                    <Marker
                        position={[30.59639, 122.09631]}
                        icon={customIconChina}>
                        <Popup>POL</Popup>
                    </Marker>

                    <Marker
                        position={[51.505, -0.09]}
                        icon={customIconUk}>
                        <Popup>POD</Popup>
                    </Marker>

                    <RouteLine positions={positions} />

                    <RouteLine positions={positions2} color="blue" />


                    <Marker
                        position={[30.59639, 122.09631]}
                        icon={customIconPort}>
                        <Popup>Shanghai</Popup>
                    </Marker>

                    <Marker
                        position={[24.43934, 118.03634]}
                        icon={customIconPort}>
                        <Popup>Xiamen</Popup>
                    </Marker>

                    <Marker
                        position={[22.56862, 114.29591]}
                        icon={customIconPort}>
                        <Popup>Yantian</Popup>
                    </Marker>

                    {/*---SECOND VESSEL---*/}

                    <Marker
                        position={[22.562067909024545, 114.25920906683979 ]}
                        icon={customIconChina}>
                        <Popup>POL</Popup>
                    </Marker>

                    <Marker
                        position={[51.94358836, 1.31208501 ]}
                        icon={customIconVessel}>
                        <Popup>Vessel</Popup>
                    </Marker>

                    <Marker
                        position={[51.95560055608612, 1.3089502286544605]}
                        icon={customIconUk}>
                        <Popup>POD</Popup>/
                    </Marker>

                    <Marker
                        position={[1.25659, 103.64422]}
                        icon={customIconPort}>
                        <Popup>Singapore</Popup>/
                    </Marker>

                </MapContainer>
            </div>
        </section>
    );
}