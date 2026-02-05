# code-engine-sample

A sample application demonstrating automated CI/CD deployment to IBM Cloud Code Engine using GitHub Actions.

## Overview

This project showcases a complete CI/CD pipeline that automatically builds, tests, and deploys a containerized application to IBM Cloud Code Engine whenever code is pushed to the `main` branch.

## Features

- 🚀 Automated deployment to IBM Cloud Code Engine
- 🐳 Docker container build using Code Engine build service
- 📦 Image storage in IBM Container Registry (ICR)
- ✅ Automated unit testing
- 🔍 Container vulnerability scanning with IBM Vulnerability Advisor
- 🧹 Automatic cleanup of temporary PR images
- 📊 PR size validation to encourage reviewable changes
- ✅ Automated commit status updates in GitHub PRs

## Prerequisites

- IBM Cloud account
- IBM Cloud Code Engine project
- IBM Container Registry namespace
- GitHub repository with Actions enabled

## Setup Instructions

### 1. IBM Cloud Setup

1. Create an IBM Cloud Code Engine project
2. Create an IBM Container Registry namespace
3. Generate an IBM Cloud API key with appropriate permissions

### 2. GitHub Repository Configuration

#### Required Secrets

Navigate to your repository's **Settings > Secrets and variables > Actions** and add:

- `IBMCLOUD_API_KEY` - Your IBM Cloud API key

#### Required Variables

Add the following repository variables:

- `IBMCLOUD_REGION` - IBM Cloud region (e.g., `us-south`, `eu-gb`)
- `ICR_REGION` - ICR region hostname (e.g., `us.icr.io`, `uk.icr.io`)
- `ICR_NAMESPACE` - Your ICR namespace
- `RESOURCE_GROUP` - IBM Cloud resource group name
- `PROJECT_NAME` - Code Engine project name
- `APP_NAME` - Code Engine application name
- `IMAGE_NAME` - Base name for your container image

### 3. Project Requirements

Ensure your repository contains:

- `Dockerfile` - Container build instructions
- `package.json` - With `test-unit` script defined
- Application source code

## CI/CD Pipelines

This project includes two GitHub Actions workflows for different stages of the development lifecycle:

### PR Pipeline (`.github/workflows/pr-pipeline.yml`)

The PR pipeline validates pull requests before they are merged to ensure code quality and build integrity.

📊 **[View PR Pipeline Flow Diagram](docs/pr-pipeline-flow.md)**

**Triggers:**
- Pull request opened or reopened
- Manual trigger via GitHub Actions UI (workflow_dispatch)

**Steps:**
1. **Check PR Size** - Validates PR has fewer than MAX_PR_LINES (default: 1000) lines of changes to encourage reviewable PRs
2. **Checkout PR Code** - Retrieves the PR branch code
3. **Set Commit Status (Pending)** - Updates GitHub PR status to "pending"
4. **Unit Tests** - Runs `npm run test-unit` to validate code changes
5. **Build PR Image** - Builds Docker image using Code Engine and pushes to ICR with commit SHA tag
6. **Login IBM Cloud CLI** - Authenticates with IBM Cloud and installs Container Registry plugin
7. **Scan Image** - Performs vulnerability scanning using IBM Vulnerability Advisor, waits for results
8. **Remove PR Image** - Cleans up the temporary PR image from ICR with existence check
9. **Set Commit Status** - Updates GitHub PR status to "success" or "failure"

**Key Features:**
- ✅ Automatic PR status updates visible in GitHub UI
- 🔍 Real vulnerability scanning with IBM Vulnerability Advisor
- 🧹 Automatic cleanup of temporary images to save registry space
- 📏 PR size validation to maintain code review quality
- 🚫 Does NOT deploy to Code Engine (validation only)
- 📊 Links to workflow run for detailed logs
- ⏱️ Waits for scan completion (up to 5 minutes) before proceeding

### CI Pipeline (`.github/workflows/ci-pipeline.yml`)

The CI pipeline builds, tests, and deploys the application to Code Engine when code is merged to main.

📊 **[View CI Pipeline Flow Diagram](docs/ci-pipeline-flow.md)**

**Triggers:**
- Push to `main` branch
- Manual trigger via GitHub Actions UI (workflow_dispatch)

**Steps:**
1. **Checkout Code** - Retrieves the latest code from the repository
2. **Unit Tests** - Runs `npm run test-unit` to validate code
3. **Login IBM Cloud CLI** - Authenticates with IBM Cloud and installs Code Engine and Container Registry plugins
4. **Get Currently Deployed Image** - Retrieves the digest of the currently deployed image for rollback capability
5. **Build Image** - Builds Docker image using Code Engine and pushes to ICR as `ci-{image-name}:latest`
6. **Scan Image** - Performs vulnerability scanning using IBM Vulnerability Advisor, waits for results
7. **Deploy** - Deploys the application to Code Engine with 1 CPU and 4GB memory
8. **Run Integration Tests** - Executes integration tests against deployed application (placeholder)
9. **Rollback on Failure** - Automatically rolls back to previous image if deployment fails

**Key Features:**
- 🚀 Automatic deployment to production Code Engine environment
- 📦 Persistent image in ICR for rollback capability
- ⚡ Fast deployment using Code Engine's serverless platform
- 🔄 Automatic rollback on failure to maintain service availability
- 🧪 Integration testing against live deployment

## Application Configuration

The deployed Code Engine application is configured with:

- **CPU**: 1 vCPU
- **Memory**: 4GB
- **Registry**: Private IBM Container Registry
- **Image**: `private.{region}/{namespace}/ci-{image-name}:latest`

## Development

### Running Tests Locally

```bash
npm install
npm run test-unit
```

### Building Docker Image Locally

```bash
docker build -t code-engine-sample .
```

## Troubleshooting

### Pipeline Failures

1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets and variables are correctly configured
3. Ensure IBM Cloud API key has sufficient permissions
4. Confirm Code Engine project and ICR namespace exist

### Deployment Issues

1. Check Code Engine application logs:
   ```bash
   ibmcloud ce app logs --name <APP_NAME>
   ```
2. Verify the container image was successfully pushed to ICR
3. Check Code Engine project quotas and limits

## Future Enhancements

- [ ] Implement secret detection scanning
- [x] Add container vulnerability scanning (implemented with IBM Vulnerability Advisor)
- [x] Implement PR image cleanup (implemented with existence check)
- [x] Add PR size validation (implemented with configurable line limit via MAX_PR_LINES env var, default: 1000)
- [ ] Complete integration tests implementation
- [x] Add CI pipeline vulnerability scanning (implemented with IBM Vulnerability Advisor)
- [ ] Implement blue-green deployment strategy
- [ ] Add monitoring and alerting
- [ ] Configure custom domain
- [ ] Add automated rollback testing
- [ ] Implement deployment notifications (Slack, email, etc.)

## Resources

- [IBM Cloud Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)
- [IBM Container Registry Documentation](https://cloud.ibm.com/docs/Registry)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [IBM Code Engine GitHub Action](https://github.com/IBM/code-engine-github-action)

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
