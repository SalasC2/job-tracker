import { useState } from "react";
import type { Job } from "../types";
import { INITIAL_JOBS } from "../data/initialJobs";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const nextId = () => Math.max(0, ...jobs.map((j) => j.id)) + 1;

  const addJob = (form: Omit<Job, "id">) => {
    setJobs((js) => [...js, { ...form, id: nextId() }]);
  };

  const updateJob = (id: number, form: Omit<Job, "id">) => {
    setJobs((js) => js.map((j) => (j.id === id ? { ...form, id } : j)));
  };

  const removeJob = (id: number) => {
    setJobs((js) => js.filter((j) => j.id !== id));
  };

  const stats = {
    total:   jobs.length,
    applied: jobs.filter((j) => !["Bookmarked", "Rejected"].includes(j.status)).length,
    active:  jobs.filter((j) => ["Phone Screen", "Technical", "Final"].includes(j.status)).length,
    offers:  jobs.filter((j) => j.status === "Offer").length,
  };

  return { jobs, addJob, updateJob, removeJob, stats };
}