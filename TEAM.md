# Editor Team Instructions

This document contains information used by the editors maintaining the specification.

## Approving Pull Requests

1. Use your judgement for approving editorial changes and improvements. In general we don't need lots of review for these changes. If a change improves the readability of the spec or corrects a typo then it doesn't represent a significant contribution from an IP perspective.

2. If the Pull Request contains a normative change to the specification and the IPR check fails because the contributor is either not part of the working group or not yet known to the IPR checker then please contact the chairs and do not merge the PR. The chairs will either update the tool if the contributor is a member or otherwise resolve the issue.

3. The editors should review the contribution considerations listed in the [README.md](README.md) file.

4. Use your judgement before approving a change that might be considered controversial. In general, such changes often need a wider review from the working group and should not be merged before that happens. Of course, we can revert or amend changes if it is clear that they don't represent WG consensus so it is a judgement call.

5. Note: the editors don't need to create pull requests for editorial changes. Editors may commit these changes directly to the repository. Editors should create pull requests for normative changes associated with a bug or issue. Editors may merge their own pull requests if they are expected to be uncontroversial. Again, use good judgement.

## Handling Pull Requests

This spec does not use the green "Merge pull request" button. This ensures that each change is a single commit on the main `gh-pages` branch.

The following subsections contain instructions for merging. They assume the Bash functions that follow them are present.

### Merging Pull Requests from Forks

1. `git checkout gh-pages`

1. `pr <pull request ID>`

1. If the pull request contains multiple commits, squash them as appropriate.
   * In general, all commits and merges should be squashed into a single commit.
   * If commits or sets of commits represent multiple distinct actions (i.e. do something then rename a variable), then the branch might be squashed into two or more commits, each representing a distinct action.
   * Squash commits by running `git rebase -i origin/gh-pages` then using `squash` on the commit(s) to be squashed.

1. Single-page.html and the multi-page HTML files are not usually part of the pull request and need to be updated (NOTE: we are working on an automatic build system that will run Bikeshed and html-tools for you - this should be in place soon):
  1. Generate single-page.html using Bikeshed.
  1. Generate the index.html page and other multi-page files using [html-tools](https://github.com/w3c/html-tools).
  1. Run the following:

    ```
    git add single-page.html
    git add index.html
    git add _other changed files_
    git commit --amend
    ```

1. If the commit message needs to be updated (i.e. To add "Fix #\<bug ID\>: "), do one of the following and update the message:
    * Run `git rebase -i origin/gh-pages` then use `reword` to select the commit(s) to reword.
    * Run `git commit --amend` and edit the last commit message.

1. `git push`

1. Close the pull request by following these steps in the web interface:
  1. Let `hash` be the the commit hash.
  1. Navigate to the pull request.
  1. Add a comment that say "Merged as `hash`." and click the "Close pull request" button to post that
comment.

### Merging Pull Requests from Branches
For pull requests coming from branches within this repository, use the same steps above except use `mypr` and there is no reason to use the web interface.

`git push` will _automatically_ close the pull request and mark it as merged, since the commits contained there were updated.

### Bash Functions
The following is based on https://github.com/whatwg/html/blob/master/TEAM.md.

```
pr () {
  git fetch origin refs/pull/$1/head:refs/remotes/origin/pr/$1 --force
  git checkout -b pr/$1 origin/pr/$1
  git rebase gh-pages
  git checkout gh-pages
  git merge pr/$1 --ff-only
}
```
Pulls down the PR into a local branch, using [the special refs GitHub provides](https://help.github.com/articles/checking-out-pull-requests-locally/); rebases the PR's commits on top of `gh-pages`; and does a fast-forward only merge into `gh-pages`.

```
mypr () {
  git checkout $1
  git rebase gh-pages
  git push origin $1 --force
  git checkout gh-pages
  git merge $1 --ff-only
}
```
Rebases the PR on top of `gh-pages`; force-pushes it to the appropriate branch, thus updating the PR; and does the fast-forward only merge into `gh-pages`.

