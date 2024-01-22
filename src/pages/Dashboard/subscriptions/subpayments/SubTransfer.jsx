import React from 'react';
import logo from '../../../../static/images/nxg-logo.png';
import arrow from '../../../../static/wallet-card-icons/import-export.svg';

function SubTransfer() {
  return (
    <div className='sub-pay-side'>
        <div className="sub-pay-logo-section">
            <div className="sub-pay-logo">
                <img src={logo} alt="Nxg-logo" />
            </div>
            <p>Pay <span>$ 70</span></p>
        </div>
        <div className="sub-trans-section">
            <div className="sub-trans-logo-section">
                <div className="sub-trans-logo">
                    <img src={arrow} alt="import-logo" />
                </div>
                <p>Bank transfer</p>
            </div>
            <div className="sub-trans-contents">
                <div className="sub-bank-name">
                    <h5>Bank Name</h5>
                    <p>Guarantee Trust Bank</p>
                </div>
                <div className="sub-bank-name">
                    <h5>Account Number</h5>
                    <p>0001234678499</p>
                </div>
                <div className="sub-bank-name">
                    <h5>Amount</h5>
                    <p>$ 70</p>
                </div>
            </div>
            <div className="sub-trans-info">
                <p>Use this account details for the purpose of this transaction <span>ONLY</span></p>
            </div>
        </div>
    </div>
  )
}

export default SubTransfer