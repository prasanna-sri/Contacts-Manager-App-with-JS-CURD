import * as ContactService from "../services/ContactService.js";

window.addEventListener("DOMContentLoaded", () => {
  ContactService.getAllContacts()
    .then((response) => {
      const contacts = response.data;
      displayTableOfContacts(contacts);
    })
    .catch((error) => {
      console.error(error);
    });
})

const displayTableOfContacts = (contacts) => {
  const contactTableBodyElement = document.querySelector("#contact-table-body");
  let tableRowElement = "";
  contacts.forEach((contact, index) => {
    tableRowElement += `<tr>
            <td>${index + 1}</td>
            <td>
            <img src ="${contact.imageUrl}" width ="50" height ="50" class="rounded-circle">
            </td>
            <td>${contact.name}</td>
            <td>${contact.mobile}</td>
            <td>${contact.title}</td>
            <td>${contact.company}</td>
            <td>
                <a class="btn btn-primary mt-2" href="../pages/edit-contact.html?contactId=${contact.id}">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <a class="btn btn-danger mt-2" href="../pages/delete-contact.html?contactId=${contact.id}">
                    <i class="bi bi-trash-fill"></i>
                </a>
            </td>
        </tr>`;
  });
  contactTableBodyElement.innerHTML = tableRowElement;
};
