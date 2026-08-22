import React from 'react';

/**
 * Pixel-Perfect Vector Brand Icons for Software Tools
 */

export function FigmaIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

export function FramerIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0H20V8H12L4 0Z" fill="#0055FF" />
      <path d="M4 8H12L20 16H4V8Z" fill="#0099FF" />
      <path d="M4 16H12V24L4 16Z" fill="#0055FF" />
    </svg>
  );
}

export function CursorIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E2D4B7" />
      <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="url(#cursor-grad)" />
      <defs>
        <linearGradient id="cursor-grad" x1="2" y1="7" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E2D4B7" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GoogleAntigravityIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="4.5" fill="#38BDF8" />
      <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChatGPTIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5 10.3a5.5 5.5 0 0 0-.47-4.63 5.6 5.6 0 0 0-5.74-2.73 5.5 5.5 0 0 0-4.22-1.89 5.6 5.6 0 0 0-5.32 3.86 5.5 5.5 0 0 0-3.32 2.4 5.6 5.6 0 0 0 .68 6.3 5.5 5.5 0 0 0 .47 4.63 5.6 5.6 0 0 0 5.74 2.73 5.5 5.5 0 0 0 4.22 1.89 5.6 5.6 0 0 0 5.32-3.86 5.5 5.5 0 0 0 3.32-2.4 5.6 5.6 0 0 0-.68-6.3zm-7.9 10.65a4.2 4.2 0 0 1-2.58-.88l.13-.08 4.3-2.48a.7.7 0 0 0 .35-.61v-6.07l1.82 1.05v5.8a4.23 4.23 0 0 1-4.02 3.27zm-7.6-3.77a4.2 4.2 0 0 1-.53-2.67l.13.08 4.3 2.48a.7.7 0 0 0 .7 0l5.25-3.04v2.1l-5.02 2.9a4.23 4.23 0 0 1-4.83-.85zm-1.57-7.8a4.2 4.2 0 0 1 2.05-1.78v5.12a.7.7 0 0 0 .35.61l5.25 3.03-1.82 1.05-5.02-2.9a4.23 4.23 0 0 1-.81-5.13zm13.1-1.37-5.25-3.03 1.82-1.05 5.02 2.9a4.23 4.23 0 0 1 .81 5.13 4.2 4.2 0 0 1-2.05 1.78v-5.12a.7.7 0 0 0-.35-.61zm2.38 6.94a4.2 4.2 0 0 1 .53 2.67l-.13-.08-4.3-2.48a.7.7 0 0 0-.7 0l-5.25 3.04v-2.1l5.02-2.9a4.23 4.23 0 0 1 4.83.85zm-8.68-2.65 2.37-1.37 2.37 1.37v2.74l-2.37 1.37-2.37-1.37v-2.74z"
        fill="#10A37F"
      />
    </svg>
  );
}

export function GoogleGeminiIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill="url(#gemini-gradient)"
      />
      <defs>
        <linearGradient id="gemini-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E80EE" />
          <stop offset="0.5" stopColor="#9B72CF" />
          <stop offset="1" stopColor="#F48465" />
        </linearGradient>
      </defs>
    </svg>
  );
}
