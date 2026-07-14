# FreelanceHub

A responsive React prototype for a two-sided freelance marketplace. Clients can create projects and review applicants, while freelancers can search work, submit proposals, save jobs, manage a profile, and present services.

The current version is intentionally frontend-only. Browser localStorage acts as the prototype data layer, making the complete product flow easy to demonstrate without a backend.

## Product flows

### Clients

- Create an account as a client
- Publish projects with title, budget, category, skills, and image
- View and delete posted projects
- Review applications attached to each project
- Maintain account and profile information

### Freelancers

- Register and sign in as a freelancer
- Browse projects by category
- Search by project title, description, or skill
- Open project details and submit a proposal
- Save interesting jobs for later
- Track submitted applications
- Create and browse service listings
- Maintain skills, languages, biography, portfolio-style information, and profile image

### Shared experience

- Protected navigation based on a simulated token
- Responsive landing and dashboard pages
- Reusable navigation, sidebar, footer, cards, and detail modals
- Framer Motion transitions and Tailwind-based styling

## Technology

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 3
- Framer Motion
- Axios dependency for future API integration
- localStorage for prototype persistence

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
git clone https://github.com/stardust07a/freelance-hub.git
cd freelance-hub
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### Build and lint

```bash
npm run build
npm run lint
npm run preview
```

## Main routes

| Route | Purpose |
| --- | --- |
| `/login` | Sign in with a locally registered account |
| `/signup` | Choose client or freelancer and create an account |
| `/home` | Authenticated landing experience |
| `/find-work` | Search, filter, save, and apply to projects |
| `/saved-jobs` | Review saved projects |
| `/my-service` | Browse and add freelancer services |
| `/create-project` | Client project creation |
| `/my-projects` | Client project and applicant management |
| `/profile` | Extended profile editor |
| `/my-account` | Account details and applications |

## Prototype data model

The application stores JSON records in localStorage:

| Key | Contents |
| --- | --- |
| `users` | Registered client/freelancer accounts |
| `currentUser` | Current local session profile |
| `token` | Simulated authentication marker |
| `projects` | Client projects and their applications |
| `savedJobs` | Saved project cards |

Project images are converted to data URLs. Applications are written both to the freelancer profile and to the matching client project so both sides can demonstrate their views.

## Project structure

```text
src/
├── components/       # Navigation, route guards, cards, popups, and layout UI
├── context/          # Saved-job context
├── pages/            # Auth, work discovery, projects, services, and profiles
├── App.jsx           # Route configuration
├── main.jsx          # Application bootstrap
└── index.css         # Tailwind and shared styling
```

## Current limitations

- There is no backend, database, or real authentication service.
- Passwords and the fake token are stored in localStorage; this is not secure.
- Data is limited to one browser and can be edited or deleted through developer tools.
- Service listings are partly component state and are not fully persistent.
- There is no payment, escrow, contract, notification, or real-time messaging system.
- Some existing page components are not connected to the main route table.
- Route access is not consistently protected across every profile/account page.
- Automated tests and production API error handling are not included.

## Production roadmap

- Add an authenticated backend and relational database
- Replace localStorage sessions with secure HTTP-only cookies
- Introduce projects, proposals, contracts, messages, reviews, and payment models
- Add file/object storage for project and profile images
- Implement role-based authorization on the server
- Add notifications, search indexing, tests, and CI

## Author

Built by **Aziz** as a frontend product-flow and marketplace UI project.
