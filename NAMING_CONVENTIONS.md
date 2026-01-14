# Naming Conventions

This document defines the naming conventions used throughout the project.

## File Naming

### Components: PascalCase
**React/Next.js component files** use **PascalCase**:

```
✅ CORRECT:
- DashboardStats.tsx
- RecentActivity.tsx
- UserList.tsx
- ContentLoader.tsx
- ErrorBoundary.tsx
- LoginForm.tsx

❌ INCORRECT:
- dashboardStats.tsx
- recent-activity.tsx
- user_list.tsx
```

### Non-Component Files: camelCase
**All other files** use **camelCase**:

```
✅ CORRECT:
- dateUtils.ts
- apiSlice.ts
- authSlice.ts
- dashboardSlice.ts
- uiSelectors.ts
- performance.ts
- logger.ts
- config.ts

❌ INCORRECT:
- date-utils.ts
- api_slice.ts
- AuthSlice.ts
```

### Special Files: lowercase
**Configuration and special files** use **lowercase**:

```
✅ CORRECT:
- package.json
- tsconfig.json
- next.config.ts
- tailwind.config.ts
- .eslintrc.json
- components.json

❌ INCORRECT:
- Package.json
- Tsconfig.json
```

## Directory Naming

### Feature Directories: camelCase
```
✅ CORRECT:
- features/dashboard/
- features/auth/
- features/users/
- features/posts/
- features/ui/

❌ INCORRECT:
- features/Dashboard/
- features/auth-system/
- features/user_management/
```

### Shared Directories: camelCase
```
✅ CORRECT:
- shared/utils/
- shared/components/
- shared/api/

❌ INCORRECT:
- shared/Utils/
- shared/Components/
- shared/api_helpers/
```

## Code Naming

### Components: PascalCase
```typescript
✅ CORRECT:
export function DashboardStats() {}
export const RecentActivity = () => {};
export default function UserList() {}

❌ INCORRECT:
export function dashboardStats() {}
export const recentActivity = () => {};
```

### Functions/Variables: camelCase
```typescript
✅ CORRECT:
const dateRange = { start: '', end: '' };
function formatDate() {}
const isActive = true;

❌ INCORRECT:
const DateRange = { start: '', end: '' };
function format_date() {}
const is_active = true;
```

### Types/Interfaces: PascalCase
```typescript
✅ CORRECT:
interface DashboardState {}
type DateRange = {}
interface UserProfile {}

❌ INCORRECT:
interface dashboardState {}
type dateRange = {}
interface user_profile {}
```

### Constants: UPPER_SNAKE_CASE
```typescript
✅ CORRECT:
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;

❌ INCORRECT:
const apiBaseUrl = 'https://api.example.com';
const max_retry_count = 3;
```

### Redux State/Slices: camelCase
```typescript
✅ CORRECT:
- dashboardSlice
- authSlice
- uiSlice
- dashboardReducer
- authReducer

❌ INCORRECT:
- DashboardSlice
- auth_slice
- AuthReducer
```

## React Hooks Naming

### Custom Hooks: camelCase with 'use' prefix
```typescript
✅ CORRECT:
- useDashboard()
- useAuth()
- useInjectReducer()
- useLazyReducer()

❌ INCORRECT:
- UseDashboard()
- use_dashboard()
- getDashboard()
- withAuth()
```

## CSS/Class Names

### Tailwind Classes: kebab-case (utility classes)
```jsx
✅ CORRECT:
<div className="bg-blue-500 text-white p-4 rounded-lg">

❌ INCORRECT:
<div className="bg_blue_500 textWhite">
```

### Custom CSS Classes: kebab-case
```css
✅ CORRECT:
.dashboard-container {}
.user-profile-card {}
.primary-button {}

❌ INCORRECT:
.dashboardContainer {}
.user_profile_card {}
.primaryButton {}
```

## Summary Table

| Type | Convention | Example |
|------|-----------|---------|
| **Component Files** | PascalCase | `DashboardStats.tsx` |
| **Non-Component Files** | camelCase | `dateUtils.ts` |
| **Directories** | camelCase | `features/dashboard/` |
| **Components** | PascalCase | `function UserList() {}` |
| **Functions/Variables** | camelCase | `const dateRange = {}` |
| **Types/Interfaces** | PascalCase | `interface DashboardState {}` |
| **Constants** | UPPER_SNAKE_CASE | `const API_BASE_URL` |
| **React Hooks** | camelCase + 'use' | `useDashboard()` |
| **CSS Classes** | kebab-case | `.dashboard-container` |

## Quick Checklist

Before committing code, verify:

- [ ] Component files are PascalCase (`MyComponent.tsx`)
- [ ] Non-component files are camelCase (`myUtils.ts`)
- [ ] Directories are camelCase (`features/dashboard/`)
- [ ] Component names are PascalCase (`function MyComponent()`)
- [ ] Functions/variables are camelCase (`const myVar`)
- [ ] Types/interfaces are PascalCase (`interface MyType`)
- [ ] Constants are UPPER_SNAKE_CASE (`const MY_CONST`)
- [ ] Hooks use 'use' prefix (`useMyHook()`)

## Why These Conventions?

### PascalCase for Components
- **Industry Standard**: React ecosystem convention
- **Visual Distinction**: Easy to identify components vs. functions
- **Tooling Support**: Works well with JSX/TSX tooling

### camelCase for Files/Functions
- **JavaScript Convention**: Standard JS/TS naming style
- **Readability**: Natural flow for multi-word names
- **Consistency**: Matches most npm packages and libraries

### kebab-case for CSS
- **CSS Convention**: Standard CSS naming practice
- **Separation of Concerns**: Distinguishes CSS from JS
- **Compatibility**: Works well with all CSS tools

## Enforcement

These conventions are enforced through:
- ESLint rules
- Prettier formatting
- Code review guidelines
- Pre-commit hooks (optional)

## Migration Guide

When renaming existing files:

1. **Rename the file** following the convention
2. **Update all imports** across the codebase
3. **Update exports** if necessary
4. **Run tests** to ensure nothing breaks
5. **Commit with clear message**: "refactor: rename X to Y for naming convention consistency"

Example:
```bash
# Before
src/features/dashboard/utils/date-utils.ts

# After (rename)
git mv src/features/dashboard/utils/date-utils.ts src/features/dashboard/utils/dateUtils.ts

# Update imports in all files
# From: import { foo } from './date-utils'
# To:   import { foo } from './dateUtils'
```

## References

- [React Naming Conventions](https://react.dev/learn/understanding-your-ui-as-a-tree#display-names)
- [TypeScript Style Guide](https://typescript-eslint.io/rules/)
- [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/)
