# CAP Java Development Guide

This guide contains development patterns and rules specific to CAP Java projects.

## Building and Testing

### Maven Build Commands

```bash
# Build without running tests
mvn clean install -DskipTests

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=TestClassName

# Run specific test method
mvn test -Dtest=TestClassName#methodName

# Capture logs (CRITICAL: use 2>&1)
mkdir -p tmp
mvn test > tmp/test.log 2>&1
```

**Important Notes**:
- Set `JAVA_HOME` explicitly if needed: `JAVA_HOME=/path/to/jdk mvn test`
- Always use `2>&1` when capturing logs (Spring Boot logs to stderr)
- Maven must be run from the project directory containing `pom.xml`

## CAP Java Type Safety Rules

### Rule 1: Use Typed Entity Classes - Never Map<String, Object>

```java
// ✅ CORRECT
List<Books> books = result.listOf(Books.class);
Books book = result.single(Books.class);

// ❌ WRONG
List<Map<String, Object>> books = result.list();
Map<String, Object> book = result.single();
```

### Rule 2: Use Generated Service Interfaces - Not Generic CdsService

```java
// ✅ CORRECT
@Autowired
@Qualifier(CatalogService_.CDS_NAME)
private CatalogService catalogService;

// ❌ WRONG
@Autowired
@Qualifier("CatalogService")
private CdsService catalogService;
```

### Rule 3: Build Queries with Metamodel Constants

```java
// ✅ CORRECT
CqnSelect query = Select.from(Books_.CDS_NAME);

// ✅ CORRECT - using class
CqnSelect query = Select.from(Books_.class)
    .where(b -> b.get(Books.STOCK).gt(0));

// ❌ WRONG - hardcoded string
CqnSelect query = Select.from("Books");
```

### Rule 4: Use Import Statements - Never Fully Qualified Names

```java
// ✅ CORRECT
import com.sap.cds.ql.cqn.CqnComparisonPredicate;

CqnComparisonPredicate comparison = (CqnComparisonPredicate) predicate;

// ❌ WRONG - fully qualified name in code
com.sap.cds.ql.cqn.CqnComparisonPredicate comparison =
    (com.sap.cds.ql.cqn.CqnComparisonPredicate) predicate;
```

## Database Operations

### PersistenceService vs ApplicationService

**PersistenceService** - Direct database operations:
```java
@Autowired
@Qualifier(PersistenceService.DEFAULT_NAME)
private PersistenceService db;

// Use for: Direct DB access, bypassing service handlers
```

**ApplicationService** - Service-level operations:
```java
@Autowired
@Qualifier(CatalogService_.CDS_NAME)
private CatalogService service;

// Use for: Operations that should trigger service handlers
```

**Critical**: Service entities are projections, not database tables.

Extract database entity name:
```java
String dbEntityName = entity.query().get().ref().firstSegment();
```

## Debugging

### Add Debug Logging

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(MyHandler.class);

@Before(event = CdsService.EVENT_READ)
public void beforeRead(CqnSelect select) {
    logger.debug("READ request for: {}", select.ref().targetSegment().id());
    logger.debug("Segment count: {}", select.ref().segments().size());
}
```

### Enable Debug Logging

Add to `src/main/resources/application.yaml` or `src/test/resources/application.yaml`:

```yaml
logging:
  level:
    com.example.myapp: DEBUG
    com.sap.cds: DEBUG
```

## Summary

**Type Safety Rules**:
1. Use typed entity classes - never `Map<String, Object>`
2. Use generated service interfaces - not generic `CdsService`
3. Build queries with metamodel constants - no string literals
4. Use import statements - never fully qualified names in code

**Database Operations**:
- Use `PersistenceService` for direct DB access
- Use `ApplicationService` for service-level operations
- Extract database entity name from service entities
