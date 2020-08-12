declare namespace Express {
  export interface Request {
    auth?: {
      userId: number
    }
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN_SECRET: string
  }
}
