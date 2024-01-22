import React from 'react';
import logo from '../../../../static/images/nxg-logo.png';
import qrCode from '../../../../static/wallet-card-icons/qr-code-1.svg'

export default function SubQrCode() {
  return (
    <div className='sub-pay-side'>
        <div className="sub-pay-logo-section">
            <div className="sub-pay-logo">
                <img src={logo} alt="Nxg-logo" />
            </div>
        </div>
        <div className="sub-qr-section">
            <div className="sub-qr-icon">
                <img src={qrCode} alt="QR-Code Icon" />
            </div>
        </div>
    </div>
  )
}
