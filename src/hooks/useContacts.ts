import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAuthUser } from "./useAuthUser";
import type { Contact } from "../types";


const toSnakeCase = (row: any): any => ({
    company: row.company,
    type: row.type,
    email: row.email,
    linkedin: row.linkedin,
    last_contact: row.lastContact,
    next_followup: row.next_follow_up,
    notes: row.notes,
})

const fromSnakeCase = (row: any): any => ({
    id: row.id,
    name: row.name,
    company: row.company,
    type: row.type,
    email: row.email,
    linkedin: row.linkedin,
    lastContact: row.last_contact,
    nextFollowup: row.next_followup,
    notes: row.notes,
})

export function useContacts() {
    const user = useAuthUser();
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchContacts = async () => {
            const { data, error } = await supabase
                .from("contacts")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });
            if (error) console.log(error);
            else setContacts(data.map(fromSnakeCase));
        };

        fetchContacts();
    }, [user]);

    const addContact = async (form: Omit<Contact, "id">) => {
        if (!user) return;

        const { data: newContact, error } = await supabase
            .from("contacts")
            .insert([{ ...toSnakeCase(form), user_id: user.id }])
            .select()
            .single()
        if (error) console.log(error);
        else setContacts((prev => [fromSnakeCase(newContact), ...prev]))
    };

    const updateContact = async (id: string, form: Omit<Contact, "id">) => {
        if (!user) return;
        const { error } = await supabase
            .from("contacts")
            .update(toSnakeCase(form))
            .eq("id", id)
            .eq("user_id", user.id);
        if (error) console.log(error);
        else setContacts(prev => prev.map(c => c.id === id ? { ...c, ...form } : c));
    };

    const removeContact = async (id: string) => {
        if (!user) return;

        const { error } = await supabase
            .from("contacts")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) console.log(error);
        else setContacts((prev) => prev.filter((c) => c.id !== id));
    }

    const stats = {
        total: contacts.length,
        recruiters: contacts.filter(c => c.type === "Recruiter").length,
        followedUpToday: contacts.filter(c => c.nextFollowup === new Date().toISOString().split("T")[0]).length,
    };

    return { contacts, addContact, updateContact, removeContact };
};
