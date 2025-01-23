// eslint-disable-next-line no-unused-vars
import React  from 'react'
import "./MainLandingPage.css"
import { Container } from 'react-bootstrap'
import checkbook from '/public/Images/MainLanding/check.svg';
import Glixbox from '/public/Images/MainLanding/Glixbox.png';
import Glixbox2 from '/public/Images/MainLanding/Glixbox2.png';
import Glixbox3 from '/public/Images/MainLanding/Glixbox3.png';
import Glixbox4 from '/public/Images/MainLanding/Glixbox4.png';
import Glightbox from '../../Components/Glightbox/Glightbox';
import { FaClock } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";




const MainLandingPage = () => {

    
    
  return (
    <>
    <section className='MainLandingSec'>
        {/* <Container> */}

            <div className="MainLandingHero">

                <div className="mainLeftHeroDiv">

                    <div className="MainHroText">
                        <h2><span>Redefining </span> <br /> Veterinary Care</h2>
                        <p>Manage everything from appointments to patient records, streamline operations, and improve pet health outcomes—all in one open-source platform designed for veterinarians, pet owners, and developers.</p>
                    </div>
                    <div className="MainHroBtn">
                        <a href="#"><FaClock /> Book a Demo</a>
                        <a href="#"><CiBookmarkCheck /> Learn more</a>
                    </div>


                </div>

                <div className="RytHeroDiv">



                </div>





            </div>

        {/* </Container> */}
    </section>


    <section className='BuildInnovatorSec MainPracticesSec'>
        <Container>
            <div className="InnovatorData">
                <div className="LeftInnovatr">
                    <div className="InvtDevBtn">
                        <a href="#">Best for Veterinary Practices</a>
                    </div>
                    <div className="InvtTextDiv">
                        <div className="IntxtHead">
                            <h2>Streamlined Solutions <br /> for Busy Vets</h2>
                            <p>Yosemite Crew helps veterinary practices stay organized, save time, and offer superior care to their clients.</p>
                        </div>
                        <div className="InxtBtn">
                            <a href="#"><img src={checkbook} alt="" width={18} height={18} /> Learn more</a>
                        </div>
                    </div>
                </div>
                <div className="RightInnovatr">
                    <img src={Glixbox4} alt=""  />
                    <Glightbox
                    videoLink="https://youtu.be/Ce4Tsg6oQM8?si=GaFeI1C7PaagCIQj"
                    buttonColor=" #D04122"
                    buttonBackground="radial-gradient(circle, #D04122 50%, transparent 75%)"/>
                </div>

            </div>
        </Container>
    </section>

    <section className='BuildInnovatorSec MainPetownerSec'>
        <Container>
            <div className="InnovatorData">
                <div className="LeftInnovatr">
                    <div className="InvtDevBtn">
                        <a href="#">Perfect for Pet Owners</a>
                    </div>
                    <div className="InvtTextDiv">
                        <div className="IntxtHead">
                            <h2>Designed for Pet <br /> Owners — Simple, <br /> Intuitive, Reliable</h2>
                            <p>Give pet parents the tools they need to stay on top of their furry friend’s health, all while maintaining smooth communication with their vets.</p>
                        </div>
                        <div className="InxtBtn">
                            <a href="#"><img src={checkbook} alt="" width={18} height={18} /> Learn more</a>
                        </div>
                    </div>
                </div>
                <div className="RightInnovatr">
                    <img src={Glixbox3} alt=""  />
                    <Glightbox
                    videoLink="https://youtu.be/Ce4Tsg6oQM8?si=GaFeI1C7PaagCIQj"
                    buttonColor=" #D04122"
                    buttonBackground="radial-gradient(circle, #D04122 50%, transparent 75%)"/>
                </div>
            </div>
        </Container>
    </section>

    <section className='BuildInnovatorSec MainLandPricingSec'>
        <Container>
            <div className="InnovatorData">
                <div className="LeftInnovatr">
                    <div className="InvtDevBtn">
                        <a href="#">Flexible and Transparent Pricing</a>
                    </div>
                    <div className="InvtTextDiv">
                        <div className="IntxtHead">
                            <h2>Pay as You Grow, No <br /> Strings Attached</h2>
                            <p>Choose what works best for you—host it yourself for free or opt for our pay-as-you-go model. With no hidden fees or long-term commitments, Yosemite Crew puts you in control.</p>
                        </div>
                        <div className="InxtBtn">
                            <a href="#"><img src={checkbook} alt="" width={18} height={18} /> Learn more</a>
                        </div>
                    </div>
                </div>
                <div className="RightInnovatr">
                    <img src={Glixbox2} alt="" width={887} height={565} />
                    <Glightbox
                    videoLink="https://youtu.be/Ce4Tsg6oQM8?si=GaFeI1C7PaagCIQj"
                    buttonColor=" #8E88D2"
                    buttonBackground="radial-gradient(circle, #8E88D2 50%, transparent 75%)" />
                </div>
            </div>
        </Container>
    </section>

    <section className='BuildInnovatorSec'>
        <Container>
            <div className="InnovatorData">
                <div className="LeftInnovatr">
                    <div className="InvtDevBtn">
                        <a href="#">Developer-Friendly Platform</a>
                    </div>
                    <div className="InvtTextDiv">
                        <div className="IntxtHead">
                            <h2>Built for Innovators</h2>
                            <p>Yosemite Crew isn’t just for end-users—it’s a robust platform for developers to create, customize, and innovate new veterinary solutions.</p>
                        </div>
                        <div className="InxtBtn">
                            <a href="#"><img src={checkbook} alt="" width={18} height={18} /> Learn more</a>
                        </div>
                    </div>
                </div>
                <div className="RightInnovatr">
                    <img src={Glixbox} alt="" width={887} height={528} />
                    <Glightbox
                    videoLink="https://youtu.be/Ce4Tsg6oQM8?si=GaFeI1C7PaagCIQj"
                    buttonColor=" #477A6B"
                    buttonBackground="radial-gradient(circle, #477A6B 50%, transparent 75%)"/>
                </div>
            </div>
        </Container>
    </section>
   
    </>
  )
}

export default MainLandingPage