export const authMockState = {
  registered: false,
  authenticated: false,

  admin: null as
    | {
    id: number
    login: string
  }
  | null,
}
