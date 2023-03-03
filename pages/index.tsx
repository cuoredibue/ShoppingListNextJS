import type { NextPage } from "next";
import ShoppingList from "../components/ShoppingList";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const Home: NextPage = () => {
  return <ShoppingList />;
};
export default Home;
