/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const title = "OWLIA - Marketing pentru Afaceri Noi";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0A2540",
          color: "white",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <img
          src="https://owlia.ro/logo_owlia_blue.svg"
          alt="OWLIA"
          width={200}
          height={200}
          style={{ marginBottom: 24, filter: "invert(1)" }}
        />
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.9 }}>
          Brand, Website, Marketing Digital pentru companii 0-3 ani
        </div>
        <div style={{ marginTop: 24, fontSize: 22, opacity: 0.7 }}>
          16 ani experiență • 100+ proiecte • rezultate concrete
        </div>
      </div>
    ),
    { ...size }
  );
}


