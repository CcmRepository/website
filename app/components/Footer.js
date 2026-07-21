'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    const whatsappNumber = '+6282121955954'; // Contact Number
    const message = 'Hello, I would like to inquire about your services.';
    const coordinates = [-6.388089210990726, 106.7204536860578]; // PT Cikal Citra Mapan
    const destination = encodeURIComponent('PT Cikal Citra Mapan');

    const showMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}&travelmode=driving`;
        window.open(url, '_blank');
    };

    return (
        <footer className="bg-brand text-white py-10 px-5">
            <div className="flex flex-row flex-wrap justify-between items-start content-start mx-4">
                {/* Company Info */}
                <div>
                    <div className="pt-5 pb-1 font-poppins text-base font-semibold text-white">PT Cikal Citra Mapan</div>
                    <p className="font-poppins text-base font-light text-white">
                        Premium furniture & interior solutions.<br />
                        Crafted with quality, precision, and passion.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <div className="pt-5 pb-1 font-poppins text-base font-semibold text-white">Contact Us</div>
                    <p className="font-poppins text-base font-light text-white">
                        📍 Gunung Sindur, Bogor Regency, West Java, Indonesia<br />
                        📧 mapansapa@gmail.com<br />
                        📞 +62 821-2195-5954
                    </p>
                </div>

                <div
                    className="my-2 py-2 px-4 bg-[#4285F4] text-white border-none rounded-lg cursor-pointer font-semibold"
                    onClick={showMaps}
                >
                    📍 Get Directions
                </div>

                {/* WhatsApp CTA */}
                <div>
                    <div className="pt-5 pb-1 font-poppins text-base font-semibold text-white">Get in Touch</div>
                    <a
                        className="flex flex-row items-center justify-evenly py-2 px-3 text-white bg-[#25D366] rounded-lg font-semibold"
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaWhatsapp className="pr-2" size={40} color="#fff" />
                        Chat on WhatsApp
                    </a>

                </div>
            </div>

            <div className="mt-[1.875rem] pt-5 text-center text-[#8e8e8e] font-poppins text-sm">
                © {new Date().getFullYear()} PT Cikal Citra Mapan. All rights reserved.
            </div>
        </footer>
    );
}
