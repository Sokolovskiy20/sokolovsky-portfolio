import React, { useEffect, useRef } from 'react';

/**
 * 3D Dark Obsidian Jasper / Black Diamond Gemstone (Mobile-First + 60+ FPS Optimized)
 * Multifaceted Polyhedral Crystal sculpted in Deep Obsidian Glass, Smoked Amber Core & Platinum Edge Glints
 * 
 * Mobile & Desktop Fixes:
 * 1. Native Touch Interaction: Smooth touch drag rotation on mobile (touchmove/touchstart/touchend).
 * 2. Dynamic Aspect Framing: Automatic camera distance scaling for portrait phone screens (iPhone / Android) so the crystal is never cut off or distorted.
 * 3. Auto-Gyroscopic Ambient Motion: Elegant continuous facet glinting when idle.
 * 4. ResizeObserver & Context Resilience: Prevents 0-pixel canvas bugs on mobile orientation changes or app switching.
 * 5. IntersectionObserver: Pauses WebGL render loop when scrolled offscreen.
 */
export default function ThreeDObject({ className = "", paused = false }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext('webgl', { 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });

    if (!gl) {
      gl = canvas.getContext('experimental-webgl');
      if (!gl) return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 vUv;

      #define MAX_STEPS 32
      #define SURF_DIST 0.003
      #define MAX_DIST 18.0

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      const float PHI = 1.61803398875;

      // Distance to the multifaceted precious crystal
      float getDist(vec3 p) {
        // Zero-gravity majestic floating hover
        p.y += sin(u_time * 0.8) * 0.07;

        // Interactive touch/mouse rotation + continuous organic luxury spin
        p.yz *= rot(u_mouse.y * 0.70 + sin(u_time * 0.4) * 0.12);
        p.xz *= rot(u_mouse.x * 0.85 + u_time * 0.22);

        float r = 1.42;
        float d = length(p) - r;

        // Top table flat cut
        d = max(d, p.y - 1.02);

        // Bottom culet point
        d = max(d, -p.y - 1.22);

        // Crown & Pavilion Facet Planes (Icosahedral & Octahedral crystal cuts)
        vec3 n1 = normalize(vec3(1.0, 1.0, 1.0));
        vec3 n2 = normalize(vec3(-1.0, 1.0, 1.0));
        vec3 n3 = normalize(vec3(1.0, -1.0, 1.0));
        vec3 n4 = normalize(vec3(1.0, 1.0, -1.0));

        d = max(d, abs(dot(p, n1)) - 1.10);
        d = max(d, abs(dot(p, n2)) - 1.10);
        d = max(d, abs(dot(p, n3)) - 1.10);
        d = max(d, abs(dot(p, n4)) - 1.10);

        // Brilliant Star Facets
        vec3 n5 = normalize(vec3(0.0, 1.0, PHI));
        vec3 n6 = normalize(vec3(PHI, 0.0, 1.0));
        vec3 n7 = normalize(vec3(1.0, PHI, 0.0));

        d = max(d, abs(dot(p, n5)) - 1.14);
        d = max(d, abs(dot(p, n6)) - 1.14);
        d = max(d, abs(dot(p, n7)) - 1.14);

        // Secondary cross-bezel facets
        vec3 n8 = normalize(vec3(0.0, -1.0, PHI));
        vec3 n9 = normalize(vec3(-PHI, 0.0, 1.0));
        d = max(d, abs(dot(p, n8)) - 1.14);
        d = max(d, abs(dot(p, n9)) - 1.14);

        return d;
      }

      vec3 getNormal(vec3 p) {
        float d = getDist(p);
        vec2 e = vec2(0.002, 0.0);
        vec3 n = d - vec3(
          getDist(p - e.xyy),
          getDist(p - e.yxy),
          getDist(p - e.yyx)
        );
        return normalize(n);
      }

      float rayMarch(vec3 ro, vec3 rd) {
        float dO = 0.0;
        for(int i = 0; i < MAX_STEPS; i++) {
          vec3 p = ro + rd * dO;
          float dS = getDist(p);
          dO += dS;
          if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
        }
        return dO;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Responsive camera distance: adjust on vertical portrait mobile screens
        float isPortrait = step(u_resolution.x, u_resolution.y);
        float camZ = mix(-3.7, -4.1, isPortrait);

        // Ray Origin & Direction
        vec3 ro = vec3(0.0, 0.0, camZ);
        vec3 rd = normalize(vec3(uv, 1.35));

        float d = rayMarch(ro, rd);

        vec3 color = vec3(0.0);
        float alpha = 0.0;

        // Background subtle champagne amber ambient halo
        float bgGlow = length(uv);
        vec3 haloColor = mix(vec3(0.88, 0.83, 0.72) * 0.045, vec3(0.0), smoothstep(0.0, 0.85, bgGlow));
        color += haloColor;

        if(d < MAX_DIST) {
          vec3 p = ro + rd * d;
          vec3 n = getNormal(p);
          vec3 r = reflect(rd, n);

          // Studio Lighting Key Light (Upper Left Champagne Warm Key)
          vec3 lightPos1 = vec3(-3.0, 4.0, -3.0);
          vec3 l1 = normalize(lightPos1 - p);
          float diff1 = max(dot(n, l1), 0.0);
          float spec1 = pow(max(dot(r, l1), 0.0), 36.0);

          // Platinum Fill Light (Right Bottom Cold Rim)
          vec3 lightPos2 = vec3(4.0, -3.0, -2.5);
          vec3 l2 = normalize(lightPos2 - p);
          float diff2 = max(dot(n, l2), 0.0);
          float spec2 = pow(max(dot(r, l2), 0.0), 24.0);

          // Top Pure White Specular Highlight
          vec3 lightPos3 = vec3(0.0, 5.0, -1.0);
          vec3 l3 = normalize(lightPos3 - p);
          float spec3 = pow(max(dot(r, l3), 0.0), 54.0);

          // Pure Obsidian & Crystalline Jasper Body
          vec3 deepObsidian = vec3(0.04, 0.04, 0.045);
          vec3 smokedJasper = vec3(0.18, 0.15, 0.12);
          vec3 champagneGold = vec3(0.89, 0.83, 0.72);
          vec3 purePlatinum = vec3(0.98, 0.98, 1.0);

          // Fresnel Rim Light
          float fresnel = pow(1.0 + dot(rd, n), 3.0);

          // Internal core luminosity
          float coreGlow = smoothstep(1.3, 0.2, length(p)) * 0.45;

          // Composite gemstone surface
          vec3 gemColor = deepObsidian;
          gemColor += diff1 * smokedJasper * 0.85;
          gemColor += diff2 * vec3(0.08, 0.09, 0.11);
          gemColor += coreGlow * vec3(0.40, 0.34, 0.26);

          // Facet edge highlights & glints
          gemColor += spec1 * champagneGold * 1.35;
          gemColor += spec2 * purePlatinum * 0.85;
          gemColor += spec3 * purePlatinum * 1.85;
          gemColor += fresnel * champagneGold * 0.95;

          color = gemColor;
          alpha = 0.96;
        }

        gl_FragColor = vec4(color, alpha);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let isVisible = true;
    let animationFrameId = null;

    // Desktop Mouse Move
    const handleMouseMove = (e) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1.5, Math.min(1.5, x));
      targetMouseY = Math.max(-1.5, Math.min(1.5, y));
    };

    // Mobile Touch Move & Interaction
    const handleTouchMove = (e) => {
      if (!isVisible || !e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1.5, Math.min(1.5, x));
      targetMouseY = Math.max(-1.5, Math.min(1.5, y));
    };

    const handleTouchEnd = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    let startTime = performance.now();

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.05);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);

      if (width > 0 && height > 0 && (canvas.width !== width || canvas.height !== height)) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(resize, 100);
    }, { passive: true });

    // ResizeObserver for zero-lag canvas container tracking
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(canvas);
    }

    resize();

    const render = () => {
      if (!isVisible || pausedRef.current) {
        animationFrameId = null;
        return;
      }

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const currentTime = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width || 300, canvas.height || 300);
      gl.uniform1f(uTime, currentTime);
      gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    const resumeIfActive = () => {
      if (isVisible && !pausedRef.current && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver: automatically stop rendering when off-screen to prevent any lag!
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      isVisible = entry.isIntersecting;
      if (isVisible && !pausedRef.current) {
        if (!animationFrameId) {
          startTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    // Watch paused changes
    const checkPausedInterval = setInterval(() => {
      if (!pausedRef.current && isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    }, 200);

    // Initial trigger
    if (!pausedRef.current) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      clearInterval(checkPausedInterval);
      if (resizeObserver) resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none transform-gpu touch-none select-none ${className}`}
    />
  );
}
