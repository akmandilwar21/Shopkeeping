import React, { useState } from 'react';
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  FormGroup,
  Label,
  Input,
  Table,
} from 'reactstrap';

const NewProperty=({modal_newProperty,props,data,handleChange,closeModal,addProperty,errors})=>{
    return(
        <div>

          <Modal isOpen={modal_newProperty} className={props.className}>
            <ModalHeader>Add New Property</ModalHeader>
            <ModalBody>
              <FormGroup>
                <div style={{ marginTop: '10px' }}>
                  <Label htmlFor="PropertyName">
                    Property Name<Label style={{ color: 'red' }}>*</Label>
                  </Label>
                  <Input
                    className={`form-control shadow-none `}
                    value={data.name}
                    name="name"
                    onChange={event => handleChange(event)}
                  />
                  {errors.name? <label className="text-danger">{errors.name}</label>:""}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Label htmlFor="Address">
                    Address<Label style={{ color: 'red' }}>*</Label>
                  </Label>
                  <Input
                    className={`form-control shadow-none `}
                    value={data.address}
                    name="address"
                    onChange={event => handleChange(event)}
                  />
                  {errors.address? <label className="text-danger">{errors.address}</label>:""}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Label htmlFor="Pincode">
                    Pincode<Label style={{ color: 'red' }}>*</Label>
                  </Label>
                  <Input
                    className={`form-control shadow-none `}
                    value={data.pincode}
                    name="pincode"
                    onChange={event => handleChange(event)}
                  />
                  {errors.pincode? <label className="text-danger">{errors.pincode}</label>:""}
                </div>
              </FormGroup>
              <br />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button color="success" onClick={addProperty}>
                Add
              </Button>
            </ModalFooter>
          </Modal>
        </div>
    )
}
export default NewProperty;