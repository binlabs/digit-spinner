# Versioning

This project uses @changesets/cli to manage versioning.

1. Generate a changeset using npx changeset
2. Run `npx changeset version` to update package.json and package-lock.json
3. Run `git add` to add the changes to git
4. Run `git commit` to commit the changes, e.g. `git commit -m 'chore(release) 0.1.0'
5. Run `npx changeset publish`
