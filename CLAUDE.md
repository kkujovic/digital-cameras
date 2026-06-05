# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- Java 21, Spring Boot 4.0.6, Gradle (Groovy DSL)
- Base package: `com.kkujovic.dc`

## Commands

```bash
# Build
./gradlew build

# Run
./gradlew bootRun

# Test (all)
./gradlew test

# Test (single class)
./gradlew test --tests "com.kkujovic.dc.SomeTest"

# Test (single method)
./gradlew test --tests "com.kkujovic.dc.SomeTest.methodName"
```

## Architecture

Early-stage project — only the `@SpringBootApplication` entry point exists. When adding features, place code under `src/main/java/com/kkujovic/dc/` following standard Spring layering (controllers, services, repositories).
