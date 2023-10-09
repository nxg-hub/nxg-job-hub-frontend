import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import { MdLocationPin } from 'react-icons/md'
import { Link } from 'react-router-dom';
import EmployImg from '../../static/images/Choose-img1.png';
import HelpImg from '../../static/images/help-employ-img.png';
import BeImg from '../../static/images/be-employed-img.png';

const JobCards = () => {
    const Jobsdetails = [
        {
            price:"$15.7PH",
            location:"Nigeria",
            heading:"Data Entry Personnel - #DCA18B7",
            schedule:"Data Entry - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
        {
            price:"$21.4PH",
            location:"Nigeria",
            heading:"UI Design - #DCA23A1",
            schedule:"Product Design - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
        {
            price:"$20.7PH",
            location:"Nigeria",
            heading:"Data Analyst - #DCA84B2",
            schedule:"Data Analysis - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
        {
            price:"$18.0PH",
            location:"Nigeria",
            heading:"Data Entry Assistant - #DCA18B3",
            schedule:"Data Entry - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
        {
            price:"$22.5PH",
            location:"Nigeria",
            heading:"Frontend Developer - #DCA37B2",
            schedule:"Web Development - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
        {
            price:"$20.2PH",
            location:"Nigeria",
            heading:"Web Designer - #DCA33F9",
            schedule:"Web Design - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
        {
            price:"$193PH",
            location:"Nigeria",
            heading:"Project Manager - #DCA42E1",
            schedule:"Project Management - 40hrs/week.",
            body:"This is a full time job that requires  most of your attention. You can choose to work from home but your camera must be on throughout the duration of time you are required to be working. You must also be present in all meetings as absenteeism is not an option, ......",
            herf:"Read more"
        },
    ];

    const Chosen = [
        {
            img:EmployImg,
            title:"Employ",
            group:"employ",
            chosentext:"Hire the best talents. This recruiting platform helps you move faster as there is an automated snd seamless hiring process"
        },
        {
            img:HelpImg,
            title:"Help Employ",
            group:"help",
            chosentext:"Move the right talents forward. Collaborate with employers as an agent to evaluate and make the best selections."
        },
        {
            img:BeImg,
            title:"Be Employed",
            group:"be",
            chosentext:"Attract and secure the right jobs. Tailor your CV to your desired job search and secure jobs quickly."
        },
    ]
  return (
    <div>
        <Swiper
            spaceBetween={60}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {Jobsdetails.map((detail) => {
                return (
                    <SwiperSlide key={detail.heading}>
                        <div className="detail-holder">
                            <div className="price-shadow">
                                <div className="p-shadows"></div>
                                <div className="p-detail">{detail.price}</div>
                            </div>
                            <div className="card-content">
                                <div className="card-location">
                                    <MdLocationPin />
                                    <p>{detail.location}</p>
                                </div>
                                <div className="card-detail">
                                    <h3>{detail.heading}</h3>
                                    <span>{detail.schedule}</span>
                                    <p>{detail.body}</p>
                                    <div className="read">
                                        <Link>{detail.herf}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
        <div className="choose-us-section">
            <h3 style={{fontSize:"28px", fontWeight:"700", margin:".5rem 0", color:"#2596be", textAlign:"center"}}>Why Choose Us</h3>
            <div className="choose-content">
                {Chosen.map((data) => {
                    return (
                        <div key={data.group} className={[data.group === "help" ? "help-details" : "choose-details"]}>
                            <div className="choose-text">
                                <h4>{data.title}</h4>
                                <p>{data.chosentext}</p>
                            </div>
                            <div className="choose-img" style={{width:"620px", height:"300px"}}>
                                <img src={data.img} alt={data.title} style={{width:"100%", height:"100%", objectFit:"contain"}}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default JobCards