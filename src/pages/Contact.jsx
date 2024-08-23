import React, { useState } from 'react';
import Header from "../components/header/Header";
import { Dialog } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import Footer from "../components/footer/Footer";

const Contact = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = (e) => {
        if (email !== '' && message !== '') {
            setIsOpen(true);
        } else {
            e.preventDefault(); // Prevent form submission only if fields are empty
        }
    };

    return (
        <section className="w-full bg-white">
            <div className="bg-black">
                <Header/>
            </div>

    <div style={{
        position: 'relative',
        background: '#e6e4e4', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="contact-main">
                <h2>SEND A MESSAGE</h2>
                <form
                    onSubmit={sendMessage}
                    name="contact"
                    method="POST"
                    data-netlify="true"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <input
                        type="text"
                        name="fullName"
                        autoComplete='off'
                        placeholder='Your name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="email"
                        name="emailAddress"
                        autoComplete='off'
                        placeholder='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                        name="message"
                        value={message}
                        rows="6"
                        cols="10"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Message'
                    />
                    <button type="submit" className="send-btn">Send</button>
                </form>
                {isOpen && (
                    <Dialog
                        open={isOpen} onClose={() => setIsOpen(false)}
                        style={{ position: 'absolute', left: '40%', top: '35%', transform: 'translate(-50% -50%)', width: '20rem', height: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffffff', border: '0.06rem solid #d9d9d9', borderRadius: '20px' }}
                    >
                        <Dialog.Panel>
                            <Dialog.Title style={{ textAlign: 'center' }}>
                                <div onClick={() => setIsOpen(false)} style={{ color: '#000000', opacity: '0.3', textAlign: 'end', marginTop: '-4rem', cursor: 'pointer' }}>
                                    <AiOutlineClose />
                                </div>
                                <div style={{ marginTop: '3rem' }}>
                                    <p style={{ fontFamily: 'Manrope', fontSize: '26px', fontWeight: '700', color: '#006A90' }}>Message sent!</p>
                                </div>
                            </Dialog.Title>
                        </Dialog.Panel>
                    </Dialog>
                )}
            </div>
        </div>
            <Footer />
        </section>
    );
};

export default Contact;