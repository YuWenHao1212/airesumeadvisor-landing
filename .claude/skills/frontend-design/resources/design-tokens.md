# AI Resume Advisor - Design Tokens

## Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `primary-50` | `#EFF6FF` | Light backgrounds |
| `primary-100` | `#DBEAFE` | Hover states |
| `primary-500` | `#3B82F6` | Default brand |
| `primary-600` | `#2563EB` | Primary buttons |
| `primary-700` | `#1D4ED8` | Hover states |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#10B981` | Success states, positive metrics |
| `warning` | `#F59E0B` | Warning states |
| `error` | `#EF4444` | Error states |

### Gradients
```css
/* CTA Gradient - Purple to Pink */
--gradient-cta: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);

/* Dark Gradient - For dark sections */
--gradient-dark: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);

/* Hero Background */
--gradient-hero: linear-gradient(to bottom right, #F8FAFC, #FFFFFF, #EFF6FF);
```

## Typography

### Font Stack
```css
--font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif;
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

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Colored shadows for buttons */
--shadow-primary: 0 10px 25px -5px rgb(37 99 235 / 0.25);
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
