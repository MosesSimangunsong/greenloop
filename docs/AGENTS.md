# AGENTS.md

## Project overview

GreenLoop is a web-based MVP for a software development competition. The product focuses on organic waste exchange in Kabupaten Toba, Indonesia.

The main goal is to help organic waste producers connect with suitable receivers, so waste does not go unsent and can be reused productively. The platform also provides recommendations for how a waste type can be processed or turned into downstream products.

This repository is the main codebase for the MVP and should prioritize:

1. working demo quality
2. clean structure
3. clear business flow
4. practical implementation over overengineering

## Core product scope

This MVP is limited to:

* Kabupaten Toba only
* organic waste only
* web app only
* competition-ready MVP, not full production system

### Supported organic waste categories

Default categories:

* Jerami
* Sekam padi
* Kulit kopi
* Sisa makanan
* Kotoran ternak

Admin can add more categories later.

## Primary users

A user can have more than one role.

### Roles

* Admin
* Producer
* Receiver

### Role meaning

* Producer: posts waste listings
* Receiver: searches and claims waste listings
* Admin: monitors users, listings, claims, categories, recommendations, and statistics

## Main business flow

1. Producer registers and logs in
2. Producer creates a waste post
3. Receiver searches available waste posts
4. System shows recommendations based on waste type and distance
5. Receiver opens waste detail page
6. Receiver submits a claim
7. Producer approves or rejects the claim
8. If approved, both parties continue communication outside the platform or through simple contact methods
9. Producer marks the transaction as completed after handoff

## MVP priorities

When implementing features, prioritize these modules first:

1. authentication
2. role management
3. waste categories
4. waste post CRUD
5. waste search and filtering
6. claim flow
7. recommendation display on waste detail
8. admin dashboard and statistics

Do not prioritize these for early MVP:

* online payment
* wallet / top-up
* escrow
* advanced chat
* full marketplace monetization
* machine learning
* receiver demand posting
* advanced carbon modeling
* real-time notifications

## Tech stack

Use the following stack unless explicitly changed by the user:

* Laravel
* React
* Inertia.js
* Tailwind CSS
* shadcn/ui for admin components
* PostgreSQL

## Architectural principles

* Keep the app monolithic for MVP speed
* Prefer simple service classes over premature abstraction
* Prefer server-driven business logic
* Keep UI components reusable and small
* Use Laravel Form Request validation
* Use Policies or middleware for authorization
* Keep controllers thin where practical

## Frontend guidance

* Admin UI should use shadcn/ui components where suitable
* Use React components that are readable and composable
* Avoid overly complex state management unless necessary
* Favor predictable forms and table layouts
* Optimize for clarity in demo presentations
* Prioritize usability over visual effects

## Backend guidance

* Keep business logic in Services when reused
* Use clear model relationships
* Use PostgreSQL-friendly schema design
* Keep migrations explicit and readable
* Prefer enum-like constants for statuses where practical
* Avoid hidden magic and unclear helper chains

## Core data model expectations

The system is expected to include models similar to:

* User
* Role
* WasteCategory
* WastePost
* WasteClaim
* WasteRecommendation
* TransactionLog

### Important rules

* One user may have multiple roles
* Waste quantity is stored in kg
* One waste post should be treated as one lot
* A lot is intended to be claimed as a whole
* Payment is handled outside the platform for MVP
* Claim requires producer approval
* Recommendations are shown on waste detail pages
* Matching is rule-based, not ML-based

## Matching logic expectations

The matching system should stay simple and transparent.

Use rule-based logic based on:

* waste category
* distance / location
* availability
* optional radius constraints

This is a recommendation mechanism, not machine learning.

When helpful, expose recommendation reasoning such as:

* category match
* nearby location
* within radius
* available now

## Recommendation feature expectations

The recommendation section should help a receiver understand possible uses of the waste.

Examples:

* compost
* animal feed
* downstream business opportunities

Recommendations should be grounded in category data and editable by admin.

## Status conventions

Use a consistent lifecycle for waste posts and claims.

### Waste post statuses

Suggested:

* available
* pending
* reserved
* in_process
* completed
* cancelled

### Claim statuses

Suggested:

* pending
* approved
* rejected
* in_process
* completed
* cancelled

If implementation changes these names, keep them consistent across backend and frontend.

## Admin dashboard expectations

Admin should be able to:

* view all users
* view all waste posts
* view all claims
* manage categories
* manage waste recommendations
* view statistics

### Statistics for MVP

* total users
* total waste posts
* total successful transactions
* most frequent waste categories
* trend charts

## Code quality rules

* Write code for maintainability, not cleverness
* Avoid dead code
* Do not add speculative infrastructure
* Use descriptive names
* Keep commits focused
* Do not silently change product scope
* If a requested feature conflicts with MVP scope, prefer the simpler MVP-safe version

## UI and UX rules

* Keep forms simple
* Show important listing info clearly:

  * category
  * quantity in kg
  * price or free label
  * location
  * availability date
* Waste detail pages should clearly show:

  * waste data
  * producer info
  * recommendations
  * claim button / status
* Admin pages should favor clarity and tables over decorative design

## File and folder conventions

* Keep admin pages under a clear admin namespace
* Keep shared UI components reusable
* Group validation requests by feature when useful
* Keep service classes inside a dedicated Services directory
* Prefer consistent naming between models, controllers, and pages

## Testing guidance

For important flows, prioritize testing:

* authentication
* role access
* waste creation
* waste claim flow
* producer approval / rejection
* admin-only pages
* recommendation display logic

If time is limited, cover core business flow first.

## Commands and workflow

Before making major structural changes:

* inspect current routes
* inspect models
* inspect migrations
* inspect page structure

Prefer incremental changes over large rewrites.

When adding a feature:

1. understand current flow
2. update migration or schema if needed
3. add backend logic
4. connect frontend
5. validate role access
6. test manually
7. keep the implementation demo-ready

## What to avoid

* Do not convert this into a generic e-commerce app
* Do not introduce unnecessary AI or ML claims
* Do not add payment processing for MVP unless explicitly requested
* Do not broaden scope beyond Kabupaten Toba and organic waste without approval
* Do not replace simple logic with complex abstractions without strong reason

## Competition mindset

This project is for a competition MVP.

Always optimize for:

* clear value proposition
* visible product differentiation
* smooth demo flow
* realistic implementation
* understandable codebase
* features that can be explained confidently to judges

## If unsure

When requirements are unclear:

* choose the simpler MVP-friendly path
* preserve current scope
* avoid speculative features
* leave notes in code or PR summary explaining tradeoffs
