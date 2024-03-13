export enum IRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type IToken = {
  id: number;
  email: string;
  roles: IRole;
};
