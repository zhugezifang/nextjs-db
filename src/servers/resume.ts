import { Resume } from "@/types/resume";
import { getSupabaseClient } from "@/servers/db";

export async function insertResume(name: String, desc: String) {
  const createdAt: string = new Date().toISOString();

  const cli = getSupabaseClient();

  const { data, error } = await cli
    .from("resume")
    .insert({
      name: name,
      desc: desc,
    })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}