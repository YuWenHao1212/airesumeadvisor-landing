# AI Resume Advisor - Design Tokens

> **Note**: Colors aligned with Bubble Web App for brand consistency.

## Color Palette

### Primary Colors (Blue)
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#0183FF` | Primary buttons, CTAs, links |
| `primary-hover` | `#0170E0` | Hover states |
| `primary-light` | `#E2F1FF` | Light backgrounds, badges |
| `primary-selected` | `#EBF5FF` | Selected/active states |
| `primary-contrast` | `#FFFFFF` | Text on primary buttons |

### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#1D2125` | Headlines, important text |
| `text-body` | `#6A6C6E` | Body text, paragraphs |
| `text-caption` | `#8A8C8E` | Captions, labels |
| `text-placeholder` | `#9CA3AF` | Placeholder text, disabled |

### Background Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg-page` | `#F5F5F5` | Page background |
| `bg-surface` | `#E5E5E5` | Card/container background |
| `bg-white` | `#FFFFFF` | Clean sections, cards |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#38A169` | Success states, positive metrics |
| `alert` | `#F59E0B` | Warning states, caution |
| `destructive` | `#E53E3E` | Error states, delete actions |

### Gradients
```css
/* Hero Background - Subtle blue tint */
--gradient-hero: linear-gradient(180deg, #FFFFFF 0%, #EBF5FF 100%);

/* CTA Gradient - Primary blue accent */
--gradient-cta: linear-gradient(135deg, #0183FF 0%, #0170E0 100%);

/* Dark Section */
--gradient-dark: linear-gradient(135deg, #1D2125 0%, #2D3748 100%);
```

## Typography

### Font Stack
```css
/* Display - Headlines */
--font-display: 'Cabinet Grotesk', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Body - Paragraphs */
--font-sans: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes
| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Labels, captions |
| `text-sm` | 14px | 20px | Secondary text |
| `text-base` | 16px | 24px | Body text |
| `text-lg` | 18px | 28px | Lead paragraphs |
| `text-xl` | 20px | 28px | Section intros |
| `text-2xl` | 24px | 32px | H3 headings |
| `text-3xl` | 30px | 36px | H2 headings |
| `text-4xl` | 36px | 40px | H1 mobile |
| `text-5xl` | 48px | 48px | H1 tablet |
| `text-6xl` | 60px | 60px | H1 desktop |

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasis, buttons |
| `font-semibold` | 600 | Subheadings |
| `font-bold` | 700 | Headlines |

## Spacing

### Section Spacing
```css
/* Desktop */
.section-padding { @apply py-24; }

/* Tablet */
@screen md { .section-padding { @apply py-20; } }

/* Mobile */
@screen sm { .section-padding { @apply py-16; } }
```

### Container
```css
.container-default {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
}
```

### Component Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `gap-xs` | 4px | Tight spacing |
| `gap-sm` | 8px | Small gaps |
| `gap-md` | 16px | Default gaps |
| `gap-lg` | 24px | Section gaps |
| `gap-xl` | 32px | Large sections |
| `gap-2xl` | 48px | Major sections |

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Primary button shadow */
--shadow-primary: 0 4px 14px 0 rgb(1 131 255 / 0.25);
```

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements |
| `rounded` | 6px | Buttons, inputs |
| `rounded-lg` | 8px | Cards |
| `rounded-xl` | 12px | Large cards |
| `rounded-2xl` | 16px | Hero images, modals |
| `rounded-full` | 9999px | Pills, avatars |

## Transitions

```css
/* Default transition */
--transition-default: all 0.2s ease-in-out;

/* For color changes */
--transition-colors: color 0.2s, background-color 0.2s, border-color 0.2s;

/* For transforms */
--transition-transform: transform 0.2s ease-out;

/* For complex animations */
--transition-all: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-0` | 0 | Default |
| `z-10` | 10 | Dropdowns |
| `z-20` | 20 | Sticky elements |
| `z-30` | 30 | Fixed headers |
| `z-40` | 40 | Modals backdrop |
| `z-50` | 50 | Modals content |

## Button Styles

### Primary Button
```css
.btn-primary {
  @apply bg-[#0183FF] text-white font-medium px-6 py-3 rounded-lg;
  @apply hover:bg-[#0170E0] transition-colors;
  @apply shadow-[0_4px_14px_0_rgb(1_131_255/0.25)];
}
```

### Secondary Button
```css
.btn-secondary {
  @apply bg-white text-[#1D2125] font-medium px-6 py-3 rounded-lg;
  @apply border border-[#E5E5E5] hover:border-[#0183FF] hover:text-[#0183FF];
  @apply transition-colors;
}
```

### Ghost Button
```css
.btn-ghost {
  @apply bg-transparent text-[#0183FF] font-medium px-6 py-3;
  @apply hover:bg-[#EBF5FF] rounded-lg transition-colors;
}
```
