// eslint-disable-next-line no-unused-vars
import React  from 'react'
import "./DeveloperLandingPage.css"
// import PropTypes from 'prop-types';
import devbanr from "../../../public/Images/Devlperlanding/devbanr.png"
import crew1 from "../../../public/Images/Devlperlanding/crew1.png"
import crew2 from "../../../public/Images/Devlperlanding/crew2.png"
import crew3 from "../../../public/Images/Devlperlanding/crew3.png"
import crew4 from "../../../public/Images/Devlperlanding/crew4.png"
import crew5 from "../../../public/Images/Devlperlanding/crew5.png"
import crew6 from "../../../public/Images/Devlperlanding/crew6.png"
import Stepitems1 from "../../../public/Images/Devlperlanding/Stepitems1.png"
import Stepitems2 from "../../../public/Images/Devlperlanding/Stepitems2.png"
import Stepitems3 from "../../../public/Images/Devlperlanding/Stepitems3.png"
import devlpbuild from "../../../public/Images/Devlperlanding/devlpbuild.png"
import { FillBtn } from '../Homepage/Homepage';
import LaunchGrowTab from '../../Components/LaunchGrowTab/LaunchGrowTab'



const DeveloperLandingPage = () => {

    


  return (
    <>
    <div className="HomeMain">

        <section className='DevlpHeroSec'>
            <div className="container">
                <div className="DevlpHeroData">
                    <div className="LeftDevBanr">
                        <h2><span>Build, customize, and <br /> launch </span> powerful apps <br /> for the veterinary <br /> ecosystem</h2>
                        <p>Transform pet healthcare with your ideas. Yosemite Crew provides you with the tools, APIs, and flexibility to create custom applications tailored to veterinary needs.</p>
                        <div className="HeroBtn">
                            <a className='Fillbtn' href="#"><i className="ri-flashlight-fill"></i> Explore Dev Tools</a>
                            <a className='Sbtn' href="#"><i className="ri-time-fill"></i> Learn more</a>
                        </div>
                    </div>
                    <div className="RytDevBanr">
                        <img src={devbanr} alt="devbanr" width={694} height={560} />
                    </div>
                </div>
            </div>
        </section>

        <section className='DevlYousmiteSec'>
            <div className="YousmiteCrew">
                <p>Why Yosemite Crew?</p>
                <h4>Why Developers Choose Yosemite Crew</h4>
            </div>
            <div className="container">
                <div className="DevYousmiteBoxed">
                    <div className="DevCrewBox crewbox1">
                        <div className="crewText">
                            <h3>Flexibilty</h3>
                            <p>Create custom solutions for both pet owners and vet businesses, adapting to any need.</p>
                        </div>
                        <img src={crew1} alt="crew1" width={154} height={132} />
                    </div>
                    <div className="DevCrewBox crewbox2">
                        <img src={crew2} alt="crew2" width={120} height={120}/>
                        <div className="crewText">
                            <h3>Seamless Integrations</h3>
                            <p>Easily integrate with existing healthcare systems and third-party tools to enhance app functionality.</p>
                        </div>
                        
                    </div>
                    <div className="DevCrewBox crewbox3">
                        <div className="crewText">
                            <h3>Open Source</h3>
                            <p>Choose between self-hosting or a flexible pay-as-you-go option without long-term commitments.</p>
                        </div>
                        <img src={crew3} alt="crew3" width={184} height={184} />
                    </div>
                    <div className="DevCrewBox crewbox4">
                        <img src={crew4} alt="crew4" width={102} height={102}/>
                        <div className="crewText">
                            <h3>Scalability</h3>
                            <p>Build apps that seamlessly grow as your user base and features expand.</p>
                        </div>
                        
                    </div>
                    <div className="DevCrewBox crewbox5">
                        <img src={crew5} alt="crew5"  width={72} height={72} />
                        <div className="crewText">
                            <h3>Comprehensive Tools</h3>
                            <p>Access a wide range of APIs, SDKs, and pre-built templates that simplify development.</p>
                        </div>
                        
                    </div>
                    <div className="DevCrewBox crewbox6">
                        <div className="crewText">
                            <h3>Secure Data Handling</h3>
                            <p>Built with industry-leading security protocols, ensuring sensitive pet healthcare data is always protected.</p>
                        </div>
                        <img src={crew6} alt="crew6" width={129} height={129}/>
                    </div>
                </div>
            </div>
        </section>

        <section className='DevlpToolSec'>
            <div className="container">

                <div className="DevlpToolData">

                    <div className="TopResorchTool">
                        <div className="leftResorch">
                            <p>Developer Tools and Resources</p>
                            <h4>Everything You Need to Build and Launch</h4>
                        </div>
                        <div className="RytResorch">
                            <p>From robust APIs to intuitive SDKs and customizable templates, Yosemite Crew provides every tool you need to create powerful veterinary applications.</p>
                        </div>
                    </div>
                    
                    
                    <div className="BottomResorchTool">

                       <LaunchGrowTab/>

                    

                        
                        

                    </div>
                    











                </div>



            </div>
        </section>

        <section className='SimpleStepSec'>
            <div className="container">
                <div className="StepsData">
                    <div className="leftSimpleStep">
                        <p>How it works</p>
                        <h2>Get Started in Three Simple Steps</h2>
                        <FillBtn FilName="Sign up to Build" FilIcon="ri-file-check-fill " Filhref="#" />
                    </div>
                    <div className="RytSimpleStep">
                        <div className="Stepitems">
                            <img src={Stepitems1} alt="Stepitems1" width={48} height={164} />
                            <div className="Stepstext">
                                <h4>Sign up</h4>
                                <p>Create your developer account and access our portal.</p>
                            </div>
                        </div>
                        <div className="Stepitems">
                            <img src={Stepitems2} alt="Stepitems" width={48} height={164} />
                            <div className="Stepstext">
                                <h4>Explore</h4>
                                <p>Browse APIs, SDKs, and templates to suit your needs.</p>
                            </div>
                        </div>
                        <div className="Stepitems">
                            <img src={Stepitems3} alt="Stepitems" width={48} height={48} />
                            <div className="Stepstext">
                                <h4>Build</h4>
                                <p>Develop, test, and deploy your app seamlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='DevlpPricingSec'>
            <div className="container">
                <div className="DevPriceHead">
                    <p>Pricing</p>
                    <h2>Transparent Pricing That Fits Your Needs</h2>
                </div>
                <div className="DevPriceCard">
                    <div className="DevPricBox">
                        <div className="devpboxtext">
                            <h4>Pay-As-You-Go</h4>
                            <p>Use our hosted solutions with scalable fees.</p>
                        </div>
                    </div>
                    <div className="DevPricBox">
                        <div className="devpboxtext">
                            <h4>Free Option</h4>
                            <p>Self-host your applications at no cost.</p>
                        </div>
                    </div>
                    <div className="DevPricBox">
                        <div className="devpboxtext">
                            <h4>No Lock-In</h4>
                            <p>Switch between self-hosted and managed options anytime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='DevlpBuildSec'>
            <div className="container">
                <div className="ReadyBuildData">
                    <div className="leftBuild">
                        <div className="leftBuilinner">
                            <div className="texted">
                                <h4>Ready to Build?</h4>
                                <p>Join a growing community of developers creating transformative solutions for the veterinary world.</p>
                            </div>
                            <FillBtn FilName="Sign Up as a Developer" FilIcon="ri-flashlight-fill" Filhref="#" />
                        </div>
                    </div>
                    <div className="RytBuild">
                        <img src={devlpbuild} alt="devlpbuild"/>
                    </div>

                </div>
            </div>
        </section>

    </div>
    </>
    
  )
}

export default DeveloperLandingPage


