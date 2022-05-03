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
    backdrop: true,
    
    requestList: [
      {date:"21-05-2022", name: 'Alishan', serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'Mannat',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'The Luxuary House',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'The Grand Vila',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'The Taj Residency',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
      {date:"21-05-2022", name: 'A1 House',  serviceType:"Cleaning" ,Amount: '1050', paymentStatus:'COD' },
    ],
  };

  render() {
    let {
      requestList,
      
    } = this.state;
    return (
      <div className="p-5">
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
