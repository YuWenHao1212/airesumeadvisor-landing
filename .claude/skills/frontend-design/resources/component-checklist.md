# Component Development Checklist

Use this checklist when creating or reviewing components.

## Structure

- [ ] Component has TypeScript interface for props
- [ ] Default values provided for optional props
- [ ] Uses `<slot />` for flexible content when appropriate
- [ ] Component is in correct directory (`src/components/`)

## Styling

- [ ] Uses Tailwind utility classes (not inline styles)
- [ ] Follows design tokens (see `design-tokens.md`)
- [ ] Responsive classes applied (`sm:`, `md:`, `lg:`)
- [ ] Hover and focus states defined
- [ ] Dark mode support (if applicable)

## Typography

- [ ] Correct heading hierarchy (h1 → h2 → h3)
- [ ] Font weights match design system
- [ ] Line heights appropriate for content type
- [ ] No orphaned words in headlines (use `&nbsp;` or CSS)

## Colors

- [ ] Uses design system colors (not arbitrary hex)
- [ ] Sufficient contrast (WCAG 2.1 AA: 4.5:1 for text)
- [ ] Interactive elements have visible state changes

## Animation

- [ ] Transitions are smooth (200-300ms typical)
- [ ] No jarring or flashy effects
- [ ] `prefers-reduced-motion` respected
- [ ] Key moments animated (hover, page load)

## Accessibility

- [ ] Semantic HTML elements used
- [ ] Alt text for images
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Focus indicators visible

## Performance

- [ ] Images optimized (WebP, lazy loading)
- [ ] No render-blocking resources
- [ ] Minimal JavaScript (CSS-first approach)
- [ ] Component is tree-shakeable

## Testing

- [ ] Desktop: 1920px, 1440px, 1280px
- [ ] Tablet: 1024px, 768px
- [ ] Mobile: 414px, 375px
- [ ] All interactive states tested
- [ ] No console errors

## Code Quality

- [ ] Props documented with JSDoc/TypeScript
- [ ] Consistent naming (PascalCase for components)
- [ ] No magic numbers (use design tokens)
- [ ] Code formatted with Prettier
