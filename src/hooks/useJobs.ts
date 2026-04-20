import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAuthUser } from "./useAuthUser";
import type { Job } from "../types";

const toSnakeCase = (form: Omit<Job, "id">) => ({
  company: form.company,
  role: form.role,
  status: form.status,
  date_applied: form.dateApplied || null,
  next_action: form.nextAction,
  notes: form.notes,
  url: form.url,
});

const fromSnakeCase = (row: any): Job => ({
  id: row.id,
  company: row.company,
  role: row.role,
  status: row.status,
  dateApplied: row.date_applied ?? "",
  nextAction: row.next_action ?? "",
  notes: row.notes ?? "",
  url: row.url ?? "",
});

export function useJobs() {
  const user = useAuthUser();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setJobs(data.map(fromSnakeCase));
    };

    fetchJobs();
  }, [user]);

  const addJob = async (form: Omit<Job, "id">) => {
    if (!user) return;

    const { data: newJob, error } = await supabase
      .from("jobs")
      .insert([{ ...toSnakeCase(form), user_id: user.id }])
      .select()
      .single();

    if (error) console.error(error);
    else setJobs((prev) => [fromSnakeCase(newJob), ...prev]);
  };

  const updateJob = async (id: string, form: Omit<Job, "id">) => {
    if (!user) return;

    const { error } = await supabase
      .from("jobs")
      .update(toSnakeCase(form))
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) console.error(error);
    else setJobs((prev) => prev.map((j) => (j.id === id ? { ...form, id } : j)));
  };

  const removeJob = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) console.error(error);
    else setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => !["Bookmarked", "Rejected"].includes(j.status)).length,
    active: jobs.filter((j) => ["Phone Screen", "Technical", "Final"].includes(j.status)).length,
    offers: jobs.filter((j) => j.status === "Offer").length,
  };

  return { jobs, addJob, updateJob, removeJob, stats };
}