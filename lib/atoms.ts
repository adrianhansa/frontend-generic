import { atomWithStorage } from "jotai/utils";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const user = atomWithStorage("user", {});
