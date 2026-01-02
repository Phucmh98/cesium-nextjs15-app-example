"use client";

import { Ion, Viewer } from "cesium";
import React, { useEffect, useRef } from "react";

export default function CesiumComponent() {
  const cesiumViewer = useRef<Viewer | null>(null);
  const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
  const initializeCesium = async () => {
    // Cấu hình Cesium Ion nếu cần
    Ion.defaultAccessToken = "your_cesium_ion_access_token_here";

    if (cesiumContainerRef.current) {
      cesiumViewer.current = new Viewer(cesiumContainerRef.current, {
        infoBox: false,
        selectionIndicator: false,
        shadows: false,
        shouldAnimate: true,
        baseLayerPicker: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        geocoder: false,
      });
    }
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).CESIUM_BASE_URL = process.env.NEXT_PUBLIC_CESIUM_BASE_URL
    initializeCesium();
  }, []);

  return (
    <div
      className="w-full h-full"
      ref={cesiumContainerRef}
      id="cesium-container"
    />
  );
}
