import React from 'react';
import logo from '../../../../static/images/nxg-logo.png';

export default function SubPayCard() {
  return (
    <div className='sub-pay-side'>
        <div className="sub-pay-logo-section">
            <div className="sub-pay-logo">
                <img src={logo} alt="Nxg-logo" />
            </div>
            <p>Pay <span>$ 70</span></p>
        </div>
        <div className="sub-pay-card-section">
            <form>
                <div className="card-numb">
                    <label htmlFor="">Card Number</label>
                    <input type="number" placeholder='0000 0000 0000 0000' />
                </div>
                <div className="cvv-section">
                    <div className="card-date">
                        <label htmlFor="">Card Expiry Date</label>
                        <input type="number" placeholder='MM/YY' />
                    </div>
                    <div className="card-cvv">
                        <label htmlFor="">CVV</label>
                        <input type="number" placeholder='123' />
                    </div>
                </div>
                <div className="sub-pay-btn">
                    <button>Pay $70</button>
                </div>
            </form>
        </div>
    </div>
  )
}
