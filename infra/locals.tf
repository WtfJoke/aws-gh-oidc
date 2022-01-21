locals {
  project_name = "aws-gh-oidc"
  default_tags = {
    App    = local.project_name
    Source = "https://github.com/WtfJoke/aws-gh-oidc"
  }
}
