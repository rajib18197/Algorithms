import { supabase } from "./supabase";

export async function wait(ms) {
  console.log("called");

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

  return [{ name: "Cabin 001" }, { name: "Cabin 002" }];
}
export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  // console.log(cabins);

  if (error) {
    console.error(error);
    throw error;
  }

  return cabins;
}
