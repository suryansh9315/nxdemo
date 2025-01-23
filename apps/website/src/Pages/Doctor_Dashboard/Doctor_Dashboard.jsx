/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import "./Doctor_Dashboard.css"
import { BoxDiv, DivHeading } from '../Dashboard/page'
import box1 from "../../../public/Images/box1.png"
import box7 from "../../../public/Images/box7.png"
import box8 from "../../../public/Images/box8.png"
import doctprofile from "../../../public/Images/doctprofile.png"
import reviw from "../../../public/Images/reviw.png"
import review1 from "../../../public/Images/review1.png"
import review2 from "../../../public/Images/review2.png"
import review3 from "../../../public/Images/review3.png"
import ActionsTable from '../../Components/ActionsTable/ActionsTable';
import Accpt from "../../../public/Images/acpt.png";
import Decln from "../../../public/Images/decline.png";
import StatusTable from '../../Components/StatusTable/StatusTable';

const Doctor_Dashboard = () => {

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };



  return (

    <>

    <section className='DoctorDashBoardSec'>
        <div className="container">

            <div className="MainDash">

              <div className="DoctDashTop">
                <div className="LfttopDoct">

                  <div className="ProfileDash">
                    <img src={doctprofile} alt="" />
                    <div className="doctnameText">
                      <span>Welcome, Dr. David Brown</span>
                      <h2>Your Dashboard</h2>
                    </div>
                  </div>

                  <div className="overviewitem">
                    <BoxDiv boximg={box1} ovradcls="chillibg" ovrtxt="Appointments" spanText="(Last 7 days)" boxcoltext="ciltext" overnumb="12"   />
                    <BoxDiv boximg={box7} ovradcls="purple" ovrtxt="Appointments" spanText="(Last 7 days)" boxcoltext="purpletext" overnumb="04"  />
                    <BoxDiv boximg={box8} ovradcls=" cambrageblue" ovrtxt="Reviews" boxcoltext="greentext" overnumb="24"  />
                  </div>

                </div>

                {/* <div className="RyttopDoct">
                  <div className="doctNotify">
                    <span><i className="ri-notification-3-fill"></i> 2 New Messages</span>
                    <a href="#"> See all</a>
                  </div>

                  <div className="NotificationDiv">

                    <div className="DoctInboxItems">
                      <img src="../../../public/Images/review1.png" alt="" />
                      <div className="dinbtext">
                        <h4>Sky B <span> <img src="../../../public/Images/reviw.png" alt="" /> Kizie</span> </h4>
                        <p>Hi Dr. David Brown, I have a few questions about my pet&apos;s digestive i...</p>
                      </div>
                    </div>

                    <div className="DoctInboxItems">
                      <img src="../../../public/Images/review2.png" alt="" />
                      <div className="dinbtext">
                        <h4>Henry C <span> <img src="../../../public/Images/reviw.png" alt="" /> King</span> </h4>
                        <p>Hello Dr. Brown, could you please advise on the best diet for a dog wit...</p>
                      </div>
                    </div>

                  </div>

                </div> */}





              </div>

              <div>
                <DivHeading TableHead="New Appointments" tablespan="(3)" />
                <ActionsTable actimg1={Accpt} actimg2={Decln} />
              </div>

              <div>
                <DivHeading TableHead="Upcoming Assessments" tablespan="(3)" />
                <StatusTable />
              </div>

              <div className="ReviewsDiv">

                  <DashHeadtext htxt="Reviews " hspan="(24)"/>

                  <div className="ReviewPading">
                    <div className="ReviewsData">

                      <ReviewCard isNew="New" Revimg={review1} Revname="Sky B" Revpetname="Kizie" Revdate="25 August 2024" rating="5.0" Revpara1="We are very happy with the services so far. Dr. Brown has been extremely thorough and generous with his time and explaining everything to us. When one is dealing with serious health issues it makes a huge difference to understand what&apos;s going on and know that the health providers are doing their best. Thanks!" />

                      <ReviewCard isNew="New" Revimg={review2} Revname="Pika" Revpetname="Oscar" Revdate="30 August 2024" rating="4.7" Revpara1="Dr. Brown, the Gastroenterology Specialist was very thorough with Oscar. Zoey was pre diabetic so Doc changed her meds from Prednisolone to Budesonide. In 5 days, Oscar’s glucose numbers were lower and in normal range. We are staying with Dr. Brown as Oscar’s vet as I don’t feel any anxiety dealing with Oscar’s illness now." />

                      <ReviewCard  Revimg={review3} Revname="Henry C" Revpetname="Kizie" Revdate="15 August 2024" rating="4.9" Revpara1="SFAMC and Dr. Brown in particular are the very best veterinary professionals I have ever encountered. The clinic is open 24 hours a day in case of an emergency, and is clean and well staffed." Revpara2="Dr Brown is a compassionate veterinarian with both my horse and myself, listens and responds to my questions, and her mere pre.." />

                    </div>

                    {!showMore && (
                        <div className="show-more"><a href="#" onClick={handleShowMore}>View all</a></div>
                    )}
                      
                    {showMore && (
                      <div className="ReviewsData">
                          <ReviewCard  Revimg={review1} Revname="Sky B" Revpetname="Kizie" Revdate="25 August 2024" rating="5.0" Revpara1="We are very happy with the services so far. Dr. Brown has been extremely thorough and generous with his time and explaining everything to us. When one is dealing with serious health issues it makes a huge difference to understand what&apos;s going on and know that the health providers are doing their best. Thanks!" />
                          <ReviewCard  Revimg={review2} Revname="Pika" Revpetname="Oscar" Revdate="30 August 2024" rating="4.7" Revpara1="Dr. Brown, the Gastroenterology Specialist was very thorough with Oscar. Zoey was pre diabetic so Doc changed her meds from Prednisolone to Budesonide. In 5 days, Oscar’s glucose numbers were lower and in normal range. We are staying with Dr. Brown as Oscar’s vet as I don’t feel any anxiety dealing with Oscar’s illness now." />
                          <ReviewCard  Revimg={review3} Revname="Henry C" Revpetname="Kizie" Revdate="15 August 2024" rating="4.9" Revpara1="SFAMC and Dr. Brown in particular are the very best veterinary professionals I have ever encountered. The clinic is open 24 hours a day in case of an emergency, and is clean and well staffed." Revpara2="Dr Brown is a compassionate veterinarian with both my horse and myself, listens and responds to my questions, and her mere pre.." />

                          <div className="show-more"><a href="#" onClick={handleShowLess}>View less</a></div>
                      </div>
                    )}
                  </div>
                  



              </div>

            </div>

        </div>
    </section>


    </>
  )
}


export default Doctor_Dashboard



ReviewCard.propTypes = {
    isNew: PropTypes.string.isRequired, 
    Revimg: PropTypes.string.isRequired,                
    Revname: PropTypes.string.isRequired,                
    Revpetname: PropTypes.string.isRequired,                
    Revdate: PropTypes.string.isRequired,                
    rating: PropTypes.string.isRequired,                
    Revpara1: PropTypes.string.isRequired,                
    Revpara2: PropTypes.string.isRequired,                
  };
function ReviewCard( { Revimg , isNew , Revname , Revpetname , Revdate , rating , Revpara1 ,Revpara2 }) {
    return <div className="Reviewcard">

        <div className="Reviwtop">
            <img src={Revimg} alt="review" />
            <div className="rbtext">
                <h6>{Revname}</h6>
                <p><img src={reviw} alt="reviw" /> {Revpetname}</p>
            </div>
        </div>
        <div className="Reviwmid">
            <h6>{Revdate}</h6>
            <span><i className="ri-star-fill"></i> {rating}</span>
        </div>

        <div className="reviwEnd">
            <p>{Revpara1} {Revpara2 && <p>{Revpara2}</p>} </p>
            
        </div>

        {isNew && <span className="new-badge"><i className="ri-flashlight-fill"></i> New</span>} 


        
        





    </div>;
}



// Heading Text 
DashHeadtext.propTypes = {
    htxt: PropTypes.string.isRequired, 
    hspan: PropTypes.string.isRequired,                
  };
export function DashHeadtext({htxt , hspan}) {
    return <div className="DashHeading">
        <h5>{htxt}  {hspan && <span>{hspan}</span>}</h5>
    </div>;
}
