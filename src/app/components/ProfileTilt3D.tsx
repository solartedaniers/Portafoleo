"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export interface ProfileFocus {
  x: string;
  y: string;
  zoom: number;
}

interface ProfileTilt3DProps {
  src: string;
  alt: string;
  focus?: ProfileFocus;
}

const MAX_TILT_DEG = 18;
const IDLE_TILT_DEG = 6;
const IDLE_PERIOD_MS = 6000;
const GYRO_RANGE_DEG = 30;
const SPRING = { stiffness: 140, damping: 16, mass: 0.6 };

type OrientationPermission = { requestPermission?: () => Promise<"granted" | "denied"> };

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

// Foto con profundidad real: capas separadas en el eje Z que giran con el mouse o el giroscopio
export default function ProfileTilt3D({ src, alt, focus }: ProfileTilt3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, SPRING);
  const rotateY = useSpring(targetY, SPRING);

  const glareX = useTransform(rotateY, [-MAX_TILT_DEG, MAX_TILT_DEG], [15, 85]);
  const glareY = useTransform(rotateX, [MAX_TILT_DEG, -MAX_TILT_DEG], [15, 85]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, color-mix(in srgb, var(--white) 45%, transparent), transparent 55%)`;
  const shadowX = useTransform(rotateY, [-MAX_TILT_DEG, MAX_TILT_DEG], [18, -18]);
  const shadowY = useTransform(rotateX, [-MAX_TILT_DEG, MAX_TILT_DEG], [-10, 26]);
  const dropShadow = useMotionTemplate`${shadowX}px ${shadowY}px 40px color-mix(in srgb, var(--black) 55%, transparent)`;

  // Balanceo suave cuando nadie interactúa, para que el 3D se note desde el inicio
  useEffect(() => {
    if (reducedMotion || active || gyroEnabled) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const phase = ((now - start) / IDLE_PERIOD_MS) * Math.PI * 2;
      targetX.set(Math.sin(phase) * IDLE_TILT_DEG * 0.6);
      targetY.set(Math.cos(phase) * IDLE_TILT_DEG);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, active, gyroEnabled, targetX, targetY]);

  useEffect(() => {
    if (!gyroEnabled || reducedMotion) return;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      const tiltX = clamp((event.beta - 45) / GYRO_RANGE_DEG, 1) * MAX_TILT_DEG;
      const tiltY = clamp(event.gamma / GYRO_RANGE_DEG, 1) * MAX_TILT_DEG;
      targetX.set(-tiltX);
      targetY.set(tiltY);
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [gyroEnabled, reducedMotion, targetX, targetY]);

  const enableGyroscope = async () => {
    if (gyroEnabled || reducedMotion || typeof DeviceOrientationEvent === "undefined") return;
    const permissionApi = DeviceOrientationEvent as unknown as OrientationPermission;
    try {
      const permission = permissionApi.requestPermission ? await permissionApi.requestPermission() : "granted";
      setGyroEnabled(permission === "granted");
    } catch {
      setGyroEnabled(false);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    targetX.set(clamp(-y * 2, 1) * MAX_TILT_DEG);
    targetY.set(clamp(x * 2, 1) * MAX_TILT_DEG);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setActive(true);
  };

  const handlePointerLeave = () => {
    setActive(false);
    targetX.set(0);
    targetY.set(0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    setActive(true);
    enableGyroscope();
  };

  const imageStyle = focus
    ? { objectPosition: `${focus.x} ${focus.y}`, transform: `scale(${focus.zoom})`, transformOrigin: `${focus.x} ${focus.y}` }
    : undefined;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-6 sm:p-8 [perspective:1000px] select-none touch-pan-y"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={() => !gyroEnabled && setActive(false)}
    >
      <motion.div
        className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        <div
          aria-hidden
          className="absolute -inset-6 rounded-full blur-2xl opacity-70 bg-[radial-gradient(circle,color-mix(in_srgb,var(--gold)_70%,transparent),transparent_70%)]"
          style={{ transform: "translateZ(-80px) scale(1.1)" }}
        />

        <div
          aria-hidden
          className="absolute -inset-3 rounded-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none bg-[conic-gradient(from_0deg,var(--gold),transparent_25%,var(--blood)_50%,transparent_75%,var(--gold))] [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),var(--black)_calc(100%-3px))]"
          style={{ transform: "translateZ(-30px)" }}
        />

        <motion.div
          className={`absolute inset-0 rounded-full overflow-hidden border-4 transition-colors duration-500 ${
            active ? "border-red-600" : "border-gold"
          }`}
          style={{ transform: "translateZ(0px)", boxShadow: dropShadow }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, (max-width: 1024px) 240px, 288px"
            className="object-cover"
            style={imageStyle}
          />
          <motion.div aria-hidden className="absolute inset-0 mix-blend-soft-light pointer-events-none" style={{ background: glare }} />
        </motion.div>

        <div
          aria-hidden
          className="absolute -inset-1 rounded-full border-2 border-gold/60 pointer-events-none"
          style={{ transform: "translateZ(45px)" }}
        />

        <span aria-hidden className="absolute -top-1 left-1/2 w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" style={{ transform: "translateZ(70px)" }} />
        <span aria-hidden className="absolute bottom-3 -right-1 w-2 h-2 rounded-full bg-blood shadow-[0_0_10px_var(--blood)]" style={{ transform: "translateZ(90px)" }} />
        <span aria-hidden className="absolute top-1/3 -left-2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" style={{ transform: "translateZ(55px)" }} />
      </motion.div>
    </div>
  );
}
