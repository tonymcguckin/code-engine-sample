# Check PR Size Action

A composite GitHub Action that validates pull request size by checking the total number of lines changed (additions + deletions).

## Features

- ✅ Configurable line limit (default: 1000)
- 📊 Outputs total changes and validation status
- 🎨 Clear console output with pass/fail status
- 🔧 Easy to integrate into any workflow

## Usage

### Basic Usage

```yaml
- name: Check PR Size
  uses: ./.github/actions/check-pr-size
  with:
    github_token: ${{ github.token }}
```

### Custom Line Limit

```yaml
- name: Check PR Size
  uses: ./.github/actions/check-pr-size
  with:
    max_lines: 500
    github_token: ${{ github.token }}
```

### Using Outputs

```yaml
- name: Check PR Size
  id: pr-size
  uses: ./.github/actions/check-pr-size
  with:
    max_lines: 1000
    github_token: ${{ github.token }}

- name: Display PR size
  run: |
    echo "Total changes: ${{ steps.pr-size.outputs.total_changes }}"
    echo "Is valid: ${{ steps.pr-size.outputs.is_valid }}"
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `max_lines` | Maximum number of lines allowed in the PR (additions + deletions) | No | `1000` |
| `github_token` | GitHub token for API access | Yes | - |

## Outputs

| Output | Description | Example |
|--------|-------------|---------|
| `total_changes` | Total number of lines changed in the PR | `523` |
| `is_valid` | Whether the PR size is within limits | `true` or `false` |

## Behavior

- **Success**: If total changes ≤ max_lines, the action succeeds
- **Failure**: If total changes > max_lines, the action fails with a descriptive error message

## Example Output

### Passing PR
```
PR Size Check Results:
  Total lines changed: 523
  Maximum allowed: 1000
  Status: ✅ PASS
✅ PR size is acceptable (523 lines ≤ 1000 lines)
```

### Failing PR
```
PR Size Check Results:
  Total lines changed: 1523
  Maximum allowed: 1000
  Status: ❌ FAIL
Error: PR is too large (1523 lines > 1000 lines). Please split into smaller PRs.
```

## Why Check PR Size?

- **Better Code Reviews**: Smaller PRs are easier to review thoroughly
- **Faster Feedback**: Reviewers can provide quicker feedback on smaller changes
- **Reduced Merge Conflicts**: Smaller PRs are less likely to conflict with other changes
- **Quality Assurance**: Encourages focused, well-scoped changes

## License

[Add your license here]