
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {			
			contacts: [],			
		},
		actions: {
			// Use getActions to call a function within a fuction		
			getContacts: () => {
				const url = "https://playground.4geeks.com/apis/fake/contact/agenda/dn";
				fetch(url, {
					method: "Get"					
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					setStore({contacts: data});
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			addContact: (contact, navigate) => {				
				const url = "https://playground.4geeks.com/apis/fake/contact/";
				 fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({						
						"full_name": contact.full_name,
                      	"email": contact.email,
                      	"agenda_slug": "dn",
                      	"address": contact.address,
                      	"phone": contact.phone
					})					
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.					
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {					
					getActions().getContacts();
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})								
				navigate("/");				
			},
			editContact:  (contact,navigate) => {
				let store = getStore();
				const url = `https://playground.4geeks.com/apis/fake/contact/${contact.id}`;
				fetch(url, {
					method: "Put",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({						
						"full_name": contact.full_name,
                      	"email": contact.email,
                      	"agenda_slug": "dn",
                      	"address": contact.address,
                      	"phone": contact.phone
					})					
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					//console.log(data);
					let updatedContact = store.contacts.find((item) => {
						return item.id == contact.id;

					});
					updatedContact.full_name = contact.full_name;
					updatedContact.email = contact.email;
					updatedContact.address = contact.address;
					updatedContact.phone = contact.phone;
					let newContact = [...store.contacts];
					setStore({contacts: newContact});
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})						
				navigate("/");
			},
			deleteContact: (contact) => {
				let store = getStore();
				const url = `https://playground.4geeks.com/apis/fake/contact/${contact}`;
				fetch(url, {
					method: "Delete"					
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
				})
				.then(data => {					
					let val = store.contacts.filter((item) => item.id != contact);
					setStore({contacts: val});
				})
				.catch(error => {
					//error handling
					console.log(error);
				})											
				
			}			
		}
	};
};

export default getState;
