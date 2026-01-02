"use client";
import dynamic from "next/dynamic";

const CesiumComponent = dynamic(() => import("./components/cesium-viewer"), {
  ssr: false,
  loading: () => <p>Loading Cesium...</p>,
});

export default function Home() {
  return <div className="w-full h-full">
    <CesiumComponent />
  </div>;
}
