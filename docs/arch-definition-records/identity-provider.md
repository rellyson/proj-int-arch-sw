# Identity provider

Contents:

- [Identity provider](#identity-provider)
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
    - [Related principles](#related-principles)
  - [Notes](#notes)

## Summary

### Issue

We need a way to provide an identity server to handle Single Sign On and authorization. To accomplish this, we need to choose a identity provider.

### Decision

We need to find a identity provider that matches all the requirements for a authorization server with Single Sign On.

### Status

Decided. We decided to use [Keycloak](https://www.keycloak.org/).

## Details

### Assumptions

We favor a solution that uses OAuth 2.0 authorization framework (a protocol that allows a user to grant a third-party web site or application access to the user's protected resources, without necessarily revealing their long-term credentials or even their identity).

### Constraints

We want to aim for compatibility with popular software frameworks and libraries.

### Positions

We considered a few options:

- Okta.
- One Login.
- ForgeRock.
- Auth0.
- Keycloak.

### Argument

We selected Keycloak because:

- It is free and open source.

- It is production-read.

- Highly used by companies.

### Implications

We need to figure out a way to provide a development environment that reflects the decisions.

## Related

### Related decisions

We expect a high customizable environment.

### Related principles

Easily replaceable.

## Notes

It has a docker image for testing/development.