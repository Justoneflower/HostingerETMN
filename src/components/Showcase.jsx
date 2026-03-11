// Showcase.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import Model from "./Model";
import MaterialThread from "./MaterialThread";
import FilamentSection from "./Filament";
import "./Showcase.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const textRef = useRef(null);

  /*  TYPING TEXT  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  /*  FEATURE SECTION SCROLL  */
  useGSAP(() => {
    gsap.fromTo(
      "#feature-section .reveal",
      { opacity: 0, x: -120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: "#feature-section",
          start: "top center",
        },
      }
    );
  }, []);

  /* COLOR CLICK */
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Blue", value: "#0000ff" },
    { name: "Green", value: "#00ff00" },
    { name: "Red", value: "#ff0000" },
    { name: "Silver Metallic", value: "#c0c0c0" },
    { name: "Transparent", value: "#ffffff" },
    { name: "Pearl White", value: "#f8f8ff" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Magenta", value: "#ff00ff" },
    { name: "Orange", value: "#ffa500" },
  ];

  const handleColorClick = (color) => {
    window.dispatchEvent(new CustomEvent("changeColor", { detail: color }));
  };

  return (
    <>
      <section className="model-section">
        <Canvas
          camera={{ position: [0, 1.5, 10], fov: 35 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={3} />
          <directionalLight position={[5, 8, 5]} intensity={2} />
          <directionalLight position={[-5, 5, -5]} intensity={1} />

          <Suspense fallback={null}>
            <Model scale={0.03} position={[0, -1.1, 0]} />
          </Suspense>
        </Canvas>
      </section>

      {/* TYPING TEXT SECTION */}
      <section className="text-section">
        <h1
          ref={textRef}
          className="typing-text"
          onAnimationEnd={(e) => e.target.classList.add("done")}
        >
          <b>ETMN</b>
          <br />
          Emerging Technologies: Macro to Nano
        </h1>
      </section>

      {/* FILAMENT SECTION */}
      <FilamentSection />

      {/* FEATURE SECTION */}
      <section id="feature-section">
        <div className="feature-container">
          <div className="feature-text">
            <h2 className="reveal">Unlimited application potential.</h2>
            <p className="reveal">
              The power of the S series lies in its versatility. Explore new
              3D printing applications using the widest choice of materials on
              the market.
            </p>
            <p className="reveal">
              They use 2.85 mm filament and unlock the full power of UltiMaker
              Cura.
            </p>
            <a href="#" className="learn-more reveal">
              Learn more →
            </a>
          </div>

          <div className="feature-image">
            <img src="/images/feature.jpg" alt="3D printing applications" />
          </div>
        </div>
      </section>

      <section id="series-section">
        <div className="series-container">
          <div className="series-image">
            <img src="/images/ultimaker.png" alt="Series Printers" />
          </div>
        </div>
      </section>

      {/* PARTNERS & CLIENTS */}
      <section className="partners-section">
        <div className="partners-container">
          <h2 className="partners-title">Partners & Clients</h2>
          <p className="partners-tagline">
            Building the future together with industry leaders and innovators
          </p>

          <div className="logo-row">
            <img src="/logos/ultimaker (2).png" alt="Ultimaker" />
            <img src="/logos/allaboutstartups.png" alt="Piltover Technologies" />
            <img src="/logos/allaboutstart.png" alt="All About Startups" />
            <img src="/logos/manipal.png" alt="Manipal University Jaipur" />
            <img src="/logos/aic-jklu.jpg" alt="AIC-JKLU" />
            <img src="/logos/heineken.png" alt="Heineken" />
          </div>

          <p className="partners-names">
            Ultimaker | All About Startups | Piltover Technologies | Manipal
            University Jaipur | AIC-JKLU | Heineken
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">© ETMN 2026</div>

          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Refund Policy</a>
          </div>

          <div className="footer-social">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}
