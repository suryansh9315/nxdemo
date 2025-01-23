// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import "./DownlodeApp.css"
import petapppic from '../../../public/Images/DownlodeApp/petapppic.png';
import apple from '../../../public/Images/DownlodeApp/apple.png';
import playstore from '../../../public/Images/DownlodeApp/playstore.png';
import glimpspic from '../../../public/Images/DownlodeApp/glimpspic.png';
import brown from '../../../public/Images/DownlodeApp/brown.png';
import purple from '../../../public/Images/DownlodeApp/purple.png';
import green from '../../../public/Images/DownlodeApp/green.png';
import ToolKitKeyItems1 from '../../../public/Images/DownlodeApp/ToolKitKeyItems1.png';
import ToolKitKeyItems2 from '../../../public/Images/DownlodeApp/ToolKitKeyItems2.png';
import ToolKitKeyItems3 from '../../../public/Images/DownlodeApp/ToolKitKeyItems3.png';
import ToolKitKeyItems4 from '../../../public/Images/DownlodeApp/ToolKitKeyItems4.png';
import cft1 from '../../../public/Images/DownlodeApp/cft1.png';
import cft2 from '../../../public/Images/DownlodeApp/cft2.png';
import cft3 from '../../../public/Images/DownlodeApp/cft3.png';
import cft4 from '../../../public/Images/DownlodeApp/cft4.png';
import { SectionText } from '../Pricing/Pricing';
// import { CountUp } from "countup.js";

const DownlodeApp = () => {

    const [happyOwners, setHappyOwners] = useState(0);
    const [appointments, setAppointments] = useState(0);
    const [petsAdded, setPetsAdded] = useState(0);

    useEffect(() => {
        const happyOwnersTarget = 10000;
        const appointmentsTarget = 5000;
        const petsAddedTarget = 8000;

        const increment = 50; // Adjust increment speed for smoother effect
        const interval = 20; // Interval time in ms

        const intervalId = setInterval(() => {
            setHappyOwners(prev => Math.min(prev + increment, happyOwnersTarget));
            setAppointments(prev => Math.min(prev + increment, appointmentsTarget));
            setPetsAdded(prev => Math.min(prev + increment, petsAddedTarget));
        }, interval);

        return () => clearInterval(intervalId);
    }, []);

    const formatCount = (value, target) => (value === target ? `${target / 1000}K+` : value);


  return (
    <>
    <section className='DownlodeSec'>
        <div className="container ">

            <div className="Downlode_Data">

                <div className="downlodetext">
                    <h1>Your Pet’s Health, <br /> <span>in Your Hands</span></h1>
                    <p>Manage your pet’s health, schedule vet appointments, set reminders, and more—all in one app.</p>
                    <PetDownBtn/>
                </div>
                
                <div className="downlodeReview">

                    <div className="reviewItems">
                        <h6 >{formatCount(happyOwners, 10000)}</h6>
                        <p>Happy Pet Owners</p>
                    </div>
                    <div className="reviewItems">
                        <h6>{formatCount(appointments, 5000)}</h6>
                        <p>Appointments Scheduled</p>
                    </div>
                    <div className="reviewItems">
                        <h6>{formatCount(petsAdded, 8000)}</h6>
                        <p>Pets Added</p>
                    </div>


                    
                    
                </div>

            </div>
        </div>
    </section>


    <section className='PetToolkitSec'>
        <div className="container">
            <div className="pettoolkithead">
                <SectionText secblk1="Your Pet’s" secspan2="All-in-One Toolkit"  />
            </div>
        </div>

        <div className="ToolkitKeyData">

            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems1} alt="ToolKitKeyItems1" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft1} alt="cft1" width={60} height={60} />
                    <h6>Book and Manage <br /> Vet Appointments</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems2} alt="ToolKitKeyItems2" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft2} alt="cft2" width={60} height={60} />
                    <h6>Access Medical <br /> Records Anytime</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems3} alt="ToolKitKeyItems3" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft3} alt="cft3" width={60} height={60} />
                    <h6>Wellness <br /> Management</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems4} alt="ToolKitKeyItems4" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft4} alt="cft4" width={60} height={60} />
                    <h6>Medication and <br /> Health Monitoring</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems1} alt="ToolKitKeyItems1" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft1} alt="cft1" width={60} height={60} />
                    <h6>Book and Manage <br /> Vet Appointments</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems2} alt="ToolKitKeyItems2" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft2} alt="cft2" width={60} height={60} />
                    <h6>Access Medical <br /> Records Anytime</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems3} alt="ToolKitKeyItems3" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft3} alt="cft3" width={60} height={60} />
                    <h6>Wellness <br /> Management</h6>
                </div>
            </div>
            <div className="ToolKitKeyItems">
                <img src={ToolKitKeyItems4} alt="ToolKitKeyItems4" width={290} height={290} />
                <div className="keyinner">
                    <img src={cft4} alt="cft4" width={60} height={60} />
                    <h6>Medication and <br /> Health Monitoring</h6>
                </div>
            </div>





        </div>

    </section>


    <section className='PawsPraisesSec'>
        <SectionText secblk1="A Glimpse of" secspan2="Paw-sibilities"  />

        <div className="PawsPrasData">

            <div className="BrownDiv">
                <img src={brown} alt="brown" height={294} />
            </div>
            <div className="PurpleDiv">
                <img src={purple} alt="purple" height={233} />
            </div>
            <div className="GreenDiv">
                <img src={green} alt="green" height={245} />
            </div>

        </div>

    </section>

    <section className='GlimpseSec'>
        <div className="container">
            <SectionText secblk1="A Glimpse of" secspan2="Paw-sibilities"  />
            <div className="mt-5">
                <img src={glimpspic} alt="glimpspic" height={925} />
            </div>
        </div>
    </section>

    <section className='PetAppSec'>
        <div className="container">
            <div className="PetAppData">
                <div className="LftpetApp">
                    <div className="PetAppText">
                        <h2>The Only Pet App <br /> <span>You’ll Ever Need</span></h2>
                        <p>Download Yosemite Crew App today and take the first step towards better health for your furry friends.</p>
                    </div>
                    <PetDownBtn/>
                </div>
                <div className="RytpetApp">
                    <img src={petapppic} alt="petapppic" width={569} height={569} />
                </div>
            </div>
        </div>
    </section>


    </>
  )
}

export default DownlodeApp

export function PetDownBtn() {
    return <div className="PetAppBtn">
        <a href="#"><img src={apple} alt="apple" width={25} height={29} /> <span> <p>Download on the</p> <h6>App Store</h6> </span> </a>
        <a href="#"><img src={playstore} alt="playstore" width={29} height={30} /> <span> <p>Get it on</p> <h6>Google Play</h6> </span> </a>
    </div>;
}
