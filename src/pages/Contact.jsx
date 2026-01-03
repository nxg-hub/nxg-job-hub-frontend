import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = (e) => {
    if (!email || !message) {
      e.preventDefault();
      return;
    }
    setIsOpen(true);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Send a Message
        </h2>

        <form
          onSubmit={sendMessage}
          name="contact"
          method="POST"
          data-netlify="true"
          className="space-y-5">
          <input type="hidden" name="form-name" value="contact" />

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A90]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A90]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#006A90]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#006A90] hover:bg-[#005474] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md">
            Send Message
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <Dialog.Panel className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-8">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
            <AiOutlineClose size={22} />
          </button>

          <Dialog.Title className="text-center">
            <p className="text-2xl font-bold text-[#006A90] mt-4">
              Message Sent!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              We’ll get back to you as soon as possible.
            </p>
          </Dialog.Title>
        </Dialog.Panel>
      </Dialog>
    </section>
  );
};

export default Contact;
