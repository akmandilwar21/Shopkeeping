import Dropdown from 'react-dropdown';
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
const RequestService=({modal_RequestForService,props,propertiesList, selectedProperty,handleSelectProperty,typeOfService, handleSelectService,selectedTypeofService,selectedDate,selectedTime,onChange,rightStaff,selectedStaff,additionalDetail,handleSelectedStaff,closeModal,handleSubmitRequest,errors})=>{
return    <div>
    <Modal
    isOpen={modal_RequestForService}
    className={props.className}
    >
    <ModalHeader>Request for a Service</ModalHeader>
    <ModalBody>
      <FormGroup>
        <div style={{ marginTop: '10px' }}>
          <Label htmlFor="PropertyName">
            Property Name<Label style={{ color: 'red' }}>*</Label>
          </Label>
          <Dropdown
            options={propertiesList}
            onChange={handleSelectProperty}
            value={selectedProperty}
            placeholder="Select One Property"
          />
           {errors.selectedProperty? <label className="text-danger">{errors.selectedProperty}</label>:""}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Label htmlFor="TypeOfService">
            Type of Service<Label style={{ color: 'red' }}>*</Label>
          </Label>
          <Dropdown
            options={typeOfService}
            onChange={handleSelectService}
            value={selectedTypeofService}
            placeholder="Select Type of Service"
          />
          {errors.typeOfService? <label className="text-danger">{errors.typeOfService}</label>:""}
        </div>
        <div style={{ marginTop: '10px' }}>
          <Label htmlFor="date">
            Select Date<Label style={{ color: 'red' }}>*</Label>
          </Label>
          <Input
            type="date"
            className={`form-control shadow-none `}
            name="selectedDate"
            value={selectedDate}
            onChange={event => onChange(event)}
          />
          {errors.selectedDate? <label className="text-danger">{errors.selectedDate}</label>:""}
        </div>
        <div style={{ marginTop: '10px' }}>
          <Label htmlFor="time">
            Select Time<Label style={{ color: 'red' }}>*</Label>
          </Label>
          <Input
            type="time"
            className={`form-control shadow-none `}
            name="selectedTime"
            value={selectedTime}
            onChange={event => onChange(event)}
          />
          {errors.selectedTime? <label className="text-danger">{errors.selectedTime}</label>:""}
        </div>
        <div style={{ marginTop: '10px' }}>
          <Label htmlFor="staff">
            Select Staff<Label style={{ color: 'red' }}>*</Label>
          </Label>
          <Dropdown
            options={rightStaff}
            value={selectedStaff}
            onChange={handleSelectedStaff}
            name="selectedStaff"
            disabled={rightStaff.length === 0 ? true : false}
            placeholder="Select Staff"
          />
          {errors.selectedStaff? <label className="text-danger">{errors.selectedStaff}</label>:""}
        </div>
        <div style={{ marginTop: '10px' }}>
          <Label htmlFor="additionDetail">Additional Details<Label style={{ color: 'grey' }}>(optional)</Label></Label>
          <Input
            type="textarea"
            className={`form-control shadow-none `}
            value={additionalDetail}
            name="additionalDetail"
            onChange={event => onChange(event)}
            placeholder="Write Some importent Details"
          />
        </div>
      </FormGroup>
      <br />
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={closeModal}>
        Cancel
      </Button>
      <Button color="success" onClick={handleSubmitRequest}>
        Request
      </Button>
    </ModalFooter>
    </Modal>
    </div>
}
export default RequestService;