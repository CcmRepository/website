'use client';

import styles from '@/app/css/Footer.module.css';
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
        <footer className={styles.footer}>
            <div className={styles.gridContent}>
                {/* Company Info */}
                <div>
                    <div className={styles.title}>PT Cikal Citra Mapan</div>
                    <p className={styles.p}>
                        Premium furniture & interior solutions.<br />
                        Crafted with quality, precision, and passion.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <div className={styles.title}>Contact Us</div>
                    <p className={styles.p}>
                        📍 Gunung Sindur, Bogor Regency, West Java, Indonesia<br />
                        📧 mapansapa@gmail.com<br />
                        📞 +62 821-2195-5954
                    </p>
                </div>

                <div className={styles.mapsLocation} onClick={showMaps}>
                    📍 Get Directions
                </div>

                {/* WhatsApp CTA */}
                <div>
                    <div className={styles.title}>Get in Touch</div>
                    <a
                        className={styles.waButton}
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaWhatsapp className={styles.waLogo} size={40} color="#fff" />
                        Chat on WhatsApp
                    </a>

                </div>
            </div>

            <div className={styles.copyrights}>
                © {new Date().getFullYear()} PT Cikal Citra Mapan. All rights reserved.
            </div>
        </footer>
    );
}
