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

resource "aws_ssm_parameter" "sample" {
  name  = "sample_${local.project_name}"
  type  = "String"
  value = "Hi"
}
