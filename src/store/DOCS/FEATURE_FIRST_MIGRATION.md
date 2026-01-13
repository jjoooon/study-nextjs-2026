# 🏗️ Feature-First Architecture Migration Guide

## ✅ Status: COMPLETED

The store has been successfully refactored to follow the **Feature-First architecture** pattern.

---

## 📊 What Changed

### Before (Store-Centric) ❌

```
src/store/
├── slices/api/              # API registry (confusing name)
├── selectors/               # Centralized selectors
│   ├── auth.ts
│   ├── ui.ts
│   └── index.ts
├── middleware/
│   └── registry.ts          # Duplicate code
└── reducers/
    └── registry.ts          # Duplicate code

src/features/
├── auth/store/
│   ├── authSlice.ts
│   └── apiSlice.ts          # No selectors here
└── ui/store/
    ├── uiSlice.ts
    └── index.ts             # No selectors here
```

**Problems:**
- ❌ Scatterd architecture (selectors in store, slices in features)
- ❌ Duplicate registry code
- ❌ Confusing directory names (`slices/api` is not actual slices)
- ❌ Reverse dependencies (types in store, usage in features)

---

### After (Feature-First) ✅

```
src/store/
├── api/                     # ✅ Renamed from slices/api
│   ├── config.ts
│   ├── registry.ts
│   └── types/
├── registry/                # ✅ NEW: Shared base class
│   └── base.ts              # ✅ Abstraction for registries
├── middleware/
│   └── registry.ts          # ✅ Now extends BaseRegistry
├── reducers/
│   └── registry.ts          # ✅ Now extends BaseRegistry
├── selectors/               # ⚠️  DEPRECATED (kept for compatibility)
│   ├── auth.ts
│   ├── ui.ts
│   └── index.ts             # Shows deprecation warning
├── index.ts
├── storage.ts
└── transforms.ts

src/features/
├── auth/
│   └── store/
│       ├── authSlice.ts
│       ├── authSelectors.ts # ✅ NEW: Moved from store/selectors
│       ├── apiSlice.ts
│       └── index.ts         # ✅ Exports selectors
└── ui/
    └── store/
        ├── uiSlice.ts
        ├── uiSelectors.ts   # ✅ NEW: Moved from store/selectors
        └── index.ts         # ✅ Exports selectors
```

**Benefits:**
- ✅ Clear module boundaries
- ✅ No reverse dependencies
- ✅ DRY principle (shared BaseRegistry)
- ✅ Feature encapsulation
- ✅ Better scalability

---

## 📋 Migration Changes

### 1. Registry Abstraction

**Created:** `src/store/registry/base.ts`

```typescript
// Abstract base class for all registries
export abstract class BaseRegistry<T extends RegistryEntry> {
  protected entries: Map<string, T>;
  protected isLocked: boolean;
  // ... shared logic

  abstract register(name: string, entry: T): void;
  abstract getAll(): T[];
}
```

**Benefits:**
- Eliminates code duplication
- Consistent API across registries
- Easier to test and maintain

---

### 2. Directory Renaming

**Changed:** `src/store/slices/api/` → `src/store/api/`

**Why:** `slices/api` was misleading (not actual slices, just config)

**Impact:** Updated import in `src/store/index.ts`

```typescript
// Before
import { getAllApiMiddleware } from './slices/api/registry';

// After
import { getAllApiMiddleware } from './api/registry';
```

---

### 3. Selectors Migration to Features

**Moved Files:**
- `src/store/selectors/auth.ts` → `src/features/auth/store/authSelectors.ts`
- `src/store/selectors/ui.ts` → `src/features/ui/store/uiSelectors.ts`

**Updated Feature Exports:**

```typescript
// src/features/auth/store/index.ts
export * from './authSlice';
export * from './apiSlice';
export * from './authSelectors'; // ✅ NEW
```

```typescript
// src/features/ui/store/index.ts
export * from './uiSlice';
export * from './uiSelectors'; // ✅ NEW
```

---

### 4. Deprecated Centralized Selectors

**File:** `src/store/selectors/index.ts`

Now shows deprecation warning:

```typescript
/**
 * @deprecated
 * ⚠️  Import from feature directories instead:
 *
 * ❌ import { selectAuthUser } from '@/store/selectors';
 * ✅ import { selectAuthUser } from '@/features/auth';
 */
```

**Note:** Old imports still work (backward compatible), but show warnings in IDE.

---

## 🔄 How to Migrate Your Code

### Step 1: Update Imports

**Find all selector imports:**

```bash
grep -r "from '@/store/selectors'" src/
```

**Replace with feature imports:**

```typescript
// ❌ BEFORE
import { selectAuthUser, selectIsAuthenticated } from '@/store/selectors';

// ✅ AFTER
import { selectAuthUser, selectIsAuthenticated } from '@/features/auth';
```

**Or specific selector file:**

```typescript
// ✅ ALSO VALID (more specific)
import { selectAuthUser } from '@/features/auth/store/authSelectors';
```

---

### Step 2: Update Type Imports

If you were importing selector types:

```typescript
// ❌ BEFORE
import type { AuthSelectors } from '@/store/selectors/auth';

// ✅ AFTER
import type { AuthSelectors } from '@/features/auth/store/authSelectors';
```

---

### Step 3: Update Feature Imports

Now you can import everything from the feature:

```typescript
// ✅ Clean: All from one place
import {
  authSlice,
  authApiSlice,
  selectAuthUser,
  selectIsAuthenticated,
  loginSuccess,
  logout
} from '@/features/auth';

// Or separate imports
import { selectAuthUser } from '@/features/auth';
import { useLoginMutation } from '@/features/auth/store/apiSlice';
```

---

## 📊 Feature-First Pattern

### Import Options

**Option 1: From Feature Index (Recommended)**
```typescript
import { selectAuthUser, loginSuccess } from '@/features/auth';
```

**Option 2: From Specific Files**
```typescript
import { selectAuthUser } from '@/features/auth/store/authSelectors';
import { authSlice } from '@/features/auth/store/authSlice';
```

**Option 3: Store Selectors (Deprecated)**
```typescript
// Still works, but deprecated
import { selectAuthUser } from '@/store/selectors';
```

---

## 🎯 New Directory Structure

### Feature Organization

Each feature is now **completely self-contained**:

```
features/
├── auth/
│   ├── components/          # UI components
│   ├── hooks/               # Custom hooks
│   ├── store/               # ✅ All state logic
│   │   ├── authSlice.ts     #    - Reducer
│   │   ├── authSelectors.ts #    - Selectors
│   │   ├── apiSlice.ts      #    - API slice
│   │   └── index.ts         #    - Barrel export
│   └── utils/               # Helper functions
│
└── ui/
    ├── components/
    ├── hooks/
    ├── store/               # ✅ All state logic
    │   ├── uiSlice.ts
    │   ├── uiSelectors.ts
    │   └── index.ts
    └── utils/
```

**Benefits:**
- ✅ Feature is completely independent
- ✅ Easy to move/delete features
- ✅ Clear boundaries
- ✅ No reverse dependencies

---

## 🧪 Testing the Migration

### 1. Verify Build

```bash
npm run build
```

**Expected:** No errors, successful build.

---

### 2. Verify Dev Server

```bash
npm run dev
```

**Expected:** Server starts without errors.

---

### 3. Check TypeScript

```bash
npx tsc --noEmit
```

**Expected:** No type errors (except JSX in node_modules).

---

### 4. Test Selectors

```typescript
// In your component
import { selectAuthUser } from '@/features/auth';

const user = useAppSelector(selectAuthUser);
console.log(user); // Should work
```

---

## ⚠️ Breaking Changes

### For New Code

**Use feature imports:**

```typescript
// ✅ CORRECT
import { selectAuthUser } from '@/features/auth';
```

### For Existing Code

**Old imports still work:**

```typescript
// ⚠️  Deprecated but functional
import { selectAuthUser } from '@/store/selectors';
```

**Plan to update:** Gradually migrate old imports over time.

---

## 📚 Best Practices

### 1. Import from Feature

```typescript
// ✅ DO
import { selectAuthUser } from '@/features/auth';

// ❌ DON'T
import { selectAuthUser } from '@/store/selectors';
```

### 2. Use Barrel Exports

```typescript
// ✅ DO - Import from feature index
import { selectAuthUser, authSlice } from '@/features/auth';

// ❌ DON'T - Deep imports (unless needed)
import { selectAuthUser } from '@/features/auth/store/authSelectors';
```

### 3. Keep Features Self-Contained

```typescript
// ✅ DO - Everything in feature
import { selectAuthUser } from '@/features/auth';

// ❌ DON'T - Cross-feature imports
import { selectAuthUser } from '@/features/auth/store';
import { selectTheme } from '@/features/ui/store';
```

---

## 🔍 What's Next?

### Optional Future Improvements

1. **Move Types to Features**
   ```
   src/store/api/types/auth.ts → src/features/auth/store/types.ts
   ```

2. **Create Shared Types**
   ```
   src/types/  # For cross-feature types
   ```

3. **Remove Deprecated Selectors**
   ```
   # After migration period, delete:
   src/store/selectors/
   ```

4. **Consolidate Registry Files**
   ```
   src/store/registry/
   ├── base.ts
   ├── middleware.ts
   └── reducer.ts
   ```

---

## 📊 Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Architecture** | Store-centric | Feature-first |
| **Selector Location** | Centralized | In features |
| **Registry Code** | Duplicated | Shared base class |
| **Directory Names** | Confusing | Clear |
| **Dependencies** | Reverse | One-way |
| **Scalability** | Medium | High |
| **Maintainability** | Medium | High |

---

## ✨ Benefits

### Developer Experience
- ✅ Clearer file locations
- ✅ Better IDE autocomplete
- ✅ Easier to find code

### Code Quality
- ✅ No code duplication
- ✅ Consistent patterns
- ✅ Better encapsulation

### Scalability
- ✅ Easy to add features
- ✅ Easy to remove features
- ✅ Team can work independently

---

**Migration Date:** 2026-01-13
**Status:** ✅ Complete
**Breaking Changes:** None (backward compatible)

---

## 🙏 Need Help?

If you encounter issues:

1. Check import paths
2. Verify barrel exports (`index.ts`)
3. Run `npm run build` to see all errors
4. Check this guide for examples

**Remember:** Old imports still work! Migrate gradually.
