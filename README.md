<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="ts-logo" width="60"/>
    +
  <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/amazon_ecs_logo_icon_168660.png" alt="api-logo" width="60" />
    +
  <img src="https://static.thenounproject.com/png/3962382-200.png" alt="api-logo" width="60" />
</p>
<h1 align="center">
    Aws ECS Express App - Partner Application using GeoJSON
</h1>
<p align="center">
This is a test API that emulates a service providing stores/businesses, as a list with its location and coverage area, finding a specific store, registering a store or searching for one nearby.

</p>

<br />

<p align="center">
<img src="https://img.shields.io/badge/Code-Typescript-informational?style=flat&logo=typescript&logoColor=white&color=blue)" alt="image" />

<img src="https://img.shields.io/badge/Tools-Aws-informational?style=flat&logo=amazon&logoColor=white&color=blue)" alt="image" />
<img src="https://img.shields.io/badge/Tools-MongoDB-informational?style=flat&logo=mongodb&logoColor=white&color=blue)" alt="image" />

</p>

---

## Getting started

- Clone the project and accessing the directory

```sh
~/usr/projects > git clone https://github.com/Lucas-Fonte/aws-ecs-express-app.git
~/usr/projects > cd aws-ecs-express-app
```

##### With `docker-compose`

- On your terminal, run the [docker-compose](https://docs.docker.com/compose/install/) cli command, you should have something like this:

```sh
~/usr/projects/aws-ecs-express-app > docker-compose up --build
Docker Compose is now in the Docker CLI, try `docker compose up`

Building api
[+] Building 4.5s (4/9)
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 37B
 => [internal] load .dockerignore
 => => transferring context: 2B
 => [internal] load metadata for docker.io/library/node:14

 ...

api_1    | > Successfully connected to database!
api_1    | > Server is running on port 8080
```

- After all the application should be up and running on http://127.0.0.1:8080

**NOTE:** It is also possible to build and run both images with Docker

#### Without `docker-compose`

**Requirements:**

- Node JS & npm or yarn
- MongoDB instance, could be a local one or an [Atlas](https://www.mongodb.com/cloud/atlas)

**Installation**

- Run `npm install`
- Configure your `.env` file with the `MONGODB_URL` and `AUTHORIZATION_TOKEN`
- Run `npm run start` and by the end you should also have something like this:

```sh
...
> Successfully connected to database!
> Server is running on port 8080
```

- After all the application should be up and running on http://127.0.0.1:8080

---

## Deployment instructions

**OBS:** This one of the possibilities of deploying and how it has been done for this specific proof of concept since the application runs in a container it could easily be changed.

- Create an AWS account (if needed)
- Configure [IAM Admin](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) (if needed)
- Install [aws-cli](https://aws.amazon.com/cli/)
- Create a repository in ECR `aws ecr create-repository --repository-name <repo_name> --region <region>`
- Build and push image to the recently created **Container Repository**
- Create ECS Cluster, (I'll be using Fargate)
- Create Task Definition
- Run Task Definition
- Create and run service
- Configure security group inbound rules, (In this case, I've set my source to be 0.0.0.0/0)
- **There is a Github Action already configured**

**Future improvements:**

- Parts of it could be automated with [terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service)

---

## Documentation & Demo

- **API documentation** can be found at: http://geojsonexpressapp.software/docs
- **Demo** can be found at: http://geojsonexpressapp.software
- **Source code** can be found at:https://github.com/Lucas-Fonte/aws-ecs-express-app

---

## Next steps

- **TO-DOs:** https://github.com/Lucas-Fonte/aws-ecs-express-app/issues/1
- Improve environment variable injection
- Increase coverage

---

## Useful Links:

- Github Actions + ECS: https://docs.github.com/pt/actions/guides/deploying-to-amazon-elastic-container-service
- Express + ECS: https://dev.to/raphaelmansuy/deploy-a-docker-app-to-aws-using-ecs-3i1g
- Fargate: https://levelup.gitconnected.com/aws-fargate-running-a-serverless-node-js-app-on-aws-ecs-c5d8dea0a85a
- Terraform: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service
- tsoa: https://tsoa-community.github.io/docs/introduction.html#goal
- GeoJSON: https://geojson.io/
- Jest: https://jestjs.io/pt-BR/docs/getting-started
- Supertest: https://github.com/visionmedia/supertest
- Yup: https://github.com/jquense/yup
- NewRelic: https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/install-nodejs-agent-docker/
- MongoDBAtlas: https://www.mongodb.com/cloud/atlas
- Custom student domains: https://www.name.com/github-students
- Fargate + Route 53: https://www.youtube.com/watch?v=TsVO14-lqp0
- Swagger authentication: https://swagger.io/docs/specification/authentication/
