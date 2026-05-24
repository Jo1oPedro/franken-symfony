# Handoff: Stak — Aplicativo de Tarefas (Kanban)

Pacote de design para implementação em código. **Cole esta pasta inteira no Claude Code** e peça para ele implementar as telas. O README é auto-suficiente; o desenvolvedor que não esteve nesta conversa consegue construir o app só com ele.

---

## 1. Sobre os arquivos deste bundle

Os arquivos HTML em `references/` são **referências de design criadas em HTML/React** — protótipos mostrando look-and-feel e comportamento pretendido, **não código de produção para copiar diretamente**.

A tarefa é **recriar essas telas no ambiente do projeto-alvo** (Next.js + Tailwind, Vite + React, Vue, SwiftUI, etc.) usando os padrões e bibliotecas já estabelecidas no codebase. Se ainda não existe um codebase, escolha o framework mais apropriado (sugestão: **Next.js 14 + Tailwind CSS + shadcn/ui** — combina bem com este sistema visual).

**Fidelidade: HIGH-FIDELITY** — cores, tipografia, espaçamento, sombras e estados são finais. Implemente pixel-perfect.

---

## 2. Visão geral do produto

**Stak** é um app de tarefas kanban para uso pessoal. Cinco telas principais:

| Tela | Rota sugerida | Função |
|---|---|---|
| Cadastro | `/signup` | Criar conta (split-screen com painel de marketing) |
| Login | `/login` | Entrar (split-screen com depoimento) |
| Empty state / Onboarding | `/welcome` | Checklist de primeiros passos com preview ao vivo |
| Board | `/b/[boardId]` | Tela principal: sidebar de workspace + colunas com cards |
| Card detail | `/b/[boardId]/c/[cardId]` | Modal sobre o board com descrição, checklist, comentários |
| Settings | `/settings/profile` | Perfil + identidade + locale (com aba sidebar) |

---

## 3. Design Tokens

> Cole o conteúdo de `design-tokens.css` no seu `globals.css`, ou converta para `tailwind.config.ts` usando as mesmas variáveis. Os tokens também estão em `design-tokens.json` para uso programático.

### 3.1 Cores

#### Surfaces (fundos)
```
--bg              #fafaf7   /* fundo principal (off-white quente) */
--surface         #ffffff   /* cards, inputs, modais */
--surface-subtle  #f5f3ee   /* fundo de painéis secundários, colunas */
--surface-hover   #f0eee9   /* hover de items de menu */
--border          #e8e4dc   /* borda padrão 1px */
--border-strong   #d4cfc4   /* borda em hover / placeholders dashed */
--divider         #eeeae2   /* separadores horizontais */
```

#### Texto
```
--text            #1a1816   /* texto principal */
--text-muted      #6b6862   /* labels, metadata */
--text-faint      #9a968e   /* placeholder, captions */
--text-inverse    #fafaf7   /* texto sobre fundos escuros */
```

#### Brand / Primary
```
--primary         #c8633f   /* coral quente, único accent da marca */
--primary-hover   #b15633
--primary-soft    #fbece4   /* fundo de tags/badges primários */
--primary-ring    rgba(200,99,63,0.20)   /* focus ring */
```

#### Semantic / Tag palette
Cada cor tem variante sólida (texto/ícone/dot) e -soft (fundo de tag/badge).
```
--red     #d05646    --red-soft     #fae6e1   /* urgent, overdue, danger */
--amber   #c98a2a    --amber-soft   #fbf0d8   /* warning, due-soon, health */
--green   #5a8a3a    --green-soft   #e6f0d8   /* success, work, errand */
--blue    #3a6a9a    --blue-soft    #dde8f3   /* info, reading */
--purple  #7a5a9a    --purple-soft  #ebe3f3   /* family, personal */
--slate   #6b6862    --slate-soft   #ececea   /* neutral / home / etiqueta padrão */
```

### 3.2 Tipografia

**Famílias:**
- Sans: `"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`
- Mono: `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace`

Carregar via Google Fonts:
```html
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" />
```

**Escala (size / weight / line-height / letter-spacing):**
| Token | Px | Weight | LH | LS | Uso |
|---|---|---|---|---|---|
| `text-xs` | 11 | 500 | 1.45 | 0 | uppercase labels, kbd |
| `text-sm` | 12 | 400-600 | 1.45 | -0.005em | metadata, captions |
| `text-base` | 13 | 400-500 | 1.45 | -0.005em | corpo de card, comentários |
| `text-md` | 14 | 400-600 | 1.45 | -0.005em | corpo padrão, botões |
| `text-lg` | 15 | 500 | 1.4 | -0.01em | botões `lg`, texto destacado |
| `text-xl` | 17 | 600 | 1.2 | -0.02em | títulos de card no detalhe (h3) |
| `text-2xl` | 20 | 600 | 1.2 | -0.02em | títulos de board (h2) |
| `text-3xl` | 22 | 600 | 1.2 | -0.02em | título de modal de card |
| `text-4xl` | 26 | 600 | 1.15 | -0.02em | título de página settings (h1) |
| `text-5xl` | 32 | 600 | 1.15 | -0.02em | hero auth panels |
| `text-6xl` | 36 | 600 | 1.05 | -0.02em | hero copy ("Get things done.") |

`-webkit-font-smoothing: antialiased` no body.

### 3.3 Espaçamento

Sistema **4px base**. Use múltiplos de 4: `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 56`.

Padding interno padrão de seções: **18–24px**. Gap padrão entre elementos relacionados: **8–12px**.

### 3.4 Border radius

```
--r-4    4px    /* checkboxes, swatches */
--r-6    6px    /* tags, chips, botões pequenos */
--r-8    8px    /* botões padrão, inputs, cards de coluna */
--r-10   10px   /* sidebars, colunas */
--r-12   12px   /* cards de settings, modais menores */
--r-16   16px   /* modal de card detail */
--r-full 9999px /* avatares, pills, dots */
```

### 3.5 Shadows

```
--shadow-sm    0 1px 2px rgba(20,16,12,0.04), 0 0 0 1px rgba(20,16,12,0.04)
--shadow-md    0 4px 12px rgba(20,16,12,0.06), 0 1px 3px rgba(20,16,12,0.04)
--shadow-lg    0 24px 60px rgba(20,16,12,0.18), 0 8px 24px rgba(20,16,12,0.10)
--shadow-card  0 1px 0 rgba(20,16,12,0.04), 0 1px 2px rgba(20,16,12,0.06)
```

- `card` em cards de board e settings
- `sm` em buttons primary
- `md` em popovers, dropdowns abertos
- `lg` em modais (card detail)

### 3.6 Logo

Quatro quadrantes 9×9 num grid 22×22 (svg viewBox 24×24, 2px gap):
- Top-left: filled coral (`--primary`)
- Top-right: outline 2px (`--text`)
- Bottom-left: outline 2px (`--text`)
- Bottom-right: filled (`--text`)

Wordmark "**stak**" ao lado: weight 600, letter-spacing -0.02em, mesmo tamanho do mark.

---

## 4. Componentes

### 4.1 Button

Três variantes × três tamanhos. Estados: hover, focus (ring 3px `--primary-ring`), active, disabled (opacity 0.5).

| Variante | Background | Border | Color | Shadow |
|---|---|---|---|---|
| `primary` | `--primary` | none | `#fff` | `0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(200,99,63,0.30)` |
| `default` | `--surface` | `1px --border` | `--text` | none |
| `ghost` | transparent | none | `--text` | none |

**Hover:** `primary` → `--primary-hover`; `default` → bg `--surface-hover`, border `--border-strong`; `ghost` → bg `--surface-hover`.

**Tamanhos:**
- `sm`: height 30, padding 0 10, font 13, radius 6
- `md`: height 36, padding 0 14, font 14, radius 8
- `lg`: height 42, padding 0 18, font 15, radius 8

Botões com ícone: `display: inline-flex; align-items: center; gap: 6px;` Ícone à esquerda (16px) ou à direita.

**IconButton** (somente ícone): 32×32, radius 8, color `--text-muted`, hover bg `--surface-hover` + color `--text`.

### 4.2 Input

```
height: 40px; padding: 0 12px;
background: var(--surface);
border: 1px solid var(--border);
border-radius: 8px;
font-size: 14px;
color: var(--text);
```

- Placeholder: `--text-faint`
- Focus: `border-color: --primary; box-shadow: 0 0 0 3px var(--primary-ring); outline: none;`
- Com ícone à esquerda: `padding-left: 38px;` + ícone 16px absolute em `left: 12px; top: 50%; transform: translateY(-50%);` color `--text-muted`
- Com slot à direita (badge "verified", "available"): absolute em `right: 8px`
- Label: 13/500/`--text`, `margin-bottom: 6px`
- Help text: 12/400/`--text-muted`, `margin-top: 6px` (vermelho `--red` se erro)

**Textarea:** mesmo styling, `min-height: 80px; padding: 10px 12px; resize: none;`

**Dropdown (select-like):** input readonly com chevron-down 14px absolute em `right: 12px`.

### 4.3 Checkbox

`16×16, border 1.5px --border-strong, radius 4px, bg --surface`. Checked: bg + border `--primary`, mostra ícone check 11px branco stroke 2.4.

### 4.4 Tag

```
display: inline-flex; align-items: center; gap: 5px;
height: 22px; padding: 0 8px; border-radius: 6px;
font-size: 12px; font-weight: 500;
background: var(--{color}-soft);
color: var(--{color});
```
Tem um dot 6×6 round antes do texto na cor sólida. Variantes: `red | amber | green | blue | purple | slate | primary`.

### 4.5 Chip / Filter pill

Filter chips no board (altura 24px):
- Inativo: `bg --surface, border 1px --border, color --text`, com dot 6×6 na cor da categoria (opcional)
- Ativo: `bg --text, color #fff, border 1px --text` (sem dot)
- Com badge numérico interno: pill `bg --red-soft, color --red` (ou bg semi-transparente se chip ativo)

### 4.6 Avatar

Círculo. `bg --primary-soft, color --primary, font-weight: 600`. Initial em uppercase. Tamanhos:
- `sm` 24×24, font 11
- `md` 32×32, font 13 (padrão)
- `lg` 56×56, font 20

Stack overlap: `margin-left: -6px` + `border: 2px solid var(--bg)`.

### 4.7 Card (item de board)

```
background: var(--surface);
border: 1px solid var(--border);
border-radius: 8px;
box-shadow: var(--shadow-sm);
cursor: grab;
```
- Cover strip opcional no topo: 6px de altura, `--primary-soft` (ou outra cor), `border-radius: 8px 8px 0 0`
- Conteúdo: padding 10px 12px
- Tags no topo (gap 4px, flex-wrap)
- Título: font 13/500/`--text`, line-height 1.35
- Footer com metadata: font 11/400/`--text-muted`, gap 10px, com ícones 11px. Datas "Today" ou "Tomorrow" ficam em `--red` weight 500.
- Estado focused (card aberto): `border: 1px solid --primary` + ring `0 0 0 3px --primary-ring`
- Estado done: `opacity: 0.7`, título com `text-decoration: line-through`

### 4.8 Column (lista do board)

```
flex: 0 0 268px;
background: var(--surface-subtle);
border: 1px solid var(--border);
border-radius: 10px;
display: flex; flex-direction: column;
```
- Header: padding 10px 12px 8px. Layout: `dot 8px` + título 13/600 + contagem em pill (font 12, `--text-faint`, bg `--surface`, padding 0 6, radius 999, h 18) + ações à direita (plus 24×24, dots 24×24)
- Lista de cards: padding 4px 8px 8px, gap 6px, scroll vertical com scrollbar oculta
- "Add a card" button no fim: padding 8px, font 13, color `--text-muted`, ícone plus 14px à esquerda

### 4.9 Browser chrome (apenas mockup)

Em produção, não desenhe browser frame. Em referência, use só para visualizar.

---

## 5. Layout das telas

### 5.1 Cadastro (`/signup`) — split-screen

**Container:** viewport completo, `display: flex`.

**LEFT (44% width):**
- Background: `--surface-subtle` com gradient radial: `radial-gradient(60% 50% at 80% 10%, --primary-soft, transparent 70%)`
- Padding: 36px 40px
- `display: flex; flex-direction: column; justify-content: space-between`
- Conteúdo (de cima para baixo):
  1. Logo (size 20)
  2. Bloco hero:
     - H1 36px: "Get things **done.** One card at a time." (palavra `done.` em `--primary`)
     - P 15px `--text-muted` max-width 360: "Stak is a calm, fast kanban for the things you keep meaning to do. Drag a card. Check it off. Move on with your day."
     - Lista de 3 features (gap 10px): cada item = círculo 18px `--primary` com check branco + texto 14px
  3. Mini board preview rotacionado -1deg: card `--surface, border --border, radius 12, shadow-md, padding 12px, display flex gap 8px`. 3 colunas (Today/Doing/Done) cada uma com dot da cor, label 11/600, e 2-3 mini-cards (`bg --surface-subtle, border --border, radius 6, padding 5/7, font 11, ellipsis`)

**RIGHT (56% width):**
- Padding 32px, `display: flex; align-items: center; justify-content: center`
- Form max-width 360, conteúdo:
  1. Topo direito: "Already have an account? **Log in**" (link em `--primary` weight 500)
  2. H2 26px: "Create your account"
  3. P 14px `--text-muted`: "Takes about 20 seconds."
  4. Row de 2 botões OAuth: `[Google] [Apple]` (variant default, full-width split com gap 10)
  5. Divider com label "or with email" (12px, `--text-faint`)
  6. Inputs (com ícones): Name (user icon), Email (mail icon), Password (lock icon, com help text)
  7. Checkbox + "I agree to the Terms and Privacy Policy." (Terms/Privacy sublinhados)
  8. Button primary `lg` full-width: "Create account →"
  9. Footnote 11px `--text-faint` centralizada: "We'll never share your email."

### 5.2 Login (`/login`) — split-screen

Mesma estrutura que Signup, **trocando**:
- Painel esquerdo: gradient `radial-gradient(50% 40% at 20% 90%, --primary-soft, transparent 70%)`. Conteúdo: Logo + bloco de testimonial (aspa serif 56px coral, p 22/500 max-w-full, avatar+nome+role) + footer "Trusted by 12,000+ people" com 4 avatares overlap.
- Painel direito:
  - Topo: "New here? **Create account**"
  - H2: "Welcome back" / P: "Log in to pick up where you left off."
  - Mesmos botões OAuth
  - Email + Password (label password com link "Forgot?" em primary à direita)
  - Checkbox "Remember me for 30 days"
  - Button primary `lg` full: "Log in →"

### 5.3 Empty state / Onboarding (`/welcome`)

**Container** dividido em 2 colunas: 44% painel esquerdo + 56% preview direito.

**LEFT (`--surface-subtle`, padding 40px 44px, gradient `radial-gradient(70% 50% at 100% 0%, --primary-soft, transparent 60%)`):**
1. Logo
2. Eyebrow 12/600/`--primary` uppercase: "Getting started · 2 of 5"
3. H1 30px: "Let's get you set up."
4. P 15/`--text-muted` max-w 320: "A board, a few columns, a card. You'll be moving things across in under a minute."
5. Progress bar de 5 segmentos (flex, gap 4, height 4, radius 2): preenchidos = `--primary`, atual = `--primary-soft`, futuros = `--surface` border `--border`
6. Lista de 5 steps. Cada step:
   - Container padding 10/12, radius 8, gap 12
   - Step **current**: bg `--surface`, border 1px `--primary`, ring `0 0 0 3px --primary-ring`
   - Indicador circular 22×22 round: done → bg primary + check branco; current → bg surface + border 1.5 primary + número primary; futuro → bg surface + border 1.5 `--border-strong` + número `--text-faint`
   - Texto: 14px, current 600, done line-through + `--text-muted`. Subtítulo 12/`--text-faint` (current → `--primary`)
7. Row: button primary "Continue →" + button ghost "Skip tour"

**RIGHT (padding 40px):**
1. Header: eyebrow "LIVE PREVIEW" + caption "Your board so far →"; à direita, pill "auto-saved" (`bg --green-soft, color --green`, dot verde)
2. Card branco `bg --surface, border --border, radius 12, padding 16`:
   - Header: emoji + h3 "Personal"
   - Row de 3 colunas (Todo, Doing, Done) cada uma:
     - bg `--surface-subtle`, border 1px `--border`, radius 8, padding 10
     - Header: dot na cor + nome 12/600 + contador 11/`--text-faint`
     - Body: dashed border + texto centralizado "Drop a card here"
     - Coluna **mais recente** (Done): border 1px `--primary` + ring + badge absoluto canto sup-direito "← new!" (bg primary, pill, font 11/600/branco, shadow-md)
   - Coluna fantasma "+ column" (flex 0 0 90, dashed `--border-strong`)
3. Tip: smile icon coral + "Tip: drag cards between columns, or use ⌘ ↑↓ to reorder." (kbds com bg `--surface-subtle`, border 1px, radius 4, font-mono 11)

### 5.4 Board (`/b/[id]`) — TELA PRINCIPAL

**Container:** flex horizontal.

**SIDEBAR (220px, `--bg`, border-right 1px `--border`, padding 14px 10px):**
1. **Workspace switcher** (button full-width, bg `--surface`, border, radius 8, padding 6/8): avatar sm "A" + bloco texto (nome 13/600 "Ana's workspace" + caption 11/`--text-muted` "Free plan") + chevron-down
2. **Top actions** (4 buttons, padding 6/8, radius 6, font 13, gap 10 ícone+label):
   - Search (com kbd ⌘K à direita)
   - Inbox (badge 3 coral)
   - Today (badge 6 coral)
   - Notifications
3. **Boards section header**: row "BOARDS" (11/600/`--text-faint` uppercase) + icon plus 20×20 à direita
4. **Boards list** (5 items): emoji + nome (font 13, weight 600 se ativo) + contador 11/`--text-faint`. Ativo: `bg --surface-hover`.
5. **Footer**: divider + 2 items (Settings, Help & feedback) — font 13, color `--text-muted`

**MAIN (flex 1):**
1. **Board header** (padding 14px 24px 12px, border-bottom 1px `--border`):
   - Esquerda: h2 "Personal" + icon star 14px (color `--amber`) + caption 12/`--text-muted` "· 14 cards · updated 2m ago"
   - Direita (gap 8): Search input (height 32, paddleft 30, width 200, ícone search dentro) + Button default sm "Filter" + divider vertical 1×20 + Button primary sm "+ New card"
2. **Filter chips row** (padding 10px 24px, border-bottom 1px `--border`):
   - Esquerda: "Quick filters:" 12/`--text-faint` + chips: `[All]` (ativo) `[This week]` `[Overdue]` (com badge 2) `[Urgent]` (dot red) `[Work]` (dot green)
   - Direita: "Sort: **Manual** ▾" + stack de 3 avatares + button dashed `+`
3. **Columns** (padding 14px 24px, flex gap 12, overflow-x: auto):
   - 4 colunas: Inbox (slate), Today (primary), In Progress (blue), Done (green)
   - Cada uma com seus cards (ver dados em seção 8)
   - Coluna fantasma "+ Add column" no fim (flex 0 0 268, bg transparent, border 1px dashed `--border-strong`, radius 10, height 80, color `--text-muted`)

### 5.5 Card Detail — modal sobre o board

**Backdrop:** `position: fixed; inset: 0; bg: rgba(20,16,12,0.32); backdrop-filter: blur(2px); z-index: 10`. Board atrás permanece visível mas com leve blur.

**Modal:** centralizado horizontal, top 32px, max-height calc(100% - 64px), **width 760px**, bg `--surface`, radius 16, shadow `--shadow-lg`, border 1px `--border`, overflow hidden.

Estrutura:
1. **Cover strip** topo: 8px de altura, bg `--primary`
2. **Header** (padding 18px 24px 14px, border-bottom 1px `--divider`):
   - Esquerda: breadcrumb 12/`--text-muted` "Personal › ● Today" + h2 22px "Finish wireframe deck for client review"
   - Direita: IconButtons star, dots-vertical, x
3. **Body** flex 2 colunas:
   - **Main** (flex 1, padding 18px 24px, scroll vertical):
     - **Tags row** (gap 6, wrap): Tag red "urgent", green "work", amber "this week", botão dashed "+ Tag"
     - **Section "Description"** (icon edit 14px + título 13/600): box `bg --surface-subtle, border --border, radius 8, padding 10/12`, font 13, line 1.55, com link primary sublinhado "Brief doc ↗"
     - **Section "Checklist"** (right side: "3 of 5" muted):
       - Progress bar 6px `bg --surface-subtle, radius 3`, fill 60% `--primary`
       - 5 items: checkbox + label (done = `--text-faint` + line-through), padding 6/8, gap 10
       - Item add button: "+ Add an item"
     - **Section "Activity"**:
       - Comentário: avatar md "M" purple + bloco (nome 13/600 "Marco" + caption 12/`--text-faint` "commented · yesterday" + balão `bg --surface-subtle, border, radius 8, padding 8/12, font 13`)
       - 2 entries de sistema (avatar sm + texto 12/`--text-muted` + timestamp à direita)
     - **Comment box**: avatar md + textarea (placeholder "Write a comment… use @ to mention") com toolbar absolute (paperclip, smile, spacer, Button primary sm "Comment" com ícone send)
   - **Right sidebar** (220px, border-left 1px `--divider`, padding 18/16, bg `--bg`):
     - 5 meta fields, cada um com label uppercase 11/600/`--text-faint`:
       - **Status**: pill `bg --primary-soft, color --primary` "● In progress ▾"
       - **Due date**: "Today, 5:00 PM" em `--red` 13/500 + caption 11/`--text-faint` "in 4 hours"
       - **Priority**: flag icon red + "High"
       - **Assignee**: avatar sm "A" + "Ana"
       - **Attachments**: link "brief-v2.pdf" sublinhado + caption "1 file · 240 KB"
     - Footer (margin-top auto, border-top 1px): Button default sm full "✓ Mark complete" + Button ghost sm full "🗑 Delete card" (color `--red`, align-start)

### 5.6 Settings — Profile (`/settings/profile`)

**Container** flex 3 colunas:

1. **App rail** (56px, `--bg`, border-right): logo 22 sem texto, gap 12, depois 4 ícones (home, search, inbox, cal) em IconButton 36×36, depois `flex-1`, depois cog (ativo: bg `--surface-hover`) + avatar sm
2. **Settings nav** (240px, `--bg`, border-right, padding 20/14):
   - Row "← Back to boards" 13/`--text-muted` gap 8
   - H3 "Settings"
   - 3 grupos (Account, Workspace, Billing) com header 11/600 uppercase `--text-faint` padding 0/8/6
   - Items: button padding 7/8, radius 6, font 13, gap 10 ícone+label. **Ativo**: bg `--surface`, border 1px `--border`, shadow-sm, weight 600, ícone em `--primary`. Inativo: bg transparent, color `--text`, ícone `--text-muted`.
   - Items: Account → Profile (ativo), Email & password, Notifications, Security · Workspace → Appearance, Boards & defaults, Keyboard shortcuts · Billing → Plan & usage
   - Divider + button "🗑 Delete account" em `--red`
3. **Main** (flex 1, scroll vertical), conteúdo dentro de max-width 720, padding 28/36:
   - **Page header**: H1 26 "Profile" + p 14/`--text-muted` "How you show up in the app. Visible to people you share boards with."
   - **Card "Profile photo"** (h4 15/600 + subtitle 13/`--text-muted` "JPEG, PNG or GIF. 5 MB max."):
     - Row gap 18: Avatar lg (font 24/700) + col [Button default "↑ Upload new", Button ghost "Remove" (color `--red`)] + spacer + col divider-left padding-left 18 [caption 12/`--text-muted` "Or pick a color" + row de 6 swatches 24×24 round (primary, blue, green, amber, purple, slate); ativo: border 2px `--text` + ring 2px `--bg`]
   - **Card "Identity"**:
     - Display name input
     - Username input (com ícone user + slot direita "✓ available" em verde 11/500)
     - Email input (com ícone mail + Tag green "verified")
   - **Card "Locale & timezone"**:
     - Row 2 colunas: Timezone dropdown ("(GMT−3) São Paulo") + Language dropdown ("English")
     - "Week starts on" segmented control (3 opções: Sunday/Monday/Saturday; ativo = `bg --surface, shadow-sm`; container `bg --surface-subtle, padding 3, radius 8, border 1px --border`)
   - **Sticky save bar** bottom (sticky bottom 0, bg `--bg`, border-top 1px `--border`, margin negativo de 36 nas laterais, padding 12/36):
     - Esquerda: dot 6 amber + "You have unsaved changes" 13/`--text-muted`
     - Direita: Button ghost "Cancel" + Button primary "✓ Save changes"

**Settings card** = `bg --surface, border 1px --border, radius 12, shadow-card, padding 20px 22px, margin-bottom 16`.

---

## 6. Ícones

Set de ~30 ícones estilo **Lucide**, stroke 1.5 (2.4 para checks dentro de checkboxes), 16px padrão (11px em metadata, 14px em headers, 18px no rail). Lista exata usada (use `lucide-react` ou equivalente):

`search · plus · check · x · star · mail · lock · user · bell · cog (settings) · trash · edit (pencil) · cal (calendar) · clock · flag · paperclip · send · chevron-right · chevron-left · chevron-down · chevron-up · more-horizontal · more-vertical · layout-grid · home · inbox · filter · arrow-right · arrow-up · log-out · smile`

OAuth: ícones coloridos oficiais (Google multi-color, Apple branco/preto). Use `react-icons/fa` ou SVGs oficiais — não esticar.

---

## 7. Interações & comportamento

### 7.1 Auth
- Form validation: email regex, senha mín 8 chars (mostrar help text em vermelho ao errar)
- OAuth buttons → redirect para `/auth/oauth/google` etc.
- Submit → loading state (spinner dentro do button, label "Creating account…"), depois redirect para `/welcome` (signup) ou `/b/personal` (login)
- Link "Forgot?" → navega para `/forgot-password`

### 7.2 Onboarding
- Step current avança quando o usuário cumpre a ação (criar coluna, criar card, etc.)
- Botão "Continue →" sempre habilitado (pula step manualmente)
- Botão "Skip tour" leva direto para `/b/personal`
- Preview à direita reflete estado real do board sendo criado

### 7.3 Board
- **Drag-and-drop**: usar `@dnd-kit/sortable` ou similar. Cards arrastáveis entre colunas e dentro da mesma coluna. Coluna inteira também arrastável pelo header.
- **Click no card** → abre modal de detail (rota `/b/[id]/c/[cardId]`, route intercepted no Next.js para preservar board atrás)
- **Click em "Add a card"** → input inline aparece no fim da coluna; Enter cria, Esc cancela
- **Click em "Add column"** → input inline para nome de coluna
- **Search** (`⌘K`): filtra cards em tempo real (mantém colunas, esconde cards que não dão match)
- **Filter chips**: toggleam; All é exclusivo (limpa os outros)
- **Star icon** no header: toggle de board favorito
- **Sidebar boards**: click muda board ativo; drag-and-drop reordena lista

### 7.4 Card detail
- **Esc** ou click no backdrop ou no X → fecha modal
- **Click no título** → vira input editável inline
- **Click no checkbox de item** → marca/desmarca, progress bar anima (transition 200ms ease)
- **Click em tag "+"** → popover com lista de cores e busca por texto
- **Status dropdown** → muda coluna do card
- **Mark complete** → marca card como done (line-through + opacity)
- **Delete card** → confirmação (use `<AlertDialog>` do shadcn/ui)
- Comentários: enter envia, shift+enter quebra linha. `@` abre mention popup.

### 7.5 Settings
- Mudança em qualquer field → dirty state → ativa sticky save bar (transition slide-up 200ms)
- Save → POST → sucesso = toast verde "Profile updated" no canto inferior direito
- Cancel → reverte mudanças, esconde save bar
- Upload de foto → drag-and-drop OU click; preview circular antes de salvar; cropper modal opcional

---

## 8. Dados de exemplo (seed)

`seed-data.json` na pasta tem o estado de board inicial. Em código:

```ts
const boards = [
  { id: 'personal', name: "Personal",     emoji: '🌱', count: 14 },
  { id: 'work',     name: "Work · Q2",    emoji: '💼', count: 23 },
  { id: 'move',     name: "House move",   emoji: '📦', count: 8 },
  { id: 'reading',  name: "Reading list", emoji: '📚', count: 31 },
  { id: 'recipes',  name: "Recipes",      emoji: '🍳', count: 12 },
];

const columns = [
  { id: 'inbox',   title: 'Inbox',       color: 'slate' },
  { id: 'today',   title: 'Today',       color: 'primary' },
  { id: 'doing',   title: 'In Progress', color: 'blue' },
  { id: 'done',    title: 'Done',        color: 'green' },
];
```

Schema de Card:
```ts
type Card = {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  tags: { color: TagColor; label: string }[];
  due?: string;          // "Today, 5:00 PM" | "Tomorrow" | "Sun" | ISO date
  priority?: 'low' | 'medium' | 'high';
  checklist?: { items: { text: string; done: boolean }[] };
  comments?: Comment[];
  attachments?: { name: string; size: number; url: string }[];
  assigned?: string[];   // userIds
  cover?: string;        // color token
  done?: boolean;
  createdAt: string;
  updatedAt: string;
};
```

---

## 9. Estado / Data fetching

Sugestão de stack:
- **Next.js 14 App Router** com Server Components para dados iniciais
- **Supabase** ou **Drizzle + Postgres** (tabelas: users, boards, columns, cards, checklist_items, comments, tags)
- **TanStack Query** para mutations otimistas (drag-and-drop precisa)
- **Zustand** para UI state (modal aberto, filtros, sidebar collapsed)
- **NextAuth.js** ou **Supabase Auth** para sign-up/login + OAuth

Tabelas mínimas:
```sql
users(id, email, name, username, avatar_color, timezone, language, week_starts_on, created_at)
boards(id, user_id, name, emoji, starred, position, created_at)
columns(id, board_id, title, color, position)
cards(id, column_id, title, description, due_at, priority, cover_color, done, position, created_at, updated_at)
card_tags(card_id, tag_id)
tags(id, board_id, color, label)
checklist_items(id, card_id, text, done, position)
comments(id, card_id, user_id, body, created_at)
```

---

## 10. Responsividade

As mocks são desktop-first (1440×900). Para mobile (< 768px):
- Auth: stack vertical, painel marketing → cabeçalho colapsado de 200px
- Board: sidebar vira drawer (off-canvas com hamburger). Colunas: swipe horizontal entre elas (uma por vez na tela)
- Card detail: vira fullscreen, sem modal
- Settings: nav vira accordion no topo

Não foi mockado em hi-fi para mobile — implemente seguindo essas regras.

---

## 11. Arquivos neste pacote

```
design_handoff_stak/
├── README.md                          ← este arquivo
├── design-tokens.css                  ← variáveis CSS prontas para colar
├── design-tokens.json                 ← tokens em JSON para gerador (Tailwind / Style Dictionary)
├── tailwind-config-snippet.ts         ← snippet pronto para tailwind.config.ts
├── seed-data.json                     ← dados de exemplo para popular o board
└── references/
    ├── Todo Mockups (standalone).html ← mockups hi-fi (offline, funciona ao abrir)
    ├── Todo Wireframes.html           ← wireframes lo-fi originais (referência adicional)
    └── source/                        ← fonte React/JSX dos mockups (componente por componente)
        ├── hifi-tokens.jsx
        ├── hifi-components.jsx
        ├── hifi-auth.jsx
        ├── hifi-board.jsx
        ├── hifi-detail.jsx
        └── hifi-settings.jsx
```

Abra `references/Todo Mockups (standalone).html` em qualquer navegador para ver as 5 telas em tamanho real.

---

## 12. Como pedir ao Claude Code

> Cole isto no Claude Code junto com a pasta:

```
Acabei de te dar a pasta `design_handoff_stak/` com o design completo de um app
de tarefas chamado Stak. Por favor:

1. Leia o README.md inteiro
2. Abra references/Todo Mockups (standalone).html para entender o look-and-feel
3. Crie um novo projeto Next.js 14 com Tailwind CSS + shadcn/ui
4. Cole os design tokens no globals.css e tailwind.config.ts
5. Implemente as 5 telas pixel-perfect:
   - /signup  /login  /welcome  /b/[id]  /b/[id]/c/[cardId]  /settings/profile
6. Use os dados de seed-data.json
7. Para drag-and-drop use @dnd-kit/sortable
8. Mantenha a paleta warm-neutral + coral primary — NÃO improvise cores

Comece pelo design system (tokens + componentes base: Button, Input, Tag,
Avatar, Card). Depois construa as telas em ordem: Login → Signup → Board →
Card detail → Empty state → Settings.
```
