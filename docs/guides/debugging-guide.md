# Debugging Guide for CAP Projects

## Setup: Create tmp Directory

**Before running tests or capturing logs**, create a `tmp/` directory in your project root:

```bash
mkdir -p tmp
```

This directory is already in `.gitignore` (added by init-claude.sh).

## Critical: Always Redirect stderr

### The Problem

**Both CAP Java (Spring Boot/SLF4J) and CAP Node.js log to stderr**, not stdout.

### The Solution

**ALWAYS use `2>&1` to capture both stdout and stderr**:

```bash
# ❌ WRONG - Misses application logs
mvn test | grep "pattern"              # Java - misses Spring Boot logs
node --test | grep "pattern"           # Node.js - misses CAP logs

# ✅ CORRECT - Captures both streams
mvn test 2>&1 | grep "pattern"         # Java
node --test 2>&1 | grep "pattern"      # Node.js

# ✅ BEST - Save to file first, then search (use project tmp/)
mkdir -p tmp
mvn test > tmp/test.log 2>&1           # Java
node --test > tmp/test.log 2>&1        # Node.js
grep "pattern" tmp/test.log
```

### Why This Happens

```
stdout (fd 1) → Maven/npm output
stderr (fd 2) → Application logs (Spring Boot, CAP, SLF4J)
```

- Pipes (`|`) and redirects (`>`) only capture stdout by default
- `2>&1` redirects stderr to stdout, merging both streams
- Without it, application logs disappear

## Enable Debug Logging

### CAP Java

Add to `src/main/resources/application.yaml` or `src/test/resources/application.yaml`:

```yaml
logging:
  level:
    # Your package
    io.github.yourname: DEBUG

    # CAP framework (optional)
    com.sap.cds: DEBUG
```

### CAP Node.js

Add to `package.json`:

```json
{
  "cds": {
    "log": {
      "levels": {
        "your-module": "debug"
      }
    }
  }
}
```

Run with DEBUG environment variable:

```bash
DEBUG=your-module node --test
DEBUG=* node --test                    # All logs
```

## Running Specific Tests

### CAP Java

```bash
# All tests
mvn test

# Specific test class
mvn test -Dtest=TestClassName

# Specific test method
mvn test -Dtest=TestClassName#methodName

# Capture logs
mkdir -p tmp
mvn test > tmp/test.log 2>&1
```

### CAP Node.js

```bash
# All tests
node --test

# Specific test file
node --test path/to/test.js

# Capture logs
mkdir -p tmp
node --test > tmp/test.log 2>&1
```

## Quick Reference

**Always remember**: `2>&1` is required to capture application logs from CAP Java and Node.js projects.
