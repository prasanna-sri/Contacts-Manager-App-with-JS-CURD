import * as ContactService from "../services/ContactService.js";

window.addEventListener('DOMContentLoaded', () => {
    const contactId = window.location.href.split("=")[1];
    if (contactId) {
        ContactService.deleteContact(contactId).then((response) => {
            if (response && response.data) {
                window.location.href = "../pages/admin-contacts.html";
            }
        }).catch((error) => {
            console.error(error);
        });
    }
});
