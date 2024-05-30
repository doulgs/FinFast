import { supabase } from "@/services/supabase";
import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { ToastAndroid } from "react-native";

export interface MovimentTypes {
  id: number;
  description: string;
  value: number;
  date: string;
  wasPaid: boolean;
  id_user: string;
  id_organization: string;
  category: string;
}

export interface CategoryTypes {
  id: number;
  label: string;
}

export interface ParcelTypes {
  id: number;
  description: string;
  value: number;
}

const useMoviments = () => {
  const [loadingMoviments, setLoadingMoviments] = useState<boolean>(false);
  const [listMoviments, setListMoviments] = useState<MovimentTypes[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryTypes[]>([]);
  const [parcelList, setParcelList] = useState<ParcelTypes[]>([]);

  const fetchMoviments = useCallback(async () => {
    try {
      setLoadingMoviments(true);

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

      setLoadingMoviments(false);
    } catch (error) {
      setLoadingMoviments(false);
      Alert.alert("Error", `${error}`);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setCategoryList(data);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    }
  }, []);

  const fetchParcel = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("parcel")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setParcelList(data);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    }
  }, []);

  const insertMoviment = useCallback(
    async ({
      description,
      value,
      date,
      wasPaid,
      id_user,
      id_organization,
      category,
    }: Omit<MovimentTypes, "id">) => {
      try {
        const { data, error } = await supabase.from("moviments").insert({
          description,
          value,
          date,
          wasPaid,
          id_user,
          id_organization,
          category,
        });
        if (error) {
          Alert.alert("Error", error.message);
        } else {
          ToastAndroid.show("Movimentação inserida", ToastAndroid.SHORT);
          await fetchMoviments();
        }
      } catch (error) {
        Alert.alert("Error", `${error}`);
      }
    },
    [fetchMoviments]
  );

  const updateMoviment = useCallback(
    async (id: number, wasPaid: boolean) => {
      try {
        const { error } = await supabase
          .from("moviments")
          .update({ wasPaid })
          .match({ id });
        if (error) {
          Alert.alert("Error", error.message);
        } else {
          ToastAndroid.show("Movimentação atualizada", ToastAndroid.SHORT);
          await fetchMoviments();
        }
      } catch (error) {
        Alert.alert("Error", `${error}`);
      }
    },
    [fetchMoviments]
  );

  const deleteMoviment = useCallback(
    async (id: number) => {
      try {
        const { error } = await supabase
          .from("moviments")
          .delete()
          .match({ id });
        if (error) {
          Alert.alert("Error", error.message);
        } else {
          ToastAndroid.show("Movimentação deletada", ToastAndroid.SHORT);
          await fetchMoviments();
        }
      } catch (error) {
        Alert.alert("Error", `${error}`);
      }
    },
    [fetchMoviments]
  );

  return {
    categoryList,
    fetchCategories,
    parcelList,
    fetchParcel,
    listMoviments,
    fetchMoviments,
    insertMoviment,
    updateMoviment,
    deleteMoviment,
    loadingMoviments,
  };
};

export { useMoviments };
