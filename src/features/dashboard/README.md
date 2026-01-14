# Redux Serialization Fix - Dashboard Date Filters

## Problem

The original code had a Redux serialization error:

```
A non-serializable value was detected in the state, in the path: `dashboard.filters.dateRange.start`. Value: {}
```

This occurred because **Date objects** were being stored directly in the Redux state:

```typescript
// ❌ WRONG - Date objects are not serializable
filters: {
  dateRange: {
    start: new Date(),
    end: new Date(),
  },
}
```

## Solution

Changed the state to use **ISO 8601 string** format instead of Date objects:

```typescript
// ✅ CORRECT - ISO strings are serializable
filters: {
  dateRange: {
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  },
}
```

## Changes Made

### 1. Type Definition (`src/features/dashboard/types/store.ts`)

```typescript
export interface DashboardState {
  filters: {
    dateRange: {
      /** 시작 날짜 (ISO 8601 문자열) */
      start: string;
      /** 종료 날짜 (ISO 8601 문자열) */
      end: string;
    };
  };
}
```

### 2. Initial State (`src/features/dashboard/store/dashboardSlice.ts`)

```typescript
import { last30DaysRange } from '../utils/dateUtils';

const initialState: DashboardState = {
  // ... other state
  filters: {
    dateRange: last30DaysRange(), // Returns ISO strings
  },
};
```

### 3. Date Utilities (`src/features/dashboard/utils/dateUtils.ts`)

Created comprehensive utility functions for date conversion:

- **`dateToISOString(date: Date)`** - Convert Date to ISO string
- **`isoStringToDate(isoString: string)`** - Convert ISO string to Date
- **`dateRangeToState(range)`** - Convert Date range to state format
- **`dateRangeFromState(range)`** - Convert state format to Date range
- **`last30DaysRange()`**, **`thisWeekRange()`**, **`thisMonthRange()`** - Common presets

## Usage Examples

### In Components

```typescript
import { useAppSelector } from '@/store/hooks';
import { dateRangeFromState } from '@/features/dashboard/utils';

function DashboardFilter() {
  const dateRange = useAppSelector(state => state.dashboard.filters.dateRange);

  // Convert to Date objects for display
  const range = dateRangeFromState(dateRange);

  const handleChange = (newStart: Date, newEnd: Date) => {
    dispatch(setDateRange({
      start: newStart.toISOString(),
      end: newEnd.toISOString(),
    }));
  };

  return (
    <div>
      <p>Start: {range.start.toLocaleDateString()}</p>
      <p>End: {range.end.toLocaleDateString()}</p>
    </div>
  );
}
```

### In Redux Actions

```typescript
// ✅ CORRECT - Store ISO strings
const setDateRange = (start: string, end: string) => {
  return {
    type: 'dashboard/setDateRange',
    payload: {
      start, // ISO string
      end,   // ISO string
    },
  };
};
```

### Common Date Range Presets

```typescript
import {
  todayRange,
  thisWeekRange,
  thisMonthRange,
  last7DaysRange,
  last30DaysRange,
} from '@/features/dashboard/utils';

// Today
dispatch(setDateRange(todayRange()));

// This week
dispatch(setDateRange(thisWeekRange()));

// Last 30 days
dispatch(setDateRange(last30DaysRange()));
```

## Why This Matters

### Redux Serialization Rules

Redux requires all state to be **serializable** for:

1. **Time-travel debugging** - State must be JSON-serializable
2. **Persistence** - State must be saved to localStorage/sessionStorage
3. **Hydration** - Server state must transfer to client
4. **Predictability** - State changes must be traceable

### What's NOT Serializable

- ❌ Functions
- ❌ Promises
- ❌ Symbols
- ❌ Date objects
- ❌ Map/Set objects
- ❌ Class instances

### What's Serializable

- ✅ Primitives (string, number, boolean, null)
- ✅ Arrays
- ✅ Plain objects
- ✅ ISO 8601 date strings

## Validation

Build the project to verify no errors:

```bash
npm run build
```

The build should complete successfully without TypeScript errors.

## Testing

Check browser console for:

```typescript
// ✅ Should see: No serialization warnings
// ❌ Before fix: "A non-serializable value was detected..."
```

## Additional Resources

- [Redux - Organizing State](https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)
- [MDN - Date.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
- [ISO 8601 Standard](https://en.wikipedia.org/wiki/ISO_8601)
