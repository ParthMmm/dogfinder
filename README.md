# 🐶 DogFinder

A web app to help you find your perfect furry friend.

## Features

- Search functionality for finding dogs
- Filter options for breed, age, location
- Responsive design

### Core Technologies

- React
- Next.js
- TailwindCSS
- shadcn-ui
- Nuqs
- React Query
- Jotai

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or bun package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ParthMmm/dogfinder
   cd dogfinder
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

For production build:

```bash
npm run build
npm start
# or
bun run build
bun start
```

## Known Issues

- Page refresh will clear cookies due to Chrome's third-party cookie restrictions
  - AWSALB cookie lacks SameSite attribute
    ```
    This Set-Cookie header didn't specify a "SameSite" attribute and was defaulted to
    "SameSite=Lax," and was blocked because it came from a cross-site response which
    was not the response to a top-level navigation. The Set-Cookie had to have been
    set with "SameSite=None" to enable cross-site usage.
    ```
  - Browser Compatibility Issues:
    - Does not work on iOS mobile browsers
    - Does not work on Safari
