/**
 * File: docs/testing-guide.md
 * Created on: Current Date
 * Description: Comprehensive guide for testing the Riff project
 */

# Riff Testing Guide

This guide provides practical instructions for writing and running tests for the Riff project. It builds on the testing strategy outlined in [testing-strategy.md](./testing-strategy.md).

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running Tests](#running-tests)
3. [Writing Unit Tests](#writing-unit-tests)
4. [Writing Component Tests](#writing-component-tests)
5. [Writing Integration Tests](#writing-integration-tests)
6. [End-to-End Testing](#end-to-end-testing)
7. [Testing Utilities](#testing-utilities)
8. [Continuous Integration](#continuous-integration)
9. [Test Coverage](#test-coverage)
10. [Best Practices](#best-practices)

## Getting Started

Before writing tests, make sure you have the necessary dependencies installed:

```bash
npm install
```

For end-to-end testing with Playwright, install the required browsers:

```bash
npx playwright install --with-deps
```

## Running Tests

The Riff project has several npm scripts for running tests:

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only component tests
npm run test:component 

# Run only integration tests
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests with Playwright
npm run test:e2e

# Run end-to-end tests with UI mode
npm run test:e2e:ui

# Show e2e test report
npm run test:e2e:report
```

## Writing Unit Tests

Unit tests focus on testing small, isolated pieces of code like utilities, hooks, and service functions. Tests should be placed in the `tests` directory, mirroring the structure of the `src` directory.

### Example Unit Test

```typescript
// tests/utils/formatters.test.ts
import { formatDate } from '../../src/utils/formatters';

describe('formatDate', () => {
  it('should format a date correctly', () => {
    const date = new Date('2023-01-01T12:00:00Z');
    expect(formatDate(date)).toBe('January 1, 2023');
  });

  it('should handle invalid dates', () => {
    expect(formatDate(new Date('invalid date'))).toBe('Invalid date');
  });
});
```

### Testing Hooks

React hooks are tested using the `@testing-library/react-hooks` package:

```typescript
// tests/hooks/useErrorHandler.test.ts
import { renderHook, act } from '@testing-library/react';
import useErrorHandler from '../../src/hooks/useErrorHandler';

describe('useErrorHandler', () => {
  it('should handle async errors', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    const mockAsyncFunction = jest.fn().mockRejectedValue(new Error('Test error'));
    const wrappedFunction = result.current.handleAsyncError(mockAsyncFunction);
    
    await expect(wrappedFunction()).rejects.toThrow('Test error');
  });
});
```

## Writing Component Tests

Component tests verify that React components render correctly and handle user interactions as expected. Use React Testing Library for component tests.

### Example Component Test

```typescript
// tests/components/auth/SignIn.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from '../../../src/components/auth/SignIn';
import { signIn } from '../../../src/services/supabase';

// Mock dependencies
jest.mock('../../../src/services/supabase', () => ({
  signIn: jest.fn(),
}));

describe('SignIn Component', () => {
  it('renders the sign in form correctly', () => {
    render(<SignIn />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits the form with user input', async () => {
    // Mock successful sign in
    (signIn as jest.Mock).mockResolvedValue({ data: { user: {} }, error: null });
    
    render(<SignIn />);
    
    // Fill in form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check that sign in was called with correct arguments
    expect(signIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
```

### Testing with Providers

Many components require context providers. Use the custom render function in `tests/utils/test-utils.tsx` to wrap components with necessary providers:

```typescript
// Using the custom render from test utilities
import { render, screen, fireEvent } from '../../utils/test-utils';
import MyComponent from '../../../src/components/MyComponent';

describe('MyComponent', () => {
  it('renders with providers', () => {
    render(<MyComponent />);
    // Your assertions here
  });
});
```

## Writing Integration Tests

Integration tests check how multiple parts of the system work together. This often involves testing how components interact with services, contexts, or stores.

### Example Integration Test

```typescript
// tests/integration/canvas/CanvasActions.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CanvasActions from '../../../src/components/canvas/CanvasActions';
import { useCanvasStore } from '../../../src/store/canvasStore';

// Mock the Supabase client
jest.mock('../../../src/services/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({
        data: [{ id: 'element-1' }],
        error: null
      })
    })
  }
}));

describe('Canvas Integration', () => {
  beforeEach(() => {
    // Reset the canvas store state
    useCanvasStore.setState({
      elements: [],
      selectedElementId: null,
      addElement: jest.fn(),
      removeElement: jest.fn()
    });
  });
  
  it('adds a new element to the canvas', async () => {
    const addElementMock = jest.fn();
    useCanvasStore.setState({ addElement: addElementMock });
    
    render(<CanvasActions />);
    
    // Click the "Add Text" button
    fireEvent.click(screen.getByText(/add text/i));
    
    // Check that the store's addElement function was called
    expect(addElementMock).toHaveBeenCalled();
  });
});
```

## End-to-End Testing

End-to-end tests simulate real user interactions with the application. We use Playwright for E2E testing.

### Page Object Model

E2E tests use the Page Object Model pattern to organize test code. Page objects encapsulate page-specific interactions:

```typescript
// e2e/pages/home.page.ts
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1 });
    this.loginButton = page.getByRole('link', { name: /sign in/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
```

### Example E2E Test

```typescript
// e2e/tests/auth.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { AuthPage } from '../pages/auth.page';

test('user can log in', async ({ page }) => {
  const homePage = new HomePage(page);
  const authPage = new AuthPage(page);
  
  // Go to home page
  await homePage.goto();
  
  // Navigate to login page
  await homePage.clickLogin();
  
  // Fill login form
  await authPage.login('testuser@example.com', 'password123');
  
  // Verify redirect to dashboard
  await expect(page).toHaveURL('/dashboard');
});
```

## Testing Utilities

The project includes several testing utilities to make writing tests easier:

### Custom Render Function

The custom render function in `tests/utils/test-utils.tsx` wraps components with all necessary providers:

```typescript
// Example usage
import { render, screen } from '../../utils/test-utils';
import MyComponent from '../../../src/components/MyComponent';

describe('MyComponent', () => {
  it('renders with providers', () => {
    render(<MyComponent />);
    // Your assertions here
  });
});
```

### Mock Functions

Testing utilities also include mock functions for various services:

```typescript
// Example usage
import { mockSupabaseAuthWithUser } from '../../utils/test-utils';

// Use the mock in your test
jest.mock('../../../src/services/supabase', () => ({
  supabase: mockSupabaseAuthWithUser(),
}));
```

## Continuous Integration

Tests are automatically run on GitHub Actions when code is pushed to the main branch or when a pull request is created:

1. **Unit and Integration Tests**: Run on every push and pull request
2. **End-to-End Tests**: Run after unit and integration tests pass
3. **Coverage Reports**: Generated and uploaded as artifacts

The CI configuration is in `.github/workflows/tests.yml`.

## Test Coverage

We aim to maintain high test coverage for the project. Coverage reports are generated when running:

```bash
npm run test:coverage
```

The coverage report is available in the `coverage` directory.

## Best Practices

Follow these best practices when writing tests:

1. **Test Isolation**: Each test should be independent and not rely on the state from other tests
2. **Descriptive Names**: Use descriptive test names that indicate what is being tested
3. **Arrange-Act-Assert**: Structure tests with setup, execution, and verification phases
4. **Avoid Implementation Details**: Test behavior, not implementation details
5. **Mock External Dependencies**: Use jest.mock() to mock external services
6. **Keep Tests Fast**: Tests should execute quickly
7. **Test Edge Cases**: Include tests for error states and edge cases
8. **Use Data Builders**: Create helper functions to build test data
9. **Avoid Duplication**: Refactor common testing code into helper functions
10. **Test One Thing**: Each test should verify one specific behavior

### Testing React Components

For React components, follow these additional guidelines:

1. **User-Centric Testing**: Test components as users would interact with them
2. **Query Priorities**: Use getByRole before other queries when selecting elements
3. **Avoid Find By**: Prefer getBy and queryBy over findBy unless testing async rendering
4. **Use Screen**: Use screen object for querying elements
5. **Fire Events**: Use fireEvent or userEvent to simulate user interactions
6. **Test Accessibility**: Verify that components are accessible to screen readers

By following this guide, you can write effective tests that help maintain code quality and prevent regressions in the Riff project. 