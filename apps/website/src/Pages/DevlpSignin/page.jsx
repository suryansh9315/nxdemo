// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./DevlpSignin.css"
import { Container } from 'react-bootstrap'
import { Forminput, FormPassw, HeadText } from '../SignUp/SignUp'
import { MainBtn } from '../Appointment/page'
import whtcheck from "../../../public/Images/whtcheck.png"

function DevlpSignin() {
  return (
    <>
    <section className="DevlpSignInSec">
        <Container>
            <div className="DevlpSignInData">
                <div className="ss"></div>
                <div className="SignFormDiv">
                    <form action="">
                        <HeadText Spntext="Welcome" blktext="back" />
                        <div className="FormInner">
                            <Forminput inlabel="Email Address" intype="text" inname="email"/>
                            <div className="forgtdiv">
                                <FormPassw paswlabel="Password" />
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="Sign_check">
                            <input type="checkbox"className="check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1"> Keep me logged-in </label>
                        </div>
                        <MainBtn bimg={whtcheck} btext="Sign in" />
                    </form>
                </div>
            </div>
        </Container>
    </section>



    </>
  )
}

export default DevlpSignin