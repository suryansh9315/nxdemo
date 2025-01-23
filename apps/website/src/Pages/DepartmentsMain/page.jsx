// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./DepartmentsMain.css"
// import { TextSpan } from '../Appointment/page'
import { BoxDiv, ListSelect } from '../Dashboard/page'
import box1 from "../../../public/Images/box1.png"
import box2 from "../../../public/Images/box2.png"
import box3 from "../../../public/Images/box3.png"
import box4 from "../../../public/Images/box4.png"
import { AddSerchHead } from '../Add_Doctor/Add_Doctor'
import DepartmentAppointmentsChart from '../../Components/BarGraph/DepartmentAppointmentsChart'
import WeeklyAppointmentsChart from '../../Components/BarGraph/WeeklyAppointmentsChart'



const DepartmentsMain = () => {

  // dropdown 
  const optionsList1 = ['Last 7 Days', 'Last 10 Days', 'Last 20 Days', 'Last 21 Days'];

  return (
    <>

    <section className='Department_MainSec'>
        <div className="container">
            <div className="MainDash">

              <AddSerchHead adtext="Departments" adbtntext="Add Department" adhrf="/add_department"/>

              <div className="overviewDiv">
                <div className="OverviewTop">
                  <h5>Overview</h5>
                  <ListSelect options={optionsList1} />
                </div>
                <div className="overviewitem">
                  <BoxDiv boximg={box2} ovradcls="purple" ovrtxt="Departments" boxcoltext="purpletext" overnumb="07"  />
                  <BoxDiv boximg={box4} ovradcls=" fawndark" ovrtxt="Total Doctors "  boxcoltext="frowntext" overnumb="12" />
                  <BoxDiv boximg={box3} ovradcls=" cambrageblue" ovrtxt="New Patients" boxcoltext="greentext" overnumb="48"  />
                  <BoxDiv boximg={box1} ovradcls="chillibg" ovrtxt="Appointments Today" boxcoltext="ciltext" overnumb="28"   />
                </div>
              </div>

              <div className="DepartWeekGraph">
                <div className="DashGraphCard">
                  <div className="GraphTop">
                    <h5>Appointments</h5>
                    <ListSelect options={optionsList1} />
                  </div>
                  <div className="graphimg">
                    <DepartmentAppointmentsChart/>
                  </div>
                </div>

                <div className="DashGraphCard">
                  <WeeklyAppointmentsChart/>
                </div>
              </div>














            </div>
        </div>
    </section>




    </>
  )
}

export default DepartmentsMain