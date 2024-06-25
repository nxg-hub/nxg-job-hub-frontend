import React from 'react'
import './payment.scss'
import { BsThreeDotsVertical } from 'react-icons/bs'
import DefaultLogo from '../../../../static/wallet-card-icons/mastercard-logo.png'

export default function PaymentCard() {
  return (
    <div className='wall-card-main'>
        <div className="wall-card-container">
            <div className="wall-card-logo">
                <img src={DefaultLogo} alt="Card-type-logo" style={{width:'40px', height:'auto'}}/>
                <BsThreeDotsVertical style={{color:'#fff', height:'1.2rem', width:'1.2rem'}}/>
            </div>
            <div className="wall-card-details-section">
                <div className="wall-card-digits">
                    <p>****{" "}****{" "}*****{" "}4567</p>
                </div>
                <div className="wall-card-name-section">
                    <p>Valid 23/24</p>
                    <h4>Sarah Robert</h4>
                </div>
            </div>
        </div>
    </div>
  )
}
