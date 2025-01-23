// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import "./AddProcedurePackage.css"
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Forminput } from '../SignUp/SignUp'
import DynamicSelect from '../../Components/DynamicSelect/DynamicSelect'
import PackageTable from '../../Components/PackageTable/PackageTable'
import { MainBtn } from '../Appointment/page'
import whtcheck from "../../../public/Images/whtcheck.png"

function AddProcedurePackage() {
const [description, setDescription] = useState("");
     // Select options 
     const options = [
        { value: '1', label: 'Surgical Procedures' },
        { value: '2', label: 'Surgical Procedures' },
        { value: '3', label: 'Surgical Procedures' },
      ];
      
      // Select options 

  return (
    <>
    <section className='AddProcedurePackageSec'>
        <Container>
            <div className="AddProcedurePackagedata">

                <div className="TopProcedHead">
                    <h3><span>Add</span> Procedure Package</h3>
                </div>

                <div className="AddProcedurePackageBox">

                    <Form>
                        <Row>
                            <Col md={6}><Forminput inlabel="Package Name" intype="text" inname="name"/></Col>
                            <Col md={6}><DynamicSelect options={options} placeholder="Category" /></Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="form-floating  mb-3">
                                    <textarea
                                    className="form-control"
                                    placeholder="Short description of the procedure."
                                    id="floatingTextarea2"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <label htmlFor="floatingTextarea2">Short description of the procedure.</label>
                                </div>
                            </Col>
                        </Row>
                    </Form>

                    <PackageTable/>

                </div>

                <div className="ee">
                    <MainBtn  bimg={whtcheck} btext="Add Package" optclas="" />
                </div>






            </div>
        </Container>
    </section>



    </>
  )
}

export default AddProcedurePackage