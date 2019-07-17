# Contributing to Urbit

Thank you for your interest in contributing to Urbit.


## Git practice

Since we use the GitHub issue tracker, it is helpful (though not
required) to contribute via a GitHub pull request. If you already know
what you are doing, skip down to the Style section.

Start by cloning the repository on your work machine:

```
$ git clone https://github.com/urbit/sigil-js
```

And, additionally, fork the repository on GitHub by clicking the "Fork"
button. Add your fork as a remote:

```
$ git remote add [username] https://github.com/[username]/sigil-js
```

and set it as the default remote to push to:

```
$ git config --local remote.pushDefault [username]
```

This is good practice for any project that uses git. You will pull
upstream branches from urbit/sigil-js and push to your personal sigil-js fork
by default.

Next, start a new branch to do your work on. For `sigil-js`, please use the
latest tagged release as your starting point. For other repositories,
anywhere pointed to by `master` is alright to start from.

```
$ git checkout -b [branch name] [starting point]
```

Now you are free to do your work on this branch. When finished, you may
want to clean up your commits:

```
$ git rebase -i [starting point]
```

Then you can push to your public fork with `git push` and make a pull
request via the GitHub UI.

After your changes are merged upstream, you can delete your branch (via
github UI or `git push :[branch]` remotely, and with `git branch -d`
locally).

## Style

We prefer the [AirBnb JS styleguide](https://github.com/airbnb/javascript). At minimum, your code should be simple and well-organized.


## What to work on

If you are not thinking of contributing with a specific goal in mind,
the GitHub issue tracker is the first place you should look for ideas.
Issues are tagged with a priority and a difficulty. A good place to
start is on either a low-difficulty issue or a low-priority issue.
Higher priority issues are likely to be assigned to someone - if this is
the case, then contacting that person to coordinate before starting to
work is probably a good idea.

There is also a "help wanted" tag for things that we are especially
eager to have outside contributions on. Check here first!

## Staying in touch

Questions or other communications about contributing to Urbit can go to
[support@urbit.org](mailto:support@urbit.org).
