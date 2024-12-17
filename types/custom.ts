import { Database } from "./Todos";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type UserRole = "admin" | "member" | "user";
