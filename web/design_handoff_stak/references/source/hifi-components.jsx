// Hi-fi shared components — Icon, Button, Input, Tag, Avatar, etc.

// Icon set — lucide-style 16px stroke icons, drawn inline so we don't ship a library
const ICONS = {
  search:  'M11 11l4 4 M7 12a5 5 0 1 1 10 0a5 5 0 0 1-10 0',
  plus:    'M12 5v14 M5 12h14',
  check:   'M5 12l4 4 10-10',
  x:       'M6 6l12 12 M18 6l-12 12',
  star:    'M12 3l2.6 6 6.4.6-5 4.3 1.6 6.3-5.6-3.4-5.6 3.4 1.6-6.3-5-4.3 6.4-.6z',
  mail:    'M3 6h18v12H3z M3 6l9 7 9-7',
  lock:    'M6 10h12v10H6z M9 10v-3a3 3 0 0 1 6 0v3',
  user:    'M6 21a6 6 0 0 1 12 0 M12 11a4 4 0 1 1 0-8a4 4 0 0 1 0 8',
  bell:    'M6 16V10a6 6 0 0 1 12 0v6l2 2H4l2-2 M10 21h4',
  cog:     'M12 9a3 3 0 1 0 0 6 a3 3 0 0 0 0-6 M19.4 15a1.6 1.6 0 0 0 .3 1.7l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.7.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.7V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
  trash:   'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13 M10 11v6 M14 11v6',
  edit:    'M12 20h9 M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z',
  cal:     'M4 7h16v13H4z M8 3v4 M16 3v4 M4 11h16',
  clock:   'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18 M12 7v5l3 2',
  flag:    'M5 21V4 M5 4h11l-2 4 2 4H5',
  paperclip:'M21 11l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 1 1-3-3l8-8',
  send:    'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
  chevR:   'M9 6l6 6-6 6',
  chevL:   'M15 6l-6 6 6 6',
  chevD:   'M6 9l6 6 6-6',
  chevU:   'M6 15l6-6 6 6',
  dots:    'M5 12h.01 M12 12h.01 M19 12h.01',
  dotsV:   'M12 5h.01 M12 12h.01 M12 19h.01',
  layout:  'M3 3h18v18H3z M3 9h18 M9 21V9',
  home:    'M3 11l9-8 9 8v10h-6v-6h-6v6H3z',
  inbox:   'M22 12h-6l-2 3h-4l-2-3H2 M5 4l-3 8v8h20v-8l-3-8z',
  filter:  'M4 5h16l-6 8v6l-4-2v-4z',
  arrowR:  'M5 12h14 M13 5l7 7-7 7',
  arrowU:  'M12 19V5 M5 12l7-7 7 7',
  google:  null, // rendered specially
  apple:   null,
  github:  'M9 19c-5 1.5-5-2.5-7-3 M15 22v-4a3 3 0 0 0-1-2.3c3 0 6-2 6-5.5 a4.3 4.3 0 0 0-1.2-3 4 4 0 0 0-.1-3 s-1-.3-3.3 1.3a11 11 0 0 0-6 0C7.1 2 6.1 2.3 6.1 2.3a4 4 0 0 0-.1 3 a4.3 4.3 0 0 0-1.2 3 c0 3.4 3 5.5 6 5.5 a3 3 0 0 0-1 2.3V22',
  logout:  'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  smile:   'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18 M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01',
};

function Icon({ name, size = 16, color, stroke = 1.5, style }) {
  if (name === 'google') {
    return (
      <svg width={size} height={size} viewBox="0 0 18 18" style={style}>
        <path d="M17.6 9.2c0-.6 0-1.2-.1-1.8H9v3.5h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h3a8.8 8.8 0 0 0 2.6-6.6z" fill="#4285F4"/>
        <path d="M9 18c2.4 0 4.5-.8 6-2.2l-3-2.2c-.8.6-1.9 1-3 1a5.3 5.3 0 0 1-5-3.7H1v2.3A9 9 0 0 0 9 18z" fill="#34A853"/>
        <path d="M4 10.9a5.3 5.3 0 0 1 0-3.5V5H1a9 9 0 0 0 0 8z" fill="#FBBC04"/>
        <path d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.5-2.5A9 9 0 0 0 1 5l3 2.3A5.3 5.3 0 0 1 9 3.6z" fill="#EA4335"/>
      </svg>
    );
  }
  if (name === 'apple') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
        <path d="M17.05 12.04c0-2.78 2.27-4.12 2.37-4.18-1.3-1.9-3.3-2.16-4-2.18-1.7-.17-3.32 1-4.18 1-.87 0-2.2-.98-3.62-.95-1.86.03-3.58 1.08-4.54 2.74-1.94 3.36-.5 8.32 1.38 11.05.92 1.34 2 2.83 3.42 2.78 1.38-.06 1.9-.89 3.56-.89 1.66 0 2.13.89 3.59.86 1.48-.03 2.42-1.36 3.32-2.7 1.05-1.55 1.48-3.05 1.5-3.13-.03-.01-2.88-1.1-2.91-4.4zM14.4 4.16c.76-.92 1.27-2.2 1.13-3.48-1.1.04-2.42.73-3.2 1.65-.7.81-1.32 2.12-1.15 3.37 1.22.1 2.46-.62 3.22-1.54z"/>
      </svg>
    );
  }
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color || 'currentColor'} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={style}>
      {d.split(' M').map((p, i) => <path key={i} d={(i ? 'M' : '') + p} />)}
    </svg>
  );
}

// Button
function Button({ children, variant = 'default', size = 'md', icon, iconRight, style, full, onClick }) {
  const cls = `hf-btn hf-btn-${variant} ${size === 'sm' ? 'hf-btn-sm' : size === 'lg' ? 'hf-btn-lg' : ''}`;
  return (
    <button className={cls} style={{ width: full ? '100%' : undefined, ...style }} onClick={onClick}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}

function IconButton({ icon, size = 16, style, title }) {
  return <button className="hf-iconbtn" style={style} title={title}><Icon name={icon} size={size} /></button>;
}

// Input
function Input({ label, placeholder, value, type = 'text', icon, help, error, style, autoFocus, rightSlot }) {
  const inputEl = icon ? (
    <div className="hf-input-icon">
      <span className="icon-slot"><Icon name={icon} size={16} /></span>
      <input className="hf-input" placeholder={placeholder} defaultValue={value} type={type} autoFocus={autoFocus} />
      {rightSlot && <span style={{ position:'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>{rightSlot}</span>}
    </div>
  ) : (
    <div style={{ position: 'relative' }}>
      <input className="hf-input" placeholder={placeholder} defaultValue={value} type={type} autoFocus={autoFocus} />
      {rightSlot && <span style={{ position:'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>{rightSlot}</span>}
    </div>
  );
  return (
    <div style={style}>
      {label && <label className="hf-label">{label}</label>}
      {inputEl}
      {help && <div className="hf-help" style={{ color: error ? HF.red : HF.textMuted }}>{help}</div>}
    </div>
  );
}

// Checkbox
function Check({ checked, label, style, sub }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', ...style }}>
      <span className={'hf-check ' + (checked ? 'checked' : '')} style={{ marginTop: 1 }}>
        <Icon name="check" size={11} color="#fff" stroke={2.4} />
      </span>
      {label && <span style={{ fontSize: 13, lineHeight: 1.45 }}>
        {label}
        {sub && <span style={{ display:'block', color: HF.textMuted, fontSize: 12 }}>{sub}</span>}
      </span>}
    </label>
  );
}

// Tag
function Tag({ color = 'slate', children, style, dotOnly = false }) {
  const c = HF[color] || color;
  const soft = HF[color + 'Soft'] || HF.surfaceSubtle;
  if (dotOnly) return <span className="hf-tag-dot" style={{ background: c, ...style }} />;
  return (
    <span className="hf-tag" style={{ background: soft, color: c, ...style }}>
      <span className="hf-tag-dot" style={{ background: c }} />
      {children}
    </span>
  );
}

// Avatar
function Av({ initial, size = 'md', color, style }) {
  const cls = 'hf-avatar' + (size === 'sm' ? ' hf-avatar-sm' : size === 'lg' ? ' hf-avatar-lg' : '');
  return <span className={cls} style={{ background: color ? HF[color + 'Soft'] : undefined, color: color ? HF[color] : undefined, ...style }}>{initial}</span>;
}

// Logo mark
function Logo({ size = 18, withText = true, color }) {
  const c = color || HF.text;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <rect x="2" y="2" width="9" height="9" rx="2" fill={HF.primary} />
        <rect x="13" y="2" width="9" height="9" rx="2" fill="none" stroke={c} strokeWidth="2" />
        <rect x="2" y="13" width="9" height="9" rx="2" fill="none" stroke={c} strokeWidth="2" />
        <rect x="13" y="13" width="9" height="9" rx="2" fill={c} />
      </svg>
      {withText && <span style={{ fontWeight: 600, fontSize: size, letterSpacing: '-0.02em', color: c }}>stak</span>}
    </div>
  );
}

// Browser chrome — minimal, clean
function Browser({ tabTitle, children, sidebar }) {
  return (
    <div className="hf-art">
      <div style={{ height: 38, borderBottom: `1px solid ${HF.border}`, display: 'flex', alignItems: 'center', padding: '0 14px', background: HF.bg, gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: 50, background: '#e35d54' }} />
          <span style={{ width: 11, height: 11, borderRadius: 50, background: '#e8b13e' }} />
          <span style={{ width: 11, height: 11, borderRadius: 50, background: '#52ae3a' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: HF.surface, border: `1px solid ${HF.border}`, borderRadius: 8,
            padding: '4px 12px', fontFamily: HF.fontMono, fontSize: 12, color: HF.textMuted,
            minWidth: 280, textAlign: 'center'
          }}>
            <Icon name="lock" size={11} style={{ verticalAlign: 'middle', marginRight: 6, opacity: 0.6 }} />
            stak.app{tabTitle ? '/' + tabTitle : ''}
          </div>
        </div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ position: 'absolute', top: 38, left: 0, right: 0, bottom: 0, display: 'flex', background: HF.bg, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Button, IconButton, Input, Check, Tag, Av, Logo, Browser });
