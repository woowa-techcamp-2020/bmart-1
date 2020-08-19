![GitHub Banner (3)](https://user-images.githubusercontent.com/19797697/90615358-fab55f80-e246-11ea-8a33-1d7495c7ec55.png)

## Resources

- [🗒 Notes in Notion](https://www.notion.so/BMART-ad57078df0cf4dbf9558bcb170ac4aa1)
- [💬 Discussions at GitHub](https://github.com/orgs/woowa-techcamp-2020/teams/bmart-team-one)
- [🎨 Design in Figma](https://www.figma.com/file/MXVVUZmgoY4NPO2BO0nfLq/%EC%9A%B0%EC%95%84%ED%95%9C-%ED%85%8C%ED%81%AC%EC%BA%A0%ED%94%84?node-id=613%3A302)

## Configure environment variables

### Global

Create `.env` at the root directory of the project.

```
TOKEN_SECRET=fill_with_your_secret_key
```

### Prisma

Create `.env` file inside `prisma` directory.

```
DATABASE_URL="mysql://user:password@host:3306/db-name"
```

This variable will be used during prisma cli is running.

> For more information, checkout sample `.env.sample` files in each directory.

## npm scripts

### Install dependencies

```zsh
npm install
```

### Dev

```zsh
npm run dev
```

### Build

```zsh
npm run build
```

### Check TypeScript types

```zsh
npm run typecheck
```

### Lint

```zsh
npm run lint
```

### Prisma

Introspect schema from remote DB and convert to Prisma schema.

```zsh
npm run prisma:introspect
```

Generate TypeScript types of the introspected schema.

```zsh
npm run prisma:generate
```

> You can run both scripts by run `prisma:all`

## Design Systems

### `--element-fill`

### `--distinct`

### `--inversion`

## License

MIT 2020 © [agrajak](https://github.com/agrajak), [jenny](https://github.com/eunjung-jenny), [jhaemin](https://github.com/jhaemin)
