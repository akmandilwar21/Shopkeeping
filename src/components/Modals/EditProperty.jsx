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

const EditProperty=({modal_editProperty,props, modal_serviceRequest,data,handleEditChange,closeModal,handleRequest,EditProperty,errors})=>{
  return(
    <div>
      <Modal isOpen={modal_editProperty} className={props.className}>
            <ModalHeader>
              {modal_serviceRequest ? 'Request for a Service' : 'Edit Property'}
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <div style={{ marginTop: '10px' }}>
                  <Label htmlFor="PropertyName">
                    Property Name<Label style={{ color: 'red' }}>*</Label>
                  </Label>
                  <Input
                    className={`form-control shadow-none `}
                    disabled={modal_serviceRequest ? true : false}
                    value={data.name}
                    name="name"
                    onChange={event => handleEditChange(event)}
                  />
                  {errors.name? <label className="text-danger">{errors.name}</label>:""}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Label htmlFor="Address">
                    Address<Label style={{ color: 'red' }}>*</Label>
                  </Label>
                  <Input
                    className={`form-control shadow-none `}
                    disabled={modal_serviceRequest ? true : false}
                    value={data.address}
                    name="address"
                    onChange={event => handleEditChange(event)}
                  />
                  {errors.address? <label className="text-danger">{errors.address}</label>:""}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Label htmlFor="Pincode">
                    Pincode<Label style={{ color: 'red' }}>*</Label>
                  </Label>
                  <Input
                    className={`form-control shadow-none `}
                    disabled={modal_serviceRequest ? true : false}
                    value={data.pincode}
                    name="pincode"
                    onChange={event => handleEditChange(event)}
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
              {modal_serviceRequest ? (
                <Button
                  className="m-2"
                  color="warning"
                  onClick={() => handleRequest()}
                >
                  Request For Service
                </Button>
              ) : (
                <Button color="success" onClick={EditProperty}>
                  Save
                </Button>
              )}
            </ModalFooter>
          </Modal>
    </div>
  )
}
export default EditProperty;