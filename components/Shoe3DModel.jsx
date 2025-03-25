import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";

function ShoeModel() {
  const { scene } = useGLTF("/shoe_model.glb");
  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0.1, 0.2, -0.4]} />;
}

export default function Shoe3DModel() {
  const orbitControlsRef = useRef();

  useEffect(() => {
    let timeoutId;

    const resetOrbit = () => {
      if (orbitControlsRef.current) {
        orbitControlsRef.current.reset(); // Reset the orbit controls to the initial state
        orbitControlsRef.current.autoRotate = true; // Ensure auto-rotation is re-enabled
      }
    };

    const handleUserInteraction = () => {
      // Clear any existing timeout
      clearTimeout(timeoutId);

      // Disable auto-rotation while the user is interacting
      if (orbitControlsRef.current) {
        orbitControlsRef.current.autoRotate = false;
      }

      // Set a new timeout to reset the orbit after 5 seconds of inactivity
      timeoutId = setTimeout(resetOrbit, 5000);
    };

    // Add event listeners for user interaction
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("mousedown", handleUserInteraction);
      canvas.addEventListener("touchstart", handleUserInteraction);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleUserInteraction);
        canvas.removeEventListener("touchstart", handleUserInteraction);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-[1000px] h-[1000px] aspect-auto overflow-hidden flex items-center justify-center">
      <Canvas camera={{ position: [0, 1, 4] }} style={{ height: "1000px", width: "1000px", position: "absolute" ,transform: 'translateX(60px)'}}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <ShoeModel />
        </Suspense>
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom={false}
          autoRotate // Enable auto-rotation
          autoRotateSpeed={8} // Adjust rotation speed
        />
      </Canvas>
    </div>
  );
}