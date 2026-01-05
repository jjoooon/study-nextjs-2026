# Next.js Frontend Application

A modern, scalable Next.js application with Redux Toolkit, featuring a feature-based architecture and comprehensive testing setup.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/), [Playwright](https://playwright.dev/), [Storybook](https://storybook.js.org/)
- **API Mocking**: [MSW](https://mswjs.io/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   └── (marketing)/       # Marketing route group
│
├── features/              # Feature-based modules ✨
│   ├── auth/             # Authentication feature
│   ├── dashboard/        # Dashboard feature
│   ├── posts/            # Posts feature
│   ├── ui/               # UI state management
│   └── users/            # Users feature
│
├── shared/               # Truly shared code
│   ├── components/       # Reusable components
│   │   ├── common/       # ContentLoader, ErrorBoundary, etc.
│   │   ├── layout/       # Navigation, layout components
│   │   └── ui/           # Button, primitives
│   └── utils/           # Logger, performance utilities
│
└── store/                # Redux store configuration
    ├── hooks.ts         # Typed hooks (useAppDispatch, useAppSelector)
    ├── index.ts         # Store setup
    ├── middleware/      # Custom middleware
    │   ├── performance.ts
    │   └── registry.ts
    ├── selectors/       # Optimized selectors
    ├── slices/          # API type definitions
    └── testing.tsx      # Test utilities
```

## 🏗️ Architecture

### Feature-Based Structure

Each feature is self-contained with its own components, hooks, and store logic:

```typescript
features/
├── auth/
│   ├── components/      # Auth-specific components
│   ├── hooks/          # Auth hooks (useAuth, useIsAuthenticated)
│   ├── store/          # Redux slices & API
│   └── index.ts        # Public API
└── users/
    ├── components/     # UserList, UserForm
    ├── hooks/         # User hooks
    ├── store/         # Users API slice
    └── index.ts       # Public API
```

### Redux Store Configuration

Centralized store with dynamic middleware registry:

```typescript
// store/index.ts
- Configure Redux store
- Register middleware
- Setup RTK Query
- Export types (RootState, AppDispatch)

// store/middleware/
- performance.ts    # Performance monitoring
- registry.ts       # Dynamic middleware registration
```

### Import Aliases

```typescript
import { UserList } from '@/features/users';        // Feature modules
import { Button } from '@/shared/components';       // Shared components
import { useAppDispatch } from '@/store';           // Redux hooks
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run storybook` | Start Storybook (http://localhost:6006) |
| `npm run build-storybook` | Build Storybook for production |
| `npm run analyze` | Analyze bundle size |

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug
```

### Component Testing with Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🎨 Key Features

### Redux Toolkit + RTK Query

- **Centralized store** with typed hooks
- **RTK Query** for data fetching with caching
- **Dynamic middleware registry** for team scalability
- **Performance monitoring** middleware

### Feature Isolation

Each feature is completely self-contained:
- Independent Redux slices
- Feature-specific hooks
- Co-located components
- Clear public API via `index.ts`

### Shared Components

- **Common components**: ContentLoader, ErrorBoundary, SuspenseBoundary
- **Layout components**: Navigation
- **UI primitives**: Button
- **Utilities**: Logger, performance monitoring

### API Mocking with MSW

Mock Service Worker for development and testing:
```typescript
// mocks/handlers/
- API request handlers
- Response fixtures
```

## 📦 Building for Production

```bash
# Build
npm run build

# Analyze bundle size
npm run analyze

# Start production server
npm start
```

## 🔧 Configuration

### Path Aliases

```json
{
  "@/*": "./src/*",
  "@/features/*": "./src/features/*",
  "@/shared/*": "./src/shared/*"
}
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NODE_ENV=development
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React 19](https://react.dev/learn)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js and Redux Toolkit**
