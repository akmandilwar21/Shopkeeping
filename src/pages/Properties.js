import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from 'react-date-picker';
import {BsTrashFill} from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai'
import {UncontrolledButtonDropdown, DropdownToggle,DropdownItem,DropdownMenu, Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col, Modal, ModalHeader, ModalFooter, ModalBody, Row, FormGroup,Label,Input,Table,} from 'reactstrap'
class Properties extends React.Component {
    state = {
      modal: false,
      modal_newProperty:false,
      modal_editProperty:false,
      modal_addedSuccess:false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      modal_serviceRequest:false,
      modal_ServiceForRequest:false,
      selectedIndex:0,
      backdrop: true,
      name:'',
      address:'',
      pincode:'',
      selectedName:'',
      selectedAddress:'',
      selectedTypeofService:'',
      selectedPincode:'',
      selectedTime:'',
      selectedStaff:'',
      selectedDate:'',
      additionalDetail:'',
      typeOfService:["House Keeping", "Cleaning", "Gardening", "Car Cleaning"],
      propertiesList:[{name:"Alishan", address:"Noida", pincode:"201309"},
                      {name:"Mannat", address:"Mumbai", pincode:"123456"},
                      {name:"The Luxuary House", address:"Delhi", pincode:"678082"},
                      {name:"The Grand Vila", address:"Odisa", pincode:"121212"},
                      {name:"The Taj Residency", address:"Noida", pincode:"201309"},
                      {name:"A1 House", address:"Noida", pincode:"201309"},
    ],
    staffList:[{type:'House Keeping', name:["Abhi", "Amar","Amit"]},
               {type:'Cleaning', name:['Rocky','Yash','Ravi']}, 
               {type:'Gardening', name:['Babloo', 'Raju', 'Hritik']},
               {type:'Car Cleaning', name:["James", "Jelly","Micheal"]}
              ],
    rightStaff:[]
    };
    handleChange= (event,data)=>{
        console.log(event.target.value,data);
        if(data==='name'){
             
             this.setState({name:event.target.value})
        } 
        else if(data==='address'){
            //newPropertyData.address=event.target.value;
            this.setState({address:event.target.value})
        }
       else if(data==='pincode'){
        //newPropertyData.pincode=event.target.value;
        this.setState({pincode:event.target.value})
       } 
    }
    toggle = modalType => () => {
      if(modalType !=='nested_parent') {
          console.log(this.state.modal_nested);
          let newPropertyData={name:this.state.name,address:this.state.address,pincode:this.state.pincode};
          let {propertiesList}=this.state;
          propertiesList.push(newPropertyData);
          this.setState({propertiesList});
          this.setState({modal_nested:!this.state.modal_nested})
      }
      this.setState({
        [`modal_${modalType}`]: true,
      });
    };
     
    handleModal=()=>{
        this.setState({modal_newProperty:true});
    }
    closeModal=()=>{
        this.setState({modal_newProperty:false,modal_editProperty:false,modal_serviceRequest:false,modal_ServiceForRequest:false});
    }
    closeSuccessModal=()=>{
       this.setState({modal_addedSuccess:false})
    }
    EditProperty=()=>{
        let data={name:'',address:'',pincode:''};
        let {propertiesList,selectedIndex,selectedName,selectedAddress,selectedPincode}=this.state;
           data.name=selectedName;
           data.address=selectedAddress;
           data.pincode=selectedPincode;
           propertiesList[selectedIndex]=data;
           this.setState({propertiesList:propertiesList,modal_editProperty:false});
           alert("Edited Successfully");

    }
    addProperty=()=>{
        let newPropertyData={name:this.state.name,address:this.state.address,pincode:this.state.pincode};
          let {propertiesList}=this.state;
          propertiesList.push(newPropertyData);
          this.setState({propertiesList});
        this.setState({modal_newProperty:false,modal_addedSuccess:true});
    }
    handleEditProperty=(index)=>{
          let {modal_editProperty,propertiesList}=this.state;
          this.setState({modal_editProperty:true, selectedName:propertiesList[index].name,selectedAddress:propertiesList[index].address,selectedPincode:propertiesList[index].pincode,selectedIndex:index});
    }
    handleEditChange=(event,data)=>{
             if(data==='name') this.setState({selectedName:event.target.value});
             else if(data==='address') this.setState({selectedAddress:event.target.value});
             else if(data==='pincode') this.setState({selectedPincode:event.target.value});
    }
    handleServiceRequest=(index)=>{
        let {propertiesList}=this.state;
        this.setState({modal_editProperty:true, selectedName:propertiesList[index].name,selectedAddress:propertiesList[index].address,selectedPincode:propertiesList[index].pincode,selectedIndex:index,modal_serviceRequest:true});
    }
    handleRemove=(selectedName)=>{
        let {propertiesList}=this.state;
        propertiesList=propertiesList.filter(n=>n.name!==selectedName);
        //console.log(selectedIndex);
        this.setState({modal_editProperty:false,propertiesList:propertiesList})
        
    }
    handleRequest=()=>{
        console.log(this.state.selectedName)
        this.setState({modal_serviceRequest:false,modal_ServiceForRequest:true,modal_editProperty:false});
    }
    handleSelectService=service=>{
        this.setState({selectedTypeofService:service.value});
        let {staffList}=this.state;
        let rightStaff=staffList.filter(n=>n.type===service.value);
        console.log(rightStaff);
        this.setState({rightStaff:rightStaff[0].name})
    }
    onChange=(event,type)=>{
    if(type==="date")
        this.setState({selectedDate:event.target.value})
    else if(type==="time") this.setState({selectedTime:event.target.value})
    }
    handleAdditionalChange=event=>{
        this.setState({additionalDetail:event.target.value})
    }
    handleSubmitRequest=()=>{
        this.setState({modal_ServiceForRequest:false})
    }
    render() {
        let {modal_newProperty,name,address,selectedDate,pincode,modal_addedSuccess,propertiesList,rightStaff,additionalDetail,modal_editProperty,selectedName,selectedTime,selectedStaff,selectedAddress,selectedPincode,modal_serviceRequest,modal_ServiceForRequest,typeOfService,selectedTypeofService}=this.state;
        console.log(rightStaff);
      return (
        <div className="p-5">
            <div>
             <Button style={{float:"right"}} onClick={this.handleModal}>Add New Property</Button>
            </div>
            <Row>
            <Modal
                isOpen={modal_ServiceForRequest}
                className={this.props.className}
                >
                        <ModalHeader>
                        Request for a Service
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="PropertyName">Property Name<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={selectedName} disabled onChange={(event)=>this.handleChange(event,'name')}/>
                                </div>
                                <div style={{marginTop:"20px"}}>
                                    <Label htmlFor="TypeOfService">Type of Service<Label style={{color:"red"}}>*</Label></Label>
                                    <Dropdown options={typeOfService} onChange={this.handleSelectService} value={selectedTypeofService} placeholder="Select Type of Service" />                                    
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="date">Select Date<Label style={{color:"red"}}>*</Label></Label>
                                    <Input type="date" className={`form-control shadow-none `} value={selectedDate}  onChange={(event)=>this.onChange(event,"date")}/>              
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="time">Select Time<Label style={{color:"red"}}>*</Label></Label>
                                    <Input type="time" className={`form-control shadow-none `} value={selectedTime}  onChange={(event)=>this.onChange(event,"time")}/>              
                                </div>
                                <div style={{marginTop:"20px"}}>
                                    <Label htmlFor="staff">Select Staff<Label style={{color:"red"}}>*</Label></Label>
                                    <Dropdown options={rightStaff} value={selectedStaff} disabled={rightStaff.length===0 ? true :false}  placeholder="Select Staff" />                                    
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="additionDetail">Additional Details</Label>
                                    <Input type="textarea" className={`form-control shadow-none `} value={additionalDetail} onChange={(event)=>this.handleAdditionalChange(event)} placeholder="Write Some importent Details"/>
                                </div>
                            </FormGroup>
                            <br />
                        </ModalBody>
                        <ModalFooter>                   
                            <Button
                                color="secondary"
                                onClick={this.closeModal}>
                                    Cancel
                            </Button>
                            <Button color="success" onClick={this.handleSubmitRequest}>
                                Request
                            </Button>
                        </ModalFooter>
                </Modal>
            <Modal
                    isOpen={modal_editProperty}
                    className={this.props.className}>
                        <ModalHeader>
                            {modal_serviceRequest ? "Request for a Service" :"Edit Property"}   
                        </ModalHeader>           
                       
                        <ModalBody>
                            <FormGroup>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="PropertyName">Property Name<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} disabled={modal_serviceRequest ? true:false} value={selectedName} onChange={(event)=>this.handleEditChange(event,'name')} />
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Address">Address<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} disabled={modal_serviceRequest ? true:false} value={selectedAddress} onChange={(event)=>this.handleEditChange(event,'address')}  />
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Pincode">Pincode<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} disabled={modal_serviceRequest ? true:false} value={selectedPincode} onChange={(event)=>this.handleEditChange(event,'pincode')}  />
                                </div>
                            </FormGroup>
                            <br />
                        </ModalBody>
                        <ModalFooter>                   
                            <Button
                                color="secondary"
                                onClick={this.closeModal}>
                                    Cancel
                            </Button>
                            {modal_serviceRequest ? <Button className="m-2" color="warning" onClick={()=>this.handleRequest()}>Request For Service</Button> :<Button color="success" onClick={this.EditProperty}>
                                Save
                            </Button>}
                            
                        </ModalFooter>
                </Modal>
            <Modal
                      isOpen={modal_addedSuccess}
                      >
                      <ModalHeader>Success</ModalHeader>
                      <ModalBody>New Property added Successfully</ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={this.closeSuccessModal}>
                          Done
                        </Button>
                      </ModalFooter>
                    </Modal>
                <Modal
                    isOpen={modal_newProperty}
                    className={this.props.className}>
                        <ModalHeader>
                            Add New Property
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="PropertyName">Property Name<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={name} onChange={(event)=>this.handleChange(event,'name')}/>
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Address">Address<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={address} onChange={(event)=>this.handleChange(event,'address')} />
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Pincode">Pincode<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={pincode} onChange={(event)=>this.handleChange(event,'pincode')} />
                                </div>
                            </FormGroup>
                            <br />
                        </ModalBody>
                        <ModalFooter>                   
                            <Button
                                color="secondary"
                                onClick={this.closeModal}>
                                    Cancel
                            </Button>
                            <Button color="success" onClick={this.addProperty}>
                                Add
                            </Button>
                        </ModalFooter>
                </Modal>
            </Row>
       
            {propertiesList.length ? 
              
                    <Table className='border' responsive style={{marginTop:"50px"}} hover>
                <thead>
                  <tr style={{background:"black",color:"white"}}>
                    <th style={{textAlign:"center"}}>Serial Number</th>
                    <th style={{textAlign:"center"}}>Property Name</th>
                    <th style={{textAlign:"center"}}>Address</th>
                    <th style={{textAlign:"center"}}>Pincode</th>
                    <th style={{textAlign:"center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {propertiesList.map((n,index)=>{ return(
                        <tr style={{cursor:"pointer"}} >
                            <td style={{textAlign:"center"}} onClick={()=>this.handleServiceRequest(index)}>{index+1}</td>
                            <td style={{textAlign:"center"}} onClick={()=>this.handleServiceRequest(index)}>{n.name}</td>
                            <td style={{textAlign:"center"}} onClick={()=>this.handleServiceRequest(index)}>{n.address}</td>
                            <td style={{textAlign:"center"}} onClick={()=>this.handleServiceRequest(index)}>{n.pincode}</td>
                            <td style={{textAlign:"center"}}><AiFillEdit style={{marginRight:"10%"}} onClick={()=>this.handleEditProperty(index)} /><BsTrashFill onClick={()=>this.handleRemove(n.name)}/></td>

                        </tr>)
                      })}
                </tbody>
             
                </Table>:<div style={{textAlign:"center"}}><hr/><h1>No Properties found ....</h1></div>}
        </div>
      );
    }
  }
  
  export default Properties;
  
