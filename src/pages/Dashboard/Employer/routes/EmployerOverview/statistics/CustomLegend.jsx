import React from 'react';
import { FaSquareFull } from 'react-icons/fa';

export const CustomLegend = (props) =>{
    const {payload} = props;
    const colors = ["rgba(37, 150, 190, 0.1)", "rgba(37, 150, 190, 0.4)", "rgba(37, 150, 190, 1)", "rgba(35, 56, 98, 1)"]
  return (
    <div className='custom-legend'>
        {payload.map((entry, index) => (
            <div style={{display:'flex', alignItems:'start', paddingLeft:'0.3rem'}}>
                <FaSquareFull fontSize={16} color={colors[index]} style={{marginTop:'0.25rem'}}/>
                <p key={`item-${index}`} style={{color:'#000', fontSize:'14px', fontWeight:'400',lineHeight:'20px', marginLeft:'0.3rem'}}>
                    {entry.value}
                </p>
            </div>
        ))}
    </div>
  )
};

export const CustomLegend1 = (props) =>{
    const {payload} = props;
    const colors = ["rgba(37, 150, 190, 0.1)", "rgba(37, 150, 190, 0.4)", "rgba(37, 150, 190, 1)", "rgba(35, 56, 98, 1)"]
  return (
    <div className='custom-legend1'>
        <span style={{color:'#000', fontSize:'17px', fontWeight:'400',lineHeight:'32px' }} >Key - </span>
        {payload.map((entry, index) => (
            <div style={{display:'block', alignItems:'center', marginRight:'0.3rem', marginTop:'-0.2rem', width:'100%', maxWidth:'80px'}}>
                <FaSquareFull fontSize={16} color={colors[index]} />
                <p key={`item-${index}`} style={{color:'#000', fontSize:'14px', fontWeight:'400',lineHeight:'20px', marginTop:'-0.3rem', width:'60%'}}>
                    {entry.value}
                </p>
            </div>
        ))}
    </div>
  )
}
