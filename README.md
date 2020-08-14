<h1 align="center">⚡️ 𝑩 𝒎𝒂𝒓𝒕 ⚡</h1>

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

## npm Scripts

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

## License

MIT 2020 © [agrajak](https://github.com/agrajak), [jenny](https://github.com/eunjung-jenny), [jhaemin](https://github.com/jhaemin)
