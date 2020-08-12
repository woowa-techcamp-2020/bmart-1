declare namespace Express {
  export interface Request {
    auth?: {
      userId: number
    }
  }
}
