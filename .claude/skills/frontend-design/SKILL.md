---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications using Astro and Tailwind CSS. Generates creative, polished code that avoids generic AI aesthetics.
---

# Frontend Design Skill for AI Resume Advisor Landing Page

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Project Context

This is a **Landing Page** for AI Resume Advisor built with:
- **Framework**: Astro 4.x (Static Site Generation)
- **Styling**: Tailwind CSS 3.x
- **Deployment**: Azure Static Web Apps

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Constraints**: Technical requirements (Astro components, Tailwind CSS, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

---

## Astro Component Guidelines

### Component Structure

```astro
---
// Frontmatter: TypeScript/JavaScript
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

const { title, variant = 'primary' } = Astro.props;
---

<!-- Template -->
<section class="...">
  <h2>{title}</h2>
  <slot />
</section>

<style>
  /* Scoped styles (optional, prefer Tailwind) */
</style>
```

### Best Practices

1. **Props Interface**: Always define TypeScript interfaces for props
2. **Default Values**: Provide sensible defaults with destructuring
3. **Slots**: Use `<slot />` for flexible content injection
4. **Scoped Styles**: Use `<style>` only for complex animations not achievable with Tailwind

---

## Frontend Aesthetics Guidelines

### Typography

Choose fonts that are beautiful, unique, and interesting:

**AVOID** (Generic AI fonts):
- Inter, Roboto, Arial, system fonts
- Sans-serif defaults

**USE** (Distinctive choices):
- Display: Playfair Display, Space Grotesk, Clash Display, Cabinet Grotesk
- Body: Lora, Source Serif Pro, DM Sans, Plus Jakarta Sans
- Monospace: JetBrains Mono, Fira Code (for code snippets)

**Font Pairing Examples**:
```css
/* Professional & Modern */
--font-display: 'Cabinet Grotesk', sans-serif;
--font-body: 'Plus Jakarta Sans', sans-serif;

/* Elegant & Editorial */
--font-display: 'Playfair Display', serif;
--font-body: 'Source Serif Pro', serif;
```

### Color & Theme

Commit to a cohesive aesthetic using CSS variables:

**Design System for AI Resume Advisor**:
```css
:root {
  /* Primary - Professional Blue */
  --color-primary-50: #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;

  /* Accent - Success Green */
  --color-accent: #10B981;

  /* Gradients */
  --gradient-cta: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
  --gradient-dark: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
}
```

**Rules**:
- Dominant colors with sharp accents > timid, evenly-distributed palettes
- Use gradients purposefully for CTAs and hero sections
- Maintain contrast ratios for accessibility (WCAG 2.1 AA)

### Motion & Animation

Focus on high-impact moments:

**CSS-only Animations (Preferred for Astro)**:
```css
/* Staggered reveal on page load */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
}

/* Stagger children */
.stagger-children > * {
  opacity: 0;
}
.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
```

**Tailwind Animation Classes**:
```html
<!-- Hover lift effect -->
<div class="transition-transform duration-200 hover:-translate-y-1">

<!-- Smooth color transitions -->
<button class="transition-colors duration-200 hover:bg-blue-700">

<!-- Scale on hover -->
<div class="transition-transform duration-300 hover:scale-105">
```

**Key Moments to Animate**:
1. Page load (staggered hero elements)
2. Scroll reveals (intersection observer)
3. Hover states (buttons, cards)
4. Tab transitions (feature tabs)

### Spatial Composition

Create visual interest with:

- **Asymmetry**: Don't center everything
- **Overlap**: Elements breaking grid boundaries
- **Negative Space**: Generous whitespace for breathing room
- **Grid Breaking**: One element that "breaks" the container

**Example - Hero with Overlap**:
```html
<section class="relative overflow-hidden">
  <div class="container-default grid lg:grid-cols-2 gap-12">
    <div class="relative z-10">
      <!-- Text content -->
    </div>
    <div class="relative lg:absolute lg:-right-20 lg:top-1/2 lg:-translate-y-1/2">
      <!-- Image breaking out of container -->
    </div>
  </div>
</section>
```

### Backgrounds & Visual Details

Create atmosphere and depth:

**Techniques**:
```html
<!-- Gradient mesh background -->
<div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">

<!-- Noise texture overlay -->
<div class="absolute inset-0 opacity-50" style="background-image: url('/images/noise.png');">

<!-- Decorative blobs -->
<div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30">

<!-- Grid pattern -->
<div class="absolute inset-0" style="background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px); background-size: 50px 50px;">
```

---

## Anti-Patterns: What to AVOID

### Generic AI Aesthetics ("AI Slop")

**Typography**:
- ❌ Inter, Roboto, Arial everywhere
- ❌ Same font weight throughout
- ❌ Default line-height and letter-spacing

**Colors**:
- ❌ Purple gradients on white (overused)
- ❌ Pastel rainbow palettes
- ❌ Gray-only neutral schemes

**Layout**:
- ❌ Everything centered
- ❌ Perfect symmetry always
- ❌ Predictable card grids
- ❌ Uniform border-radius everywhere

**Components**:
- ❌ Generic rounded buttons
- ❌ Same shadow on everything
- ❌ Cookie-cutter hero sections

---

## Component Examples for This Project

### Hero Section

```astro
---
import { LINKS } from '@config/links';
---

<section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
  <!-- Decorative elements -->
  <div class="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
  <div class="absolute bottom-20 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

  <div class="container-default relative z-10 pt-32 pb-20">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="stagger-children">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
          Land Your <span class="text-gradient">Dream Job</span>
          <br />with AI-Powered Resumes
        </h1>
        <p class="mt-6 text-xl text-gray-600 max-w-lg animate-slide-up" style="animation-delay: 0.1s;">
          Get a resume tailored to each job posting, using the right keywords to stand out.
        </p>
        <div class="mt-8 flex flex-wrap gap-4 animate-slide-up" style="animation-delay: 0.2s;">
          <a href={LINKS.signup} class="btn-primary group">
            Sign Up Free
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1">...</svg>
          </a>
          <a href={LINKS.howItWorks} class="btn-ghost">
            See How It Works
          </a>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="relative animate-fade-in" style="animation-delay: 0.3s;">
        <div class="relative rounded-2xl shadow-2xl overflow-hidden">
          <img src="/images/hero-mockup.webp" alt="AI Resume Advisor Dashboard" class="w-full" />
        </div>
        <!-- Floating badge -->
        <div class="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-bounce-slow">
          <span class="text-2xl font-bold text-green-600">83%</span>
          <span class="text-sm text-gray-500 block">Match Score</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CTA Button Component

```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const { href, variant = 'primary', size = 'md' } = Astro.props;

const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-500/25',
  secondary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  ghost: 'text-blue-600 hover:text-blue-700',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};
---

<a href={href} class:list={[baseClasses, variantClasses[variant], sizeClasses[size]]}>
  <slot />
</a>
```

---

## Checklist Before Committing

- [ ] Typography: Using distinctive fonts, not defaults
- [ ] Colors: Cohesive palette with intentional accents
- [ ] Layout: Visual interest through asymmetry or overlap
- [ ] Animation: Smooth transitions on key moments
- [ ] Backgrounds: Depth through gradients, textures, or effects
- [ ] Accessibility: Proper contrast, focus states, alt text
- [ ] Responsive: Tested at 375px, 768px, 1024px, 1440px
- [ ] Performance: Images optimized, minimal JS

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro Documentation](https://docs.astro.build)
- [Google Fonts](https://fonts.google.com)
- [Coolors - Color Palette Generator](https://coolors.co)
- [Heroicons](https://heroicons.com)

---

**Remember**: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
