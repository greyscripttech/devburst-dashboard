
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface ConfettiProps {
  isActive: boolean;
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Particles
        id="celebration-confetti"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: 50
          },
          particles: {
            number: {
              value: 100
            },
            color: {
              value: ["#3B82F6", "#7C3AED", "#10B981", "#F97316", "#EC4899"]
            },
            shape: {
              type: ["circle", "square", "triangle"]
            },
            opacity: {
              value: { min: 0.4, max: 0.8 }
            },
            size: {
              value: { min: 2, max: 7 }
            },
            move: {
              enable: true,
              speed: 4,
              direction: "bottom",
              random: true,
              straight: false,
              outModes: "out"
            }
          },
          detectRetina: true,
          emitters: {
            position: {
              x: 50,
              y: 0
            },
            rate: {
              delay: 0,
              quantity: 50
            },
            size: {
              width: 100,
              height: 0
            }
          },
          life: {
            duration: {
              sync: false,
              value: 3
            },
            count: 1
          }
        }}
      />
    </div>
  );
};

export default Confetti;
