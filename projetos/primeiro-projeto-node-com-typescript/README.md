# Anotações
- yarn init -y
- yarn add express
- yarn add typescript -D
- yarn tsc --init
- no tsconfig:
     "outDir": "./dist",
     "rootDir": "./src",
- yarn tsc
- yarn add @types/express
- yarn tsc
- node dist/path
- yarn add ts-node-dev
    - mais rapido pra executar o projeto node
    - nao cria a pasta dist sujando o código
- yarn ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts
- adicinar extenção editor config
    - Padronizar dessa forma
        root = true

        [*]
        indent_style = space
        indent_size = 2
        end_of_line = lf
        charset = utf-8
        trim_trailing_whitespace = true
        insert_final_newline = true
- yarn add eslint -D
- sudo chmod -R 777 /home/<user>/.npm
- yarn eslint --init
```text
        ✔ How would you like to use ESLint? · style
        ✔ What type of modules does your project use? · esm
        ✔ Which framework does your project use? · none
        ✔ Does your project use TypeScript? · No / Yes
        ✔ Where does your code run? · node
        ✔ How would you like to define a style for your project? · guide
        ✔ Which style guide do you want to follow? · airbnb
        ✔ What format do you want your config file to be in? · JSON
        Checking peerDependencies of eslint-config-airbnb-base@latest
        The config that you've selected requires the following dependencies:

        @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1 @typescript-eslint/parser@latest
```
- yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1 @typescript-eslint/parser@latest
- clicar no icone do eslint no canto inferior direito
- no settings.json padronizar o salvamento de arquivos
```text
    -   {
        "terminal.integrated.fontSize": 14,
        "workbench.iconTheme": "material-icon-theme",
        "explorer.compactFolders": false,
        "emmet.syntaxProfiles": {"javascript": "jsx"},
        "emmet.includeLanguages": {
            "javascript": "javascriptreact"
        },
        "workbench.colorTheme": "Dracula",
        "[javascript]": {
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true,
            }
        },
        "[javascriptreact]": {
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true,
            }
        },
        "[typescript]": {
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true,
            }
        },
        "[typescriptreact]": {
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true,
            }
        }
        }
```
- Ensinar o eslint a importar arquivos .ts
    - yarn add -D eslint-import-resolver-typescript
    - no eslint.json
    ```text
        ,
        "rules": {
            "import/extensions":[
                "error",
                "ignorePackages",
                {
                    "ts": "never"
                }
            ]
        },
        "settings": {
            "import/resolver": {
                "typescript":{}
            }
        }
        ```
- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
    - no eslint.json editar:
```text
        ,
        "extends": [
            "plugin:@typescript-eslint/recommended",
            "prettier/@typescript-eslint",
            "plugin:prettier/recommended"
        ],
        ,
        "plugins": [
            "prettier"
        ],
        ,
        "rules": {
            "prettier/prettier": "error",
        },
```
- debug
    - gerar o arquivo de debug launch.json
        - modificar:
        ```text
        {
            // Use IntelliSense to learn about possible attributes.
            // Hover to view descriptions of existing attributes.
            // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "node",
                    "request": "attach",
                    "protocol": "inspector",
                    "restart": true,
                    "name": "Launch Program",
                    "skipFiles": [
                        "<node_internals>/**"
                    ],
                    "outFiles": [
                        "${workspaceFolder}/**/*.js"
                    ]
                }
            ]
        }
        ```
    - modificar o script dev:server
        - "dev:server": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
- ORM (models para conexao com banco de dados):
    - Sequelize
    - Knex.js
    - TypeORM
- Docker
    - Ajuda a controlar serviços (db, envio de email, ...) das aplicações
    - criação de ambientes isolados (container)
    - Containers expões portas para comunicação
    - Conceitos
        - imagem (sql, postgree, mongodb)
        - container (instancia de uma imagem)
        - Docker Registry (Docker Hub)
        - Dockerfile (receita pra fazer o codigo rodar)
            - receita para imagem
    - instalar o docker
        - https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2#c7e37c6a26584d33b20cf332f2bdb31d
