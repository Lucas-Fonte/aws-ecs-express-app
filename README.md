# aws-ecs-express-app

Node.js Express Backend API using AWS ECS + RDS

---

## Deployment instructions

- Create an AWS account (if needed)
- Configure [IAM Admin](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) (if needed)
- Install [aws-cli](https://aws.amazon.com/cli/)
- Create a repository in ECR `aws ecr create-repository --repository-name personal_projects --region us-east-1`
- Build and push image to the recently created **Container Repository**
- Create ECS Cluster, (I'll be using Fargate)
- Create Task Definition
- Run Task Definition

## Useful Links:

- Github Actions + ECS: https://docs.github.com/pt/actions/guides/deploying-to-amazon-elastic-container-service
- Express + ECS: https://dev.to/raphaelmansuy/deploy-a-docker-app-to-aws-using-ecs-3i1g
