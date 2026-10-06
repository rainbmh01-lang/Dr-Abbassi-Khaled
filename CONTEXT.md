# dr-abbassi-khaled — Dr Abbassi Khaled Dermatology Clinic Platform

> ID: CLI-03  
> Category: `client-work`  
> Original Name: `Dr Abbassi Khaled`  
> Stack: pnpm monorepo, React 19, Vite, Tailwind CSS, Express 5, PostgreSQL, Drizzle ORM, TypeScript  
> Status: active

## One Job
Provide a responsive web platform and management interface for Dr. Abbassi Khaled's dermatology clinic, featuring clinic services showcase, booking inquiries, medical articles, and treatment galleries.

## Context & Inputs
- **Codebase Root**: `./`
- **Frontend App**: `artifacts/abbassi-dermatology/`
- **Backend Service**: `artifacts/api-server/`
- **Shared Libraries**: `lib/`
- **Configuration**: `package.json`, `pnpm-workspace.yaml`, `vercel.json`
- **Shared Reference**: `../../../_shared/rules.md`

## Architecture & Workflows
- **Entry Points**:
  - Frontend: `artifacts/abbassi-dermatology/src/main.tsx`
  - Backend API: `artifacts/api-server/src/index.ts`
- **Key Modules**:
  - `artifacts/abbassi-dermatology/`: Patient-facing UI, appointment booking forms, before/after showcases, multilingual clinic layout.
  - `artifacts/api-server/`: Express API endpoints, appointment management, DB migrations.
  - `lib/db/`: Database schemas and Drizzle ORM client.

## Commands
```bash
# Install monorepo dependencies
pnpm install

# Typecheck all packages
pnpm run typecheck

# Run development API & client
pnpm --filter @workspace/api-server run dev

# Build production bundle
pnpm run build
```

## Outputs
- **Build Artifacts**: `artifacts/abbassi-dermatology/dist/`
- **Production Target**: Vercel Serverless / Cloud Hosting

## Human Gate & Verification
Run `pnpm run build` and ensure typecheck passes cleanly across both client and API packages; verify booking form validations and responsiveness on mobile.
