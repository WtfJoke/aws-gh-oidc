resource "aws_iam_role" "github-actions-role" {
  name               = "aws-gh-oidc"
  description        = "Role to be assumed for a demonstration in https://github.com/WtfJoke/aws-gh-oidc"
  assume_role_policy = data.aws_iam_policy_document.github-actions-assume-role-trust-policy.json
}

data "aws_iam_policy_document" "github-actions-assume-role-trust-policy" {

  // Trust Policy
  statement {
    sid     = "GithubActionsAssumeRoleWithIdp"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.aws-oidc-github-identity-provider.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.allowed_branches_to_assume_roles
    }
  }
}

resource "aws_iam_role_policy_attachment" "github-actions-role-hello-attach" {
  role       = aws_iam_role.github-actions-role.name
  policy_arn = aws_iam_policy.read-hello-parameter-policy.arn
}

resource "aws_iam_policy" "read-hello-parameter-policy" {
  name        = "${local.project_name}-allow-read-hello-parameter-policy"
  description = "Allows to read ${aws_ssm_parameter.hello.name} parameter"

  policy = data.aws_iam_policy_document.read-hello-parameter-policy-document.json
}

data "aws_iam_policy_document" "read-hello-parameter-policy-document" {

  // Permission Policy
  // Allow to read ssm parameter hello
  statement {
    sid       = "AllowReadHello"
    actions   = ["ssm:GetParameters", "ssm:GetParameter"]
    resources = [aws_ssm_parameter.hello.arn]
  }
}
