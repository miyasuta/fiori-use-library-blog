# Test Strategy for CAP Projects

## Test-Driven Development (TDD)

**REQUIRED**: Always follow TDD approach:

1. **Write test case first** - Define expected behavior
2. **Confirm test fails** - Verify test detects missing functionality
3. **Implement feature** - Write minimal code to pass test
4. **Run test** - Verify implementation works
5. **Refactor if needed** - Improve code while keeping tests green

### Example TDD Flow

```
User reports: "Navigation property filtering not working"

1. Write test: navigationToItemsShouldFilterDeletedRecords()
2. Run test → FAILS (confirms bug)
3. Implement fix in handler
4. Run test → PASSES (confirms fix)
5. Commit both test and fix
```

**Benefits**:
- Test serves as regression prevention
- Clear reproduction of issues
- Verifiable fixes

## Protocol-Level Testing

**Unless otherwise specified, always use protocol-level tests** (HTTP requests to OData endpoints).

### Why Protocol-Level Tests

- Tests the complete request/response flow
- Validates OData behavior
- Tests service handlers in realistic context
- Catches integration issues

### CAP Testing Best Practices

**IMPORTANT**: Always check CAP documentation for testing best practices before writing tests:

```bash
# Search CAP docs for testing patterns
# Use cds-mcp MCP server to search:
# - "testing CAP services"
# - "protocol testing CAP"
# - "HTTP testing CAP Java" or "HTTP testing CAP Node.js"
```

Do NOT use language-native testing patterns (plain JUnit, plain Node.js test) without first checking CAP-specific approaches.

## Test Organization

### Test Naming Conventions

Use descriptive names that explain the scenario:

**CAP Java**:
```java
@Test
public void operationShouldBehaviorUnderCondition() { }

// Examples:
public void listQueryShouldExcludeSoftDeletedRecords() { }
public void keyAccessShouldReturnSoftDeletedRecord() { }
public void navigationToItemsShouldFilterDeletedRecords() { }
```

**CAP Node.js**:
```javascript
test('should behavior under condition', () => { })

// Examples:
test('should exclude soft deleted records from list query', () => { })
test('should return soft deleted record for key access', () => { })
```

Pattern: **{operation}Should{expectedBehavior}Under{condition}**

## Test Data Management

### Isolated Test Data

Each test creates its own data with unique identifiers:

- Tests are completely independent
- Can run in any order
- Failures don't cascade

## Arrange-Act-Assert Pattern

Structure all tests with clear AAA sections:

```
// Arrange: Create test data
// Act: Perform the operation
// Assert: Verify the expected behavior
```

## Best Practices

### DO:
- Follow TDD workflow (test first, then implement)
- Use protocol-level tests (HTTP/OData)
- Check CAP documentation for testing patterns via cds-mcp
- Write descriptive test names
- Create isolated test data
- Follow AAA pattern

### DON'T:
- Implement without writing test first
- Use unit tests when protocol tests are needed
- Write CAP tests without checking CAP documentation
- Share data between tests
- Use generic test names
- Test multiple behaviors in one test
