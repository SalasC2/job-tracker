import { useState, useEffect } from 'react';
import { useAuthUser } from "./useAuthUser";
import { supabase } from '../utils/supabase';
import type { Contact } from '../types/index';

type DbContact = {
  id: string;
  user_id: string;
  name: string;
  company: string;
  type: string;
  email: string;
  linkedin: string;
  last_contact: string;
  next_followup: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

function fromSnakeCase(row: DbContact): Contact {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    type: row.type as Contact['type'],
    email: row.email ?? '',
    linkedin: row.linkedin ?? '',
    lastContact: row.last_contact ?? '',
    nextFollowup: row.next_followup ?? '',
    notes: row.notes ?? '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toSnakeCase(contact: Partial<Contact>) {
  const isValidDate = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
  return {
    name: contact.name,
    company: contact.company,
    type: contact.type,
    email: contact.email,
    linkedin: contact.linkedin,
    last_contact: isValidDate(contact.lastContact) ? contact.lastContact : null,
    next_followup: isValidDate(contact.nextFollowup) ? contact.nextFollowup : null,
    notes: contact.notes,
  };
}

export function useContacts() {
  const user = useAuthUser();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchContacts();
  }, [user]);

  async function fetchContacts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('next_followup', { ascending: true, nullsFirst: false });

    if (!error && data) setContacts(data.map(fromSnakeCase));
    setLoading(false);
  }

  async function addContact(contact: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    if (!user) return;

    const { error } = await supabase
      .from('contacts')
      .insert({ ...toSnakeCase(contact), user_id: user.id });
    if (!error) fetchContacts();
  }

  async function updateContact(id: string, updates: Partial<Contact>) {
    if (!user) return;

    const { error } = await supabase
      .from('contacts')
      .update(toSnakeCase(updates))
      .eq('id', id);
    if (!error) fetchContacts();
  }

  async function removeContact(id: string) {
    if (!user) return;

    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (!error) fetchContacts();
  }

  return { contacts, loading, addContact, updateContact, removeContact };
}