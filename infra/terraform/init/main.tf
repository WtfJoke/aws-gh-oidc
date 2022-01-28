provider "aws" {
  region = "eu-central-1"
}

data "aws_kms_key" "default_kms_key_s3" {
  key_id = "alias/aws/s3"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "${local.project_name}-terraform-state"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true
    prefix  = ""

    noncurrent_version_expiration {
      days = 10
    }
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = data.aws_kms_key.default_kms_key_s3.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }

  tags = {
    Name        = "${local.project_name}-terraform-state"
    Environment = "global"
    App         = local.project_name
  }
}

resource "aws_dynamodb_table" "terraform_state" {
  name           = "${local.project_name}-terraform-state-lock"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "Terraform State Lock"
    Environment = "global"
    App         = local.project_name
    Source      = "https://github.com/WtfJoke/aws-gh-oidc"
  }
}

resource "aws_s3_account_public_access_block" "block_public_s3_accounts" {
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
