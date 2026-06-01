# Performance Path — UCLA CS 188 HCI Prototype

> A music app for athletes that centers **self-understanding**, not playlists.
> The central object is the **Performance Path** — a felt curve of how each song
> moves your performance.

This is a **presentation-ready Figma-quality prototype**, not a production app.
All data is hardcoded; AI outputs are simulated. The point is the
**representation**, the **interaction flow**, and the **values-centered design**
— shaped by iterative user testing.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

On desktop the prototype renders inside a phone frame with HCI presenter notes
on either side. On mobile / narrow viewports it goes full-bleed.

## Screens

| Route | Purpose |
| --- | --- |
| `/` | Home — activities, taste, profile |
| `/activities` | All activities (Activities tab) |
| `/activity/sprinting` | Mood, energy, goals, **Performance Path**, start workout |
| `/path` | Path tab — quick view of tonight's path |
| `/builder/sprinting` | Shape the path. The path is primary, the playlist is secondary. |
| `/song/[id]` | Song reflection — AI observation + user-driven "why?" |
| `/summary/sprinting` | Post-workout summary, music impact, generated reflection |
| `/insights` | Long-term patterns the AI noticed |
| `/profile` | Profile + privacy posture |

## HCI concepts demonstrated

- **Representation**: Performance Path replaces the playlist as the central object
- **Value**: Self-understanding (how music affects me)
- **AI Role**: Quiet pattern detection — never the protagonist
- **User Role**: Reflection and decision making
- **Iterative refinement**: navigation made obvious; song reflection made specific
  (both per prior user-testing failures)

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind · Framer Motion · lucide-react.
No backend, no auth, no API integrations — by design.
