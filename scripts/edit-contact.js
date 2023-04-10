import * as ContactService from "../services/ContactService.js";

/**
 * When the page is loaded
 */
window.addEventListener('DOMContentLoaded', () => {
    populateGroupsDataFromServer();
    populateFormDataFromServer();
});

/**
 * When change happens on Image-Input Field
 * @type {Element}
 */
const imageElement = document.querySelector("#image-input");
const displayImageElement = document.querySelector("#display-image");
imageElement.addEventListener('change', (event) => {
    const imageUrl = event.target.value;
    displayImageElement.setAttribute('src', imageUrl);
});

/**
 * Submit the form data
 * @type {Element}
 */
const formElement = document.querySelector("#edit-contact-form");
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    sendFormDataToServer();
});

const populateGroupsDataFromServer = () => {
    ContactService.getAllGroups().then((response) => {
        const groups = response.data;
        if (groups) {
            displayGroups(groups);
        }
    }).catch((error) => {
        console.error(error);
    });
};

const populateFormDataFromServer = () => {
    const contactId = window.location.href.split("=")[1];
    if (contactId) {
        ContactService.getContact(contactId).then((response) => {
            const contact = response.data;
            if (contact) {
                populateDataToForm(contact);
            }
        }).catch((error) => {
            console.error(error);
        });
    }
};

const displayGroups = (groups) => {
    const selectElement = document.querySelector('#group-select-input');
    let optionsElement = ` <option value="">Select a Group</option>`;
    for (let group of groups) {
        optionsElement += `<option value="${group.id}">${group.name}</option>`
    }
    selectElement.innerHTML = optionsElement;
};

const populateDataToForm = (contact) => {
    document.querySelector("#name-input").value = contact.name;
    document.querySelector("#image-input").value = contact.imageUrl;
    document.querySelector("#mobile-input").value = contact.mobile;
    document.querySelector("#email-input").value = contact.email;
    document.querySelector("#company-input").value = contact.company;
    document.querySelector("#title-input").value = contact.title;
    document.querySelector("#group-select-input").value = contact.groupId;
    document.querySelector("#display-image").setAttribute('src', contact.imageUrl);
};


const sendFormDataToServer = () => {
    const contact = {
        name: document.querySelector("#name-input").value,
        imageUrl: document.querySelector("#image-input").value,
        mobile: document.querySelector("#mobile-input").value,
        email: document.querySelector("#email-input").value,
        company: document.querySelector("#company-input").value,
        title: document.querySelector("#title-input").value,
        groupId: document.querySelector("#group-select-input").value,
    }
    const contactId = window.location.href.split("=")[1];
    if (contact && contactId) {
        ContactService.updateContact(contact, contactId).then((response) => {
            if (response && response.data) {
                window.location.href = "../pages/admin-contacts.html";
            }
        }).catch((error) => {
            console.error(error);
        });
    }
};