import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = `${path.resolve()}/db/contacts.json`;
function readFile() {}

async function getContactsList() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const list = await getContactsList();
  const contact = list.find((el) => el.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const list = await getContactsList();
  const contactFromId = list.find((el) => el.id === contactId);
  if (contactFromId) {
    const newList = list.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  }
  return contactFromId || null;
}

async function addContact(name, email, phone) {
  const list = await getContactsList();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
}

export default { getContactsList, getContactById, removeContact, addContact };
