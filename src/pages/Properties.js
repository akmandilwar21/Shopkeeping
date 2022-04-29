import React, { useState } from "react";
import Page from 'components/Page';
import {UncontrolledButtonDropdown, DropdownToggle,DropdownItem,DropdownMenu, Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col, Modal, ModalHeader, ModalFooter, ModalBody, Row, FormGroup,Label,Input,Table} from 'reactstrap'
class Properties extends React.Component {
    state = {
      modal: false,
      modal_newProperty:false,
      modal_editProperty:false,
      modal_addedSuccess:false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      selectedIndex:0,
      backdrop: true,
      name:'',
      address:'',
      pincode:'',
      selectedName:'',
      selectedAddress:'',
      selectedPincode:'',
      propertiesList:[{name:"Alishan", address:"Noida", pincode:"201309"},
                      {name:"Mannat", address:"Mumbai", pincode:"123456"},
                      {name:"The Luxuary House", address:"Delhi", pincode:"678082"},
                      {name:"The Grand Vila", address:"Odisa", pincode:"121212"},
                      {name:"The Taj Residency", address:"Noida", pincode:"201309"},
                      {name:"A1 House", address:"Noida", pincode:"201309"},
    ],
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
        this.setState({modal_newProperty:false,modal_editProperty:false});
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
    handleRemove=()=>{
        let {selectedIndex,propertiesList,selectedName}=this.state;
        propertiesList=propertiesList.filter(n=>n.name!==selectedName);
        console.log(selectedIndex);
        this.setState({modal_editProperty:false,propertiesList:propertiesList})
        alert("Property is removed successfully!!")
    }
    render() {
        let {modal_newProperty,name,address,pincode,modal_addedSuccess,propertiesList,index,modal_editProperty,selectedName,selectedAddress,selectedPincode}=this.state;
        console.log(selectedPincode);
      return (
        <div className="p-5">
            <div>
             <Button style={{float:"right"}} onClick={this.handleModal}>Add New Property</Button>
            </div>
            <Row>
            <Modal
                    isOpen={modal_editProperty}
                    className={this.props.className}>
                        <ModalHeader>
                            Edit Property   
                        </ModalHeader>           
                        <div>
                            <div style={{float:"right"}}>
                            <Button className="m-2" color="warning">Request For Service</Button>
                            <Button onClick={this.handleRemove}>Remove</Button>
                                </div>
                        </div>
                        <ModalBody>
                            <FormGroup>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="PropertyName">Property Name<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={selectedName} onChange={(event)=>this.handleEditChange(event,'name')} />
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Address">Address<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={selectedAddress} onChange={(event)=>this.handleEditChange(event,'address')}  />
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Pincode">Pincode<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={selectedPincode} onChange={(event)=>this.handleEditChange(event,'pincode')}  />
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
                            <Button color="success" onClick={this.EditProperty}>
                                Edit
                            </Button>
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
                                    <Input className={`form-control shadow-none `} value={name} onChange={(event)=>this.handleChange(event,'name')} autocomplete="off"/>
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Address">Address<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={address} onChange={(event)=>this.handleChange(event,'address')}  autocomplete="off"/>
                                </div>
                                <div style={{marginTop:"10px"}}>
                                    <Label htmlFor="Pincode">Pincode<Label style={{color:"red"}}>*</Label></Label>
                                    <Input className={`form-control shadow-none `} value={pincode} onChange={(event)=>this.handleChange(event,'pincode')}  autocomplete="off"/>
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
              
                    <Table className='border' responsive style={{marginTop:"50px"}}>
                <thead>
                  <tr style={{background:"black",color:"white"}}>
                    <th style={{textAlign:"center"}}>Serial Number</th>
                    <th style={{textAlign:"center"}}>Property Name</th>
                    <th style={{textAlign:"center"}}>Address</th>
                    <th style={{textAlign:"center"}}>Pincode</th>
                  </tr>
                </thead>
                <tbody>
                    {propertiesList.map((n,index)=>{ return(
                        <tr style={{cursor:"pointer"}} onClick={()=>this.handleEditProperty(index)}>
                            <td style={{textAlign:"center"}}>{index+1}</td>
                            <td style={{textAlign:"center"}}>{n.name}</td>
                            <td style={{textAlign:"center"}}>{n.address}</td>
                            <td style={{textAlign:"center"}}>{n.pincode}</td>
                        </tr>)
                      })}
                </tbody>
             
                </Table>:<div style={{textAlign:"center"}}><hr/><h1>No Properties found ....</h1></div>}
        </div>
      );
    }
  }
  
  export default Properties;
  
