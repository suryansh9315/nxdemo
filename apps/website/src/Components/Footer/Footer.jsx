// eslint-disable-next-line no-unused-vars
import React from 'react'
import  "./Footer.css"
import FtLogo from "../../../public/Images/Logo.png"

const Footer = () => {
  return (
    <>
    <footer className='Footersec'>
        <div className="container">
            <div className="FootTopData">

                <div className="leftFooter">
                    <img src={FtLogo} alt="footerlogo" />
                </div>
                <div className="RytFooter">

                    <div className="FtDiv">
                        <h5>Developers</h5>
                        <div className="FtLinks">
                            <a href="#">Getting Started</a>
                            <a href="#">Documentation</a>
                            <a href="#">Search</a>
                        </div>
                    </div>
                    <div className="FtDiv">
                        <h5>Community</h5>
                        <div className="FtLinks">
                            <a href="#">Case Studies</a>
                            <a href="#">Discord</a>
                            <a href="#">Storybook</a>
                            <a href="#">GitHub</a>
                            <a href="#">Contributing</a>
                        </div>
                    </div>
                    <div className="FtDiv">
                        <h5>Company</h5>
                        <div className="FtLinks">
                            <a href="#">About us</a>
                            <a href="#">Security</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Pricing</a>
                            <a href="#">Enterprise</a>
                            <a href="#">Careers</a>
                            <a href="#">Blog</a>
                        </div>
                    </div>

                </div>


            </div>

            <div className="Footer_Bottom">
                <div className="Bootom_Foot">
                    <h4>Copyright &copy; DuneXploration UG</h4>
                    <p>DuneXploration UG (haftungsbeschränkt) <br /> Mainzer Strasse 397, 55411 Bingen am Rhein </p>
                </div>
            </div>

        </div>
    </footer>
        
    </>
  )
}

export default Footer