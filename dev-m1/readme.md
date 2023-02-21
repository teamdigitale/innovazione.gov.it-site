## Why this?

To run middleman on an M1 amd64 you need a dockrized version.
This project already has a docker-compose config to run on ci/cd.
So I'am writing this guide to run in dev mode, without remove the previous docker config.

## How to setup

We need a parent folder to contain the docker related files, they must be placed at the same level of the project folder.

For Example, i have a parent folder named `mid` and this project is inside the `innovazione.gov.it` folder:

```
midt
|-- Dockerfile
|-- docker-compose.yml
|-- innovazione.gov.it
```

So Copy or Move both `Dockerfile` and `docker-compose.yml` files that you find in this folder to the repo's parent folder.

Check that your repo folder is named `innovazione.gov.it`, or if you prefer you can change the path inside the docker files after copying them.

Once done, open a shell on the parent folder and setup with the command

```zh
docker-compose build
```

This will take a while.

Once done, if everything is ok, you can start middleman with :

```
# use the -d flag to run on detached mode
docker-compose up
```

Now you should view the site at `http://localhost:4567`.

Webpack will autoreload every changes you made on frontend.
