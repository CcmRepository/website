'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    const whatsappNumber = '+6282121955954'; // Contact Number
    const message = 'Hello, I would like to inquire about your services.';
    const coordinates = [-6.388089210990726, 106.7204536860578]; // PT Cikal Citra Mapan

    const showMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}&travelmode=driving`;
        window.open(url, '_blank');
    };

    return (
        <footer className="bg-brand text-white">
            <div className="mx-auto max-w-[75rem] px-5 py-12 sm:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-poppins text-lg font-semibold">PT Cikal Citra Mapan</h3>
                        <p className="mt-3 font-montserrat text-sm font-light leading-6 text-white/80">
                            Premium furniture &amp; interior solutions.
                            <br />
                            Crafted with quality, precision, and passion.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-poppins text-lg font-semibold">Contact Us</h3>
                        <ul className="mt-3 flex flex-col gap-2 font-montserrat text-sm text-white/80">
                            <li>📍 Gunung Sindur, Bogor Regency, West Java, Indonesia</li>
                            <li>📧 mapansapa@gmail.com</li>
                            <li>📞 +62 821-2195-5954</li>
                        </ul>
                        <button
                            type="button"
                            onClick={showMaps}
                            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2 font-montserrat text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            📍 Get Directions
                        </button>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h3 className="font-poppins text-lg font-semibold">Get in Touch</h3>
                        <p className="mt-3 font-montserrat text-sm text-white/80">
                            Have a project in mind? Chat with us directly.
                        </p>
                        <a
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 font-montserrat text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaWhatsapp size={20} color="#fff" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/15 pt-6 text-center font-montserrat text-sm text-white/50">
                    © {new Date().getFullYear()} PT Cikal Citra Mapan. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
