# Orchid Collection (React + Redux)

Short description

Orchid Collection is a Single-Page Application (SPA) for browsing and managing an orchid collection. The app features a responsive UI, detail view (image/video), search and filter, feedback (rating + comment), and CRUD operations for admins.

## This repository is built with React + Vite for the frontend, Redux Toolkit for state management, and Axios for API communication (API base URL is configured via `VITE_API_URL`). Firebase is optionally used for Google Sign-In authentication.

## Key features

- Responsive card grid for the orchid collection
- Detail view (page or modal) with image/video, description, and feedback
- Client-side search and category filter
- CRUD operations via API (admin only)
- Feedback system: rating + comment with duplicate submission checks
- Light / dark theme (preference persisted in localStorage via `ThemeContext`)
- Google Sign-In (Firebase) for authentication and role distinction

---

## Tech stack

- Frontend: React (v19) + Vite
- State management: Redux Toolkit (slices + createAsyncThunk)
- UI / Styling: Bootstrap 5, React-Bootstrap, Bootstrap Icons
- HTTP client: Axios
- Forms & validation: Formik, Yup
- Authentication: Firebase (Google Sign-In)
- Dev tools: npm, Vite, ESLint

See `package.json` for exact dependency versions.

---

## Prerequisites

- Node.js (v16+ recommended)
- npm
- A backend API that implements the endpoints below (or a mock server). The app reads the API base URL from the `VITE_API_URL` environment variable.

### Expected API endpoints

The frontend expects the following REST endpoints (see `src/service/orchidsService.js`):

- `GET  /fer` — returns a list of all orchids
- `GET  /fer/:id` — returns detail for a specific orchid
- `POST /fer` — create a new orchid
- `PUT  /fer/:id` — update an orchid
- `DELETE /fer/:id` — delete an orchid

You can use any backend (Node.js/NestJS/Express, etc.) or mock responses matching this contract.

---

## Installation & run (local)

1. Install dependencies

```powershell
npm install
```

2. Configure environment variables (create `.env` in the project root)

Create `.env` (or `.env.local`) and add:

```env
VITE_API_URL=https://your-api.example.com
# If using Firebase, add your Firebase config in `src/firebase.js` or via environment variables
```

3. Start development server

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
```

5. Preview production build

```powershell
npm run preview
```

---

## Project structure (high level)

- `src/`
  - `components/` — React components (Orchids, Detail, Footer, Navigation, ThemeContext, etc.)
  - `features/orchids/` — Redux slice for orchids (`orchidsSlice.js`)
  - `service/` — API helpers (`orchidsService.js`)
  - `auth/` — GoogleLogin, ProtectedRoute
  - `store/` — Redux store configuration
  - `firebase.js` — Firebase configuration (optional)

---

## Design notes & technical details

- Main state is managed with Redux Toolkit. Async operations (fetch/create/update/delete) are implemented as `createAsyncThunk` to handle loading/error/success states cleanly.
- `ThemeContext` manages the global light/dark theme and persists the user preference in `localStorage`.
- The orchid list and filtering use memoization (`useMemo`) to minimize unnecessary re-renders.
- Styling is primarily Bootstrap 5 with a few custom CSS rules for cards, modals and animations.

---

## Development & extension

- Backend: implement API endpoints listed above. For authenticated endpoints, use Firebase tokens or Bearer tokens depending on your backend.
- Component decomposition: some components are composite (grid + card + modal); consider splitting them for easier testing and reuse.
- Testing: add unit tests for reducers/thunks and component tests with React Testing Library.

---

## Contributing

- Fork the repo, create a feature branch, and open a Pull Request describing the change.
- Follow existing code patterns and keep commits focused and descriptive.

---

## Quick references in the repo

- Service API calls: `src/service/orchidsService.js`
- Redux flow: `src/features/orchids/orchidsSlice.js`
- Main routes: `src/App.jsx`
- Main components: `src/components/Orchids.jsx`, `src/components/Detail.jsx`, `src/components/ThemeContext.jsx`

---

## Contact

If you need further help (deploy instructions, Dockerfile, tests, or migrating to SSR for SEO), I can help with that.
