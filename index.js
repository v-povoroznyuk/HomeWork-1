import contacts from "./contacts.js";
import Yargs from "yargs";
const argv = Yargs(process.argv.slice(2)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.getContactsList();
      console.log(list);
      break;
    case "get":
      const contactById = await contacts.getContactById(String(id));
      console.log(contactById);
      break;
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(String(id));
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
