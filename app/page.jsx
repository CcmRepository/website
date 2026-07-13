'use client';

import styles from '@/app/css/HomePage.module.css';
import Footer from './components/Footer';

const scopeOfWorkData = [
    {
        id: 1,
        name: 'Residential',
        image: '/images/home/residential.jpg'
    },
    {
        id: 2,
        name: 'Office',
        image: '/images/home/office.jpg'
    },
    {
        id: 3,
        name: 'Hospitality',
        image: '/images/home/hospitality.jpg'
    }
];

const offeringsData = [
    {
        id: 1,
        name: 'Customization',
        link: 'Tailored Solutions',
        text: 'We specialize in creating custom furniture pieces that align with your unique preferences and fit seamlessly into your space, ensuring a personalized touch in every design.'
    },
    {
        id: 2,
        name: 'After Sales Service',
        link: 'Support that continues beyond the purchase',
        text: 'Our commitment doesn’t end with delivery. We’re here to ensure you’re completely satisfied with your furniture and interior solutions. Whether it’s assistance with installation, adjustments, or answering any questions you may have, our team is ready to help.'
    },
    {
        id: 3,
        name: 'Affordable Quality',
        link: 'High Quality & Budget-Friendly',
        text: 'We believe that exceptional furniture and interior solutions should be accessible to everyone. Our approach focuses on delivering high standards of craftsmanship while maintaining cost efficiency. By carefully managing resources and streamlining our processes, we ensure our products and services remain competitively priced without sacrificing quality or durability. Whether it’s custom furniture or tailored interior projects, we are committed to offering well-designed, reliable, and affordable solutions that meet your needs and preferences.'
    },
    {
        id: 4,
        name: 'Personalized Service',
        link: 'Tailored & Unique Support',
        text: 'Tailored solutions that meet your unique needs. Our personalized service is more than just creating furniture-it’s about providing solutions that align with your project’s unique needs. Whether it’s sourcing specific products, managing production, or finding an interior professional, offering budget estimates, we are here to help in any way that supports your vision. This approach allows us to offer genuine, flexible assistance.'
    }
];

const portfolioData = [
    { name: 'Hotel Ra Komodo Labuan Bajo' },
    { name: 'Hotel Hilton Bandung' },
    { name: 'Hotel Luxcamp Pangandaran ' },
    { name: 'Hotel Movenpick Carita ' },
    { name: 'Hotel Santika Bekasi Renovasi ' },
    { name: 'Hotel Santika Siligita Bali Renovasi ' },
    { name: 'Hotel Sensa Bandung ' },
    { name: '⁠Villa Nestate Bali-Henk ' },
    { name: '⁠Ceria Montesori School ' },
    { name: 'Furniture Supply for Mining Housing Facilities' },
    { name: 'Capsule Hotel T2 Airport Soekarno Hatta' },
    { name: 'Church at PIK2' }
];

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroTitle}>Discover Our Craftsmanship</div>
                <div className={styles.heroSubTitle}>Custom Designs Made Just for You</div>
                <div className={styles.heroContent}>
                    <div className={styles.centerColumn}>
                        <img className={styles.heroImage} src="/images/home/discover_our_craftmanship.jpg" />
                    </div>
                    <p className={styles.pBlack}>
                        Welcome to PT Cikal Citra Mapan, where we bring your furniture dreams to life with a blend of precision and passion. We're all about crafting quality pieces that match your unique style. Let's work together to create something incredible for your space that really reflects your vibe. We're here to help you style your space just the way you like it!
                    </p>
                </div>
            </section>

            {/* About Us */}
            <section className={styles.aboutUsSection}>
                <div className={styles.aboutUsContent}>
                    <div className={styles.aboutUsTitle}>About Us</div>
                    <p className={styles.pBlack}>
                        PT Cikal Citra Mapan, established in 1980, is dedicated to crafting bespoke furniture and interior contracting that reflect your style and vision. Our growth from a humble home industry to a respected furniture manufacturer speaks to our steadfast commitment to quality and craftsmanship.
                    </p>
                    <div className={styles.centerColumn}>
                        <img className={styles.aboutUsImage} src="/images/home/about_us.jpg" />
                    </div>
                </div>
            </section>

            {/* Scope of Work */}
            <section className={styles.scopeOfWorkSection}>
                < div className={styles.scopeOfWorkContent}>
                    <div className={styles.scopeOfWorkTitle}>Scope of Work</div>
                    <div className={styles.gridGroup}>
                        {scopeOfWorkData.map(data => (
                            <div className={styles.gridContent} key={data.id}>
                                <img
                                    src={data.image}
                                    alt={data.name}
                                    className={styles.gridImage}
                                />
                                <div className={styles.gridCaption}>
                                    {data.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Offerings */}
            <section className={styles.ourOfferingsSection}>
                < div className={styles.ourOfferingsContent}>
                    <div className={styles.ourOfferingsTitle}>Our Offerings</div>
                    <div className={styles.offeringGridGroup}>
                        {offeringsData.map(data => (
                            <div className={styles.offeringGridContent} key={data.id}>
                                <div className={styles.gridName}>
                                    {data.name}
                                </div>
                                <div className={styles.gridLink}>
                                    {data.link}
                                </div>
                                <div className={styles.gridText}>
                                    {data.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className={styles.projectPortfolioSection}>
                < div className={styles.projectPortfolioContent}>
                    <div className={styles.projectPortfolioTitle}>Project Portfolio</div>
                    <div className={styles.projectPortfolioDescription}>
                        We have successfully completed numerous projects, and we are eager to provide you with updates for the ongoing year. Keep an eye out for our latest developments and insights!
                    </div>
                    <div className={styles.projectPortfolioSubtitle}>Year 2026 (Ongoing)</div>
                    <ul className={styles.ul}>
                        {portfolioData.map((p, i) => (
                            <li key={i} className={styles.li}>
                                {p.name}
                                {p.status && <span className={styles.span}> ({p.status})</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer />
        </div>
    );
}
