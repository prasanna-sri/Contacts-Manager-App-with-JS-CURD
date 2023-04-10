import * as ContactService from "../services/ContactService.js";

window.addEventListener('DOMContentLoaded', () => {
    const contactId = window.location.href.split("=")[1];
   if (contactId){
    ContactService.getContact(contactId).then((contactResponse)=> {
      const contact = contactResponse.data;
      if (contact) {
        ContactService.getGroup(contact.groupId).then((groupResponse)=> {
           const group = groupResponse.data;
          if(group){
            displayContact(contact,group);
          }
        })
        .catch((error)=> {
            console.error(error);
        })
      
      }
    }).catch((error)=> {
        console.error(error);
    });
   }
});

const displayContact = (contact, group) => {
    const contactRowElement = document.querySelector("#contact-row");
    let  contactDetailsElement = "";
    if (contact && Object.keys(contact).length > 0 && group && Object.keys(group).length > 0){
        contactDetailsElement = `   
        <div class="col-sm-3">
        <img alt=""
             class="img-fluid w-75 rounded-circle shadow-lg"
             src="${contact.imageUrl}">
    </div>
    <div class="col-sm-8 offset-1">
        <ul class="list-group">
            <li class="list-group-item">
                Name : <span class="fw-bold">${contact.name}</span>
            </li>
            <li class="list-group-item">
                Email : <span class="fw-bold">${contact.email}</span>
            </li>
            <li class="list-group-item">
                Mobile : <span class="fw-bold">${contact.mobile}</span>
            </li>
            <li class="list-group-item">
                Company : <span class="fw-bold">${contact.company}</span>
            </li>
            <li class="list-group-item">
                Title : <span class="fw-bold">${contact.title}</span>
            </li>
            <li class="list-group-item">
                Group : <span class="fw-bold">${group.name}</span>
            </li>
        </ul>
    </div>`
    }
    contactRowElement.innerHTML = contactDetailsElement;
}

