# Leihapp

Web application to manage borrow stores.

- ✅ Manage multiple borrow locations
- ✅ User signup/login
- ✅ User e-mail verification
- ✅ See product availability
- ⭕️ Create product reservations
- ⭕️ Product categories
- ✅ Textual product search
- ⭕️ Filter products on categories

## Tech

- Back-end and API using [PocketBase](https://pocketbase.io/)
- Front-end with server-side rendering based on [NuxtJS](https://nuxt.com/)

## Setup

Requirements: [Docker](https://www.docker.com/)

- `$ docker compose build`
- `$ docker compose up`

## Deployment

The repository contains [fly.toml](https://fly.io/docs/reference/configuration/)
files to deploy the service as [fly.io](https://fly.io) applications, but can be
deployed to any server where Docker containers can run.
