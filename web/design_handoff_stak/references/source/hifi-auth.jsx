// Hi-fi Register + Login — split-screen design
// Brand: "stak" — a generic kanban-stack metaphor

function HiRegister() {
  return (
    <Browser tabTitle="signup">
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* LEFT — marketing panel */}
        <div style={{
          flex: '0 0 44%',
          background: HF.surfaceSubtle,
          borderRight: `1px solid ${HF.border}`,
          padding: '36px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Soft brand backdrop */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(60% 50% at 80% 10%, ${HF.primarySoft}, transparent 70%)`
          }} />

          <div style={{ position: 'relative' }}>
            <Logo size={20} />
          </div>

          <div style={{ position: 'relative' }}>
            <h1 style={{ fontSize: 36, lineHeight: 1.05, marginBottom: 14 }}>
              Get things <span style={{ color: HF.primary }}>done.</span><br/>
              One card at a time.
            </h1>
            <p style={{ color: HF.textMuted, fontSize: 15, maxWidth: 360 }}>
              Stak is a calm, fast kanban for the things you keep meaning to do.
              Drag a card. Check it off. Move on with your day.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
              {[
                'Unlimited boards & cards',
                'Drag-and-drop, keyboard-first',
                'Free forever for personal use',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 50, background: HF.primary, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="check" size={11} stroke={2.5} color="#fff" />
                  </span>
                  <span style={{ fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini board preview */}
          <div style={{ position: 'relative', marginTop: 24 }}>
            <div style={{
              background: HF.surface, border: `1px solid ${HF.border}`, borderRadius: 12,
              padding: 12, boxShadow: HF.shadowMd, display: 'flex', gap: 8,
              transform: 'rotate(-1deg)',
            }}>
              {[
                { title: 'Today', cards: ['Finish wireframes', 'Gym — leg day', 'Groceries'], dot: HF.primary },
                { title: 'Doing',  cards: ['Read ch. 3', 'Tax docs'], dot: HF.blue },
                { title: 'Done',   cards: ['Book dentist', 'Send invoice'], dot: HF.green },
              ].map(col => (
                <div key={col.title} style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 50, background: col.dot }} />
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{col.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {col.cards.map(c => (
                      <div key={c} style={{
                        background: HF.surfaceSubtle, border: `1px solid ${HF.border}`,
                        borderRadius: 6, padding: '5px 7px', fontSize: 11,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{c}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <div style={{ textAlign: 'right', fontSize: 13, color: HF.textMuted, marginBottom: 32 }}>
              Already have an account? <a style={{ color: HF.primary, fontWeight: 500 }}>Log in</a>
            </div>

            <h2 style={{ fontSize: 26, marginBottom: 6 }}>Create your account</h2>
            <p className="hf-muted" style={{ fontSize: 14, marginBottom: 24 }}>Takes about 20 seconds.</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              <Button variant="default" full icon="google">Google</Button>
              <Button variant="default" full icon="apple">Apple</Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div className="hf-divider" style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: HF.textFaint }}>or with email</span>
              <div className="hf-divider" style={{ flex: 1 }} />
            </div>

            <Input label="Name" placeholder="Ana Souza" icon="user" style={{ marginBottom: 14 }} />
            <Input label="Email" placeholder="you@somewhere.com" icon="mail" type="email" style={{ marginBottom: 14 }} />
            <Input
              label="Password"
              placeholder="At least 8 characters"
              icon="lock"
              type="password"
              help="Use 8+ characters with a mix of letters and numbers."
              style={{ marginBottom: 18 }}
            />

            <Check checked label={<span style={{ fontSize: 12, color: HF.textMuted }}>I agree to the <a style={{ color: HF.text, textDecoration: 'underline' }}>Terms</a> and <a style={{ color: HF.text, textDecoration: 'underline' }}>Privacy Policy</a>.</span>} style={{ marginBottom: 22 }} />

            <Button variant="primary" full size="lg" iconRight="arrowR">Create account</Button>

            <p style={{ fontSize: 11, color: HF.textFaint, marginTop: 18, textAlign: 'center' }}>
              We'll never share your email.
            </p>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function HiLogin() {
  return (
    <Browser tabTitle="login">
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* LEFT — testimonial / quote panel */}
        <div style={{
          flex: '0 0 44%',
          background: HF.surfaceSubtle,
          borderRight: `1px solid ${HF.border}`,
          padding: '36px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(50% 40% at 20% 90%, ${HF.primarySoft}, transparent 70%)`
          }} />
          <div style={{ position: 'relative' }}>
            <Logo size={20} />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 56, lineHeight: 1, color: HF.primary, fontFamily: 'Georgia, serif', marginBottom: -8 }}>"</div>
            <p style={{ fontSize: 22, lineHeight: 1.3, fontWeight: 500, letterSpacing: '-0.015em' }}>
              The only todo app I haven't quit after a week. It feels light, but I actually finish things.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
              <Av initial="MS" size="md" color="primary" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Maria S.</div>
                <div style={{ color: HF.textMuted, fontSize: 12 }}>Designer · Lisbon</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: HF.textMuted }}>
            <span>Trusted by 12,000+ people</span>
            <div style={{ display: 'flex', marginLeft: 4 }}>
              {[1,2,3,4].map(i => (
                <Av key={i} initial={String.fromCharCode(64+i*3)} size="sm" color="primary" style={{ marginLeft: -6, border: `2px solid ${HF.surfaceSubtle}` }} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <div style={{ textAlign: 'right', fontSize: 13, color: HF.textMuted, marginBottom: 32 }}>
              New here? <a style={{ color: HF.primary, fontWeight: 500 }}>Create account</a>
            </div>

            <h2 style={{ fontSize: 26, marginBottom: 6 }}>Welcome back</h2>
            <p className="hf-muted" style={{ fontSize: 14, marginBottom: 24 }}>Log in to pick up where you left off.</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              <Button variant="default" full icon="google">Google</Button>
              <Button variant="default" full icon="apple">Apple</Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div className="hf-divider" style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: HF.textFaint }}>or with email</span>
              <div className="hf-divider" style={{ flex: 1 }} />
            </div>

            <Input label="Email" placeholder="you@somewhere.com" icon="mail" type="email" style={{ marginBottom: 14 }} />
            <Input
              label={
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span>Password</span>
                  <a style={{ color: HF.primary, fontWeight: 500, fontSize: 12 }}>Forgot?</a>
                </span>
              }
              placeholder="••••••••"
              icon="lock"
              type="password"
              style={{ marginBottom: 18 }}
            />

            <Check checked label="Remember me for 30 days" style={{ marginBottom: 22, fontSize: 13 }} />

            <Button variant="primary" full size="lg" iconRight="arrowR">Log in</Button>

            <p style={{ fontSize: 12, color: HF.textFaint, marginTop: 18, textAlign: 'center' }}>
              Protected by industry-standard encryption.
            </p>
          </div>
        </div>
      </div>
    </Browser>
  );
}

// Fix label-as-node by overriding hf-label rendering inline (the Input "label" expects a string normally)
// Patch: Re-render the label container if a node is passed
const __origInput = Input;
window.Input = function Input(props) {
  if (React.isValidElement(props.label) || (typeof props.label === 'object' && props.label !== null)) {
    const { label, ...rest } = props;
    return (
      <div style={rest.style}>
        <div className="hf-label" style={{ display:'flex', justifyContent:'space-between' }}>{label}</div>
        {__origInput({ ...rest, label: undefined, style: undefined })}
      </div>
    );
  }
  return __origInput(props);
};

Object.assign(window, { HiRegister, HiLogin });
