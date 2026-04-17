# Copilot instructions (Mood2Food Portal)

- React + Vite (JSX) project.
- Use `fetch()` for API calls (no axios).
- Base API URL: https://mood2food-api.onrender.com
- Endpoint: `POST /recommend` with JSON `{ mood_text, time_of_day, diet_type }`.
- Dark theme; primary color `#FF6B35`.
- Ensure loading + error states; if request exceeds 5s show “Waking up AI model...”.
