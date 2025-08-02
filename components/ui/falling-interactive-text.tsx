{/*import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  trigger?: "auto" | "scroll" | "click" | "hover";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  highlightClass?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = "",
  highlightWords = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  highlightClass = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");

    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span
          class="inline-block mx-[2px] select-none ${
            isHighlighted ? `text-cyan-500 font-bold ${highlightClass}` : ""
          }"
        >
          ${word}
        </span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // Function to calculate responsive scale factor
  const getScaleFactor = () => {
    if (typeof window === 'undefined') return 1;
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 480) return 0.7;   // Extra small devices
    if (viewportWidth < 640) return 0.8;   // Small devices
    if (viewportWidth < 1024) return 0.9;  // Medium devices
    return 1;                              // Large devices and up
  };

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body, Bounds } =
      Matter;
    
    let currentScale = getScaleFactor();

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create({
      gravity: { x: 0, y: gravity },
      // Enable sleeping to improve performance
      enableSleeping: true,
    });

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        wireframeBackground: 'transparent',
      },
    });

    // Create boundaries with collision
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
      collisionFilter: { group: -1 },
    };

    // Create boundaries slightly inside the container to keep text fully visible
    const padding = 10;
    const boundaryThickness = 1000; // Make boundaries very thick
    const boundaryOffset = boundaryThickness / 2;
    const boundaries = [
      // Bottom
      Bodies.rectangle(width / 2, height + boundaryOffset, width + boundaryThickness, boundaryThickness, boundaryOptions),
      // Left
      Bodies.rectangle(-boundaryOffset, height / 2, boundaryThickness, height + boundaryThickness, boundaryOptions),
      // Right
      Bodies.rectangle(width + boundaryOffset, height / 2, boundaryThickness, height + boundaryThickness, boundaryOptions),
      // Top (with small gap)
      Bodies.rectangle(width / 2, -boundaryOffset + 20, width + boundaryThickness, boundaryThickness, boundaryOptions),
    ];

    if (!textRef.current) return;
    const wordSpans = textRef.current.querySelectorAll("span");
    const wordBodies = [...wordSpans].map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.2, // Very low bounciness
        friction: 0.05,
        frictionAir: 0.01, // Very low air friction
        frictionStatic: 0.1,
        chamfer: { radius: 2 },
        density: 0.0002, // Very low density
        isStatic: false,
        // Collision filter to prevent words from sticking to boundaries
        collisionFilter: {
          group: 0,
          category: 0x0001,
          mask: 0xFFFFFFFF
        },
        // Add sleeping configuration
        sleepThreshold: 60,
        timeScale: 0.8
      });

      // Add some initial random velocity
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 2,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = "none";
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    // Add all bodies to the world
    World.add(engine.world, [
      ...boundaries,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    // Function to keep text within bounds and centered
    const keepInBounds = () => {
      const containerPadding = 20;
      const bottomPadding = 60; // Extra padding at the bottom
      const centerX = width / 2;
      
      wordBodies.forEach(({ body, elem }) => {
        const rect = elem.getBoundingClientRect();
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;
        
        // Calculate bounds with padding - wider at the bottom
        const minX = containerPadding + halfWidth;
        const maxX = width - containerPadding - halfWidth;
        const minY = containerPadding + halfHeight;
        const maxY = height - bottomPadding; // Allow more space at the bottom
        
        // Get current position
        const pos = body.position;
        let newX = pos.x;
        let newY = pos.y;
        let needsUpdate = false;
        
        // Check and adjust X position
        if (pos.x < minX) {
          newX = minX + (minX - pos.x) * 0.2; // Soft boundary
          needsUpdate = true;
        } else if (pos.x > maxX) {
          newX = maxX - (pos.x - maxX) * 0.2; // Soft boundary
          needsUpdate = true;
        }
        
        // Check and adjust Y position - softer at the bottom
        if (pos.y < minY) {
          newY = minY + (minY - pos.y) * 0.3; // Firmer top boundary
          needsUpdate = true;
        } else if (pos.y > maxY) {
          // Let text settle at the bottom but keep it visible
          newY = Math.min(pos.y, height - 10); // Don't let it go below container
          needsUpdate = true;
        }
        
        // Apply position update if needed
        if (needsUpdate) {
          Body.setPosition(body, { x: newX, y: newY });
          
          // Dampen velocity when hitting boundaries
          if (pos.x <= minX || pos.x >= maxX) {
            Body.setVelocity(body, { 
              x: -body.velocity.x * 0.3, 
              y: body.velocity.y * 0.7 
            });
          }
          if (pos.y <= minY || pos.y >= maxY) {
            Body.setVelocity(body, { 
              x: body.velocity.x * 0.7, 
              y: -body.velocity.y * 0.3 
            });
          }
          
          // Reduce angular velocity
          Body.setAngularVelocity(body, body.angularVelocity * 0.5);
        }
        
        // Limit maximum speed
        const maxSpeed = 10;
        const velocity = body.velocity;
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        
        if (speed > maxSpeed) {
          const ratio = maxSpeed / speed;
          Body.setVelocity(body, {
            x: velocity.x * ratio,
            y: velocity.y * ratio
          });
        }
      });
    };

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Handle window resize
    const handleResize = () => {
      currentScale = getScaleFactor();
      // Update all word positions with new scale
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.transform = `translate(-50%, -50%) scale(${currentScale}) rotate(${body.angle}rad)`;
      });
    };

    window.addEventListener('resize', handleResize);

    const updateLoop = () => {
      if (!effectStarted) return; // Stop if effect is no longer active
      
      const baseFontSize = parseFloat(fontSize);
      
      // Update positions with current scale
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        
        // Apply position and scaling
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) scale(${currentScale}) rotate(${body.angle}rad)`;
        
        // Set responsive font size
        elem.style.fontSize = `${baseFontSize * currentScale}px`;
      });
      
      // Keep text within bounds
      keepInBounds();
      
      // Update physics
      Matter.Engine.update(engine, 1000/60);
      
      // Continue the loop
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    
    let animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      // Clean up event listeners
      window.removeEventListener('resize', handleResize);
      
      // Clean up Matter.js resources
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full min-h-[200px] h-[40vh] cursor-pointer text-center pt-4 sm:pt-8 px-4 overflow-hidden"
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseOver={trigger === "hover" ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block max-w-full"
        style={{
          fontSize: `clamp(0.875rem, 4vw, ${fontSize})`,
          lineHeight: 1.4,
          padding: '0 1rem',
          wordBreak: 'break-word',
        }}
      />
      <div className="absolute top-0 left-0 z-0 w-full h-full" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;
*/}