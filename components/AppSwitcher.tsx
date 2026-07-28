'use client';

import { useEffect, useState } from 'react';

type AppLink = {
  label: string;
  href: string;
  host?: string;
  external?: boolean;
};

const APPS: AppLink[] = [
  {
    label: 'OSIRIS',
    href: 'https://osiris.iziday.com',
    host: 'osiris.iziday.com',
  },
  {
    label: 'WORLD MONITOR',
    href: 'https://worldmonitor.iziday.com',
    host: 'worldmonitor.iziday.com',
  },
  {
    label: 'FINCEPT',
    href: 'https://github.com/Fincept-Corporation/FinceptTerminal/releases',
    external: true,
  },
];

export default function AppSwitcher() {
  const [host, setHost] = useState('');

  useEffect(() => {
    setHost(window.location.hostname);
  }, []);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '0 12px',
        height: '38px',
        background: '#0a0a0a',
        borderBottom: '1px solid #1f1f1f',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        fontSize: '11px',
        letterSpacing: '0.08em',
        position: 'relative',
        zIndex: 50,
      }}
    >
      {APPS.map((app) => {
        const active = Boolean(app.host) && app.host === host;

        return (
          
            key={app.label}
            href={app.href}
            target={app.external ? '_blank' : undefined}
            rel={app.external ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '38px',
              color: active ? '#e8e8e8' : '#6b6b6b',
              background: active ? '#161616' : 'transparent',
              textDecoration: 'none',
              borderBottom: active
                ? '2px solid #5502ff'
                : '2px solid transparent',
              transition: 'color 120ms ease, background 120ms ease',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = '#b0b0b0';
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = '#6b6b6b';
            }}
          >
            {app.label}
            {app.external && (
              <span
                style={{
                  fontSize: '9px',
                  color: '#4a4a4a',
                  letterSpacing: '0.04em',
                }}
              >
                ↗ desktop
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
}
