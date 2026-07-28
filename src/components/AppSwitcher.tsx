'use client';

import { useEffect, useState } from 'react';

const BAR_HEIGHT = 38;

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
    // Quand tu auras deploye ton propre fork, remplace les deux valeurs
    // par https://worldmonitor.iziday.com et worldmonitor.iziday.com
    label: 'WORLD MONITOR',
    href: 'https://worldmonitor.app',
    host: 'worldmonitor.app',
  },
  {
    label: 'FINCEPT',
    href: 'https://github.com/Fincept-Corporation/FinceptTerminal/releases',
    external: true,
  },
];

// Le dashboard Osiris est un <main class="fixed inset-0">, donc il recouvre
// tout l'ecran. Cette regle le decale de la hauteur de la barre au lieu de
// le laisser passer dessous. Supprimer ce composant supprime aussi le decalage.
const LAYOUT_OFFSET = `
  body > main {
    top: ${BAR_HEIGHT}px !important;
    height: calc(100% - ${BAR_HEIGHT}px) !important;
  }
`;

export default function AppSwitcher() {
  const [host, setHost] = useState('');

  useEffect(() => {
    setHost(window.location.hostname);
  }, []);

  return (
    <>
      <style>{LAYOUT_OFFSET}</style>

      <nav
        aria-label="Applications"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${BAR_HEIGHT}px`,
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '0 12px',
          background: '#06060C',
          borderBottom: '1px solid #1a1a24',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: '11px',
          letterSpacing: '0.08em',
          zIndex: 1000,
        }}
      >
        {APPS.map((app) => {
          const active = Boolean(app.host) && app.host === host;

          return (
            <a
              key={app.label}
              href={app.href}
              target={app.external ? '_blank' : undefined}
              rel={app.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: `${BAR_HEIGHT}px`,
                color: active ? '#D4AF37' : '#6b6b78',
                background: active ? '#0d0d18' : 'transparent',
                textDecoration: 'none',
                borderBottom: active
                  ? '2px solid #D4AF37'
                  : '2px solid transparent',
                transition: 'color 120ms ease, background 120ms ease',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = '#b0b0be';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = '#6b6b78';
              }}
            >
              {app.label}
              {app.external && (
                <span
                  style={{
                    fontSize: '9px',
                    color: '#4a4a58',
                    letterSpacing: '0.04em',
                  }}
                >
                  &#8599; desktop
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}
