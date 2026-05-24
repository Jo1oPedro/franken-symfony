// Hi-fi Board screen — with sidebar of boards

// Sample data — realistic personal todo content
const BOARDS = [
  { id: 'personal', name: 'Personal',     emoji: '🌱', count: 14, active: true },
  { id: 'work',     name: 'Work · Q2',    emoji: '💼', count: 23 },
  { id: 'move',     name: 'House move',   emoji: '📦', count: 8 },
  { id: 'reading',  name: 'Reading list', emoji: '📚', count: 31 },
  { id: 'recipes',  name: 'Recipes',      emoji: '🍳', count: 12 },
];

const COLUMNS = [
  {
    id: 'inbox', title: 'Inbox', dot: 'slate', count: 4,
    cards: [
      { id: 1, title: 'Reply to landlord email about lease renewal', tags: [{color:'red', label:'urgent'}], due: 'Tomorrow' },
      { id: 2, title: 'Pick up dry cleaning before Friday', tags: [{color:'slate', label:'errand'}] },
      { id: 3, title: 'Research bike helmets — commuter style', tags: [{color:'blue', label:'shopping'}], comments: 0, attachments: 2 },
      { id: 4, title: 'Call mom about thanksgiving plans', tags: [{color:'purple', label:'family'}], checklist: { done: 0, total: 2 } },
    ],
  },
  {
    id: 'today', title: 'Today', dot: 'primary', count: 3,
    cards: [
      {
        id: 5, title: 'Finish wireframe deck for client review',
        tags: [{color:'red', label:'urgent'}, {color:'green', label:'work'}],
        due: 'Today, 5pm', priority: 'high',
        checklist: { done: 3, total: 5 }, comments: 2, attachments: 1,
        cover: HF.primarySoft, assigned: ['A'],
        focused: true,
      },
      { id: 6, title: 'Gym — leg day', tags: [{color:'amber', label:'health'}], due: '6:00 PM' },
      { id: 7, title: 'Groceries: rice, eggs, soap', tags: [{color:'green', label:'errand'}], checklist: { done: 0, total: 3 } },
    ],
  },
  {
    id: 'doing', title: 'In Progress', dot: 'blue', count: 2,
    cards: [
      { id: 8, title: 'Read "Deep Work" — chapter 3', tags: [{color:'blue', label:'reading'}], due: 'Sun', checklist: { done: 1, total: 1 } },
      {
        id: 9, title: 'Tax docs spreadsheet — 2025',
        tags: [{color:'red', label:'urgent'}, {color:'amber', label:'finance'}],
        due: 'Mon', checklist: { done: 2, total: 6 }, comments: 1,
      },
    ],
  },
  {
    id: 'done', title: 'Done', dot: 'green', count: 5,
    cards: [
      { id: 10, title: 'Book dentist appointment', tags: [{color:'amber', label:'health'}], done: true },
      { id: 11, title: 'Fix kitchen sink leak', tags: [{color:'slate', label:'home'}], done: true },
      { id: 12, title: 'Send invoice #042 to client', tags: [{color:'green', label:'work'}], done: true, attachments: 1 },
    ],
  },
];

function BoardCard({ c, dragging }) {
  return (
    <div style={{
      background: HF.surface,
      border: `1px solid ${c.focused ? HF.primary : HF.border}`,
      borderRadius: HF.r8,
      boxShadow: c.focused ? `0 0 0 3px ${HF.primaryRing}, ${HF.shadowSm}` : HF.shadowSm,
      cursor: 'grab', position: 'relative',
      transition: 'all .15s ease',
      opacity: c.done ? 0.7 : 1,
    }}>
      {c.cover && <div style={{ height: 6, background: c.cover, borderRadius: '8px 8px 0 0' }} />}
      <div style={{ padding: '10px 12px' }}>
        {c.tags && c.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
            {c.tags.map((t, i) => <Tag key={i} color={t.color}>{t.label}</Tag>)}
          </div>
        )}
        <div style={{
          fontSize: 13, lineHeight: 1.35, color: HF.text,
          textDecoration: c.done ? 'line-through' : 'none',
          fontWeight: 500,
        }}>
          {c.title}
        </div>
        {(c.due || c.checklist || c.comments || c.attachments || c.assigned) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 11, color: HF.textMuted }}>
            {c.due && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                color: c.due === 'Tomorrow' || c.due.includes('Today') ? HF.red : HF.textMuted,
                fontWeight: c.due === 'Tomorrow' || c.due.includes('Today') ? 500 : 400,
              }}>
                <Icon name="cal" size={11} />
                {c.due}
              </span>
            )}
            {c.checklist && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Icon name="check" size={11} />
                {c.checklist.done}/{c.checklist.total}
              </span>
            )}
            {c.comments > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Icon name="send" size={11} />{c.comments}
              </span>
            )}
            {c.attachments > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Icon name="paperclip" size={11} />{c.attachments}
              </span>
            )}
            <span style={{ marginLeft: 'auto', display: 'inline-flex' }}>
              {c.assigned && c.assigned.map((a, i) => (
                <Av key={i} initial={a} size="sm" color="primary" style={{ width: 18, height: 18, fontSize: 9 }} />
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function BoardColumn({ col }) {
  return (
    <div style={{
      flex: '0 0 268px',
      background: HF.surfaceSubtle,
      border: `1px solid ${HF.border}`,
      borderRadius: HF.r10,
      display: 'flex', flexDirection: 'column',
      maxHeight: '100%',
    }}>
      {/* Column header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 12px 8px' }}>
        <span style={{ width: 8, height: 8, borderRadius: 50, background: HF[col.dot] || col.dot, marginRight: 8 }} />
        <span style={{ fontWeight: 600, fontSize: 13 }}>{col.title}</span>
        <span style={{ marginLeft: 6, fontSize: 12, color: HF.textFaint, background: HF.surface, padding: '0 6px', borderRadius: 999, height: 18, display: 'inline-flex', alignItems: 'center' }}>
          {col.count}
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
          <button className="hf-iconbtn" style={{ width: 24, height: 24 }}><Icon name="plus" size={14} /></button>
          <button className="hf-iconbtn" style={{ width: 24, height: 24 }}><Icon name="dots" size={14} /></button>
        </span>
      </div>
      {/* Cards */}
      <div style={{ padding: '4px 8px 8px', display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto' }} className="hf-scroll-hidden">
        {col.cards.map(c => <BoardCard key={c.id} c={c} />)}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 8px', borderRadius: 6,
          color: HF.textMuted, fontSize: 13,
          background: 'transparent', textAlign: 'left',
        }}>
          <Icon name="plus" size={14} />
          Add a card
        </button>
      </div>
    </div>
  );
}

function HiBoard({ blurred = false, showCardSelect = true }) {
  return (
    <Browser tabTitle="b/personal">
      {/* SIDEBAR */}
      <div style={{
        flex: '0 0 220px',
        background: HF.bg,
        borderRight: `1px solid ${HF.border}`,
        display: 'flex', flexDirection: 'column',
        padding: '14px 10px',
      }}>
        {/* Workspace switcher */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 8px', borderRadius: 8,
          background: HF.surface, border: `1px solid ${HF.border}`, marginBottom: 14,
          textAlign: 'left', width: '100%',
        }}>
          <Av initial="A" size="sm" color="primary" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.1 }}>Ana's workspace</div>
            <div style={{ fontSize: 11, color: HF.textMuted, lineHeight: 1.1 }}>Free plan</div>
          </div>
          <Icon name="chevD" size={14} color={HF.textMuted} />
        </button>

        {/* Top actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 14 }}>
          {[
            { icon: 'search', label: 'Search', kbd: '⌘K' },
            { icon: 'inbox', label: 'Inbox', badge: 3 },
            { icon: 'cal', label: 'Today', badge: 6 },
            { icon: 'bell', label: 'Notifications' },
          ].map(it => (
            <button key={it.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '6px 8px', borderRadius: 6,
              fontSize: 13, color: HF.text, width: '100%', textAlign: 'left',
            }}>
              <Icon name={it.icon} size={15} color={HF.textMuted} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.kbd && <span className="hf-kbd">{it.kbd}</span>}
              {it.badge && <span style={{ background: HF.primary, color: '#fff', fontSize: 10, padding: '0 6px', borderRadius: 999, fontWeight: 600 }}>{it.badge}</span>}
            </button>
          ))}
        </div>

        {/* Boards list */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 8px', marginBottom: 4,
          fontSize: 11, fontWeight: 600, color: HF.textFaint, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <span>Boards</span>
          <button className="hf-iconbtn" style={{ width: 20, height: 20 }}><Icon name="plus" size={12} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflowY: 'auto' }} className="hf-scroll-hidden">
          {BOARDS.map(b => (
            <button key={b.id} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px', borderRadius: 6,
              background: b.active ? HF.surfaceHover : 'transparent',
              fontSize: 13, color: HF.text, fontWeight: b.active ? 600 : 400,
              width: '100%', textAlign: 'left',
            }}>
              <span style={{ fontSize: 14 }}>{b.emoji}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</span>
              <span style={{ fontSize: 11, color: HF.textFaint }}>{b.count}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid ${HF.divider}`, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            { icon: 'cog', label: 'Settings' },
            { icon: 'smile', label: 'Help & feedback' },
          ].map(it => (
            <button key={it.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '6px 8px', borderRadius: 6,
              fontSize: 13, color: HF.textMuted, textAlign: 'left',
            }}>
              <Icon name={it.icon} size={15} />
              {it.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', filter: blurred ? 'blur(0.5px)' : undefined }}>
        {blurred && <div style={{ position:'absolute', inset:0, background: 'rgba(250,250,247,0.55)', zIndex: 5, pointerEvents: 'none' }} />}

        {/* Board header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 24px 12px',
          borderBottom: `1px solid ${HF.border}`,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: 20 }}>Personal</h2>
              <button className="hf-iconbtn" style={{ width: 26, height: 26, color: HF.amber }}>
                <Icon name="star" size={14} color={HF.amber} stroke={2} />
              </button>
              <span style={{ fontSize: 12, color: HF.textMuted }}>· 14 cards · updated 2m ago</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ position: 'relative' }}>
              <Icon name="search" size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: HF.textMuted }} />
              <input
                className="hf-input"
                placeholder="Search cards"
                style={{ height: 32, fontSize: 13, paddingLeft: 30, width: 200 }}
              />
            </div>
            <Button variant="default" size="sm" icon="filter">Filter</Button>
            <div style={{ width: 1, height: 20, background: HF.divider, margin: '0 2px' }} />
            <Button variant="primary" size="sm" icon="plus">New card</Button>
          </div>
        </div>

        {/* Filter chips row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderBottom: `1px solid ${HF.border}` }}>
          <span style={{ fontSize: 12, color: HF.textFaint, marginRight: 2 }}>Quick filters:</span>
          {[
            { label: 'All',      active: true },
            { label: 'This week' },
            { label: 'Overdue', badge: 2, color: 'red' },
            { label: 'Urgent', color: 'red' },
            { label: 'Work',    color: 'green' },
          ].map(c => (
            <button key={c.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              height: 24, padding: '0 10px', borderRadius: 999,
              fontSize: 12, fontWeight: 500,
              background: c.active ? HF.text : HF.surface,
              color: c.active ? '#fff' : HF.text,
              border: c.active ? '1px solid ' + HF.text : `1px solid ${HF.border}`,
            }}>
              {c.color && !c.active && <span style={{ width: 6, height: 6, borderRadius: 50, background: HF[c.color] }} />}
              {c.label}
              {c.badge && <span style={{ background: c.active ? 'rgba(255,255,255,0.2)' : HF.redSoft, color: c.active ? '#fff' : HF.red, fontSize: 10, padding: '0 5px', borderRadius: 999, fontWeight: 600 }}>{c.badge}</span>}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: HF.textMuted }}>
            Sort: <span style={{ color: HF.text, fontWeight: 500 }}>Manual</span>
            <Icon name="chevD" size={12} />
          </span>
          <div style={{ display: 'flex', marginLeft: 8 }}>
            {['A','M','R'].map((i, idx) => (
              <Av key={i} initial={i} size="sm" color="primary" style={{ marginLeft: idx ? -6 : 0, border: `2px solid ${HF.bg}` }} />
            ))}
            <button style={{ marginLeft: -6, width: 24, height: 24, borderRadius: 999, background: HF.surface, border: `1px dashed ${HF.borderStrong}`, color: HF.textMuted, fontSize: 12 }}>+</button>
          </div>
        </div>

        {/* Columns */}
        <div style={{
          flex: 1, display: 'flex', gap: 12, padding: '14px 24px',
          overflowX: 'auto', overflowY: 'hidden', alignItems: 'stretch',
        }} className="hf-scroll-hidden">
          {COLUMNS.map(c => <BoardColumn key={c.id} col={c} />)}
          <button style={{
            flex: '0 0 268px',
            background: 'transparent', border: `1px dashed ${HF.borderStrong}`, borderRadius: HF.r10,
            color: HF.textMuted, fontSize: 13, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            minHeight: 80, alignSelf: 'flex-start',
          }}>
            <Icon name="plus" size={14} />
            Add column
          </button>
        </div>
      </div>
    </Browser>
  );
}

Object.assign(window, { HiBoard, BoardCard, BoardColumn, BOARDS, COLUMNS });
