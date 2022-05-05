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
  Table,
} from 'reactstrap';
import EditProperty from '../components/Modals/EditProperty';
import AddedSuccess from '../components/Modals/AddedSuccess';
import NewProperty from '../components/Modals/NewProperty';
import RequestService from '../components/Modals/RequestService';
class Properties extends React.Component {
  state = {
    backdrop: true,
    typeOfService:['House Keeping', 'Cleaning', 'Gardening', 'Car Cleaning'],
    modal_requestService:false,
    requestList: [
      {date:"21-05-2022", name: 'Alishan', serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'Mannat',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'The Luxuary House',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'The Grand Vila',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'The Taj Residency',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'A1 House',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
    ],
    dataRequest: {
      selectedProperty:'',
      typeOfService: '',
      selectedDate: '',
      selectedTime: '',
      selectedStaff: '',
      additionalDetail: '',
    },
    errorsServiceRequest: {},
    propertiesList:['Alishan','Mannat','The Luxuary House', 'The Grand Vila','The Taj Residency','A1 House'],
    staffList: [
      { type: 'House Keeping', name: ['Abhi', 'Amar', 'Amit'] },
      { type: 'Cleaning', name: ['Rocky', 'Yash', 'Ravi'] },
      { type: 'Gardening', name: ['Babloo', 'Raju', 'Hritik'] },
      { type: 'Car Cleaning', name: ['James', 'Jelly', 'Micheal'] },
    ],
    rightStaff: [],
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
  handleSelectedStaff = name => {
    let { dataRequest, errorsServiceRequest } = this.state;
    dataRequest.selectedStaff = name.value;
    errorsServiceRequest.selectedStaff = '';
    this.setState({
      dataRequest: dataRequest,
      errorsServiceRequest: errorsServiceRequest,
    });
  };
  closeModal = () => {
    let errorsServiceRequest = {};
    let dataRequest = {
      typeOfService: '',
      selectedDate: '',
      selectedTime: '',
      selectedStaff: '',
      additionalDetail: '',
    };
    this.setState({
      modal_requestService: false,
      errorsServiceRequest: errorsServiceRequest,
      dataRequest: dataRequest,
    });
  };
  validateForm = data => {
    let errs = {};
    if (!data.selectedProperty.trim())
      errs.selectedProperty = 'Select one of the Property !';
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
    console.log(dataRequest);
    dataRequest={selectedProperty:'',
    typeOfService: '',
    selectedDate: '',
    selectedTime: '',
    selectedStaff: '',
    additionalDetail: '',}
    this.setState({
      modal_requestService: false,
      selectedName: '',
      selectedTypeofService: '',
      selectedTime: '',
      selectedDate: '',
      additionalDetail: '',
      selectedStaff: '',
      dataRequest:dataRequest
    });
  };
  handleModal = () => {
    this.setState({ modal_requestService: true });
  };
  handleSelectProperty=property=>{
    let { dataRequest, errorsServiceRequest } = this.state;
    dataRequest.selectedProperty = property.value;
    errorsServiceRequest.selectedProperty = '';
    this.setState({
      dataRequest: dataRequest,
      errorsServiceRequest: errorsServiceRequest,
    });
  }
  render() {
    let {
      requestList,modal_requestService,typeOfService,rightStaff,dataRequest,errorsServiceRequest,propertiesList     
    } = this.state;
    return (
      <div className="p-5">
        <div>
          <Button style={{ float: 'right' }} onClick={this.handleModal}>
            Add New Service Request
          </Button>
        </div>
        <RequestService 
            modal_RequestForService={modal_requestService} 
            props={this.props}
            propertiesList={propertiesList}
            handleSelectProperty={this.handleSelectProperty}
            selectedProperty={dataRequest.selectedProperty}
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
            errors={errorsServiceRequest}/>
          <Table
            className="border"
            responsive
            style={{ marginTop: '50px' }}
            hover
          >
            <thead>
              <tr style={{ background: 'black', color: 'white' }}>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Property Name</th>
                <th style={{ textAlign: 'center' }}>Service Type</th>
                <th style={{ textAlign: 'center' }}>Payment Status</th>
                <th style={{ textAlign: 'center' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {requestList.map((n, index) => {
                return (
                  <tr style={{ cursor: 'pointer' }}>
                    <td
                      style={{ textAlign: 'center' }}
                    >
                      {n.date}
                    </td>
                    <td
                      style={{ textAlign: 'center' }}
                    >
                      {n.name}
                    </td>
                    <td
                      style={{ textAlign: 'center' }}
                    >
                      {n.serviceType}
                    </td>
                    <td
                      style={{ textAlign: 'center' }}
                    >
                      {n.paymentStatus}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                     {n.Amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
      </div>
    );
  }
}

export default Properties;
