# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BASE_SYSTEM_PROMPT = """
You are an expert frontend engineer skilled at crafting beautiful, performant frontend applications.

<tech_stack>
Use vanilla HTML, CSS, & Javascript. Use Tailwind CSS for your CSS variables.
</tech_stack>

<output>
Generate complete, self-contained HTML code for the requested frontend application. Include all CSS and JavaScript inline.

CRITICAL: You must wrap your HTML code in triple backticks with html language identifier like this:
```html
<!DOCTYPE html>
<html>
...
</html>
```

Our parser depends on this format - do not deviate from it!
</output>
"""

USER_PROMPT = """
<user_prompt>
Build me a multi-page portfolio website for a content designer. 
My details: 
- Name: Sabrina Kan 
- Niche: Content design
- Bio: Hi there, I’m Sabrina! I specialize in building scalable content systems and solving complex content problems. 

Pages:
- Home — A striking landing page with a short hero introduction and navigation to all other sections
- Case Studies — A dedicated page listing in-depth case studies, each opening into its own detail page
- Writing Samples — A page showcasing writing samples, with previews and links to read each piece in full
- About Me — A personal bio page with a warm but professional tone
- Resume — A clean, readable resume page (also consider a downloadable PDF option)

General guidelines:
- Populate all pages with realistic placeholder content suited to a writer's portfolio (sample case study titles, writing excerpts, a plausible bio, etc.)
- Navigation should be consistent across all pages with clear active states
- Prioritize readability — long-form content should be comfortable to read on screen
- Code should be clean, well-commented, and easy to extend later
""""

DISTILLED_AESTHETICS_PROMPT = """
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
"""

CYBERPUNK_THEME_PROMPT = """
<always_use_cyberpunk_theme>
Always design with Cyberpunk aesthetic:
- Cold, high-tech color palettes (black, neon blue, neon pink, neon purple, silver, chrome)
- Organic shapes mixed with technical elements
- City-inspired patterns and textures
- Modern, yet dark atmosphere
- Retro-futuristic typography
</always_use_cyberpunk_theme>
"""

NEON_THEME_PROMPT = """
<always_use_neon_theme>
Always design with neon aesthetic:
- Modern, yet professional neon color palettes (black, neon blue, neon yellow, neon purple, silver, chrome)
- Organic shapes mixed with technical elements
- City-inspired patterns and textures
- Bright and modern atmosphere against dark background
- Modern, futuristic typography
</always_use_neon_theme>
"""

PASTEL_THEME_PROMPT = """
<always_use_pastel_theme>
Always design with a dark aesthetic contrasted with pastel accents:
- Modern, yet professional dark color palettes (black, dark grey) with pastel accents (pastel green, pastel blue, pastel purple)
- Organic shapes mixed with modern elements
- Soft patterns and textures
- Muted atmosphere against dark background
- Modern, rounded typography
</always_use_pastel_theme>
"""

## Architecture

Three files, each with a single responsibility:

- **`index.html`** — All content and structure. Sections in order: Nav, Hero, Work (case study cards), Skills band, About, Contact form, Footer.
- **`styles.css`** — All styles. Organized by section with clear comment banners. Design tokens are CSS custom properties defined in `:root` (colors, typography, spacing, radius).
- **`main.js`** — Two behaviors only: IntersectionObserver-based active nav highlighting, and contact form submit feedback (no backend — form does not actually send).

## Design tokens (`:root` in `styles.css`)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FAF9F7` | Page background |
| `--surface` | `#F2EFE9` | Alt section background |
| `--ink` | `#1A1814` | Primary text |
| `--ink-muted` | `#6B6760` | Secondary text |
| `--accent` | `#C8553D` | CTA, tags, highlights |
| `--accent-dk` | `#A8402B` | Accent hover state |
| `--border` | `#E2DED7` | Borders, dividers |
| `--font-serif` | Georgia | Headings |
| `--font-sans` | Inter / system-ui | Body |

Always use these tokens rather than raw hex values when adding or editing styles.

## Conventions

- BEM-style class naming (`.block__element`, `.block--modifier`)
- Fluid sizing via `clamp()` — avoid fixed px for font sizes and section padding
- Responsive breakpoints: 640px (about grid) and 480px (nav, footer)
- The contact form has no backend; keep submit handling client-side only
