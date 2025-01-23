// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./AddInventory.css"
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Forminput } from '../SignUp/SignUp'
import DynamicSelect from '../../Components/DynamicSelect/DynamicSelect'
import DynamicDatePicker from '../../Components/DynamicDatePicker/DynamicDatePicker'
import { MainBtn } from '../Appointment/page'
import whtcheck from "../../../public/Images/whtcheck.png"

function AddInventory() {

    // Select options 
    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ];
      
      // Select options 


  return (
    <>
    <section className='AddInventorySec'>
        <Container>
            <div className="AddInventorydata">

                <div className="TopAdinvtHead">
                    <h3><span>Add </span> Inventory</h3>
                </div>

                <div className="AddInventoryBox">
                    <Form>

                        <Row>
                            <Col md={6}><DynamicSelect options={options} placeholder="Select Category" /></Col>
                            <Col md={6}><Forminput inlabel="Bar Code" intype="text" inname="name"/></Col>
                        </Row>
                        <Row>
                            <Col md={6}><Forminput inlabel="Item Name" intype="text" inname="name"/></Col>
                            <Col md={6}><Forminput inlabel="Generic Name" intype="text" inname="name"/></Col>
                        </Row>
                        <Row>
                            <Col md={6}><DynamicSelect options={options} placeholder="Manufacturer" /></Col>
                            <Col md={6}><DynamicSelect options={options} placeholder="Item Category (like Tablet, Syrup, etc)" /></Col>
                        </Row>
                        <Row>
                            <Col md={3}><Forminput inlabel="Batch Number" intype="number" inname="number"/></Col>
                            <Col md={3}><Forminput inlabel="SKU" intype="number" inname="number"/></Col>
                            <Col md={3}><Forminput inlabel="Strength (ex: 500mg)" intype="number" inname="number"/></Col>
                            <Col md={3}><Forminput inlabel="Quantity" intype="number" inname="number"/></Col>
                        </Row>
                        <Row>
                            <Col md={4}><Forminput inlabel="$ Manufacturer Price" intype="number" inname="number"/></Col>
                            <Col md={4}><Forminput inlabel="% Markup" intype="number" inname="number"/></Col>
                            <Col md={4}><Forminput inlabel="$ Price" intype="number" inname="number"/></Col>
                        </Row>
                        <Row>
                            <Col md={6}><Forminput inlabel="Stock Reorder Level" intype="text" inname="text"/></Col>
                            <Col md={6}><DynamicDatePicker placeholder="Expiry Date (dd--mm-yyyy)" /></Col>
                            
                            
                        </Row>

                    </Form>

                </div>

                <div className="ee">
                    <MainBtn  bimg={whtcheck} btext="Update" optclas="" />
                </div>

            </div>

        </Container>
    </section>

    </>
  )
}

export default AddInventory