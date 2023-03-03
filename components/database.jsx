import { supabase } from "../pages";

const FetchData = async (database, setData, orderBy) => {
  const { data, error } = await supabase
    .from(database)
    .select()
    .order(orderBy, { ascending: true });

  if (error) {
    console.log(error);
  }
  if (data) {
    setData(data);
  }
};

const AddData = async (database, name, quantity) => {
  const { error } = await supabase
    .from(database)
    .insert({ name, quantity })
    .select();
  if (error) {
    console.log(error);
  }
};

const UpdateData = async (database, field, value, field2, value2, pattern) => {
  const { error } = await supabase
    .from(database)
    .update({ [field]: value, [field2]: value2 })
    .eq("id", pattern)
    .select();
  if (error) {
    console.log(error);
  }
};

const DeleteData = async (database, pattern, value) => {
  const { error } = await supabase.from(database).delete().eq(pattern, value);
  if (error) {
    console.log(error);
  }
};

export { FetchData, AddData, DeleteData, UpdateData };
