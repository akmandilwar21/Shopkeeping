import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from 'react-date-picker';
import ServiceForRequest from '../components/Modals/ServiceForRequest';
import { BsTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
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
import EditProperty from '../components/Modals/EditProperty';
import AddedSuccess from '../components/Modals/AddedSuccess';
import NewProperty from '../components/Modals/NewProperty';
class Properties extends React.Component {
  state = {
    modal: false,
    modal_newProperty: false,
    modal_editProperty: false,
    modal_addedSuccess: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_serviceRequest: false,
    modal_ServiceForRequest: false,
    selectedIndex: 0,
    backdrop: true,
    data: { name: '', address: '', pincode: '' },
    dataEdit: { name: '', address: '', pincode: '' },
    dataRequest: {
      typeOfService: '',
      selectedDate: '',
      selectedTime: '',
      selectedStaff: '',
      additionalDetail: '',
    },
    name: '',
    address: '',
    pincode: '',
    selectedName: '',
    selectedAddress: '',
    selectedTypeofService: '',
    selectedPincode: '',
    selectedTime: '',
    selectedStaff: '',
    selectedDate: '',
    additionalDetail: '',
    typeOfService: ['House Keeping', 'Cleaning', 'Gardening', 'Car Cleaning'],
    errors: {},
    errorsEdit: {},
    errorsServiceRequest: {},
    propertiesList: [
      { name: 'Alishan', address: 'Noida', pincode: '201309' },
      { name: 'Mannat', address: 'Mumbai', pincode: '123456' },
      { name: 'The Luxuary House', address: 'Delhi', pincode: '678082' },
      { name: 'The Grand Vila', address: 'Odisa', pincode: '121212' },
      { name: 'The Taj Residency', address: 'Noida', pincode: '201309' },
      { name: 'A1 House', address: 'Noida', pincode: '201309' },
    ],
    staffList: [
      { type: 'House Keeping', name: ['Abhi', 'Amar', 'Amit'] },
      { type: 'Cleaning', name: ['Rocky', 'Yash', 'Ravi'] },
      { type: 'Gardening', name: ['Babloo', 'Raju', 'Hritik'] },
      { type: 'Car Cleaning', name: ['James', 'Jelly', 'Micheal'] },
    ],
    rightStaff: [],
  };

  validateInput = e => {
    switch (e.currentTarget.name) {
      case 'name':
        if (!e.currentTarget.value.trim()) return 'Property Name is required';
      case 'address':
        if (!e.currentTarget.value.trim()) return 'Address is required';
        break;
      case 'pincode':
        if (!e.currentTarget.value.trim()) return 'Pincode is required';
        break;
      case 'selectedDate':
        if (!e.currentTarget.value.trim()) return 'Date is required';
        if (e.currentTarget.value.trim().length !== 10)
          return 'Enter a Valid Date';
        break;
      case 'selectedTime':
        if (!e.currentTarget.value.trim()) return 'Time is required';
        break;
      default:
        break;
    }
    return '';
  };
  onChange = event => {
    let { errorsServiceRequest, dataRequest } = this.state;
    const { currentTarget: input } = event;
    errorsServiceRequest[input.name] = '';
    console.log(dataRequest.selectedDate.length);
    dataRequest[input.name] = input.value;
    this.setState({
      dataRequest: dataRequest,
      errorsServiceRequest: errorsServiceRequest,
    });
  };
  handleChange = event => {
    let errString = this.validateInput(event);
    let errors = { ...this.state.errors };
    errors[event.currentTarget.name] = errString;
    console.log(errors);
    const { currentTarget: input } = event;
    let data = this.state.data;
    data[input.name] = input.value;
    this.setState({ data: data, errors: errors });
  };
  toggle = modalType => () => {
    if (modalType !== 'nested_parent') {
      console.log(this.state.modal_nested);
      let newPropertyData = {
        name: this.state.name,
        address: this.state.address,
        pincode: this.state.pincode,
      };
      let { propertiesList } = this.state;
      propertiesList.push(newPropertyData);
      this.setState({ propertiesList });
      this.setState({ modal_nested: !this.state.modal_nested });
    }
    this.setState({
      [`modal_${modalType}`]: true,
    });
  };

  handleModal = () => {
    this.setState({ modal_newProperty: true });
  };
  closeModal = () => {
    let errors = { name: '', address: '', pincode: '' };
    let errorsEdit = { name: '', address: '', pincode: '' };
    let errorsServiceRequest = {};
    let dataEdit = { name: '', address: '', pincode: '' };
    let dataRequest = {
      typeOfService: '',
      selectedDate: '',
      selectedTime: '',
      selectedStaff: '',
      additionalDetail: '',
    };
    console.log('check');
    this.setState({
      modal_newProperty: false,
      modal_editProperty: false,
      modal_serviceRequest: false,
      modal_ServiceForRequest: false,
      selectedName: '',
      selectedTypeofService: '',
      selectedTime: '',
      selectedDate: '',
      additionalDetail: '',
      selectedStaff: '',
      errors: errors,
      errorsEdit: errorsEdit,
      errorsServiceRequest: errorsServiceRequest,
      dataRequest: dataRequest,
      dataEdit: dataEdit,
    });
  };
  closeSuccessModal = () => {
    this.setState({ modal_addedSuccess: false });
  };
  EditProperty = () => {
    let data = this.state.dataEdit;
    let errors = this.validate(data);
    this.setState({ errors });
    console.log(errors);
    let errCount = Object.keys(errors).length;
    if (errCount > 0) return;

    let {
      propertiesList,
      selectedIndex,
      selectedName,
      selectedAddress,
      selectedPincode,
    } = this.state;

    propertiesList[selectedIndex].name = data.name;
    propertiesList[selectedIndex].address = data.address;
    propertiesList[selectedIndex].pincode = data.pincode;
    this.setState({
      propertiesList: propertiesList,
      modal_editProperty: false,
    });
    alert('Edited Successfully');
  };
  validate = data => {
    let errs = {};
    if (!data.name.trim()) errs.name = 'Property Name is required';
    if (!data.address.trim()) errs.address = 'Address is required';
    if (!data.pincode.trim()) errs.pincode = 'Pincode is required';
    return errs;
  };
  addProperty = () => {
    let { data } = this.state;
    let errors = this.validate(data);
    this.setState({ errors });
    console.log(errors);
    let errCount = Object.keys(errors).length;
    console.log(errCount);
    if (errCount > 0) return;
    let { propertiesList } = this.state;
    propertiesList.push(data);
    this.setState({ propertiesList });
    this.setState({ modal_newProperty: false, modal_addedSuccess: true });
  };
  handleEditProperty = index => {
    let { modal_editProperty, propertiesList } = this.state;
    let { dataEdit } = this.state;
    dataEdit.name = propertiesList[index].name;
    dataEdit.address = propertiesList[index].address;
    dataEdit.pincode = propertiesList[index].pincode;
    this.setState({
      modal_editProperty: true,
      dataEdit: dataEdit,
    });
  };
  handleEditChange = event => {
    console.log(event.target.name);
    let errString = this.validateInput(event);
    let errors = { ...this.state.errorsEdit };
    errors[event.currentTarget.name] = errString;
    const { currentTarget: input } = event;
    let dataEdit = this.state.dataEdit;
    dataEdit[input.name] = input.value;
    this.setState({ dataEdit: dataEdit, errorsEdit: errors });
  };
  handleServiceRequest = index => {
    let { propertiesList } = this.state;
    let { dataEdit } = this.state;
    dataEdit.name = propertiesList[index].name;
    dataEdit.address = propertiesList[index].address;
    dataEdit.pincode = propertiesList[index].pincode;
    this.setState({
      modal_editProperty: true,
      dataEdit: dataEdit,
      selectedIndex: index,
      modal_serviceRequest: true,
    });
  };
  handleRemove = selectedName => {
    let { propertiesList } = this.state;
    propertiesList = propertiesList.filter(n => n.name !== selectedName);
    //console.log(selectedIndex);
    this.setState({
      modal_editProperty: false,
      propertiesList: propertiesList,
    });
  };
  handleRequest = () => {
    console.log(this.state.selectedName);
    this.setState({
      modal_serviceRequest: false,
      modal_ServiceForRequest: true,
      modal_editProperty: false,
    });
  };
  handleSelectService = service => {
    let { dataRequest, errorsServiceRequest } = this.state;
    errorsServiceRequest.typeOfService = '';
    dataRequest.typeOfService = service.value;
    this.setState({ dataRequest: dataRequest });
    let { staffList } = this.state;
    let rightStaff = staffList.filter(n => n.type === service.value);
    console.log(rightStaff);
    this.setState({ rightStaff: rightStaff[0].name, errorsServiceRequest });
  };
  handleSelectedStaff = name => {
    let { dataRequest, errorsServiceRequest } = this.state;
    dataRequest.selectedStaff = name.value;
    errorsServiceRequest.selectedStaff = '';
    this.setState({
      dataRequest: dataRequest,
      errorsServiceRequest: errorsServiceRequest,
    });
  };
  handleAdditionalChange = event => {
    this.setState({ additionalDetail: event.target.value });
  };
  validateForm = data => {
    let errs = {};
    if (!data.typeOfService.trim())
      errs.typeOfService = 'Type of service must be selected !';
    if (!data.selectedDate.trim()) errs.selectedDate = 'Date is invalid !';
    if (!data.selectedTime.trim()) errs.selectedTime = 'Time is invalid !';
    if (!data.selectedStaff.trim())
      errs.selectedStaff = 'Staff must be selected !';
    return errs;
  };
  handleSubmitRequest = () => {
    let { dataRequest } = this.state;
    let errors = this.validateForm(dataRequest);
    this.setState({ errorsServiceRequest: errors });
    console.log(errors);
    let errCount = Object.keys(errors).length;
    console.log(errCount);
    if (errCount > 0) return;
    this.setState({
      modal_ServiceForRequest: false,
      selectedName: '',
      selectedTypeofService: '',
      selectedTime: '',
      selectedDate: '',
      additionalDetail: '',
      selectedStaff: '',
    });
  };
  render() {
    let {
      modal_newProperty,
      data,
      dataEdit,
      selectedDate,
      modal_addedSuccess,
      propertiesList,
      rightStaff,
      additionalDetail,
      modal_editProperty,
      selectedName,
      selectedTime,
      selectedStaff,
      selectedAddress,
      selectedPincode,
      modal_serviceRequest,
      modal_ServiceForRequest,
      typeOfService,
      selectedTypeofService,
      errors,
      errorsEdit,
      dataRequest,
      errorsServiceRequest,
    } = this.state;
    console.log(errorsServiceRequest);
    return (
      <div className="p-5">
        <div>
          <Button style={{ float: 'right' }} onClick={this.handleModal}>
            Add New Property
          </Button>
        </div>
        <Row>
          <ServiceForRequest
            modal_ServiceForRequest={modal_ServiceForRequest}
            props={this.props}
            selectedName={dataEdit.name}
            typeOfService={typeOfService}
            handleSelectService={this.handleSelectService}
            selectedTypeofService={dataRequest.typeOfService}
            selectedDate={dataRequest.selectedDate}
            selectedTime={dataRequest.selectedTime}
            onChange={this.onChange}
            rightStaff={rightStaff}
            selectedStaff={dataRequest.selectedStaff}
            additionalDetail={dataRequest.additionalDetail}
            handleSelectedStaff={this.handleSelectedStaff}
            closeModal={this.closeModal}
            handleSubmitRequest={this.handleSubmitRequest}
            errors={errorsServiceRequest}
          />

          <EditProperty
            modal_editProperty={modal_editProperty}
            props={this.props}
            modal_serviceRequest={modal_serviceRequest}
            data={dataEdit}
            handleEditChange={this.handleEditChange}
            closeModal={this.closeModal}
            handleRequest={this.handleRequest}
            EditProperty={this.EditProperty}
            errors={errorsEdit}
          />

          <AddedSuccess
            modal_addedSuccess={modal_addedSuccess}
            closeSuccessModal={this.closeSuccessModal}
          />
          <NewProperty
            modal_newProperty={modal_newProperty}
            props={this.props}
            data={data}
            handleChange={this.handleChange}
            closeModal={this.closeModal}
            addProperty={this.addProperty}
            errors={errors}
          />
        </Row>

        {propertiesList.length ? (
          <Table
            className="border"
            responsive
            style={{ marginTop: '50px' }}
            hover
          >
            <thead>
              <tr style={{ background: 'black', color: 'white' }}>
                <th style={{ textAlign: 'center' }}>Serial Number</th>
                <th style={{ textAlign: 'center' }}>Property Name</th>
                <th style={{ textAlign: 'center' }}>Address</th>
                <th style={{ textAlign: 'center' }}>Pincode</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {propertiesList.map((n, index) => {
                return (
                  <tr style={{ cursor: 'pointer' }}>
                    <td
                      style={{ textAlign: 'center' }}
                      onClick={() => this.handleServiceRequest(index)}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{ textAlign: 'center' }}
                      onClick={() => this.handleServiceRequest(index)}
                    >
                      {n.name}
                    </td>
                    <td
                      style={{ textAlign: 'center' }}
                      onClick={() => this.handleServiceRequest(index)}
                    >
                      {n.address}
                    </td>
                    <td
                      style={{ textAlign: 'center' }}
                      onClick={() => this.handleServiceRequest(index)}
                    >
                      {n.pincode}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <AiFillEdit
                        style={{ marginRight: '10%' }}
                        onClick={() => this.handleEditProperty(index)}
                      />
                      <BsTrashFill onClick={() => this.handleRemove(n.name)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <hr />
            <h1>No Properties found ....</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Properties;
