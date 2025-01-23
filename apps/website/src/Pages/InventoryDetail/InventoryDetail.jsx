// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./InventoryDetail.css"
import { Container } from 'react-bootstrap'
import { BiSolidEditAlt } from "react-icons/bi";
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import whtcheck from "../../../public/Images/whtcheck.png"
import { MainBtn } from '../Appointment/page';

function InventoryDetail() {
    const now = 60;

  return (
    <>
    <section className='InventoryDetailsSec'>
        <Container>
            <div className="InventoryDetailsdata">

                <div className="TopDetailHead">
                    <h3><span>Item</span> Detail</h3>
                    <a href="#"> <span><BiSolidEditAlt /></span> Edit Details</a>
                </div>

                <div className="InventoryDetailsBox">

                    <div className="detaildivInner">
                        <h5>Basic</h5>
                        <div className="baskdetail">
                            <Dtlitems dpara="Category " dname="Pharmaceuticals " />
                            <Dtlitems dpara="Item Name " dname="Zimax" />
                            <Dtlitems dpara="Generic Name " dname="Azithromycin" />
                            <Dtlitems dpara="Item Category" dname="Tablet" />
                            <Dtlitems dpara="Manufacturer" dname="Zoetis" />
                        </div>
                    </div>

                    <div className="detaildivInner">
                        <h5>Stock</h5>
                        <div className="baskdetail">
                            <Dtlitems dpara="Batch Number" dname="CMT241520" />
                            <Dtlitems dpara="SKU" dname="UY3750" />
                            <Dtlitems dpara="Strength" dname="500mg" />
                            <Dtlitems dpara="Expiry Date" dname="19 Dec 2024" />
                            <Dtlitems dpara="Manufacturer" dname="Zoetis" />
                        </div>
                        <div className="baskdetail">
                            <Dtlitems dpara="Total Stock" dname="150" />
                            <Dtlitems dpara="Available Stock" dname="100" />
                            <Dtlitems dpara="Stock Reorder Level" dname="25" />
                            <Dtlitems dpara="Status" dname="Available" />
                        </div>
                        <div className="detailprogbar">
                            <p>Remaining</p>
                            <ProgressBar now={now} label={`${now}%`} visuallyHidden />
                            <h6>67%</h6>
                        </div>
                    </div>

                    <div className="detaildivInner">
                        <h5>Pricing</h5>
                        <div className="baskdetail">
                            <Dtlitems dpara="Manufacturer Price " dname="$ 15.00 " />
                            <Dtlitems dpara="Markup Percentage" dname="% 15" />
                            <Dtlitems dpara="Price" dname="$ 17.25" />
                        </div>
                    </div>




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

export default InventoryDetail


Dtlitems.propTypes = {
    dpara: PropTypes.string.isRequired, 
    dname: PropTypes.string.isRequired,                
};
 function Dtlitems( {dpara,dname} ) {
    return <div className="dtlinr">
        <p>{dpara}</p>
        <h6>{dname}</h6>
    </div>;
}
