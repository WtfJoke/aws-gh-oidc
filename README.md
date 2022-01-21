# aws-gh-oidc

Demonstrate a secure connection to aws from github without storing any credentials in the repository

## Infrastructure

### Requirements

- [Terraform CLI](https://www.terraform.io/downloads) 1.1.4 or newer
- [AWS CLI](https://aws.amazon.com/de/cli/)

#### Initial setup

1. Follow [README](infra/init/README.md) in folder `infra/init`
2. In folder infra:
   - `terraform init`
   - `terraform apply`

#### Destroy infrastructure

1. `terraform destroy` in folder `infra`
2. `terraform destroy` in folder `infra/init`
