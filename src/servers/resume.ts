import { Resume } from "@/types/resume";
import { getSupabaseClient } from "@/servers/db";

export async function insertResume(name: String, desc: String,introduction:string,profession:string) {
  const createdAt: string = new Date().toISOString();

  const cli = getSupabaseClient();

  const { data, error } = await cli
    .from("resume")
    .insert({
      name: name,
      desc: desc,
      introduction:introduction,
      profession:profession
    })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateResume(id:number,name: String, desc: String,introduction:string,profession:string) {

  const cli = getSupabaseClient();

  const { data, error } = await cli
    .from("resume")
    .update({
      name: name,
      desc: desc,
      introduction:introduction,
      profession:profession
    })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}


export async function findResumeById(
  id: string
): Promise<Resume | undefined> {
  const cli = getSupabaseClient();

  const { data, error } = await cli
    .from("resume")
    .select("id, name, desc, introduction, profession")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return undefined;
    }

    throw error;
  }

  if (!data) {
    return undefined;
  }

  return formatResume(data);
}


export async function findResumeByName(
  name: string
): Promise<Resume | undefined> {
  const cli = getSupabaseClient();

  const { data, error } = await cli
    .from("resume")
    .select("id, name, desc, introduction, profession")
    .eq("name", name)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return undefined;
    }

    throw error;
  }

  if (!data) {
    return undefined;
  }

  return formatResume(data);
}

export function formatResume(row: any): Resume {
  const resume: Resume = {
    id: row.id,
    name: row.name,
    desc: row.desc,
    introduction:row.introduction,
    profession:row.profession
  };

  return resume;
}