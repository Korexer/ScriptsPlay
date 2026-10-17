import type { User } from "@supabase/supabase-js";
import { useOutletContext } from "react-router-dom";

export function useAccountUser(): User {
  return useOutletContext<{ user: User }>().user;
}
