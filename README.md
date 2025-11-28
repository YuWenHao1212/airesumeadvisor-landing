# AI Resume Advisor - Landing Page

Marketing landing page for [AI Resume Advisor](https://airesumeadvisor.com), built with Astro and Tailwind CSS.

## Tech Stack

- **Framework**: [Astro](https://astro.build) 4.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 3.x
- **Deployment**: Azure Static Web Apps
- **Monitoring**: Application Insights

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── layouts/          # Base HTML layouts
│   ├── pages/            # Page components (.astro)
│   ├── components/       # Reusable components
│   ├── styles/           # Global styles
│   └── config/           # Configuration files
├── public/               # Static assets
├── docs/                 # Documentation
└── .github/workflows/    # CI/CD pipelines
```

## Architecture

```
airesumeadvisor.com (Landing Page)
        ↓
app.airesumeadvisor.com (Bubble App)
        ↓
Azure Container API (Backend)
```

## Development

### Commands

| Command           | Action                               |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`   |
| `npm run preview` | Preview build locally                |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format with Prettier                 |

### Environment Variables

Create a `.env` file:

```bash
PUBLIC_BUBBLE_APP_URL=https://app.airesumeadvisor.com
PUBLIC_APP_INSIGHTS_KEY=your-key-here
```

## Deployment

Automatically deployed to Azure Static Web Apps on push to `main` branch.

### Manual Deploy

```bash
npm run build
az staticwebapp deploy --app-name airesumeadvisor-landing --source dist
```

## Documentation

- [Development Specification](./docs/DEVELOPMENT_SPEC.md)
- [Claude Code Guide](./CLAUDE.md)

## License

MIT
