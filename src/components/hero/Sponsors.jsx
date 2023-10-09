import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './sponsor.scss';
import Call from '../../static/icons/viber.png';
import Watsapp from '../../static/icons/whatsapp.png';
import ReactImg from '../../static/icons/science-symbol.png';
import WindowImg from '../../static/icons/windows.png';
import Tinder from '../../static/icons/tinder.png';
import Slack from '../../static/icons/slack.png';
import Instagram from '../../static/icons/Logo-Instagram.png';
import Airbnb from '../../static/icons/airbnb-logo.png';
import Twitter from '../../static/icons/twitter (1).png';
import Music from '../../static/icons/music-logo.png';
import Circle from '../../static/icons/circles.png';
import Spotify from '../../static/icons/spotify-1.png';
import Apple from '../../static/icons/apple-black.png';
import Facebook from '../../static/icons/facebook-2.png';
import AdobeXd from '../../static/icons/xd-logo.jpg';
import Linkedin from '../../static/icons/linkedin.svg';

const Sponsors = () => {
    
  return (
    <div >
        <div className="main-row">
            <Swiper 
                spaceBetween={2}
                slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <div className="row-bg"></div>
                <SwiperSlide>
                    <div className="rows">
                        <div className="img-row1">
                            <div className="row-icon">
                                <img src={Call} alt="Call-logo" />
                            </div>
                            <div className="row-icon">
                                <img src={Watsapp} alt="Call-logo" />
                            </div>
                        </div>
                        <div className="img-row2">
                            <div className="row-icon">
                                <img src={Twitter} alt="Call-logo" />
                            </div>
                            <div className="row-icon">
                                <img src={Music} alt="Call-logo" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rows">
                        <div className="img-row1">
                        <div className="row-icon">
                                <img src={ReactImg} alt="Call-logo" />
                            </div>
                            <div className="row-icon">
                                <img src={WindowImg} alt="Call-logo" />
                            </div>
                        </div>
                        <div className="img-row2">
                            <div className="row-icon">
                                    <img src={Circle} alt="Call-logo" />
                                </div>
                                <div className="row-icon">
                                    <img src={Spotify} alt="Call-logo" />
                                </div>
                            </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rows">
                        <div className="img-row1">
                            <div className="row-icon">
                                <img src={Tinder} alt="Call-logo" />
                            </div>
                            <div className="row-icon">
                                <img src={Slack} alt="Call-logo" />
                            </div>
                        </div>
                        <div className="img-row2">
                            <div className="row-icon">
                                    <img src={Apple} alt="Call-logo" />
                                </div>
                                <div className="row-icon">
                                    <img src={Facebook} alt="Call-logo" />
                                </div>
                            </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rows">
                        <div className="img-row1">
                            <div className="row-icon">
                                <img src={Instagram} alt="Call-logo" />
                            </div>
                            <div className="row-icon">
                                <img src={Airbnb} alt="Call-logo" />
                            </div>
                        </div>
                        <div className="img-row2">
                            <div className="row-icon">
                                    <img src={AdobeXd} alt="Call-logo" />
                                </div>
                                <div className="row-icon">
                                    <img src={Linkedin} alt="Call-logo" />
                                </div>
                            </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default Sponsors