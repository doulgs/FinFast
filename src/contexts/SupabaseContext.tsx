import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "@/services/supabase";
import { MovimentTypes } from "@/@types/moviments";

interface SupabaseContextProps {}

export const SupabaseContext = createContext<SupabaseContextProps>(
  {} as SupabaseContextProps
);

export const SupabaseProvider = ({ children }: any) => {
  const [listMoviments, setListMoviments] = useState<MovimentTypes[]>([]);

  const fetchMoviments = async () => {
    const { data, error } = await supabase.from("").select("*");

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setListMoviments(data);
      console.log(data);
    }
  };
  return (
    <SupabaseContext.Provider value={{}}>{children}</SupabaseContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(SupabaseContext);
  return context;
};
