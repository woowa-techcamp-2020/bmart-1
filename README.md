![GitHub Banner](https://user-images.githubusercontent.com/19797697/91411288-13df9100-e883-11ea-9e9b-795b590f098b.png)

<h3 align="center">https://bmart.woowa.io</h3>

This project clones **B mart** web application using TypeScript, React and Express. It is totally redesigned from the ground up while keeping the same functionalities as similar as possible. We worked so hard in every detail to achieve the most unique but familiar user experience whole inside a single web page. Silently in server side, [Prisma](https://www.prisma.io) enables us to develop reliable and type-safe APIs much faster.

## Design

### System

![Colors](https://user-images.githubusercontent.com/19797697/91301828-7d5a9380-e7e0-11ea-9341-b0db5ca84f2c.png)

We were trying to consolidate our design language to unify the same look and feel and share it with all of our developers. Including colors, border radius, spaces and typography, most of design properties are harmoniously defined.

For more information about it, checkout the corresponding [Sass source codes](https://github.com/woowa-techcamp-2020/bmart-1/tree/main/src/styles) and [pull requests](https://github.com/woowa-techcamp-2020/bmart-1/pulls?q=is%3Apr+is%3Aclosed+label%3ADocumentation+label%3A%22Design+System%22).

### Dark Mode

Since we considered the dark mode from the beginning, we could easily design, develop, and switch between the light mode and the dark mode.

### Responsive

By leveraging the power of CSS and thanks to our design system, our B mart looks nice in every viewport no matter what devices you have.

## Resources

- [Notes in Notion](https://www.notion.so/BMART-ad57078df0cf4dbf9558bcb170ac4aa1)
- [Discussions at GitHub](https://github.com/orgs/woowa-techcamp-2020/teams/bmart-team-one)
- [Design in Figma](https://www.figma.com/file/MXVVUZmgoY4NPO2BO0nfLq/%EC%9A%B0%EC%95%84%ED%95%9C-%ED%85%8C%ED%81%AC%EC%BA%A0%ED%94%84?node-id=613%3A302)

## Configure environment variables

### Global

Create a `.env` at the root directory of the project then fill with your values.

```
TOKEN_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
CLIENT_FALLBACK=
```

### Prisma

Also create a `.env` file inside `prisma` directory.

```
DATABASE_URL="mysql://user:password@host:3306/db-name"
```

This variable will be used during prisma cli is running.

> For more information, checkout sample `.env.sample` files in each directory.

## npm scripts

**Install dependencies**

```zsh
npm install
```

**Dev**

```zsh
npm run dev
```

**Build**

```zsh
npm run build
```

**Check TypeScript types**

```zsh
npm run typecheck
```

**Lint**

```zsh
npm run lint
```

**Prisma**

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
