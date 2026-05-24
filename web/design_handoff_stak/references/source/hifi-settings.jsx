// Hi-fi Settings — sidebar tabs (Profile tab shown)

function HiSettings() {
  const tabs = [
    { group: 'Account', items: [
      { icon: 'user',  label: 'Profile', active: true },
      { icon: 'mail',  label: 'Email & password' },
      { icon: 'bell',  label: 'Notifications' },
      { icon: 'lock',  label: 'Security' },
    ]},
    { group: 'Workspace', items: [
      { icon: 'layout', label: 'Appearance' },
      { icon: 'inbox',  label: 'Boards & defaults' },
      { icon: 'cog',    label: 'Keyboard shortcuts' },
    ]},
    { group: 'Billing', items: [
      { icon: 'star', label: 'Plan & usage' },
    ]},
  ];

  return (
    <Browser tabTitle="settings/profile">
      {/* App sidebar (slim, same as board but collapsed) */}
      <div style={{
        flex: '0 0 56px',
        background: HF.bg,
        borderRight: `1px solid ${HF.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '14px 0', gap: 4,
      }}>
        <Logo size={22} withText={false} />
        <div style={{ height: 12 }} />
        {['home', 'search', 'inbox', 'cal'].map((i, k) => (
          <button key={i} className="hf-iconbtn" style={{ width: 36, height: 36 }}>
            <Icon name={i} size={18} color={HF.textMuted} />
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="hf-iconbtn" style={{ width: 36, height: 36, background: HF.surfaceHover, color: HF.text }}>
          <Icon name="cog" size={18} />
        </button>
        <Av initial="A" size="sm" color="primary" style={{ marginTop: 4 }} />
      </div>

      {/* Settings nav */}
      <div style={{
        flex: '0 0 240px',
        background: HF.bg,
        borderRight: `1px solid ${HF.border}`,
        padding: '20px 14px',
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, color: HF.textMuted, fontSize: 13 }}>
          <Icon name="chevL" size={14} />
          Back to boards
        </div>

        <h3 style={{ fontSize: 16, marginBottom: 16 }}>Settings</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tabs.map(group => (
            <div key={group.group}>
              <div style={{
                fontSize: 11, fontWeight: 600, color: HF.textFaint,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '0 8px 6px',
              }}>{group.group}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {group.items.map(it => (
                  <button key={it.label} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '7px 8px', borderRadius: 6,
                    background: it.active ? HF.surface : 'transparent',
                    border: it.active ? `1px solid ${HF.border}` : `1px solid transparent`,
                    boxShadow: it.active ? HF.shadowSm : 'none',
                    fontSize: 13, fontWeight: it.active ? 600 : 400,
                    color: HF.text, textAlign: 'left', width: '100%',
                  }}>
                    <Icon name={it.icon} size={15} color={it.active ? HF.primary : HF.textMuted} />
                    {it.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${HF.divider}` }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 8px', borderRadius: 6,
              fontSize: 13, color: HF.red, textAlign: 'left', width: '100%',
            }}>
              <Icon name="trash" size={15} />
              Delete account
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 720, padding: '28px 36px' }}>
          {/* Page header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, marginBottom: 6 }}>Profile</h1>
            <p style={{ color: HF.textMuted, fontSize: 14 }}>
              How you show up in the app. Visible to people you share boards with.
            </p>
          </div>

          {/* Photo card */}
          <SettingsCard title="Profile photo" subtitle="JPEG, PNG or GIF. 5 MB max.">
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Av initial="A" color="primary" size="lg" style={{ fontSize: 24, fontWeight: 700 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="default" icon="arrowU">Upload new</Button>
                <Button variant="ghost" style={{ color: HF.red }}>Remove</Button>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ borderLeft: `1px solid ${HF.divider}`, paddingLeft: 18 }}>
                <div style={{ fontSize: 12, color: HF.textMuted, marginBottom: 6 }}>Or pick a color</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['primary', 'blue', 'green', 'amber', 'purple', 'slate'].map((c, i) => (
                    <button key={c} style={{
                      width: 24, height: 24, borderRadius: 999,
                      background: HF[c],
                      border: i === 0 ? `2px solid ${HF.text}` : `1px solid ${HF.border}`,
                      boxShadow: i === 0 ? `0 0 0 2px ${HF.bg}` : 'none',
                      cursor: 'pointer',
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </SettingsCard>

          {/* Identity card */}
          <SettingsCard title="Identity">
            <FormRow label="Display name" help="This is shown on cards and comments.">
              <Input value="Ana Souza" />
            </FormRow>

            <FormRow label="Username" help="stak.app/u/ana" >
              <Input value="ana" icon="user" rightSlot={
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: HF.green, fontWeight: 500 }}>
                  <Icon name="check" size={11} stroke={2.5} /> available
                </span>
              } />
            </FormRow>

            <FormRow label="Email" help="Used to log in and recover your account.">
              <Input value="ana.souza@somewhere.com" icon="mail" rightSlot={
                <Tag color="green" style={{ height: 18, fontSize: 10, padding: '0 6px' }}>verified</Tag>
              }/>
            </FormRow>
          </SettingsCard>

          {/* Locale card */}
          <SettingsCard title="Locale & timezone">
            <div style={{ display: 'flex', gap: 12 }}>
              <FormRow label="Timezone" style={{ flex: 1 }}>
                <DropdownInput value="(GMT−3) São Paulo" />
              </FormRow>
              <FormRow label="Language" style={{ flex: 1 }}>
                <DropdownInput value="English" />
              </FormRow>
            </div>
            <FormRow label="Week starts on">
              <div style={{ display: 'inline-flex', background: HF.surfaceSubtle, padding: 3, borderRadius: 8, border: `1px solid ${HF.border}` }}>
                {['Sunday', 'Monday', 'Saturday'].map((d, i) => (
                  <button key={d} style={{
                    padding: '5px 14px', borderRadius: 5, fontSize: 13, fontWeight: 500,
                    background: i === 1 ? HF.surface : 'transparent',
                    color: i === 1 ? HF.text : HF.textMuted,
                    boxShadow: i === 1 ? HF.shadowSm : 'none',
                  }}>{d}</button>
                ))}
              </div>
            </FormRow>
          </SettingsCard>

          {/* Footer save bar */}
          <div style={{
            position: 'sticky', bottom: 0,
            background: HF.bg, borderTop: `1px solid ${HF.border}`,
            margin: '8px -36px 0',
            padding: '12px 36px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 13, color: HF.textMuted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: HF.amber }} />
              You have unsaved changes
            </span>
            <div style={{ flex: 1 }} />
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary" icon="check">Save changes</Button>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function SettingsCard({ title, subtitle, children }) {
  return (
    <div className="hf-card" style={{ padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 15, fontWeight: 600 }}>{title}</h4>
        {subtitle && <p style={{ fontSize: 13, color: HF.textMuted, marginTop: 4 }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

function FormRow({ label, help, children, style }) {
  return (
    <div style={style}>
      {label && <label className="hf-label">{label}</label>}
      {children}
      {help && <div className="hf-help">{help}</div>}
    </div>
  );
}

function DropdownInput({ value }) {
  return (
    <div style={{ position: 'relative' }}>
      <input className="hf-input" defaultValue={value} readOnly style={{ paddingRight: 36 }} />
      <Icon name="chevD" size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: HF.textMuted, pointerEvents: 'none' }} />
    </div>
  );
}

Object.assign(window, { HiSettings, SettingsCard, FormRow, DropdownInput });
