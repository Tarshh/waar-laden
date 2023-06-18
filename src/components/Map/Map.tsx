"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import marker from "public/icons/energyIcon.svg";
import { Icon } from "leaflet";
import Image from "next/image";

const key = "L5yt0WZxJv8Y6tNQr9LBG52nFfxaPiVmRq3n1Ibk22s";
const url = `https://discover.search.hereapi.com/v1/discover?at=51.17112621951287,4.449564725488645&q=petrol+station&apiKey=${key}`;

export function Map() {
  const [data, setData]: any = useState();

  async function fetchData() {
    const response = await fetch(url);
    try {
      const responseJson = await response.json();
      setData(responseJson);
    } catch (e) {
      console.error(e);
    }
  }

  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32],
  });

  useEffect(() => {
    async function fetchDataAsync() {
      await fetchData();
    }
    fetchDataAsync();
  }, []);

  return (
    <MapContainer
      center={[51.11728, 4.4182]}
      zoom={10}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && (
        <Marker position={data.items[0].position} icon={myIcon}>
          <Popup>Works</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
