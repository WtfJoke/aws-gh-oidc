terraform {
  backend "s3" {
    bucket         = "aws-gh-oidc-terraform-state"
    key            = "dev/eu-central-1/aws-gh-oidc.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "aws-gh-oidc-terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = "eu-central-1"
  default_tags {
    tags = local.default_tags
  }
}

resource "aws_ssm_parameter" "hello" {
  name  = "hello_${local.project_name}"
  type  = "String"
  value = "Hi from aws :wave:"
}

resource "aws_iam_openid_connect_provider" "aws-oidc-github-identity-provider" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  # Obtained from the certificate of the url, see here for more details https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html
  # Alternatively this can also be obtained by the aws managagement console when creading an oidc provider and use the "Get Thumbprint button"
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}
