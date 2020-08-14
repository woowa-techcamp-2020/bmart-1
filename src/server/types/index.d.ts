declare namespace Express {
  export interface Request {
    auth?: {
      userId: number
    }
    authMessage: string
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN_SECRET: string
  }
}
