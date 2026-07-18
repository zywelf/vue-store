# Vue Store

E-commerce SPA built with Vue 3 and TypeScript, consuming the [Fake Store API](https:fakestoreapi.com)

# Features

- Product grid with category filtering
- Product detail view
- Category filter driven by URL query params (survives refresh and deep links)
- Light/dark theme with persistence
- Shopping cart with header counter
- Loading skeletons and error states
- Responsive layout, semantic HTML and keyboard navigation

## Tech stack

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **Vue Router**
- **Pinia** (state management)
- **Vitest** + **@vue/test-utils** (unit tests)
- Plain CSS with custom properties (design system)

## Requirements

- Node.js 22+ (developed on 22.20.0)
- npm

## Setup

```bash
# Clone the repository
git clone https://github.com/zywelf/vue-store.git
cd vue-store

# Install depedencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`

No enviroment variable are required, the Fake Store API is public.

## Available scripts

```bash
npm run dev   # start the developement server
npm run build # build for production
npm run test  # run unit tests
```

# Architecture

The project is organised in layers with one-directional dependencies:

src/
├── types/         data contracts (Product)
├── services/      API layer — all HTTP calls live here
├── composables/   reusable logic with shared state (theme)
├── stores/        global state (cart, via Pinia)
├── components/    presentational — receive props, never fetch
├── views/         orchestrate — fetch data, handle page state
├── router/        URL to view mapping
└── styles/        design system (CSS custom properties)

**State lives in one place, chosen by its nature:**

- **URL** — category filter and current product id, so they survive refresh and deep links
- **Pinia / composable** — cart and theme, needed by components in different parts of the tree
- **Local state** — loading and error, only relevant to a single view

This keeps components decoupled: the header writes the category to the URL and the home view reads it, without the two knowing about each other.

**Components are presentational.** They receive props and render; they never call the API. Data fetching belongs to views and composables. This keeps components reusable and trivial to unit test — `ProductCard` is tested by simply passing it a product object.

**Product cards use `RouterLink` rather than a click handler.** This produces a real anchor element, which is keyboard-navigable, supports open-in-new-tab, and is announced correctly by screen readers. The trade-off is that the card is tied to a route; in an e-commerce context a product card *is* a link, so accessibility was prioritised over theoretical reusability.

**Design system.** Colours, spacing and typography are centralised as CSS custom properties. Spacing and font sizes use `rem` so they scale when the user changes the browser's text size. Dark theme is implemented by overriding the same variables under a `data-theme` attribute on `<html>`.

## Testing

```bash
npm test
```

Unit tests cover the cart store (state and add-to-cart behaviour) and the `ProductCard` component (renders title and price from props).

## Use of AI tools

AI (Claude) was used as a learning aid and as a pair-programming partner.

Coming from a React background and not having used Vue recently, I used it to understand Vue 3 specific concepts — the Composition API, reactivity (`ref`, `computed`, `watch`), Vue Router and Pinia — and to reason through architectural decisions such as where each piece of state should live.

All the code in this repository was written by me. AI was used for explanations, code review and debugging, not for generating the implementation. Every suggestion was validated by understanding the reasoning behind it and by testing the behaviour in the browser.