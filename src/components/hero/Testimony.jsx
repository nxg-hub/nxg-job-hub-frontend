import React from 'react'
import './sponsor.scss'
import Jona from '../../static/images/testimony5.jpg'
import Janet from '../../static/images/testimonyimg2.png'
import Peter from '../../static/images/testimony1.jpg'
import { RiDoubleQuotesR } from 'react-icons/ri'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';


const Testimony = () => {
    const Testimonies = [
        {
            id:1,
            name:"Chris Oghenerhwe",
            img: Jona,
            text: "I love this job hub as they helped me get my first job as a web developer through their timely job alerts and detailed CV. I highly recommend using this platform if you need a  sharp boost in your career"
        },
        {
            id:2,
            name:"Janet Davids",
            img: Janet,
            text: "I love this job hub as they helped me get my first job as a web developer through their timely job alerts and detailed CV. I highly recommend using this platform if you need a  sharp boost in your career"
        },
        {
            id:3,
            name:"Peter Williams",
            img: Peter,
            text: "I love this job hub as they helped me get my first job as a web developer through their timely job alerts and detailed CV. I highly recommend using this platform if you need a  sharp boost in your career"
        },
    ]
  return (
    <div >
        <h4 style={{fontSize:"34px", fontWeight:"700", marginTop:"3rem", textAlign:"center", color:"#2596be"}}>What Job Seekers Say About Us</h4>
        <div className="testimony-content">
            <Swiper
                freeMode={true}
                grabCursor={true}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                modules={[FreeMode, Autoplay]}
                className="mySwiper"
            >
                {Testimonies.map((testimony) => {
                    return (
                        <SwiperSlide key={testimony.id}>
                            <div key={testimony.id} className="testimony-card">
                                <div className="testimony-img">
                                    <img src={testimony.img} alt={testimony.name} />
                                </div>
                                <div className="testimony-detail">
                                    <h6>{testimony.name}</h6>
                                    <p>
                                        <RiDoubleQuotesR style = {{transform: 'scaleX(-1)', width:"1.5rem", height:"1.5rem", color:"#2596be",marginBottom:"-0.3rem"}} />
                                        {testimony.text} 
                                        <RiDoubleQuotesR style={{width:"1.5rem", height:"1.5rem", color:"#2596be", marginLeft:".5rem", marginBottom:"-0.3rem"}}/>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
            {/* {Testimonies.map((testimony) => {
                return (
                    <div key={testimony.id} className="testimony-card">
                        <div className="testimony-img">
                            <img src={testimony.img} alt={testimony.name} />
                        </div>
                        <div className="testimony-detail">
                            <p>
                                <RiDoubleQuotesR style = {{transform: 'scaleX(-1)', width:"1.5rem", height:"1.5rem", color:"#2596be",marginBottom:"-0.3rem"}} />
                                 {testimony.text} 
                                <RiDoubleQuotesR style={{width:"1.5rem", height:"1.5rem", color:"#2596be", marginLeft:".5rem", marginBottom:"-0.3rem"}}/>
                            </p>
                        </div>
                    </div>
                )
            })} */}
           
        </div>
    </div>
  )
}

export default Testimony

