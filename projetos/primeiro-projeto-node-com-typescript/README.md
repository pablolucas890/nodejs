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
    - sudo docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d postgres
    - 0f9cff2fd5818d3501bb16fc74a73793e01bc41570d55a8db92df306176f4a77
    - id: 0f9cff2fd581
    - sudo docker ps
    - quando reiniciar a maquina
        - sudo docker ps -a
        - sudo docker start id
- debeaver
    - sudo snap install dbeaver-ce
    - new connection
    - PostgresSql
    - muda a porta para a utilizada (5432 nesse caso)
    - username coloca docker
    - password igual a colocada anteriormente (docker nesse caso)
    - em PostgreSql marcar show all database
    - finish
- yarn add typeorm pg
- criar banco de dados no dbeaver em postgres
- configurar typeorm (ormconfig.json) de acordo com o typo de banco de dados
    ```text
    {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "docker",
        "password": "docker",
        "database": "gostack_gobarber",
        "migrations": [
            "./src/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/database/migrations"
        }

    }
    ```
- configurar um script novo no packge.json
    ```text
    ,
    "scripts": {
        "build": "tsc",
        "dev:server": "ts-node-dev --inspect transpile-only --ignore-watch node_modules src/server.ts",
        "typeorm" : "ts-node-dev ./node_modules/typeorm/cli.js"
    },
    ```
- yarn typeorm migration:create -n CreateAppointments
- Migrations
    - Linha do tempo
        - 1a semana (tb_agendamento)
        - 2a semana (tb_usuarios)
        - (Novo dev) 3a semana (edição tb_agendamentos)
        - 4a semana: compras
    - ela funciona como um github, evitando o banco de dados fiquem em versoes sql
    - criar migration em database/migrations/*.ts
    - yarn typeorm migrations:run
    - só se pode alterar um migration se ela nao foi enviada pro git, senao deve-se criar outramigration
- no arquivo tsconfig.json
    - descomentar
        "expeimport { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateApponitments1617209165626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // oque eu quero que seja executado na criação do banco de dados
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [{
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'provider',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'date',
          type: 'timestamp with time zone',
          isNullable: false,
        },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // callback -> desfazer o método up
    await queryRunner.dropTable('appointment');
  }
}
rimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "strictPropertyInitialization": false,
- yarn add date-fns
- yarn add reflect-metadata
- yarn add bcryptjs
- yarn add @types/bcryptjs
- yarn add jsonwebtoken
- yarn add -D @types/jsonwebtoken
- yarn add multer
- yarn add @types/multer
