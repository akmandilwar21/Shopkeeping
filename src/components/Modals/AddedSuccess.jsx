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

const AddedSuccess=({modal_addedSuccess,closeSuccessModal})=>{
    return(
        <div>
            <Modal isOpen={modal_addedSuccess}>
            <ModalHeader>Success</ModalHeader>
            <ModalBody>New Property added Successfully</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeSuccessModal}>
                Done
              </Button>
            </ModalFooter>
          </Modal>
        </div>
    )
}
export default AddedSuccess;