# aws-gh-oidc

Demonstrate a secure connection to aws from github without storing any credentials in the repository.  
It allows accessing aws resources using the github action `aws-actions/configure-aws-credentials@v1` without storing any secrets (like `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` ) in the repository itself.

![138510587-33253c06-a2c4-4276-ac6b-3214ca94c9e6](https://user-images.githubusercontent.com/7139697/151580363-b9b6402a-9865-46c5-b55a-e0f6c27b4f7b.png)
*Image-Source: https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/*

### Requirements

- [AWS CLI](https://aws.amazon.com/de/cli/)
- For infrastructure either:
  - [Terraform CLI](https://www.terraform.io/downloads) 1.1.4 or newer (if you want to create infrastructure using terraform)
  - [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) v2 or newer (if you want to create infrastructure using aws cdk)

### Infrastructure

See [Infrastructure Readme](infra/README.md)
