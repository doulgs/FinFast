import { supabase } from "@/services/supabase";
import { useState, useCallback } from "react";
import { Alert } from "react-native";

export interface MovimentTypes {
  id: number;
  description: string;
  value: number;
  date: string;
  wasPaid: boolean;
}

const useMoviments = () => {
  const [listMoviments, setListMoviments] = useState<MovimentTypes[]>([]);

  const fetchMoviments = useCallback(async () => {
    const { data, error } = await supabase
      .from("moviments")
      .select("*")
      .eq("wasPaid", "FALSE")
      .order("id", { ascending: false });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setListMoviments(data);
    }
  }, []);

  const updateMoviment = useCallback(
    async (id: number, wasPaid: boolean) => {
      const { error } = await supabase
        .from("moviments")
        .update({ wasPaid })
        .match({ id });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        await fetchMoviments();
      }
    },
    [fetchMoviments]
  );

  const deleteMoviment = useCallback(
    async (id: number) => {
      const { error } = await supabase.from("moviments").delete().match({ id });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        await fetchMoviments();
      }
    },
    [fetchMoviments]
  );

  return {
    listMoviments,
    fetchMoviments,
    updateMoviment,
    deleteMoviment,
  };
};

export { useMoviments };
