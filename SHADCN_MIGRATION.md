# Flowbite to shadcn/ui Migration Guide

## Overview
This document outlines the migration plan from Flowbite React components to shadcn/ui components in the Paper Company e-commerce application.

## Current State
The application currently uses Flowbite React (v0.4.4) for UI components, integrated with Tailwind CSS for styling.

## Migration Benefits
- **Better customization**: shadcn/ui components are copy-paste, allowing full control
- **Smaller bundle size**: Only include components you use
- **Modern design system**: Based on Radix UI primitives with accessible components
- **Better TypeScript support**: Full type safety out of the box
- **No vendor lock-in**: Components live in your codebase

## Components to Migrate

### 1. Modal Components
**Current**: Flowbite Modal  
**File**: `/app/components/LoginModal/LoginModal.tsx`  
**Replacement**: shadcn/ui Dialog

```tsx
// Before (Flowbite)
import { Modal } from "flowbite-react";
<Modal show={displayLoginModal} onClose={closeModal}>

// After (shadcn/ui)
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
<Dialog open={displayLoginModal} onOpenChange={closeModal}>
```

### 2. Form Components
**Current**: Flowbite TextInput, Label, Button  
**Files**: Multiple locations, primarily in LoginModal  
**Replacement**: shadcn/ui Input, Label, Button

```tsx
// Before (Flowbite)
import { TextInput, Label, Button } from "flowbite-react";

// After (shadcn/ui)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
```

replace Skeleton with shadcn/ui Skeleton

### 3. Dropdown Components
**Current**: Flowbite Dropdown  
**Files**: 
- `/app/components/Counter/Counter.tsx`
- `/app/components/Product/Option/Option.tsx`  
**Replacement**: shadcn/ui Dropdown

```tsx
// Before (Flowbite)
import { Dropdown } from "flowbite-react";

// After (shadcn/ui)
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
```

### 4. Loading Components
**Current**: Flowbite Spinner  
**File**: `/app/components/LoginModal/LoginModal.tsx`  
**Replacement**: Custom spinner using Lucide icons or shadcn/ui skeleton

```tsx
// Before (Flowbite)
import { Spinner } from "flowbite-react";

// After (shadcn/ui with Lucide)
import { Loader2 } from "lucide-react";
<Loader2 className="h-4 w-4 animate-spin" />
```

### 5. Custom Components to Enhance

#### Sidebar Component
**Current**: Custom implementation with body-scroll-lock  
**File**: `/app/components/Sidebar/Sidebar.tsx`  
**Enhancement**: shadcn/ui Sheet component

#### Quantity Component
**Current**: Custom number input with increment/decrement  
**File**: `/app/components/Quantity/Quantity.tsx`  
**Enhancement**: shadcn/ui Input with custom controls

## Implementation Plan

### Phase 1: Setup (Day 1)
1. Install shadcn/ui CLI
   ```bash
   bunx shadcn-ui@latest init
   ```
2. Configure paths in `tsconfig.json`
3. Update `tailwind.config.js` with shadcn/ui requirements
   1. i have already done this with my own tailwind.config.js that should fit into the shadcn/ui requirements.
4. Update `globals.css` with CSS variables

### Phase 2: Core Components (Day 2-3)
1. Add basic components:
   ```bash
   bunx shadcn-ui@latest add button
   bunx shadcn-ui@latest add input
   bunx shadcn-ui@latest add label
   bunx shadcn-ui@latest add dialog
   bunx shadcn-ui@latest add select
   ```
2. Create component mapping strategy
3. Set up component aliases for easier migration

### Phase 3: Component Migration (Day 4-7)
1. **LoginModal Migration**
   - Replace Modal with Dialog
   - Replace form components
   - Update event handlers
   - Test authentication flow

2. **Dropdown Replacements**
   - Counter component: Migrate to Select
   - Option component: Migrate to Select
   - Ensure data binding works correctly

3. **Custom Components**
   - Enhance Sidebar with Sheet
   - Improve Quantity input styling

### Phase 4: Cleanup (Day 8)
1. Remove Flowbite dependencies:
   ```bash
   bun remove flowbite-react
   ```
2. Remove Flowbite theme configurations
3. Clean up unused imports
4. Update component documentation

### Phase 5: Testing & QA (Day 9-10)
1. Component functionality testing
2. Responsive design verification
3. Accessibility audit
4. Performance testing
5. Cross-browser compatibility

## Migration Checklist

- [ ] Setup shadcn/ui configuration
- [ ] Install required shadcn/ui components
- [ ] Migrate LoginModal
  - [ ] Replace Modal with Dialog
  - [ ] Replace TextInput with Input
  - [ ] Replace Button component
  - [ ] replace <button> with <Button>
  - [ ] Replace Spinner with custom loader
- [ ] Migrate Counter component
- [ ] Migrate Option component
- [ ] Enhance Sidebar with Sheet
- [ ] Enhance Quantity component
- [ ] Remove Flowbite dependencies
- [ ] Update all imports
- [ ] Test all migrated components
- [ ] Update documentation

## Code Examples


### LoginModal Migration Example
```tsx
// Before
<Modal show={displayLoginModal} onClose={closeModal}>
  <Modal.Body>
    <TextInput
      id="email"
      type="email"
      color={emailInvalid ? "failure" : "primary"}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button type="submit" disabled={loading}>
      {loading ? <Spinner /> : "Submit"}
    </Button>
  </Modal.Body>
</Modal>

// After
<Dialog open={displayLoginModal} onOpenChange={closeModal}>
  <DialogContent>
    <Input
      id="email"
      type="email"
      className={emailInvalid ? "border-red-500" : ""}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button type="submit" disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit
    </Button>
  </DialogContent>
</Dialog>
```

### Dropdown Migration Example
```tsx
// Before (Flowbite Dropdown)
<Dropdown label={selectedOption || "Select"} inline={true}>
  {options.map((option) => (
    <Dropdown.Item key={option} onClick={() => onSelect(option)}>
      {option}
    </Dropdown.Item>
  ))}
</Dropdown>

// After (shadcn/ui Select)
<Select value={selectedOption} onValueChange={onSelect}>
  <SelectTrigger>
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    {options.map((option) => (
      <SelectItem key={option} value={option}>
        {option}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

## Potential Challenges

1. **Theme Customization**: Flowbite uses a different theming approach than shadcn/ui
2. **Event Handler Differences**: Some event handlers may need adjustment
3. **Styling Conflicts**: May need to resolve Tailwind class conflicts
4. **Component API Differences**: Props and behavior may differ between libraries

## Post-Migration Benefits

1. **Performance**: Reduced bundle size from removing Flowbite
2. **Maintainability**: Components in your codebase, easier to customize
3. **Consistency**: Unified design system with shadcn/ui
4. **Developer Experience**: Better TypeScript support and documentation

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Migration Examples](https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples)

## Timeline
Estimated completion: 10 working days with one developer

## Success Metrics
- All Flowbite components successfully replaced
- No regression in functionality
- Improved or maintained performance metrics
- Passing all existing tests
- Positive developer feedback on new component system