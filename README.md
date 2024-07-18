# Lords Mobile guild stats checker

## 📝 Description

-   Upload the excel file that the bot generated for the last month.
-   Select metrics to check their completion status (`Hunt` / `Purchase` / `Both`). You may also enter a username to find yourself in the list easier.
-   Click on yourself to check your stats with comfortable charts and a list of values split into sections.
-   You may scroll down and click on the button to copy the list of users who failed the task. Use the checkbox to copy percents of completion too.

## 🥊 Code quality

-   [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
-   [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
-   [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention.
-   [prettier](https://prettier.io/) — an opinionated code formatter.
-   [ls-lint](https://ls-lint.org/) — file and directory name linter.
-   [eslint](https://eslint.org/) — find problems in your JS/TS code.
-   [stylelint](https://stylelint.io/) — find and fix problems in your CSS code.

## 🗂 Commit convention

-   `feat: new feature`
-   `fix(scope): bug in scope`
-   `feat!: breaking change` / `feat(scope)!: rework API`
-   `chore(deps): update dependencies`

### Commit types

-   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
-   `ci`: Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
-   **`chore`: Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries**
-   `docs`: Documentation only changes
-   **`feat`: A new feature**
-   **`fix`: A bug fix**
-   `perf`: A code change that improves performance
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `revert`: Revert something
-   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   `test`: Adding missing tests or correcting existing tests

## ⚙️ Scripts

-   `lint:fs` - check files and directories names to match **([.a-z0-9]_) ([-.][a-z0-9]+)_**

    Example: **drag-and-drop**, **example-block.tsx**

-   `lint:type` - check typescript errors in the project

-   `lint:css` - check ccs/scss files content to be valid

-   `lint:css:fix` - automatically fix css/scss errors acording to rules in **.stylelintrc.yml** file if it is possible

-   `lint:js` - start eslint checker with configuration in **.eslintrc.cjs** file

-   `lint:js:fix` - run eslint with **--fix** flag

-   `lint:prettier:fix` - run prettier on all project files

-   `lint` - run all scripts that not affect the code: **lint:type && lint:css && lint:js && lint:fs**

-   `lint:fix` - run all scripts that **fix** code if it is possible: **npm run lint:css:fix && npm run lint:js:fix && npm run lint:prettier:fix**
