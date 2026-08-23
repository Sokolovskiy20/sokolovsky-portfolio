import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Magnetic Custom Cursor (Zero-React-Rerender Edition)
 * Directly drives transforms on the GPU via requestAnimationFrame without triggering React state re-renders on mousemove.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;
    let animId = null;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        if (!isHovered) {
          isHovered = true;
          if (ring) {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(1.6)`;
            ring.style.backgroundColor = 'rgba(226, 212, 183, 0.12)';
            ring.style.borderColor = 'rgba(226, 212, 183, 0.4)';
          }
          if (dot) {
            dot.style.backgroundColor = '#E2D4B7';
          }
        }
      } else {
        if (isHovered) {
          isHovered = false;
          if (ring) {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(1)`;
            ring.style.backgroundColor = 'transparent';
            ring.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }
          if (dot) {
            dot.style.backgroundColor = '#FFFFFF';
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    const loop = () => {
      // Smooth lerp for outer aura
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`;
      }

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Outer subtle aura */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-white/20 opacity-0 transition-opacity duration-300 transform-gpu"
        style={{
          width: '36px',
          height: '36px',
          willChange: 'transform'
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-white opacity-0 transition-opacity duration-300 transform-gpu"
        style={{
          width: '6px',
          height: '6px',
          willChange: 'transform'
        }}
      />
    </>
  );
}
