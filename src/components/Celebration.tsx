
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export type CelebrationType = "confetti" | "balloons" | "fireworks";

interface CelebrationProps {
  isActive: boolean;
  type: CelebrationType;
}

const Celebration = ({ isActive, type = "confetti" }: CelebrationProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!isActive) return null;

  const getOptions = () => {
    switch (type) {
      case "balloons":
        return {
          particles: {
            number: {
              value: 30
            },
            color: {
              value: ["#3B82F6", "#7C3AED", "#10B981", "#F97316", "#EC4899", "#EF4444", "#3B82F6", "#F59E0B"]
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 1
            },
            size: {
              value: { min: 15, max: 30 }
            },
            move: {
              enable: true,
              speed: 3,
              direction: "top" as const,
              straight: false,
              outModes: "out" as const
            }
          },
          emitters: {
            position: {
              x: 50,
              y: 100
            },
            rate: {
              delay: 0,
              quantity: 30
            },
            size: {
              width: 100,
              height: 0
            }
          }
        };
      case "fireworks":
        return {
          particles: {
            number: {
              value: 0
            },
            color: {
              value: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: { min: 0.3, max: 0.8 }
            },
            size: {
              value: { min: 1, max: 3 }
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none" as const,
              outModes: "out" as const
            }
          },
          emitters: [
            {
              direction: "top" as const,
              position: {
                x: 30,
                y: 100
              },
              rate: {
                delay: 0,
                quantity: 10
              },
              size: {
                width: 0,
                height: 0
              },
              life: {
                duration: 0.3,
                count: 10
              }
            },
            {
              direction: "top" as const,
              position: {
                x: 70,
                y: 100
              },
              rate: {
                delay: 0.2,
                quantity: 10
              },
              size: {
                width: 0,
                height: 0
              },
              life: {
                duration: 0.3,
                count: 10
              }
            }
          ]
        };
      default: // confetti
        return {
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
              direction: "bottom" as const,
              random: true,
              straight: false,
              outModes: "out" as const
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
        };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Particles
        id="celebration-particles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: 50
          },
          ...getOptions(),
        }}
      />
    </div>
  );
};

export default Celebration;
