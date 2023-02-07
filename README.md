# PushState Polyfill

A polyfill for browser events that should exist as part of the history API

Polyfill for these events:

  - `pushstate`
  - `replacestate`
  - `beforepushstate`
  - `beforereplacestate`

These are similar to the standard browser events:
  - `popstate`
  - `beforeunload`

This works by replacing the default behaviour of the `window.history.pushState` and `window.history.replaceState`.
