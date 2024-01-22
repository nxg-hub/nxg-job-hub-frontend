import React, { useState } from 'react'
import SubPaymentSwitch from './SubPaymentSwitch'
import SubPayCard from './SubPayCard'
import SubTransfer from './SubTransfer';
import SubUssd from './SubUssd';
import SubBank from './SubBank';
import SubQrCode from './SubQrCode';

export const SubPayment = () => {
  const [isToggled, setIsToggled] = useState('card');
  const handleToggleChange = (tab) => {
    setIsToggled(tab)
  }
  return (
    <div className='sub-pay-main'>
      <SubPaymentSwitch isToggled={isToggled} onToggle={handleToggleChange} />
      {isToggled === 'card' &&  <SubPayCard />}
      {isToggled === 'transfer' &&  <SubTransfer />}
      {isToggled === 'ussd' &&  <SubUssd />}
      {isToggled === 'bank' &&  <SubBank />}
      {isToggled === 'qrCode' &&  <SubQrCode />}
    </div>
  )
}
