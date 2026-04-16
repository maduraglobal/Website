'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Calendar,
  Award,
  Map as MapIcon,
  Globe
} from 'lucide-react';

export default function CorporateOffice() {
  const officeInfo = [
    { icon: <Calendar className="w-5 h-5" />, label: "Established", value: "1986" },
    { icon: <Award className="w-5 h-5" />, label: "Experience", value: "40+ Years" },
    { icon: <Globe className="w-5 h-5" />, label: "Services", value: "Travel, Visa, Tours, Corporate Travel" }
  ];

  return (
    <section className="py-8 md:py-12 bg-gray-50 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row min-h-[480px]"
        >
          {/* Left Section: Details */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-[#ee2229] rounded-full text-[12px] font-bold tracking-widest mb-4">
              <Building2 className="w-4 h-4" />
              Our Headquarters
            </div>

            <h2 className="text-[28px] md:text-[36px] text-[#191974] leading-tight mb-3">
              Corporate Office
            </h2>

            <div className="space-y-4 mt-2">
              {/* Company Identity */}
              <div>
                <h3 className="text-[20px] font-bold text-[#191974] mb-2 ">
                  Madura Travel Service (P) Ltd
                </h3>
                <div className="flex items-start gap-4 text-gray-600">
                  <MapPin className="w-6 h-6 text-[#ee2229] shrink-0 mt-1" />
                  <p className="text-[16px] leading-relaxed ">
                    25-3, Gandhi Irwin Road, Egmore,<br />
                    Chennai, Tamil Nadu - 600008, India
                  </p>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="tel:+91 9092949494" className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#191974] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#ee2229] group-hover:bg-[#191974] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-400  tracking-wider">Telephone</p>
                    <p className="font-bold text-[#191974]">+91 9092949494</p>
                  </div>
                </a>

                <a href="https://wa.me/919092949494" className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#191974] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-400  tracking-wider">WhatsApp</p>
                    <p className="font-bold text-[#191974]">+91 9092949494</p>
                  </div>
                </a>

                <a href="mailto:mail@maduratravel.com" className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#191974] transition-all md:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-500 group-hover:bg-[#191974] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-400  tracking-wider">Email Address</p>
                    <p className="font-bold text-[#191974]">mail@maduratravel.com</p>
                  </div>
                </a>
              </div>

              {/* Office Stats */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                {officeInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-[#ee2229]">
                      {info.icon}
                    </div>
                    <div className="text-[14px]">
                      <span className="font-bold text-[#191974]">{info.label}:</span>{' '}
                      <span className="text-gray-600 ">{info.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Map */}
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.435777478051!2d80.25732107507823!3d13.077943287247334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526610360a7ed3%3A0xe54e6ff1fb9971eb!2sGandhi%20Irwin%20Rd%2C%20Egmore%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1712557900000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale contrast-125 opacity-90 transition-all hover:filter-none"
                title="Office Location"
              ></iframe>
            </div>

            {/* Map Overlay Button */}
            <div className="absolute bottom-6 right-6">
              <a
                href="https://goo.gl/maps/R8z3hREgmoreExample"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#191974] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#ee2229] transition-all group active:scale-95"
              >
                <MapIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Open in Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
