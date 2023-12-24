import React, { useState, useRef, useEffect } from 'react';
import Filter from '../../../static/icons/mi_filter.svg';
import { Dialog } from "@headlessui/react";
import Calendar from '../../../static/icons/cil_calendar.svg'

function getStartOfWeek() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }
  
  function getEndOfWeek() {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }

  function getStartOfPreviousWeek() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() - 7); // Subtract 7 days to get the start of the previous week
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }
  
  function getEndOfPreviousWeek() {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() - now.getDay() - 1); // Subtract 1 day to get the end of the previous week
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }
  

  function formatMonthInWords(date) {
    return new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  }

export default function WalletFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('customize');
    const [inputType, setInputType] = useState('text');
    const [startDateCustomize, setStartDateCustomize] = useState('');
    const [endDateCustomize, setEndDateCustomize] = useState('');
    
    const [startDateCurrent, setStartDateCurrent] = useState(getStartOfWeek());
    const [endDateCurrent, setEndDateCurrent] = useState(getEndOfWeek());
    
    const [startDatePrevious, setStartDatePrevious] = useState(getStartOfPreviousWeek());
    const [endDatePrevious, setEndDatePrevious] = useState(getEndOfPreviousWeek());

    const inputRefs = {
        customize: {
            start: useRef(null),
            end: useRef(null),
        },
        current: {
            start: useRef(null),
            end: useRef(null),
        },
        previous: {
            start: useRef(null),
            end: useRef(null),
        },
    };

    const openFilter = () => {
        setIsOpen(!isOpen)
    }

    const focusInput = (tab, isStartDate) => {
        setActiveTab(tab);
        const ref = isStartDate ? inputRefs[tab].start : inputRefs[tab].end;
        if (ref && ref.current) {
            ref.current.focus();
            if (isStartDate) {
                setInputType('date');
            }
        }
    };

    const clearInput = () => {
        setStartDateCustomize('');
        setEndDateCustomize('');
        setStartDateCurrent(getStartOfWeek());
        setEndDateCurrent(getEndOfWeek());
        setStartDatePrevious(getStartOfPreviousWeek());
        setEndDatePrevious(getEndOfPreviousWeek());
        setInputType('text');
        
    };

    useEffect(() => {
        if (activeTab === 'current') {
          setStartDateCurrent(getStartOfWeek());
          setEndDateCurrent(getEndOfWeek());
        } else if (activeTab === 'previous') {
            setStartDatePrevious(getStartOfPreviousWeek());
            setEndDatePrevious(getEndOfPreviousWeek());
        }
      }, [activeTab]);

    return (
        <div>
            <img src={Filter} alt="Filter-Icon" onClick={openFilter}/>
            {isOpen && (
                <Dialog
                    open={isOpen} onClose={() => setIsOpen(false)}
                    className='wallet-modal'
                >
                    <Dialog.Panel>
                        <div className="filter-close">
                            <h3>Filter</h3>
                            <p onClick={openFilter}>X</p>
                        </div>
                        <Dialog.Title>
                           <div className="customize-container">
                                <ul>
                                    <li className="customize"> 
                                        <a href='#customize' className={activeTab === 'customize' ? 'active' : ''} onClick={() => focusInput('customize')}>Customize Period</a>
                                    </li>
                                    <li className="customize">
                                        <a href='#current' className={activeTab === 'current' ? 'active' : ''} onClick={() => focusInput('current')}>Current Week</a>
                                    </li>
                                    <li className="customize">
                                        <a href='#previous' className={activeTab === 'previous' ? 'active' : ''} onClick={() => focusInput('previous')}>Previous Week</a>
                                    </li>
                                </ul>
                           </div>
                        </Dialog.Title>
                        <Dialog.Description>
                            <section className="filter-tabs">
                                <div id="customize" style={{ display: activeTab === 'customize' ? 'block' : 'none' }}>
                                    <div className="customize-date">
                                        <input 
                                            ref={inputRefs.customize.start}
                                            type={inputType}
                                            name="calendar" 
                                            id="start-date-customize" 
                                            placeholder='Start Date' 
                                            onFocus={() => setInputType('date')}
                                            value={startDateCustomize}
                                            onChange={(e) => setStartDateCustomize(e.target.value)}
                                        />
                                        <img src={Calendar} alt="Calendar-Icon" onClick={() => focusInput('customize', true)}/>
                                    </div>
                                    <div className="customize-date">
                                        <input 
                                            ref={inputRefs.customize.end}
                                            type={inputType}
                                            name="calendar" 
                                            id="end-date-customize" 
                                            placeholder='End Date' 
                                            onFocus={() => setInputType('date')}
                                            value={endDateCustomize}
                                            onChange={(e) => setEndDateCustomize(e.target.value)}
                                        />
                                        <img src={Calendar} alt="Calendar-Icon" onClick={() => focusInput('customize', false)}/>
                                    </div>
                                </div>
                                <div id="current" style={{ display: activeTab === 'current' ? 'block' : 'none' }}>
                                    <div className="customize-date">
                                        <input 
                                            ref={inputRefs.current.start}
                                            type={inputType}
                                            name="calendar" 
                                            id="start-date-current" 
                                            placeholder={`Start Date (${formatMonthInWords(startDateCurrent)})`}
                                            onFocus={() => setInputType('date')}
                                            value={startDateCurrent.toISOString().split('T')[0]}
                                            onChange={(e) => setStartDateCurrent(e.target.value)}
                                        />
                                        <img src={Calendar} alt="Calendar-Icon" onClick={() => focusInput('current', true)}/>
                                    </div>
                                    <div className="customize-date">
                                        <input 
                                            ref={inputRefs.current.end}
                                            type={inputType}
                                            name="calendar" 
                                            id="end-date-current" 
                                            placeholder={`End Date (${formatMonthInWords(endDateCurrent)})`}
                                            onFocus={() => setInputType('date')}
                                            value={endDateCurrent.toISOString().split('T')[0]}
                                            onChange={(e) => setEndDateCurrent(e.target.value)}
                                        />
                                        <img src={Calendar} alt="Calendar-Icon" onClick={() => focusInput('current', false)}/>
                                    </div>
                                </div>
                                <div id="previous" style={{ display: activeTab === 'previous' ? 'block' : 'none' }}>
                                    <div className="customize-date">
                                        <input 
                                            ref={inputRefs.previous.start}
                                            type={inputType}
                                            name="calendar" 
                                            id="start-date-previous" 
                                            placeholder={`Start Date (${formatMonthInWords(startDatePrevious)})`}
                                            onFocus={() => setInputType('date')}
                                            value={startDatePrevious.toISOString().split('T')[0]}
                                            onChange={(e) => setStartDatePrevious(e.target.value)}
                                        />
                                        <img src={Calendar} alt="Calendar-Icon" onClick={() => focusInput('previous', true)}/>
                                    </div>
                                    <div className="customize-date">
                                        <input 
                                            ref={inputRefs.previous.end}
                                            type={inputType}
                                            name="calendar" 
                                            id="end-date-previous" 
                                            placeholder={`End Date (${formatMonthInWords(endDatePrevious)})`}
                                            onFocus={() => setInputType('date')}
                                            value={endDatePrevious.toISOString().split('T')[0]}
                                            onChange={(e) => setEndDatePrevious(e.target.value)}
                                        />
                                        <img src={Calendar} alt="Calendar-Icon" onClick={() => focusInput('previous', false)}/>
                                    </div>
                                </div>
                            </section>
                        </Dialog.Description>
                        <div className="filter-btns">
                            <button className='clear-btn' onClick={clearInput}>Clear All</button>
                            <button>Apply</button>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    )
}
