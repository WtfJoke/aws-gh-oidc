locals {
  project_name = "aws-gh-oidc"
  default_tags = {
    App    = local.project_name
    Source = "https://github.com/WtfJoke/aws-gh-oidc"
  }
  allowed_branches_to_assume_roles = [
    "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/main",
    "repo:WtfJoke/aws-gh-oidc:ref:refs/heads/hello"
  ]
}
