# Database encryption

Contents:

- [Database encryption](#database-encryption)
  - [Summary](#summary)
    - [Issue](#issue)
    - [Decision](#decision)
    - [Status](#status)
  - [Details](#details)
    - [Assumptions](#assumptions)
    - [Constraints](#constraints)
    - [Positions](#positions)
    - [Argument](#argument)
    - [Implications](#implications)
  - [Related](#related)
    - [Related decisions](#related-decisions)
    - [Related requirements](#related-requirements)
    - [Related artifacts](#related-artifacts)
    - [Related principles](#related-principles)
  - [Notes](#notes)

## Summary

### Issue

As we are dealing with sensitive data, we need to provide a secure, encrypted and protected database system.

- To accomplish this, we need to choose/implement a database that helps us to use encryption out of the box.

### Decision

We need to find a suitable database that matches all the requirements for a protected and secure environment.

### Status

Decided. We decided to use [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) database as a service.

## Details

### Assumptions

We favor databases that use encryption at rest technique,  encrypting all data using encryption keys that can be stored in a Key Management System such as Hashcorp Vault, Amazon KMS, Azure Key Vault, etc.

We favor escalable solutions that enables the database to be flexible, dealing with different amount of requests during the day.

### Constraints

We want to aim for compatibility with popular software frameworks and libraries.

We want to provide a development environment that uses the database encryption technique.

### Positions

We considered a few options:

- Amazon DynamoDB as a service.

- Mongo Atlas or Mongo Enterprise Edition.

- Amazon SympleDB as a service.

### Argument

We selected Amazon DynamoDB because:

- It is self-managed.

- It uses encryption at rest by default.

- Scalability.

### Implications

We need to figure out a way to provide a development environment that reflects the decisions made.

## Related

### Related decisions

We expect all our applications to use this technique.

We decided to use self-managed service to make database management easier.

### Related requirements

We need to train all developer teammates on this decision.

### Related artifacts

Each developer will need to configure it's local environment.

### Related principles

Easily replaceable.

## Notes

[Localstack](https://localstack.cloud/) is a development option that provides some great AWS services.
