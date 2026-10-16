# BUILD PROMPT — Cinematic "Film Lab" Portfolio Website

You are building a production-ready personal portfolio website. A reference demo exists; your job is to reproduce its **structure, look, navigation, transitions, hover behaviour and every effect exactly**. Page content (names, projects, bios, skills, awards, links) is placeholder text and must live in one editable data file so it can be swapped later. Do not redesign, simplify or add effects that are not listed here. Do not remove any that are.

---

> **Note:** Section 18 adds three required features (portrait, certifications gallery, résumé block) and an owner upload workflow. They are part of the site and must be built exactly like everything else.

---

## 0. Ground rules

- **Stack:** plain HTML + CSS + vanilla JavaScript (ES modules are fine). No frameworks and no animation libraries (no GSAP, Three.js, Framer Motion). All effects use CSS, the Web Animations API (`element.animate`), `requestAnimationFrame` and 2D `<canvas>`.
- **Single-page app:** one `index.html`, four "pages" (sections) toggled by class. Navigation never reloads the browser. Optional: update `location.hash` (`#/work`) after each transition and restore it on load, without changing any visuals.
- **Fonts (Google Fonts):** `Fraunces` (variable: italic 0/1, opsz 9..144, wght 100..900) for display, and `Manrope` (400, 600, 800) for UI/body. Fallbacks: `Georgia, serif` and `system-ui, sans-serif`.
- **Explicitly NOT in this site:** no sound or audio of any kind, no text-scramble or "decode on hover" effects, no light theme.
- **Structure the code** in modules: `data.js` (all content), `loader.js`, `router.js` (iris transitions), `cursor.js`, `background.js` (bokeh), `gyro.js`, `reel.js`, `scroll.js` (progress, counter, marquee, stats, timeline), `mode.js` (Colour/Noir), `main.js`.
- Mobile-first responsive, with a breakpoint at 800px. Respect `prefers-reduced-motion`, safe-area insets, and visible keyboard focus.

---

## 1. Design tokens

| Token | Colour mode | Noir mode |
|---|---|---|
| `--bg` | `#06181b` | `#0b0b0c` |
| `--ink` (text) | `#efe6d2` | `#f2f2f2` |
| `--mute` | `#7f9797` | `#8a8a8a` |
| `--amber` (accent 1) | `#ffb24a` | `#ffffff` |
| `--teal` (accent 2) | `#2fb5b0` | `#bdbdbd` |
| `--line` | `rgba(239,230,210,.14)` | `rgba(255,255,255,.14)` |

Extra fixed colours: film-panel black `#020d0f`; sprocket-hole colour `#1b2d2f`; flashlight base text `#2c4a4a` (Noir: `#333`).
Fonts: `--serif` = Fraunces, `--sans` = Manrope. Body: 16px/1.6 Manrope 400. `color-scheme: dark`. Root has `box-sizing:border-box` and padding-top/bottom of `env(safe-area-inset-*)`.

**Type scale**
- `h2`: Fraunces 300, `clamp(40px,7vw,96px)`, line-height 1, letter-spacing -.02em, `font-variation-settings:"opsz" 144`. An `<em>` inside is italic and amber.
- `.sub` paragraph: mute colour, max-width 52ch.
- Small labels: 11–13px, 600–800 weight, letter-spacing .04–.3em.

**Layout:** `.wrap` = max-width 1280px, centred, horizontal padding 4vw. Sections have vertical padding 12vh. Every non-home page has top padding 20vh. Each `.page` has min-height 100vh and is `display:none` unless `.on`.

**Z-index stack (bottom to top):** bokeh canvas 0 · gyro canvas 1 · grain 1 · main content 2 · hover poster preview 15 · header and frame counter 20 · progress bar 30 · iris and loader 50 · cursor ring 60 · cursor dot 61 · colour flash 70.

---

## 2. Global persistent layers

1. **Bokeh canvas** (fixed, full-screen, z0). See §6.
2. **Gyroscope canvas** (fixed, full-screen, z1, `pointer-events:none`). See §7.
3. **Film grain:** a fixed div, `inset:-50%`, z1, `pointer-events:none`, opacity .09. Its background is an inline SVG data-URI using `feTurbulence baseFrequency=.9 numOctaves=2` (200×200). Animate with `steps(6)` over .8s, infinite, jittering `translate` between roughly (0,0), (-3%,2%), (2%,-3%), (-2%,-1%), (3%,3%). Noir opacity: .17. **Disable the animation under 800px width.**
4. **Scroll progress bar:** fixed top, 2px tall, full width, amber, `transform:scaleX(progress)` with origin left, z30. Progress = `scrollY / (scrollHeight - innerHeight)`.
5. **Frame counter:** fixed bottom-right (right 4vw, bottom 18px + safe area), 11px, weight 600, letter-spacing .12em, mute colour, tabular numbers. Text: `FRAME 0001 / 0480`. The current frame = `round(progress*479)+1`, zero-padded to 4 digits, updated on scroll.
6. **Custom cursor** (see §8) and **colour flash overlay**: a fixed white div, opacity 0, `pointer-events:none`.

---

## 3. Header and navigation

- Fixed top (below the safe-area inset), flex space-between, padding 20px 4vw, **`mix-blend-mode:difference`** so it stays legible on any background.
- Left: logo button "IK" in Fraunces italic 700, 26px. It navigates to Home.
- Right: nav buttons **Reel (home), Work, About, Journey**, plus the **Colour/Noir toggle** as the last item. Gap `clamp(14px,3vw,36px)`.
- Nav button: 13px, weight 600, letter-spacing .04em, padding 4px 0. It has an underline pseudo-element (1px, currentColor) that is `scaleX(0)` with origin right. On hover, and when active (`aria-current="page"`), it animates to `scaleX(1)` with origin left (.5s `cubic-bezier(.7,0,.2,1)`).
- The toggle button is pill-shaped (1px currentColor border, radius 99px, padding 3px 12px, no underline). Label: `◐ Color` in Colour mode, `◑ Noir` in Noir mode.
- The active page is marked on load (Home) and after every transition.

---

## 4. Page transition — the "iris wipe" (used for ALL page changes)

Triggered by any element with a `data-go` attribute (nav, logo, filmstrip posters).

1. Ignore the click if a transition is already running (busy lock) or the target is the current page.
2. Origin point = the click coordinates (centre of screen if keyboard-triggered).
3. A full-screen overlay (`position:fixed; inset:0; z50`) has background `--ink` and text colour `--bg`. Its content is centred: a small kicker (`SCENE 02`, 12px, weight 800, letter-spacing .3em) above a large `h2` page title ("The Reel", "Work", "About", "Journey"). The overlay is clipped by `clip-path`.
4. **Open:** animate `clip-path` from `circle(0px at X Y)` to `circle(150vmax at X Y)` over **750ms**, `cubic-bezier(.7,0,.2,1)`, `fill:forwards`.
5. While fully covered: switch the `.on` page, update nav active state, set the bokeh hue target and gyro target for the new page, and `scrollTo(0,0)`.
6. **Title reveal:** add class `t`. The `h2` goes from opacity 0 / `translateY(30px)` to opacity 1 / 0 over .6s. Hold for **650ms**, then remove `t`.
7. **Close:** animate `clip-path` from the full circle to `circle(0px at 50% 50%)` over **800ms** with the same easing. Then cancel animations, clear the busy flag, and for Journey run the timeline update.
8. Under reduced motion, durations collapse to 1ms.

---

## 5. Loader (first visit)

- Full-screen overlay, background `#020d0f`, z50, blocks pointer events. Content, all centred:
  - Two concentric circles, diameter `min(70vmin,520px)`, 1px `--line` border.
  - A **radar sweep**: same size circle with `conic-gradient(from 0deg, transparent 70%, rgba(255,178,74,.5))` rotating 360° in 1.4s linear, infinite.
  - A horizontal and a vertical 1px crosshair line, same length.
  - A **3-digit counter** in the centre: Fraunces weight 200, `clamp(80px,16vw,200px)`, tabular numbers, `000` to `100`.
  - A caption "DEVELOPING FRAMES" at the bottom (bottom 12vh), 11px, letter-spacing .3em, mute.
- The counter runs for **2400ms** using ease-out cubic (`1-(1-p)^3`). Update via `requestAnimationFrame`.
- Wait 250ms, then **iris-close reveal**: `clip-path` from `circle(150vmax at 50% 50%)` to `circle(0px at 50% 50%)` over **1100ms**, `cubic-bezier(.7,0,.2,1)`. Remove the loader from the DOM.
- Then add class `in` to `<body>`. This triggers the hero entrance (§9).
- **Failsafe:** an independent inline script hides the loader and adds `in` after 6.5s if the main script never started. Set a flag when the loader begins so the failsafe stays silent in normal operation.
- Reduced motion: counter duration 100ms.

---

## 6. Bokeh background (canvas 2D)

- 22 soft light orbs (9 when `innerWidth<800`). Each has: position x,y in 0..1; radius 40–170px; alpha .05–.15; drift velocity ±.00003 per frame (wrap at edges); a colour-slot `k` (alternating 0/1); parallax depth `z` .2–1.2.
- Each frame: clear; `globalCompositeOperation='lighter'`; per orb draw a radial gradient circle from `hsla(H,S%,55%,alpha)` to `hsla(H,S%,55%,0)`. Parallax offset: `X = x*W + (mouseX/W-.5)*-90*z`, same for Y.
- **Per-page hue pairs** `[slot0, slot1]`: home `[30,175]`, work `[200,330]`, about `[10,260]`, journey `[40,165]`. Current hues lerp toward the target at 0.03 per frame, so the background slowly re-grades after each page change.
- **Saturation S:** 85 in Colour mode, lerping (0.05/frame) to 0 in Noir mode.
- Guard: if `innerWidth` or `innerHeight` is 0, skip the frame and retry (prevents errors in hidden or unsized containers). Re-size the canvas whenever the window size differs. Under reduced motion draw one static frame.

---

## 7. 3D gyroscope (persistent, scroll-reactive wireframe)

A single canvas object that stays on screen on every page and sits behind the text.

- Geometry: **3 rings**, 72 segments each (73 points to close). Ring k = unit circle `[cos u, sin u, 0]` rotated by `rot(p, k*1.0472, k*0.6)`.
- Global rotation each frame, with `t` in ms:
  `a = t*.00018 + scrollY*.0016 + (mouseY/innerHeight-.5)*.8`
  `b = t*.00027 + scrollY*.0011 + (mouseX/innerWidth-.5)*.8`
- `rot(p,a,b)`: rotate around X by a, then around Y by b: `y1=y*cos a - z*sin a; z1=y*sin a + z*cos a; return [x*cos b + z1*sin b, y1, -x*sin b + z1*cos b]`.
- Projection: `s = 1/(1.9 - z*.5)`; screen x = `cx + x*R*s*1.5`, screen y = `cy + y*R*s*1.5`. `R = min(W,H)*.3` (`.22` under 800px).
- Draw: each ring as a 1px polyline at alpha .38. Every 9th point is a filled node, radius `2.4 + z*1.2`, alpha `.5 + z*.4`. Ring 0 uses amber `255,178,74`; rings 1 and 2 use teal `47,181,176`. In Noir use `235,235,235` and `150,150,150`.
- **Centre position per page** (fractions of viewport, lerped at .04/frame, so it glides between pages): home (.72,.50) · work (.88,.28) · about (.14,.60) · journey (.86,.58).
- Same zero-size guard as the bokeh canvas.

---

## 8. Custom cursor ("lens")

- Native cursor hidden (`cursor:none` on body, buttons, links) on fine pointers. On `pointer:coarse` devices restore the native cursor and hide the lens, dot and hover preview.
- **Lens ring:** fixed, 30×30px, 1.5px white border, circle, `mix-blend-mode:difference`, `pointer-events:none`. It follows the pointer with **lerp .22 per frame** via `transform:translate`.
- **Dot:** 5px amber circle that follows the pointer exactly (no lag).
- Any element with `data-c="Label"` makes the lens grow to **92×92px**, fill white, show the label (10px, weight 800, letter-spacing .1em, black text). Transition .4s `cubic-bezier(.16,1,.3,1)` on size, margin and background. It shrinks back when leaving.
- Labels: filmstrip posters "Open", project rows "Read", project links "Visit"/"Code", the 3D reel "Drag", the email link "Send", the Colour/Noir toggle "Switch".

---

## 9. HOME page ("Reel") — sections in order

### 9.1 Hero (min-height 100vh, flex column, content vertically centred, padding-top 14vh)
- **Name** (h1) in giant Fraunces: weight 300, `clamp(64px,14vw,230px)`, line-height .86, letter-spacing -.04em, opsz 144. Split into individual letters. Each letter is an `inline-block` mask (`overflow:hidden`, `vertical-align:top`, padding-bottom .08em) containing an inner element that starts at `translateY(115%)`.
- **Entrance (the single orchestrated moment):** when `body.in` is set, each inner letter transitions to `translateY(0)` over **1.1s `cubic-bezier(.16,1,.3,1)`**, staggered **55ms per letter**.
- **Cursor-proximity weight:** on pointer move, for each letter compute the distance `d` from the pointer to the letter's centre; set `font-variation-settings:"wght" round(100 + 800*max(0, 1 - d/260))`. Letters swell toward heavy near the cursor and thin out away from it.
- **Role line** below: 4vh margin, flex, a 56px × 1px amber line then the role text. Fades in (opacity 0→1, 1s, 1s delay) after entrance.
- **Flashlight sentence** (12vh below): Fraunces 300, `clamp(26px,4.4vw,60px)`, line-height 1.2, max-width 20ch. Two perfectly stacked layers: a dim base layer (colour `#2c4a4a`) and a bright layer (colour `--ink`, absolutely positioned on top, same text, with 2 keywords wrapped in amber italic). The bright layer has `mask-image: radial-gradient(circle 150px at var(--mx) var(--my), #000 40%, transparent 100%)` (also `-webkit-mask-image`). `--mx/--my` = pointer position relative to the sentence's bounding box, updated on pointer move; default `-300px` so nothing is revealed initially. The bright copy is `aria-hidden`. Below it a hint: "MOVE YOUR CURSOR OVER THE SENTENCE", 12px, letter-spacing .08em, mute.

### 9.2 Marquee strip
- Full-width, `border-block:1px solid --line`, padding 22px 0, `overflow:hidden`, `white-space:nowrap`.
- Content: 6 words, each followed by an amber ✦, repeated 4 times, Fraunces italic 300 `clamp(30px,5vw,64px)`.
- Motion (every frame): offset `-= 1 + |scrollVelocity|*.4`; wrap when `offset < -scrollWidth/4`; `transform: translateX(offset) skewX(clamp(-12°,12°, -scrollVelocity*.6))`. Scroll velocity = per-event `scrollY` delta, decayed ×.85 each frame. So the marquee speeds up and leans while the user scrolls.

### 9.3 Stats (scroll-scrubbed counters)
- Grid `repeat(auto-fit,minmax(200px,1fr))`, gap 4vw, padding 14vh 4vw (8vh on mobile). Three items: big number + 12px label (letter-spacing .14em, mute).
- Number: Fraunces 200, `clamp(80px,14vw,200px)`, line-height 1, tabular numbers, letter-spacing -.04em, with a vertical text gradient (`--ink` at 30% to transparent at 125%) clipped to the text.
- **Scrubbing:** for each number, `p = clamp((innerHeight*.95 - rect.top)/(innerHeight*.7), 0, 1)`; display `round(target*p) + suffix` (suffix "+" or "y" as set in data). Recalculated on every scroll, so it counts **up when scrolling down and back down when scrolling up**. Active only while Home is the current page.

### 9.4 "Now showing" filmstrip
- `h2` "Now <em>showing</em>", `.sub` line.
- Strip container: margin-top 7vh, padding 30px 20px, background `#020d0f`, radius 6px, horizontal flex gap 2vw, `overflow-x:auto`. Two sprocket-hole rails (pseudo-elements, 10px tall at top 8px and bottom 8px): `repeating-linear-gradient(90deg,#1b2d2f 0 14px,transparent 14px 30px)`.
- Posters (first 3 projects): flex `0 0 min(340px,70vw)`, aspect-ratio 3/4, radius 4px, padding 22px, content aligned bottom, each with its own diagonal gradient background. Title: Fraunces 600, 28px, white, soft shadow; caption 12px white 80%.
- **Resting state:** `filter:saturate(.55) brightness(.8)`. **Hover:** filter none (.5s).
- **3D tilt:** on pointer move over a poster set `transform: perspective(700px) rotateY(((x-left)/w-.5)*14deg) rotateX(-((y-top)/h-.5)*14deg)`; reset on pointer leave; `transition: transform .2s ease-out`; `transform-style:preserve-3d`.
- **Ghost frame number:** `::before` showing "01/02/03", absolutely at top -.12em, right 14px, Fraunces 800, 150px, transparent fill, 1px `rgba(255,255,255,.35)` text-stroke.
- **Cursor spotlight:** `::after` overlay `radial-gradient(260px circle at var(--px) var(--py), rgba(255,255,255,.3), transparent 60%)`, opacity 0 → 1 on hover (.3s). `--px/--py` follow the pointer within the poster.
- Click → iris transition to Work. Lens label "Open".

---

## 10. WORK page ("Selected scenes")

Order: `h2` "Selected <em>scenes</em>" → `.sub` instruction line → **3D reel** → caption → **project list**.

### 10.1 Drag-to-spin 3D reel
- Container `.reel`: `--w: min(300px,62vw)`, height `min(66vh,540px)`, `perspective:1500px`, `touch-action:pan-y`, `user-select:none`, `tabindex=0`, `role=group` with aria-label. Lens label "Drag".
- `.drum`: absolutely centred (left/top 50%, zero size), `transform-style:preserve-3d`.
- One **pane per project**, absolutely positioned: width `var(--w)`, aspect-ratio 3/4, `left:calc(var(--w)/-2)`, `top:calc(var(--w)*-.667)`, radius 4px, padding 20px, content at bottom, gradient background, drop shadow `0 30px 60px rgba(0,0,0,.45)`, ghost outlined number (same style as posters), title (Fraunces 600, 30px, white) and caption.
- Pane i transform: `rotateY(i*STEP deg) translateZ(calc(var(--w)*.82))`. The demo has 4 panes, so STEP = 90°. For N panes use STEP = 360/N and radius ≈ `w/2/tan(π/N)*1.1` (for N=4 this is .82w).
- Drum transform each frame: `translateZ(calc(var(--w)*-.82)) rotateY(A deg)`.
- **Physics (every frame):**
  - While dragging: `A += dx*.35`, velocity `V = dx*.35`.
  - After release: `A += V; V *= .93`. When `|V| < .2`, snap: `target = snapT ?? round(A/STEP)*STEP; A += (target - A)*.12`; clear `snapT` when `|target-A| < .05`.
  - Use pointer events with pointer capture; `pointerdown` resets V and snapT.
- **Depth fade:** for each pane `rel = ((i*STEP + A) % 360 + 540) % 360 - 180`; `opacity = .2 + .8*max(0, cos(rel in radians))`.
- **Active index** `n = ((-round(A/STEP)) % N + N) % N`. Caption (centred, hint style, margin-top -5vh, margin-bottom 10vh): `DRAG TO SPIN — {n+1} / {N}  {ProjectName}. CLICK THE FRONT FRAME TO OPEN IT`.
- **Click** (total pointer movement < 6px): if the pane is the front one, open the matching project row (see 10.2) and smooth-scroll it to the centre; otherwise rotate it to the front with `snapT = -i*STEP + 360*round((A + i*STEP)/360)`.
- **Keyboard** (when focused): ArrowRight → `snapT = round(A/STEP)*STEP - STEP`; ArrowLeft → `+ STEP`; `preventDefault`.

### 10.2 Project list (accordion)
- Each row: `border-top:1px solid --line` (last row also has a bottom border). The row button is full width, grid `1fr auto`, gap 20px, baseline aligned, padding 3.2vh 0.
  - Title: Fraunces 300, `clamp(34px,6vw,84px)`, line-height 1, letter-spacing -.02em. Year: small, mute, right.
  - **Hover:** padding-left animates to 3vw and the text turns amber (.5s `cubic-bezier(.16,1,.3,1)` for padding, .3s for colour). Lens label "Read".
- **Click → expand:** a grid wrapper animates `grid-template-rows` from `0fr` to `1fr` over .7s `cubic-bezier(.16,1,.3,1)`. Only one row open at a time (opening one closes the others); `aria-expanded` kept in sync; the open row title stays amber. Panel content (auto-fit grid, min 240px, gap 24px, bottom padding 4vh): description (mute), tag pills (1px line border, radius 99px, 12px text in ink), "Live demo" (amber) and "Source" links with lens labels "Visit"/"Code".
- **Floating poster preview** (hover on a row button): a fixed 240×300 box (radius 4px, project gradient, project name at bottom-left, Fraunces 600 22px white, padding 16px), `pointer-events:none`, z15. Hidden by default (opacity 0, `scale:.6`); on hover transitions to opacity 1 / scale 1 (.35s opacity, .5s `cubic-bezier(.16,1,.3,1)` scale). Position each frame: `px += (mouseX - px)*.12`, same for y; `vx = (mouseX - px)*.05`; `transform: translate(px+30, py-150) rotate(clamp(-12°,12°, vx))`. It hides when the pointer leaves the list.

---

## 11. ABOUT page ("Director's notes")

1. **Two-column intro** (grid `5fr / 6fr`, gap 6vw, collapses to one column under 800px).
   - Left: **contact sheet**: a 2×2 grid inside a `#020d0f` panel (padding 16px, radius 6px, gap 10px), caption text spanning both columns (11px, letter-spacing .1em, mute). Each tile: aspect-ratio 3/4, radius 3px, image or gradient, `filter:grayscale(.8) contrast(1.1)`. **Hover:** colour returns and the tile scales to 1.04 and rises above the others (.6s `cubic-bezier(.16,1,.3,1)`). Every second tile has `margin-top:30px` for a staggered look.
   - Right: `h2` "Director's <em>notes</em>", one larger intro paragraph (19px) and one normal paragraph, both `.sub`.
2. **"Kit"** (skills as chips): grid `auto-fit minmax(220px,1fr)`, gap 40px, margin-top 6vh. Three groups, each with an italic Fraunces 24px amber heading and pill chips (1px line border, radius 99px, 13px text, padding 4px 12px). **Chip hover:** background becomes `--ink`, text `--bg`, and the chip lifts `translateY(-3px)` (.3s).
3. **Proficiency bars:** stack (gap 22px, max-width 760px, margin-top 12vh). Row grid `140px 1fr 44px`, gap 16px: label, bar, value. The bar is a 2px `--line` track with a 4px amber fill (width = value%, `box-shadow:0 0 14px amber`). The fill runs a **1.6s `cubic-bezier(.16,1,.3,1)` width 0 → value animation each time the About page becomes visible**.
4. **"Hall of <em>frames</em>"** (achievements): `h2` with margin 14vh top / 5vh bottom, then an unstyled list. Each row: grid `70px 1fr auto`, gap 16px, padding 20px 0, `border-top:1px solid --line`; year in Fraunces italic 20px amber; title; right-aligned small mute detail. **Hover:** background `linear-gradient(90deg, rgba(255,178,74,.1), transparent)` and padding-left 16px (.4s).

---

## 12. JOURNEY page ("The long take")

- `h2` "The <em>long take</em>", then a **vertical timeline** (margin-top 8vh, padding-left 6vw, max-width 900px).
- A 1px `--line` rail at left 10px runs the full height. Over it sits an amber **progress fill** (1px wide, `box-shadow:0 0 12px amber`) whose height = `clamp(0, timelineHeight, innerHeight*.7 - timelineTop)`. It grows as the user scrolls and shrinks if they scroll back.
- Each entry (padding-bottom 9vh): a teal 13px label (letter-spacing .06em) for the date range, an h3 (Fraunces 300, `clamp(28px,4vw,48px)`, line-height 1.1), and a `.sub` description. A **12px circular node** sits on the rail (left `-6vw`, top 12px): `--bg` fill with a 1px mute border.
- **Lit state:** an entry is "lit" when its top is above `innerHeight*.7`. Unlit: opacity .3. Lit: opacity 1 (.8s); the node turns amber with an amber border and an 8px halo ring `rgba(255,178,74,.15)` (.6s). The lit state toggles both ways on scroll. Run the update on scroll while Journey is active, and once after the iris transition ends.

---

## 13. Contact footer (global, shown beneath every page)

- Sits after all pages (outside the page containers), so it appears at the bottom of Home, Work, About and Journey. Top border `1px --line`, centred, padding `16vh 0 12vh`.
- Contents: a `.sub` line ("Have a scene in mind?"), then the **magnetic email link**: Fraunces italic 300, `clamp(30px,6.4vw,92px)`, line-height 1.1, padding 2vh 2vw, lens label "Send", hover colour amber. Below it: a row of 3 social links (13px, mute, hover to ink; gap 28px) and a 11px copyright line (letter-spacing .1em, mute, margin-top 8vh).
- **Magnetic effect:** on pointer move, if the pointer is within `rect.width/1.6` of the link's centre, apply `transform: translate(dx*.18px, dy*.3px)` (dx, dy = pointer minus centre); otherwise clear it. `transition: transform .25s ease-out`.

---

## 14. Colour / Noir mode (global switch)

Clicking the nav toggle:
1. The white **flash overlay** animates opacity 0 → 1 in 160ms (`fill:forwards`).
2. At full white: toggle `body.noir`, flip the state variable, switch bokeh saturation target (85 ↔ 0), update the button label.
3. The flash animates opacity 1 → 0 over 800ms `ease-out`.

Noir changes:
- CSS tokens switch to the Noir column in §1 (body background transitions .6s).
- Grain opacity rises to .17.
- Posters, hover preview, reel panes and contact-sheet tiles get `filter:grayscale(1)` (about `brightness(.85)`).
- Bokeh drains to greyscale; gyroscope rings switch to greys.
- `.sub`, nav buttons, `small`, `.hint` and timeline date labels switch to monospace (`ui-monospace, Menlo, monospace`).
- Flashlight base text darkens to `#333`.
Layout never changes between modes. The mode is not persisted (starts in Colour on every visit).

---

## 15. Responsive, accessibility and performance

- ≤ 800px: two-column About collapses to one; fewer bokeh orbs (9); smaller gyro (R×.22); grain animation off; stats padding 8vh; cursor lens, dot and hover preview hidden on coarse pointers; reel width `min(300px,62vw)`; filmstrip scrolls horizontally.
- Honour `prefers-reduced-motion`: disable CSS animations, shrink transition durations to ~0, draw bokeh/gyro as a single frame, collapse the iris/loader durations.
- `:focus-visible` outline 2px amber, offset 4px. All interactive elements are real `<button>`/`<a>` with labels. Nav uses `aria-current="page"`. The reel is keyboard operable (§10.1).
- Do not start loops that do work when the viewport has zero size. All `requestAnimationFrame` loops must be cheap and guarded.
- Viewport meta must include `viewport-fit=cover`.
- Keep total payload small: only the two Google Fonts and inline SVG; images (when added later) lazy-loaded.

---

## 16. Data model (all content lives here — placeholders for now)

```
site:      { name, roleLine, flashSentence(+highlight words), emailLabel, socials[3], copyright }
projects:  [ { name, tagline, year, gradient, tags[], description, demoUrl, codeUrl } ]   // 4 in demo; reel and list adapt to count
stats:     [ { value, suffix, label } ]  // 3
marquee:   [ 6 words ]
about:     { introLarge, introNormal, contactSheet[4 images], kit[3 groups with chips], bars[4 {label, value}], awards[4 {year, title, detail}] }
journey:   [ { dateLabel, title, text } ]  // 4
```
Render every section from this data so content can change without touching code.

---

## 17. Acceptance checklist (must all pass)

1. Loader: radar sweep, 000→100 counter (2.4s), iris-close reveal, then the name letters rise in with stagger.
2. Name letters change weight near the cursor; the flashlight sentence is revealed under the cursor.
3. Marquee runs continuously and skews/accelerates with scroll speed; stat numbers scrub up and down with scroll.
4. Filmstrip posters tilt in 3D, show a cursor-following spotlight, go from muted to full colour on hover, and display outlined ghost numbers.
5. Every page change uses the click-origin iris wipe with a "SCENE 0X" title card; bokeh hues and the gyroscope position glide to the new page's values.
6. The 3D gyroscope is always visible, rotates with time, scroll and pointer, and relocates per page.
7. Work page: the drag-to-spin reel works with inertia, snap, depth fade, click and arrow keys; project rows shift, turn amber and show a floating, tilting poster on hover; click expands an accordion (one open at a time).
8. About page: staggered contact sheet with colour-on-hover, inverting skill chips, bars that fill on every visit, and highlighted award rows.
9. Journey page: the amber rail fills with scroll and entries light up both ways.
10. Footer: magnetic email link on every page.
11. Colour ↔ Noir switch with white flash, greyscale bokeh/posters/gyro and monospace labels.
12. Custom lens cursor with amber dot and contextual labels; native cursor on touch devices.
13. Grain, progress bar and `FRAME 0001 / 0480` counter present on every page.
14. **No sound and no text-scramble effects anywhere.**
15. Works at 375px, 800px and 1440px wide with no horizontal page scroll, and with reduced motion enabled.

Build this exactly as specified, then run through the checklist and fix any gaps before finishing.

---

## 18. ADDITIONS: Portrait, Certifications gallery, Résumé block, and upload workflow

### 18.0 How the owner adds files (applies to all three features)
Two ways, both required:
1. **Permanent (production):** the owner drops files into these folders and lists them in `data.js`. The page renders from that data, with no code change:
   - `/assets/portrait/portrait.jpg` (3:4, at least 1200px tall)
   - `/assets/certificates/*` (JPG/PNG/WebP/PDF, any number)
   - `/assets/resume/resume.pdf`
2. **Upload slots (edit mode):** every slot below contains a visible upload control, exactly as in the demo. In the public production build, the slots are hidden unless the URL contains `?edit`. An upload in edit mode only previews in the owner's browser using `URL.createObjectURL`. It does not persist. Show a small notice in edit mode: "Preview only. Add the file to /assets and data.js to publish."
In `data.js` add: `portrait: { src, alt }`, `certificates: [ { title, issuer, year, file, type: "image" | "pdf" } ]`, `resume: { file, label }`. If a file is missing, show the placeholder state described below instead of a broken image.

### 18.1 Portrait (About page, left column, top)
- Placement: **top of the About left column, above the contact sheet**. It is the first thing a visitor sees about the person. The contact-sheet grid stays beneath it, unchanged.
- Frame: a `<label>` block, aspect-ratio 3/4, radius 6px, `overflow:hidden`, margin-bottom 18px. Placeholder background: `linear-gradient(160deg,#c97b4a,#3b1f2b 60%,#0b2230)`. A 1px `rgba(255,255,255,.3)` inner frame inset 10px (`::after`, `pointer-events:none`). A small slate tag at bottom-left: "TAKE 01 — SLATE" (10px, weight 800, letter-spacing .2em, `--ink` background, `--bg` text, padding 3px 8px).
- Photo: `object-fit:cover`, filling the frame, `filter:grayscale(.35) contrast(1.05)`. **Hover:** filter removed and image scales to 1.04 (colour .6s; scale 1.2s `cubic-bezier(.16,1,.3,1)`). Noir mode: always `grayscale(1)`.
- **Reveal animation:** every time the About page becomes visible, the frame reveals from top to bottom with `clip-path: inset(0 0 100% 0)` → full over 1.3s `cubic-bezier(.16,1,.3,1)`.
- Placeholder (no photo): centred text "Your portrait" (Fraunces italic 300, 36px) plus "Click to upload a photo / 3:4 · at least 1200px tall" (12px, letter-spacing .1em). Lens label "Upload" (edit mode). With a photo present the placeholder is hidden.
- Use a real `<img>` with `alt` text and `loading="eager"`; provide `width`/`height` to avoid layout shift.

### 18.2 Certifications gallery (About page)
- Placement: on the About page **between the proficiency bars and "Hall of frames"**. Heading `h2` "Certified <em>prints</em>" (margin 14vh top, 5vh bottom).
- Grid: `repeat(auto-fill, minmax(230px,1fr))`, gap 18px. Each certificate is a **card styled like a film print**: aspect-ratio 4/3, radius 4px, 1px `--line` border, padding 16px, content aligned bottom-left, white text with soft shadow. Title: Fraunces 600, 19px; below it a small line (issuer · year, 11px).
  - Image certificates: the image as `center/cover` background. PDF certificates: gradient background plus a white "PDF" badge at top-left (800 weight, 11px, letter-spacing .2em, black text). Placeholder certificates (no file): a diagonal gradient.
  - **Hover:** the card lifts `translateY(-8px) rotate(-.8deg)` with shadow `0 26px 50px rgba(0,0,0,.5)` (.5s `cubic-bezier(.16,1,.3,1)`). Lens label "View". Noir mode: `grayscale(1)`.
- The **last tile is always the upload tile** ("+ Add certificates"): dashed 1px mute border, no fill, centred "+" (Fraunces 200, 54px) and label; hover turns border and text amber. Its input accepts `image/*,application/pdf` with `multiple`. In production it is shown only in edit mode.
- **Opening a certificate:**
  - Image: a full-screen **lightbox** (fixed, z-index 55, background `rgba(2,13,15,.94)`, fades in .4s). The image is shown `contain` inside a box `min(88vw,1000px) × min(78vh,720px)`, scaling from .94 to 1 over .6s. Clicking anywhere or pressing Escape closes it.
  - PDF: opens in a new tab.
  - Placeholder: the lightbox shows the gradient with the title and issuer.
- Cards are focusable (`role=button`, `tabindex=0`, Enter opens). In edit mode each uploaded card has a small round "×" remove button (top-right). Uploaded files appear in the grid instantly, before the add tile.
- Works for any number of certificates. The grid wraps; no carousel.

### 18.3 Résumé block (Journey page, below the timeline)
- Placement: the **end of the Journey page**, directly under the timeline and above the global footer, because the résumé is the summary of the journey. Margin-top 6vh.
- Container: 1px `--line` border, radius 6px, padding `5vh 4vw`, flex with wrap and `space-between`, `background: linear-gradient(110deg, rgba(255,178,74,.08), transparent 60%)`.
- Left: kicker "RÉSUMÉ — THE FULL CUT" (11px, letter-spacing .2em, teal), an h3 (Fraunces 300, `clamp(26px,4vw,44px)`), and a `.sub` line showing the **file name** when a résumé exists, or the "No file yet. Upload your PDF to enable View and Download." message otherwise.
- Right: three pill buttons (padding 12px 24px, 1px `--ink` border, 13px, weight 600, letter-spacing .06em):
  - **View**: opens the PDF in a new tab (lens label "Open").
  - **Download**: downloads it as `resume.pdf` (lens label "Save").
  - **Upload / replace**: ghost style (mute text, `--line` border), a file input accepting `.pdf,.doc,.docx`; edit mode only in production.
  - Hover: fills with `--ink`, text becomes `--bg` (.3s). With no file, View and Download are `aria-disabled=true` at 35% opacity with pointer events off.
- **Footer "Résumé" link** (third social link): if a résumé exists, it opens it in a new tab. If not, it runs the normal iris transition to Journey and then smooth-scrolls the résumé block to the centre of the viewport.
- Keep a `resume.pdf` in `/assets/resume/` so the production site has View and Download enabled by default.

### 18.4 Updated acceptance checklist (additions)
16. About page shows the portrait slot at the top of the left column with the top-to-bottom clip reveal; uploading (edit mode) or setting `portrait.src` displays the photo with hover colour and zoom.
17. "Certified prints" gallery appears between the bars and Hall of frames; cards lift and tilt on hover; images open in the lightbox (Escape or click to close); PDFs open in a new tab; the add tile uploads multiple files; Noir mode greyscales the cards.
18. Journey page ends with the résumé block; View, Download and Upload work; with no file the buttons are disabled; the footer Résumé link behaves as in 18.3.
19. All uploads gracefully fall back to placeholders when a file is missing; nothing breaks if there are 0, 3 or 30 certificates.
