import React, {useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Form = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({full_name: "", email: "", phone: "", address: ""})
    
    function value() {
        if(params.id) {
            setFormValue(store.contacts[params.id]);
        }
            
    }
    useEffect(()=> value(),[]);

    function formTitle() {
        if(params.id){
            return "Edit Contact";
        } else {
            return "Add a new contact";
        }
    }


    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    function requestHandler() {
        if(params.id){
            return actions.editContact(formValue,navigate);
        }else {
            return actions.addContact(formValue, navigate);
        }
    }
    
    return (<div className="container mt-5">
                <form className="row g-3 border border-lightgray">
                    <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
                        <h2 >{formTitle()}</h2>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input onChange={onChange} value={formValue.full_name} type="text" className="form-control" placeholder="Full Name" id="full_name" aria-describedby="fullNameHelp"/>            
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={onChange} value={formValue.email} type="email" className="form-control" placeholder="Enter email" id="email" aria-describedby="emailHelp"/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input onChange={onChange} value={formValue.phone} type="tel" className="form-control" placeholder="Enter Phone" id="phone" aria-describedby="phoneHelp"/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input onChange={onChange} value={formValue.address} type="text" className="form-control" placeholder="Enter address" id="address" aria-describedby="firstNameHelp"/>
                    </div>
                    <button type="button" onClick={() => requestHandler()} className="btn btn-primary">Save</button>                      
                </form>
                <Link to="/">Go back to contacts</Link>
            </div>);
}

export default Form;