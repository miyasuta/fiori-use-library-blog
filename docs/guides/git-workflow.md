# Git Workflow Rules

## Required Workflow

### 1. Always Work on New Branch

Never commit directly to `main`. Always create a new branch for any work:

```bash
git checkout -b feature/description
git checkout -b fix/description
git checkout -b docs/description
```

### 2. Single-Line Commit Messages

Commit messages MUST be a single line, descriptive, and use imperative mood:

```bash
# ✅ GOOD
git commit -m "Add user authentication feature"
git commit -m "Fix navigation property filtering"
git commit -m "Update event handler documentation"

# ❌ BAD
git commit -m "Fixed some bugs and added new features"  # Too long, multiple things
git commit -m "WIP"                                     # Not descriptive
git commit -m "Update"                                  # Too vague
```

### 3. Merge Only After Approval

- Complete your work on the feature branch
- Wait for user approval
- After approval, merge to `main`
- Delete the feature branch immediately after merge

```bash
# After user approval
git checkout main
git merge feature/your-feature
git branch -d feature/your-feature
```

## Summary

1. **New branch for all work** - Never commit to main directly
2. **Single-line commit messages** - Descriptive, imperative mood
3. **Delete merged branches** - Keep repository clean
