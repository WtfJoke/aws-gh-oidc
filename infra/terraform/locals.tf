locals {
  project_name = "aws-gh-oidc"
  default_tags = {
    App    = local.project_name
    Source = "https://github.com/WtfJoke/aws-gh-oidc"
  }
  allowed_branches_to_assume_roles = [
    "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main"
  ]
  #  By default, this is the URL of the repository owner in this case its the one from aws-actions/configure-aws-credentials
  audience = "sts.amazonaws.com"
}
