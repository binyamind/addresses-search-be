import { Address } from "./Address";

export type ResponseAddress = Pick<
  Address,
  | "code"
  | "description"
  | "extraGroup"
  | "group"
  | "main"
  | "neighbourhood"
  | "secondary"
  | "type"
> & { id: string | undefined };
