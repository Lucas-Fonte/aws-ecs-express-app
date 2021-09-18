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
- Create and run service
- Configure security group inbound rules, (In this case, I've set my source to be 0.0.0.0/0)
- **There is a Github Action already configured**

**Future improvements:** Parts of it could be automated with [terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service)

## Useful Links:

- Github Actions + ECS: https://docs.github.com/pt/actions/guides/deploying-to-amazon-elastic-container-service
- Express + ECS: https://dev.to/raphaelmansuy/deploy-a-docker-app-to-aws-using-ecs-3i1g
- Fargate: https://levelup.gitconnected.com/aws-fargate-running-a-serverless-node-js-app-on-aws-ecs-c5d8dea0a85a
- [Future] Terraform: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service
- tsoa: https://tsoa-community.github.io/docs/introduction.html#goal
- https://geojson.io/#map=8/-22.404/-44.904
