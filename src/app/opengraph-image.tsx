import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} - Commercial Equipment Rental`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#ffffff",
          color: "#111111",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          border: "12px solid #ffc20e",
        }}
      >
        {/* Top bar with branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "6px",
              backgroundColor: "#ffc20e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "900",
              color: "#111111",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: "900", color: "#111111", textTransform: "uppercase" }}>
              {siteConfig.name}
            </span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#6b6b6b", letterSpacing: "1px" }}>
              HEAVY CONTRACTOR EQUIPMENT RENTALS
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <span style={{ fontSize: "56px", fontWeight: "900", lineHeight: "1.05", color: "#111111" }}>
            Heavy Equipment Rental, Delivered to Your Job Site
          </span>
          <span style={{ fontSize: "24px", color: "#3d3d3d", marginTop: "20px", lineHeight: "1.4" }}>
            Crawler Excavators, Wheeled Excavators & Rock Bulldozers
          </span>
        </div>

        {/* Footer info bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "2px solid #e5e5e0",
          }}
        >
          <span style={{ fontSize: "18px", color: "#3d3d3d", fontWeight: "600" }}>
            {siteConfig.address.formatted} · Proprietor: {siteConfig.proprietor}
          </span>
          <span style={{ fontSize: "22px", color: "#111111", fontWeight: "800" }}>
            Call: {siteConfig.contact.phone}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
