# Local development with Docker

Runs the site (Middleman + webpack) in a container, with Ruby 2.7.8 and Node 18,
so you don't need either installed on your machine. Works on Apple Silicon.

This setup is self-contained in this folder. It does not use, and does not
change, the root `Dockerfile` / `docker-compose.yml` or the `dev-m1/` folder.

## Setup

Create the `.env` file in the repo root, as described in the main
[README](../README.md) (`DATO_API_TOKEN`, `BUILD_ENV` and `BASE_URL` are required).

## Run

From the repo root:

```sh
docker compose -f local-dev/compose.yml up --build
```

The first build takes a few minutes (native gems are compiled). Then open
http://localhost:4567. Changes to templates, JS and SCSS are picked up
automatically: Middleman starts webpack in watch mode by itself.

| Task                          | Command                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| Run in background             | `docker compose -f local-dev/compose.yml up -d`                          |
| Follow logs                   | `docker compose -f local-dev/compose.yml logs -f`                        |
| Stop                          | `docker compose -f local-dev/compose.yml down`                           |
| Shell in the container        | `docker compose -f local-dev/compose.yml exec web bash`                  |
| Full static build (`build/`)  | `docker compose -f local-dev/compose.yml run --rm web bundle exec middleman build` |
| Use another port              | `MIDDLEMAN_PORT=4568 docker compose -f local-dev/compose.yml up`         |

## Dependencies

Gems and `node_modules` are stored in Docker volumes, not in the repo folder
(the `node_modules` folder you see on the host is just an empty mount point).
When `Gemfile.lock` or `yarn.lock` change, restart the container: missing
dependencies are installed at startup.

To start from scratch, remove the volumes and rebuild:

```sh
docker compose -f local-dev/compose.yml down -v
docker compose -f local-dev/compose.yml build --no-cache
```

## Notes

- Node is copied from the official `node:18-bullseye-slim` image instead of
  being installed with apt: the Ruby 2.7 images are based on Debian bullseye,
  which is end-of-life, and the NodeSource apt setup no longer works on it.
- At startup the log shows a `Pusher : error ... not in this cluster` message.
  It comes from the DatoCMS live-reload of the `dato` gem and can be ignored:
  the site works, but content edited on DatoCMS shows up only after a restart.
