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

export interface CategoryTypes {
  id: number;
  label: string;
}

const useMoviments = () => {
  const [listMoviments, setListMoviments] = useState<MovimentTypes[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryTypes[]>([]);

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

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setCategoryList(data);
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
    categoryList,
    fetchCategories,
    listMoviments,
    fetchMoviments,
    updateMoviment,
    deleteMoviment,
  };
};

export { useMoviments };
