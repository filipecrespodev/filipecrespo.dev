import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.dbUrl;
  const supabaseKey = config.dbApi;

  return createClient(supabaseUrl, supabaseKey);
};
