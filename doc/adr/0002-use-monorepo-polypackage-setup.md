# 2. Use Monorepo-Polypackage Setup

Date: 2023-03-08

## Status

Accepted

## Context

We need a setup.

## Decision

1. We will split the plugins and core plugins into separate packages to be able
to work on them independently
2. We will use a monorepo for all plugins and core libraries to develop and
manage them more easily
3. Use [pnpm ↗](https://pnpm.io/), [pnpm-workspace ↗](https://pnpm.io/workspaces)
and [turborepo ↗](https://turbo.build/repo) to create a nice developer experience

## Consequences

- By splitting up into multiple packages we can release different versions 
of the plugins at different times
- Working in a monorepo makes sharing common functionality easier
- By using the pnpm, workspaces and turborepo we will hide the complexity 
of poly-package repos and make it easy to work with
