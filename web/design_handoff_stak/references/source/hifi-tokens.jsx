// Hi-fi design tokens + base CSS

const HF = {
  // Surface
  bg: '#fafaf7',
  surface: '#ffffff',
  surfaceSubtle: '#f5f3ee',
  surfaceHover: '#f0eee9',
  border: '#e8e4dc',
  borderStrong: '#d4cfc4',
  divider: '#eeeae2',

  // Text
  text: '#1a1816',
  textMuted: '#6b6862',
  textFaint: '#9a968e',
  textInverse: '#fafaf7',

  // Brand / accent
  primary: '#c8633f',          // warm coral
  primaryHover: '#b15633',
  primarySoft: '#fbece4',
  primaryRing: 'rgba(200,99,63,0.20)',

  // Semantic / tag palette (oklch-tuned)
  red: '#d05646',
  redSoft: '#fae6e1',
  amber: '#c98a2a',
  amberSoft: '#fbf0d8',
  green: '#5a8a3a',
  greenSoft: '#e6f0d8',
  blue: '#3a6a9a',
  blueSoft: '#dde8f3',
  purple: '#7a5a9a',
  purpleSoft: '#ebe3f3',
  slate: '#6b6862',
  slateSoft: '#ececea',

  // Type
  fontSans: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  fontMono: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  // Radius
  r4: '4px', r6: '6px', r8: '8px', r10: '10px', r12: '12px', r16: '16px', r999: '999px',

  // Shadow
  shadowSm: '0 1px 2px rgba(20,16,12,0.04), 0 0 0 1px rgba(20,16,12,0.04)',
  shadowMd: '0 4px 12px rgba(20,16,12,0.06), 0 1px 3px rgba(20,16,12,0.04)',
  shadowLg: '0 24px 60px rgba(20,16,12,0.18), 0 8px 24px rgba(20,16,12,0.10)',
  shadowCard: '0 1px 0 rgba(20,16,12,0.04), 0 1px 2px rgba(20,16,12,0.06)',
};

if (typeof document !== 'undefined' && !document.getElementById('hf-styles')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap';
  document.head.appendChild(link);

  const s = document.createElement('style');
  s.id = 'hf-styles';
  s.textContent = `
    .hf-art, .hf-art * { box-sizing: border-box; }
    .hf-art {
      width: 100%; height: 100%;
      background: ${HF.bg};
      color: ${HF.text};
      font-family: ${HF.fontSans};
      font-size: 14px;
      line-height: 1.45;
      letter-spacing: -0.005em;
      overflow: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
    }
    .hf-art h1, .hf-art h2, .hf-art h3, .hf-art h4 { margin: 0; font-weight: 600; letter-spacing: -0.02em; line-height: 1.15; }
    .hf-art h1 { font-size: 32px; }
    .hf-art h2 { font-size: 22px; }
    .hf-art h3 { font-size: 17px; }
    .hf-art h4 { font-size: 14px; }
    .hf-art p  { margin: 0; }
    .hf-art a  { color: inherit; text-decoration: none; }
    .hf-art button { font: inherit; color: inherit; background: transparent; border: 0; padding: 0; cursor: pointer; }

    /* Buttons ------------------------------------------------------------ */
    .hf-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      height: 36px; padding: 0 14px; border-radius: ${HF.r8};
      font-weight: 500; font-size: 14px; letter-spacing: -0.005em;
      border: 1px solid transparent; cursor: pointer; user-select: none;
      transition: background .12s ease, border-color .12s ease, box-shadow .12s ease;
      white-space: nowrap;
    }
    .hf-btn-primary { background: ${HF.primary}; color: #fff; box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(200,99,63,0.30); }
    .hf-btn-primary:hover { background: ${HF.primaryHover}; }
    .hf-btn-default { background: ${HF.surface}; border-color: ${HF.border}; color: ${HF.text}; }
    .hf-btn-default:hover { background: ${HF.surfaceHover}; border-color: ${HF.borderStrong}; }
    .hf-btn-ghost   { background: transparent; color: ${HF.text}; }
    .hf-btn-ghost:hover { background: ${HF.surfaceHover}; }
    .hf-btn-sm { height: 30px; padding: 0 10px; font-size: 13px; border-radius: ${HF.r6}; }
    .hf-btn-lg { height: 42px; padding: 0 18px; font-size: 15px; }

    .hf-iconbtn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: ${HF.r8}; color: ${HF.textMuted};
      transition: background .12s, color .12s;
    }
    .hf-iconbtn:hover { background: ${HF.surfaceHover}; color: ${HF.text}; }

    /* Inputs ------------------------------------------------------------- */
    .hf-input {
      display: block; width: 100%;
      height: 40px; padding: 0 12px;
      background: ${HF.surface}; border: 1px solid ${HF.border}; border-radius: ${HF.r8};
      font: inherit; color: ${HF.text}; font-size: 14px;
      transition: border-color .12s, box-shadow .12s;
    }
    .hf-input::placeholder { color: ${HF.textFaint}; }
    .hf-input:focus { outline: none; border-color: ${HF.primary}; box-shadow: 0 0 0 3px ${HF.primaryRing}; }
    .hf-textarea { display: block; width: 100%; min-height: 80px; padding: 10px 12px;
      background: ${HF.surface}; border: 1px solid ${HF.border}; border-radius: ${HF.r8};
      font: inherit; font-size: 14px; resize: none; }
    .hf-label { display: block; font-size: 13px; font-weight: 500; color: ${HF.text}; margin-bottom: 6px; }
    .hf-help { font-size: 12px; color: ${HF.textMuted}; margin-top: 6px; }

    .hf-input-icon { position: relative; }
    .hf-input-icon .hf-input { padding-left: 38px; }
    .hf-input-icon .icon-slot { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: ${HF.textMuted}; pointer-events: none; }

    /* Checkbox ----------------------------------------------------------- */
    .hf-check {
      width: 16px; height: 16px; border: 1.5px solid ${HF.borderStrong}; border-radius: 4px;
      background: ${HF.surface}; display: inline-flex; align-items: center; justify-content: center;
      flex: 0 0 auto;
    }
    .hf-check.checked { background: ${HF.primary}; border-color: ${HF.primary}; }
    .hf-check.checked svg { display: block; }
    .hf-check svg { display: none; }

    /* Card / Surface ----------------------------------------------------- */
    .hf-card { background: ${HF.surface}; border: 1px solid ${HF.border}; border-radius: ${HF.r12}; box-shadow: ${HF.shadowCard}; }

    /* Avatar ------------------------------------------------------------- */
    .hf-avatar {
      display: inline-flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: ${HF.r999};
      background: ${HF.primarySoft}; color: ${HF.primary};
      font-size: 13px; font-weight: 600;
      flex: 0 0 auto;
    }
    .hf-avatar-sm { width: 24px; height: 24px; font-size: 11px; }
    .hf-avatar-lg { width: 56px; height: 56px; font-size: 20px; }

    /* Tag / Chip --------------------------------------------------------- */
    .hf-tag {
      display: inline-flex; align-items: center; gap: 5px;
      height: 22px; padding: 0 8px; border-radius: ${HF.r6};
      font-size: 12px; font-weight: 500;
    }
    .hf-tag-dot { width: 6px; height: 6px; border-radius: ${HF.r999}; }

    /* Kbd ---------------------------------------------------------------- */
    .hf-kbd {
      display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 18px;
      padding: 0 5px; border: 1px solid ${HF.border}; border-radius: 4px; background: ${HF.surfaceSubtle};
      font-family: ${HF.fontMono}; font-size: 11px; color: ${HF.textMuted};
    }

    /* Misc --------------------------------------------------------------- */
    .hf-muted { color: ${HF.textMuted}; }
    .hf-faint { color: ${HF.textFaint}; }
    .hf-divider { height: 1px; background: ${HF.divider}; }
    .hf-row { display: flex; align-items: center; }
    .hf-col { display: flex; flex-direction: column; }
    .hf-scroll-hidden::-webkit-scrollbar { display: none; }
    .hf-scroll-hidden { scrollbar-width: none; }
  `;
  document.head.appendChild(s);
}

window.HF = HF;
