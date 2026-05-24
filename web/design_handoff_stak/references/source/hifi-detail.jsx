// Hi-fi Card Detail (modal over board) + Empty State + Settings

function HiCardDetail() {
  return (
    <div style={{ width:'100%', height:'100%', position: 'relative' }}>
      {/* Board behind */}
      <HiBoard blurred />

      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(20,16,12,0.32)',
        backdropFilter: 'blur(2px)',
        zIndex: 10,
      }} />

      {/* Modal */}
      <div style={{
        position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)',
        width: 760, maxHeight: 'calc(100% - 64px)',
        background: HF.surface,
        borderRadius: HF.r16,
        boxShadow: HF.shadowLg,
        border: `1px solid ${HF.border}`,
        zIndex: 20,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: HF.fontSans,
      }}>
        {/* Cover strip */}
        <div style={{ height: 8, background: HF.primary }} />

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '18px 24px 14px',
          borderBottom: `1px solid ${HF.divider}`,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: HF.textMuted, marginBottom: 6 }}>
              <span>Personal</span>
              <Icon name="chevR" size={11} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: HF.primary }} />
                Today
              </span>
            </div>
            <h2 style={{ fontSize: 22, lineHeight: 1.2 }}>Finish wireframe deck for client review</h2>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <IconButton icon="star" title="Watch" />
            <IconButton icon="dotsV" title="More" />
            <IconButton icon="x" title="Close" />
          </div>
        </div>

        <div style={{ display: 'flex', overflow: 'hidden', flex: 1 }}>
          {/* Main column */}
          <div style={{ flex: 1, padding: '18px 24px', overflowY: 'auto' }} className="hf-scroll-hidden">
            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              <Tag color="red">urgent</Tag>
              <Tag color="green">work</Tag>
              <Tag color="amber">this week</Tag>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                height: 22, padding: '0 8px', borderRadius: 6,
                background: 'transparent', border: `1px dashed ${HF.borderStrong}`,
                fontSize: 12, color: HF.textMuted,
              }}>
                <Icon name="plus" size={11} /> Tag
              </button>
            </div>

            {/* Description */}
            <Section icon="edit" title="Description">
              <div style={{
                background: HF.surfaceSubtle, border: `1px solid ${HF.border}`,
                borderRadius: 8, padding: '10px 12px', fontSize: 13, color: HF.text, lineHeight: 1.55,
              }}>
                Six screens × 3–4 variations each. Include both mobile and desktop frames.
                Low-fi sketchy vibe for round one, hi-fi mockups for the directions Ana selects.
                Deliver as a single design canvas. <span style={{ color: HF.primary, textDecoration: 'underline' }}>Brief doc ↗</span>
              </div>
            </Section>

            {/* Checklist */}
            <Section icon="check" title="Checklist" right={<span style={{ fontSize: 12, color: HF.textMuted }}>3 of 5</span>}>
              <div style={{ height: 6, background: HF.surfaceSubtle, borderRadius: 3, marginBottom: 10, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '60%', background: HF.primary }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['Auth screens (register + login)', true],
                  ['Empty state / onboarding', true],
                  ['Board with sidebar', true],
                  ['Card detail modal', false],
                  ['Account / settings', false],
                ].map(([t, d]) => (
                  <div key={t} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 8px', borderRadius: 6,
                    background: 'transparent',
                  }}>
                    <Check checked={d} />
                    <span style={{
                      flex: 1, fontSize: 13,
                      color: d ? HF.textFaint : HF.text,
                      textDecoration: d ? 'line-through' : 'none',
                    }}>{t}</span>
                    <span style={{ fontSize: 11, color: HF.textFaint }}>{d ? '✓' : ''}</span>
                  </div>
                ))}
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 8px', color: HF.textMuted, fontSize: 13, textAlign: 'left',
                }}>
                  <Icon name="plus" size={13} />
                  Add an item
                </button>
              </div>
            </Section>

            {/* Activity / Comments */}
            <Section icon="send" title="Activity">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Existing comment */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <Av initial="M" color="purple" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>Marco</span>
                      <span style={{ fontSize: 12, color: HF.textFaint }}>commented · yesterday</span>
                    </div>
                    <div style={{
                      background: HF.surfaceSubtle, border: `1px solid ${HF.border}`,
                      borderRadius: 8, padding: '8px 12px', fontSize: 13, lineHeight: 1.5,
                    }}>
                      Looking good! Can we add a settings screen too? I want to see how the profile photo upload feels.
                    </div>
                  </div>
                </div>
                {/* System activity */}
                <div style={{ display: 'flex', gap: 10, fontSize: 12, color: HF.textMuted, alignItems: 'center' }}>
                  <Av initial="A" size="sm" color="primary" />
                  <span><b style={{ color: HF.text, fontWeight: 600 }}>Ana</b> moved this from <b style={{ color: HF.text, fontWeight: 500 }}>Inbox</b> → <b style={{ color: HF.text, fontWeight: 500 }}>Today</b></span>
                  <span style={{ marginLeft: 'auto' }}>2h ago</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 12, color: HF.textMuted, alignItems: 'center' }}>
                  <Av initial="A" size="sm" color="primary" />
                  <span><b style={{ color: HF.text, fontWeight: 600 }}>Ana</b> added the <Tag color="red" style={{ height: 18, fontSize: 10, padding: '0 6px', display: 'inline-flex' }}>urgent</Tag> tag</span>
                  <span style={{ marginLeft: 'auto' }}>2h ago</span>
                </div>
              </div>
            </Section>

            {/* Comment box */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <Av initial="A" color="primary" />
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  className="hf-textarea"
                  placeholder="Write a comment… use @ to mention"
                  style={{ minHeight: 70, paddingBottom: 36 }}
                />
                <div style={{
                  position: 'absolute', bottom: 8, left: 8, right: 8,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <IconButton icon="paperclip" />
                  <IconButton icon="smile" />
                  <div style={{ flex: 1 }} />
                  <Button variant="primary" size="sm" iconRight="send">Comment</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{
            flex: '0 0 220px',
            borderLeft: `1px solid ${HF.divider}`,
            padding: '18px 16px',
            display: 'flex', flexDirection: 'column', gap: 14,
            background: HF.bg,
          }}>
            <SideField label="Status">
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 999,
                background: HF.primarySoft, color: HF.primary,
                fontSize: 12, fontWeight: 600,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: HF.primary }} />
                In progress
                <Icon name="chevD" size={11} />
              </button>
            </SideField>

            <SideField label="Due date" icon="cal">
              <span style={{ fontSize: 13, color: HF.red, fontWeight: 500 }}>Today, 5:00 PM</span>
              <div style={{ fontSize: 11, color: HF.textFaint, marginTop: 2 }}>in 4 hours</div>
            </SideField>

            <SideField label="Priority" icon="flag">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 13, fontWeight: 500,
              }}>
                <Icon name="flag" size={13} color={HF.red} />
                High
              </span>
            </SideField>

            <SideField label="Assignee" icon="user">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Av initial="A" size="sm" color="primary" />
                <span style={{ fontSize: 13, fontWeight: 500 }}>Ana</span>
              </span>
            </SideField>

            <SideField label="Attachments" icon="paperclip">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                <a style={{ fontSize: 12, color: HF.text, textDecoration: 'underline', textDecorationColor: HF.borderStrong }}>brief-v2.pdf</a>
                <span style={{ fontSize: 11, color: HF.textFaint }}>1 file · 240 KB</span>
              </div>
            </SideField>

            <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${HF.divider}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Button variant="default" size="sm" icon="check" full>Mark complete</Button>
              <Button variant="ghost" size="sm" icon="trash" full style={{ color: HF.red, justifyContent: 'flex-start' }}>Delete card</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, right, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {icon && <Icon name={icon} size={14} color={HF.textMuted} />}
        <span style={{ fontWeight: 600, fontSize: 13 }}>{title}</span>
        <div style={{ flex: 1 }} />
        {right}
      </div>
      {children}
    </div>
  );
}

function SideField({ label, icon, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: HF.textFaint, fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

// EMPTY STATE — onboarding checklist + live preview
function HiEmpty() {
  const steps = [
    { done: true,  t: 'Create your account',           sub: 'Welcome, Ana!' },
    { done: true,  t: 'Name your first board',         sub: '"Personal"' },
    { done: false, t: 'Add three columns',             sub: 'Try: Todo, Doing, Done', current: true },
    { done: false, t: 'Drop in your first card' },
    { done: false, t: 'Drag a card across columns' },
  ];

  return (
    <Browser tabTitle="welcome">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left — onboarding panel */}
        <div style={{
          flex: '0 0 44%',
          padding: '40px 44px',
          background: HF.surfaceSubtle,
          borderRight: `1px solid ${HF.border}`,
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(70% 50% at 100% 0%, ${HF.primarySoft}, transparent 60%)`,
          }} />

          <div style={{ position: 'relative' }}>
            <Logo size={20} />

            <div style={{ marginTop: 36, marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: HF.primary, fontWeight: 600, marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Getting started · 2 of 5
              </div>
              <h1 style={{ fontSize: 30, lineHeight: 1.1, marginBottom: 8 }}>
                Let's get you set up.
              </h1>
              <p style={{ color: HF.textMuted, fontSize: 15, maxWidth: 320 }}>
                A board, a few columns, a card. You'll be moving things across in under a minute.
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
              {steps.map((s, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: s.done ? HF.primary : (s.current ? HF.primarySoft : HF.surface),
                  border: !s.done && !s.current ? `1px solid ${HF.border}` : 'none',
                }} />
              ))}
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {steps.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '10px 12px', borderRadius: 8,
                  background: s.current ? HF.surface : 'transparent',
                  border: s.current ? `1px solid ${HF.primary}` : `1px solid transparent`,
                  boxShadow: s.current ? `0 0 0 3px ${HF.primaryRing}` : 'none',
                }}>
                  <span style={{
                    flex: '0 0 22px',
                    width: 22, height: 22, borderRadius: 999,
                    background: s.done ? HF.primary : (s.current ? HF.surface : HF.surface),
                    border: s.done ? 'none' : `1.5px solid ${s.current ? HF.primary : HF.borderStrong}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: s.current ? HF.primary : HF.textFaint, fontSize: 12, fontWeight: 600,
                  }}>
                    {s.done ? <Icon name="check" size={12} color="#fff" stroke={2.5} /> : (i + 1)}
                  </span>
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{
                      fontSize: 14, fontWeight: s.current ? 600 : 500,
                      color: s.done ? HF.textMuted : HF.text,
                      textDecoration: s.done ? 'line-through' : 'none',
                    }}>{s.t}</div>
                    {s.sub && (
                      <div style={{ fontSize: 12, color: s.current ? HF.primary : HF.textFaint, marginTop: 2 }}>
                        {s.sub}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <Button variant="primary" iconRight="arrowR">Continue</Button>
              <Button variant="ghost">Skip tour</Button>
            </div>
          </div>
        </div>

        {/* Right — live preview */}
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <div>
              <div style={{ fontSize: 11, color: HF.textFaint, fontWeight: 600, marginBottom: 2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Live preview</div>
              <div style={{ fontSize: 14, color: HF.textMuted }}>Your board so far →</div>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 10px', borderRadius: 999,
              background: HF.greenSoft, color: HF.green, fontSize: 12, fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: HF.green }} />
              auto-saved
            </span>
          </div>

          <div style={{
            flex: 1,
            background: HF.surface,
            border: `1px solid ${HF.border}`,
            borderRadius: 12,
            padding: 16,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>🌱</span>
              <h3 style={{ fontSize: 17 }}>Personal</h3>
            </div>

            <div style={{ display: 'flex', gap: 10, flex: 1 }}>
              {['Todo', 'Doing', 'Done'].map((title, i) => (
                <div key={title} style={{
                  flex: 1,
                  background: HF.surfaceSubtle,
                  border: `1px solid ${i === 2 ? HF.primary : HF.border}`,
                  boxShadow: i === 2 ? `0 0 0 3px ${HF.primaryRing}` : 'none',
                  borderRadius: 8, padding: 10,
                  display: 'flex', flexDirection: 'column', gap: 6,
                  position: 'relative',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 50, background: ['#9a968e', HF.blue, HF.green][i] }} />
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{title}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: HF.textFaint }}>0</span>
                  </div>
                  <div style={{
                    flex: 1, border: `1.5px dashed ${HF.borderStrong}`, borderRadius: 6,
                    minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: HF.textFaint, padding: 8, textAlign: 'center',
                  }}>
                    Drop a card here
                  </div>
                  {i === 2 && (
                    <div style={{
                      position: 'absolute', top: -10, right: -10,
                      background: HF.primary, color: '#fff',
                      borderRadius: 999, padding: '3px 9px',
                      fontSize: 11, fontWeight: 600,
                      boxShadow: HF.shadowMd,
                    }}>
                      ← new!
                    </div>
                  )}
                </div>
              ))}
              <button style={{
                flex: '0 0 90px',
                background: 'transparent', border: `1px dashed ${HF.borderStrong}`, borderRadius: 8,
                color: HF.textMuted, fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              }}>
                <Icon name="plus" size={13} /> column
              </button>
            </div>

            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: HF.textMuted }}>
              <Icon name="smile" size={13} color={HF.primary} />
              Tip: drag cards between columns, or use <span className="hf-kbd">⌘</span> + <span className="hf-kbd">↑</span><span className="hf-kbd">↓</span> to reorder.
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

Object.assign(window, { HiCardDetail, HiEmpty, Section, SideField });
