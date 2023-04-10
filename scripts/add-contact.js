import * as ContactService from "../services/ContactService.js";

window.addEventListener('DOMContentLoaded', () => {
    ContactService.getAllGroups().then((response) => {
        const groups = response.data;
        if (groups) {
            displayGroups(groups);
        }
    }).catch((error) => {
        console.error(error);
    });
});

const displayGroups = (groups) => {
    const selectElement = document.querySelector('#group-select-input');
    let optionsElement = ` <option value="">Select a Group</option>`;
    for (let group of groups) {
        optionsElement += `<option value="${group.id}">${group.name}</option>`
    }
    selectElement.innerHTML = optionsElement;
};

// submit the form data
const formElement = document.querySelector("#add-contact-form");
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const contact = {
        name: document.querySelector("#name-input").value,
        imageUrl: document.querySelector("#image-input").value,
        mobile: document.querySelector("#mobile-input").value,
        email: document.querySelector("#email-input").value,
        company: document.querySelector("#company-input").value,
        title: document.querySelector("#title-input").value,
        groupId: document.querySelector("#group-select-input").value,
    }
    if (contact) {
        ContactService.createContact(contact).then((response) => {
            if (response && response.data) {
                window.location.href = "../pages/admin-contacts.html";
            }
        }).catch((error) => {
            console.error(error);
        });
    }

})

// change event on image Field
const imageElement = document.querySelector("#image-input");
const displayImageElement = document.querySelector("#display-image");
imageElement.addEventListener('change', (event) => {
    const imageUrl = event.target.value;
    displayImageElement.setAttribute('src', imageUrl);
})

















