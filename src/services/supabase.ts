import "react-native-url-polyfill";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tykezfqnzrnemnsvjuzx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5a2V6ZnFuenJuZW1uc3ZqdXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NjgyNjIsImV4cCI6MjAzMjI0NDI2Mn0.pcVm-y3SpwkeRxo3187K6BdnZ17fjjKHOOyUK12Pay4";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
