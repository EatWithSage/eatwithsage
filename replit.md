# Sage

Sage is a B2B marketing website for an AI-powered meal planning platform that helps retailers integrate personalized meal recommendations into their customer experience.

## Run & Operate

- **Run Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Typecheck**: `npm run typecheck`
- **Generate DB Migration**: `npm run db:generate`
- **Apply DB Migrations**: `npm run db:migrate`
- **Push DB Schema (Dev only)**: `npm run db:push`

**Required Environment Variables**:
- `ADMIN_PASSWORD`: For accessing the admin CMS (default: `sage-admin-2024`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: For Cloudinary image uploads

## Stack

- **Frontend**: React 18, TypeScript, Vite, Wouter, Shadcn/ui
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: TanStack Query (server state), React Context (local state), React Hook Form (form state)
- **Build Tool**: Vite, ESBuild

## Where things live

- `client/`: Frontend React application source.
- `server/`: Backend Express server source.
- `shared/`: Shared types, schemas, and utilities (e.g., `shared/schema.ts` for DB schema).
- `migrations/`: Drizzle ORM database migration files.
- `public/`: Static assets.
- `vite.config.mts`: Vite build configuration.
- `drizzle.config.ts`: Drizzle ORM configuration.

## Architecture decisions

- **Dual Express Servers**: `server/api-server.ts` runs the primary API, while `server/index.ts` is legacy and not used in current dev workflows.
- **In-memory Storage for Dev**: `MemStorage` in `server/storage.ts` is used for development, abstracting actual database interactions.
- **Client/Server Schema Sharing**: Zod schemas are shared between frontend and backend for consistent validation.
- **Cloudinary for Media**: All cover images are uploaded to Cloudinary, with URLs stored in the database.
- **Database Migration Strategy**: Emphasize `db:generate` and `db:migrate` for schema changes over `db:push` to preserve migration history.

## Product

- **AI-Powered Meal Planning**: Core offering for retailers.
- **Lead Generation Website**: Marketing site with demo request forms.
- **Blog Platform**: Public-facing blog with an admin CMS for content management (create, edit, delete posts).
- **Responsive Design**: Mobile-first approach for optimal viewing on various devices.
- **Branding**: Consistent use of Sage brand colors and typography across the site.

## User preferences

Preferred communication style: Simple, everyday language.

## Gotchas

- **Avoid `db:push` on production**: Never run `db:push` or `db:push --force` on any deployed database, as it bypasses migration history and can lead to data loss. Always use `db:generate` followed by `db:migrate`.
- **Schema changes and deployment**: Adding a new column to `shared/schema.ts` without running `db:migrate` will break production queries until the migration is applied. Always generate and apply migrations for schema changes.
- **Migrations folder in deployment**: Ensure the `migrations/` folder is included in deployment artifacts (e.g., `vercel.json`'s `includeFiles`) for production migrations to run correctly.
- **Separate Databases**: Development uses a local `heliumdb` instance, while production uses a Neon PostgreSQL database. Local scripts do not affect production data.

## Pointers

- **React**: [https://react.dev/](https://react.dev/)
- **Vite**: [https://vitejs.dev/](https://vitejs.dev/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
- **Drizzle ORM**: [https://orm.drizzle.team/](https://orm.drizzle.team/)
- **Zod**: [https://zod.dev/](https://zod.dev/)
- **React Hook Form**: [https://react-hook-form.com/](https://react-hook-form.com/)
- **Cloudinary**: [https://cloudinary.com/](https://cloudinary.com/)