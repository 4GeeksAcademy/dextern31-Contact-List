import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import ContactCard from "../component/ContactCard.jsx";

const Contact = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);    
    return (
        <div className="container">
            <div className="row text-end">
                <div className="col">
                    <button type="button" className="btn btn-success mb-2" onClick={() => navigate("/contact")}>
                        Add new contact
                    </button>
                </div>            
            </div>            
            {store.contacts.map((item, index) => {
                return (
                <ContactCard                         
                            object={item} 
                            key={index} 
                            edit={() => navigate(`/contact/${index}`)} 
                            delete={() => actions.deleteContact(item.id)}
                            />
            );})
            }        
        </div>
        
    );
}
export default Contact;