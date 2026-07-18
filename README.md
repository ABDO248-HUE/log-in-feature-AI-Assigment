Login Page Feature — AI Agent Build Review
Development Process
The login page was built across three iterative prompts to the AI agent. The first prompt, “create me a code of login page,” produced a static HTML/Tailwind/vanilla-JS mockup (Round 1) with client-side validation, a password-visibility toggle, and a simulated submit flow. The second prompt specified a full React + TypeScript + Tailwind rebuild with explicit requirements for validation, accessibility, responsive UI, reusable components, and unit tests, producing LoginForm.tsx, a reusable Input.tsx component, App.tsx, and a Vitest test suite. The third prompt asked the agent to fix TypeScript/React errors, replace any leftover HTML class attributes with className, and confirm the project compiles under Vite.
Errors Found
•	Duplicate label rendering: LoginForm.tsx renders its own <label htmlFor="password-input"> for the password field and also passes label="Password" into Input.tsx, which unconditionally renders a second label bound to the same id. This produces two overlapping labels for one input.
•	Validation mismatch across versions: Round 1 enforces a 6-character minimum password, while Round 2 enforces 8 characters, so the two builds are not behaviorally equivalent despite being the “same” feature.
•	Loading state loses its accessible name: when isSubmitting is true, the button renders only a bare spinner SVG with no aria-label or aria-busy, so screen readers announce an unnamed button during submission.
Correctness
Core logic is sound: email/password regex and length checks, live error clearing, and the disabled-until-valid submit gate all behave as the test suite expects. The className usage throughout LoginForm, Input, and App is already correct React syntax, so the Round-3 “class to className” instruction had no remaining targets in the React files — it would only have applied if HTML had been carried over.
Accessibility
Labels, aria-invalid, aria-describedby, and role="alert" on error text are implemented well, and the checkbox and toggle button are keyboard-reachable. The duplicate label and the unlabeled loading state are the two gaps worth fixing before shipping.
Edge Cases
Whitespace-only input, rapid double submission, and browser autofill bypassing the change handlers are not explicitly covered by the current tests, and the mock 1.5s submit delay never models a failed login response.
Review Effort
Roughly 30–40 minutes of human review across the three rounds: light for Round 1 (self-contained HTML), moderate for Round 2 (three files plus tests to cross-check), and minimal for Round 3 since no class attributes remained to replace.

