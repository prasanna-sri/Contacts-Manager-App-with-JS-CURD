import * as ContactService from "../services/ContactService.js";

window.addEventListener('DOMContentLoaded', () => {
    ContactService.getAllContacts().then((response) => {
        const contacts = response.data;
        displayContacts(contacts);
    }).catch((error) => {
        console.error(error);
    });
})

const displayContacts = (contacts) => {
    const contactsRowElement = document.querySelector("#contacts-row");
    let contactCards = "";
    for (let contact of contacts) {
        contactCards += `<div class="col-sm-3">
            <div class="card shadow-lg">
                <div class="card-header text-center">
                    <a href="../pages/view-contact.html?contactId=${contact.id}">
                        <img alt="" class="img-fluid w-50 rounded-circle shadow-lg" src="${contact.imageUrl}">
                    </a>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            Name : <span class="fw-bold">${contact.name}</span>
                        </li>
                        <li class="list-group-item">
                            Mobile : <span class="fw-bold">${contact.mobile}</span>
                        </li>
                        <li class="list-group-item">
                            Title : <span class="fw-bold">${contact.title.toUpperCase()}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
    }
    contactsRowElement.innerHTML = contactCards;
};