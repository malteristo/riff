/**
 * File: docs/testing-strategy.md
 * Created on: 2025-03-08
 * Description: Comprehensive testing strategy for the Riff project
 */

# Riff Testing Strategy

This document outlines the comprehensive testing strategy for the Riff project, detailing different types of tests, testing tools, and best practices.

## Table of Contents

1. [Testing Layers](#testing-layers)
2. [Testing Tools](#testing-tools)
3. [Test Organization](#test-organization)
4. [Writing Effective Tests](#writing-effective-tests)
5. [Testing Commands](#testing-commands)
6. [Continuous Integration](#continuous-integration)
7. [Test Coverage](#test-coverage)
8. [Testing Checklist](#testing-checklist)

## Testing Layers

We implement a layered testing approach to ensure all aspects of the application are thoroughly tested:

### Unit Tests

- Test individual functions, components, and modules in isolation
- Mock external dependencies
- Focus on input/output and behavior of small units
- Fast execution, high coverage

### Integration Tests

- Test interactions between modules and components
- Verify data flow and communication between different parts of the application
- Partial mocking of external services

### End-to-End Tests

- Test complete user flows and scenarios
- Simulate real user interactions with the application
- Minimal mocking, test against real or test environments

### Visual Regression Tests

- Capture and compare screenshots of UI components
- Detect unintended visual changes
- Component and page-level visual testing

## Testing Tools

Our testing stack includes:

### Core Testing Framework

- **Jest**: Main test runner and assertion library
- **@testing-library/react**: For testing React components

### Additional Testing Tools

- **Mock Service Worker (MSW)**: API mocking and simulation
- **Playwright or Cypress**: End-to-end testing
- **Storybook**: Component development and visual testing
- **jest-axe**: Accessibility testing

## Test Organization

Tests are organized to mirror the source code structure:

```
tests/
├── components/          # React component tests
│   ├── auth/            # Auth components tests
│   ├── canvas/          # Canvas components tests
│   └── ...
├── hooks/               # Custom hooks tests
├── pages/               # Page component tests
├── services/            # Service layer tests
├── store/               # Store tests
├── utils/               # Utility function tests
└── e2e/                 # End-to-end tests
```

## Writing Effective Tests

### Unit Test Example

```typescript
// Testing a utility function
import { formatCanvasElement } from '@/utils/canvasFormatters';

describe('formatCanvasElement', () => {
  it('should correctly format text elements', () => {
    const input = {
      id: 'e1',
      type: 'text',
      x: 100,
      y: 100,
      content: 'Hello',
      session_id: 'session1'
    };
    
    const expected = {
      id: 'e1',
      type: 'text',
      position: { x: 100, y: 100 },
      text: 'Hello',
      sessionId: 'session1'
    };
    
    expect(formatCanvasElement(input)).toEqual(expected);
  });
});
```

### Component Test Example

```typescript
// Testing a React component
import { render, screen, fireEvent } from '@testing-library/react';
import { TextComponent } from '@/components/canvas/TextComponent';

describe('TextComponent', () => {
  it('renders text content correctly', () => {
    render(<TextComponent text="Hello World" position={{ x: 100, y: 100 }} id="text1" />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
  
  it('handles edit mode correctly', () => {
    render(<TextComponent text="Click me" position={{ x: 100, y: 100 }} id="text1" />);
    
    // Click to enter edit mode
    fireEvent.click(screen.getByText('Click me'));
    
    // Check if input appears
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Click me');
    
    // Edit the text
    fireEvent.change(input, { target: { value: 'New text' } });
    fireEvent.blur(input);
    
    // Check if text is updated
    expect(screen.getByText('New text')).toBeInTheDocument();
  });
});
```

### Integration Test Example

```typescript
// Testing integration between canvas store and components
import { render, screen, fireEvent } from '@testing-library/react';
import { Canvas } from '@/components/canvas/Canvas';
import { useCanvasStore } from '@/store/canvasStore';

// Mock the Supabase client
jest.mock('@/services/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({
        data: [
          { id: 'e1', type: 'text', x: 100, y: 100, content: 'Test Element', session_id: 'session1' }
        ],
        error: null
      })
    }),
    channel: jest.fn().mockReturnValue({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    })
  }
}));

describe('Canvas Integration', () => {
  beforeEach(() => {
    // Reset the store state
    useCanvasStore.setState({
      elements: [],
      groups: [],
      connections: [],
      selectedElementIds: [],
      isLoading: false,
      error: null,
      currentSessionId: null
    });
  });
  
  it('loads and displays canvas elements', async () => {
    render(<Canvas sessionId="session1" />);
    
    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for elements to load
    const textElement = await screen.findByText('Test Element');
    expect(textElement).toBeInTheDocument();
    
    // Check store state updated correctly
    expect(useCanvasStore.getState().elements.length).toBe(1);
    expect(useCanvasStore.getState().currentSessionId).toBe('session1');
  });
});
```

## Testing Commands

Use the following commands for running tests:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific tests
npm test -- -t "TextComponent"

# Run tests for a specific file
npm test -- components/canvas/TextComponent
```

## Continuous Integration

Tests are automatically run on our CI/CD pipeline on GitHub Actions:

1. **Pull Requests**: All tests are run when PR is created or updated
2. **Main Branch**: Tests run on every push to main
3. **Nightly Builds**: Full test suite with coverage report runs nightly

## Test Coverage

We aim to maintain:

- Unit and integration test coverage above 80%
- Critical paths and components at 100% coverage
- E2E tests for all main user flows

Coverage reports are generated with:

```bash
npm run test:coverage
```

The report is available in the `/coverage` directory after running the command.

## Testing Checklist

Use this checklist when developing new features:

- [ ] Write unit tests for all new functions and components
- [ ] Write integration tests for component interactions
- [ ] Update existing tests that may be affected by changes
- [ ] Verify test coverage for modified code
- [ ] Run the full test suite locally before pushing
- [ ] Add e2e tests for significant new user flows
- [ ] Document any special testing considerations 