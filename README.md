# aws-gh-oidc

Demonstrate a secure connection to aws from github without storing any credentials in the repository.  
It allows accessing aws resources using the github action `aws-actions/configure-aws-credentials@v1` without storing any secrets (like `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` ) in the repository itself.

## Infrastructure

### Requirements

- [Terraform CLI](https://www.terraform.io/downloads) 1.1.4 or newer
- [AWS CLI](https://aws.amazon.com/de/cli/)

#### Initial setup

## Terraform

1. Follow [README](infra/init/README.md) in folder `infra/terraform/init`
2. In folder `infra/terraform`:
   - `terraform init`
   - `terraform apply`

#### Destroy infrastructure

## Terraform

1. `terraform destroy` in folder `infra/terraform`
2. `terraform destroy` in folder `infra/terraform/init`
