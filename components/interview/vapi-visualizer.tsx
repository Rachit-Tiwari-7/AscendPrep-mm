'use client';

import { useEffect, useRef } from 'react';

interface VapiVisualizerProps {
  volumeLevel: number;
  isSpeaking: boolean;
  isCallActive: boolean;
}

export function VapiVisualizer({ volumeLevel, isSpeaking, isCallActive }: VapiVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dataRef = useRef<number[]>(new Array(40).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly update the visualizer data
      const targetLevel = isCallActive ? volumeLevel * 100 : 0;
      
      // Update our bars data with some noise/smoothing
      const newData = dataRef.current.map((val, i) => {
        // Base target depends on volume and speaking state
        let target = targetLevel;
        
        // Add some variation per bar
        target *= (0.5 + Math.sin(Date.now() * 0.005 + i * 0.2) * 0.5);
        
        // Smoothly transition
        return val + (target - val) * 0.2;
      });
      dataRef.current = newData;

      // Draw bars
      const barWidth = 4;
      const barPadding = 2;
      const totalBarWidth = barWidth + barPadding;
      const startX = (canvas.width - newData.length * totalBarWidth) / 2;

      newData.forEach((level, i) => {
        const h = Math.max(2, level * 0.8);
        const x = startX + i * totalBarWidth;
        const y = (canvas.height - h) / 2;

        // Gradient color based on speaking state
        const gradient = ctx.createLinearGradient(0, y, 0, y + h);
        if (isSpeaking) {
          gradient.addColorStop(0, '#60a5fa'); // blue-400
          gradient.addColorStop(1, '#3b82f6'); // blue-500
        } else {
          gradient.addColorStop(0, '#94a3b8'); // slate-400
          gradient.addColorStop(1, '#64748b'); // slate-500
        }

        ctx.fillStyle = gradient;
        
        // Rounded rect for bars
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x, y, barWidth, h, 2);
        } else {
            ctx.rect(x, y, barWidth, h);
        }
        ctx.fill();
        
        // Add glow if active
        if (isCallActive && level > 5) {
          ctx.shadowBlur = level / 2;
          ctx.shadowColor = isSpeaking ? 'rgba(96, 165, 250, 0.5)' : 'rgba(148, 163, 184, 0.3)';
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [volumeLevel, isSpeaking, isCallActive]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={80} 
      className="w-full h-20"
    />
  );
}
