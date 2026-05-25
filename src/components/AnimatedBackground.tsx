import { useEffect, useRef, useState } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user layout preferences (reduced motion)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Super slow movement for subtle feel
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.5 + 0.8;
        // Soft maroon and rich purple particles
        const isMaroon = Math.random() > 0.5;
        this.color = isMaroon 
          ? `rgba(159, 18, 57, ${Math.random() * 0.25 + 0.15})` // Maroon/Rose-800 (#9f1239)
          : `rgba(126, 34, 206, ${Math.random() * 0.25 + 0.15})`; // Rich Purple (#7e22ce)
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce/Wrap cleanly
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowBlur = 4;
        context.shadowColor = this.color;
        context.fill();
        context.shadowBlur = 0; // reset
      }
    }

    // Adapt particle count based on screen width
    const particleCount = width < 768 ? 25 : 60;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height));
    }

    // Handles resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Time multiplier for slow moving gradient mesh blobs
    let tempTime = 0;

    // Drawing loops
    const animate = () => {
      tempTime += 0.001;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw soft gradient mesh backgrounds
      // We will define moving gradients to make it feel deeply premium
      const g1_x = width * (0.3 + Math.sin(tempTime * 2) * 0.1);
      const g1_y = height * (0.3 + Math.cos(tempTime * 1.5) * 0.1);
      const g1_rad = Math.min(width, height) * 0.65;
      
      const grad1 = ctx.createRadialGradient(g1_x, g1_y, 0, g1_x, g1_y, g1_rad);
      grad1.addColorStop(0, 'rgba(126, 34, 206, 0.12)'); // Deep purple accent glow
      grad1.addColorStop(0.5, 'rgba(3, 7, 18, 0.1)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');

      const g2_x = width * (0.7 + Math.cos(tempTime * 1.8) * 0.15);
      const g2_y = height * (0.6 + Math.sin(tempTime * 2.2) * 0.12);
      const g2_rad = Math.min(width, height) * 0.75;

      const grad2 = ctx.createRadialGradient(g2_x, g2_y, 0, g2_x, g2_y, g2_rad);
      grad2.addColorStop(0, 'rgba(159, 18, 57, 0.1)'); // Deep maroon accent glow
      grad2.addColorStop(0.5, 'rgba(2, 2, 4, 0.05)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Deep Black Shaded base background
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Subtle Grid layout (very low contrast)
      ctx.strokeStyle = 'rgba(159, 18, 57, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Animate and draw connecting lines between particles
      const connectionDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Stronger opacity the closer they are, but overall very subtle (max 0.1 opacity)
            const alpha = (1 - dist / connectionDistance) * 0.07;
            ctx.strokeStyle = `rgba(159, 18, 57, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Particles
      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  // Fallback for prefers-reduced-motion: static gradient background
  if (reducedMotion) {
    return (
      <div 
        className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-gradient-to-tr from-[#000000] via-[#0c0005] to-[#05000c]"
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      id="portfolio-animated-bg"
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
      style={{ pointerEvents: 'none', display: 'block' }}
    />
  );
}
