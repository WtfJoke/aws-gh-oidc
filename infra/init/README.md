# Account initalization

Terraform code to initialize the aws account with a dynamodb and an encrypted s3 bucket.  
These are used to store the state for the remaining infra.

# Setup infrastructure

1. Make sure you are logged in in aws - eg. `aws configure`
2. `terraform init`
3. `terraform apply`
