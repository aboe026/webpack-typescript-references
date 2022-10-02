# webpack-typescript-references

Minimal reproduction setup for webpack.config.ts attempting to use a typescript reference without first building it.

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [VSCode](https://code.visualstudio.com/)

  - To enable [Editor SDK](https://yarnpkg.com/getting-started/editor-sdks), run

    ```sh
    yarn dlx @yarnpkg/sdks vscode
    ```

    Then in TypeScript file, simultaneously press

    `ctrl` + `shift` + `p`

    and choose option

    `Select TypeScript Version`

    then select value

    `Use Workspace Version`

- [Install](#install)

## Install

To install dependencies, run

```sh
yarn install
```

## Steps to Reproduce

To produce the undesired behavior, run

```sh
yarn clean && yarn build
```

You should see an error similar to

```
➤ YN0000: Done in 1s 294ms
➤ YN0000: [webpack-cli] Failed to load 'D:\Repos\webpack-typescript-references\services\ui\webpack.config.ts' config
➤ YN0000: [webpack-cli] webpack.config.ts(7,29): error TS2307: Cannot find module '@webpack-typescript-references/env' or its corresponding type declarations.
➤ YN0000:
➤ YN0000: Done in 2s 347ms
```

## Workaround

The current workaround being used to get past this bug can be used by doing the following:

1. Rename the `build` script in the [ui package json](./services/ui/package.json) to `build-broken`
1. Rename the `build-workaround` script in the [ui package json](./services/ui/package.json) to `build`
1. Re-run the [Steps to Reproduce](#steps-to-reproduce), you should no longer see an error

This does not produce an error because the workaround ensures that the typescript references are built prior to webpack compilation being called.

Ideally, webpack can be configured to run the `tsc --build` itself to utilize typescript references used in `webpack.config.ts`.
