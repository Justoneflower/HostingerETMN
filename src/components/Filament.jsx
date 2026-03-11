import "./FilamentSection.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MaterialThread from "./MaterialThread";
import ThreadModel from "./ThreadModel"; // ✅ center 3D model

const materials = [
  "PLA", "Tough PLA", "PETG", "ABS", "CPE", "CPE+",
  "NYLON", "POLYCARBONATE", "TPU 95A", "POLYPROPELENE"
];

export default function FilamentSection() {
  return (
    <section className="filament-section">

      {/* HEADING */}
      <h2 className="filament-heading">
        Choose your material from diverse options
      </h2>

      {/* MATERIAL TAGS */}
      <div className="material-tags">
        {materials.map((item) => (
          <span key={item} className="tag">{item}</span>
        ))}
      </div>

      {/* SUPPORT + COMPOSITE */}
      <div className="material-groups">
        <div>
          <span className="tag small">PVA</span>
          <span className="tag small">BREAKAWAY</span>
          <p>Support Materials</p>
        </div>

        <div>
          <span className="tag small">PET CF</span>
          <span className="tag small">NYLON CF</span>
          <p>Composite Materials</p>
        </div>
      </div>

      {/* ================= FILAMENT SCENE ================= */}
      <div className="filament-wrapper">

        {/* THREAD — BACKGROUND */}
        <div className="filament-thread-canvas">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <Suspense fallback={null}>
              <MaterialThread
                frequency={5}
                length={14}
                baseAmplitude={0.35}
                waveStretch={[1, 1.1, 0.9, 1.05, 0.95]}
              />
            </Suspense>
          </Canvas>
        </div>


{/* FLOATING CENTER MODEL (UNRESTRICTED) */}
<div className="filament-model-layer">
  <Canvas camera={{ position: [17, 5, 40], fov: 49 }}>
    <ambientLight intensity={0.2} />
    <directionalLight position={[4, 6, 6]} intensity={1} />
    <Suspense fallback={null}>
      <ThreadModel
        scale={0.3}
        y={-15} 
        x={5} 
        z={4} // 
      />
    </Suspense>
  </Canvas>
</div>



        {/* RIGHT COLOR PANEL */}
        <div className="filament-colors">
          {[
            ["white", "White"],
            ["black", "Black"],
            ["pearl", "Pearl White"],
            ["silver", "Silver Metallic"],
            ["green", "Green"],
            ["red", "Red"],
            ["magenta", "Magenta"],
            ["yellow", "Yellow"],
            
            ["orange", "Orange"],
            ["blue", "Blue"]
          ].map(([cls, name]) => (
            <div
              key={name}
              className={`filament-color ${cls}`}
              data-name={name}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("changeColor", { detail: getColor(cls) })
                )
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* helper */
function getColor(name) {
  return {
    white: "#ffffff",
    black: "#000000",
    pearl: "#f5f5f5",
    silver: "#c0c0c0",
    green: "#1fa84f",
    red: "#e53935",
    magenta: "#d81b60",
    yellow: "#fbc02d",
    
    orange: "#fb8c00",
    blue: "#1e40af"
  }[name];
}
