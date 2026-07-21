'use client';

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
        <div className="max-w-[100vw] mx-auto">
            {/* Hero Section */}
            <section className="flex flex-col items-center bg-cream">
                <div className="font-poppins text-[2rem] font-medium text-center text-brand mt-8">Discover Our Craftsmanship</div>
                <div className="font-poppins text-xl text-center text-ink">Custom Designs Made Just for You</div>
                <div className="my-3 mx-12">
                    <div className="flex justify-center my-8">
                        <img className="rounded-xl w-[65%] h-auto" src="/images/home/discover_our_craftmanship.jpg" />
                    </div>
                    <p className="text-ink font-montserrat text-base leading-6 text-justify hyphens-auto">
                        Welcome to PT Cikal Citra Mapan, where we bring your furniture dreams to life with a blend of precision and passion. We're all about crafting quality pieces that match your unique style. Let's work together to create something incredible for your space that really reflects your vibe. We're here to help you style your space just the way you like it!
                    </p>
                </div>
            </section>

            {/* About Us */}
            <section className="flex flex-col bg-cream">
                <div className="my-3 mx-12">
                    <div className="py-2 font-poppins text-[1.75rem] text-ink">About Us</div>
                    <p className="text-ink font-montserrat text-base leading-6 text-justify hyphens-auto">
                        PT Cikal Citra Mapan, established in 1980, is dedicated to crafting bespoke furniture and interior contracting that reflect your style and vision. Our growth from a humble home industry to a respected furniture manufacturer speaks to our steadfast commitment to quality and craftsmanship.
                    </p>
                    <div className="flex justify-center my-8">
                        <img className="rounded-xl w-full h-auto" src="/images/home/about_us.jpg" />
                    </div>
                </div>
            </section>

            {/* Scope of Work */}
            <section className="flex flex-col bg-cream">
                <div className="my-3 mx-12">
                    <div className="py-2 font-poppins text-[1.75rem] text-ink">Scope of Work</div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-8 mt-4">
                        {scopeOfWorkData.map(data => (
                            <div className="rounded-xl overflow-hidden bg-brand" key={data.id}>
                                <img
                                    src={data.image}
                                    alt={data.name}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="px-3 py-2 font-poppins text-base font-semibold text-white">
                                    {data.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Offerings */}
            <section className="flex flex-col bg-cream">
                <div className="my-3 mx-12">
                    <div className="py-2 font-poppins text-[1.75rem] text-ink">Our Offerings</div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-8 mt-4">
                        {offeringsData.map(data => (
                            <div className="rounded-2xl bg-textbox overflow-hidden" key={data.id}>
                                <div className="px-4 py-2 font-poppins text-xl font-medium text-ink">
                                    {data.name}
                                </div>
                                <div className="px-4 py-2 font-poppins text-base italic text-ink">
                                    {data.link}
                                </div>
                                <div className="px-4 py-2 text-ink font-montserrat text-base leading-6 text-justify hyphens-auto">
                                    {data.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className="flex flex-col bg-cream">
                <div className="my-3 mx-12">
                    <div className="py-2 font-poppins text-[1.75rem] text-ink">Project Portfolio</div>
                    <div className="text-ink font-montserrat text-base leading-6 text-justify hyphens-auto">
                        We have successfully completed numerous projects, and we are eager to provide you with updates for the ongoing year. Keep an eye out for our latest developments and insights!
                    </div>
                    <div className="pt-4 font-poppins text-base font-medium text-ink leading-7">Year 2026 (Ongoing)</div>
                    <ul className="list-disc pl-5">
                        {portfolioData.map((p, i) => (
                            <li key={i} className="pl-2 text-ink font-montserrat text-base leading-6">
                                {p.name}
                                {p.status && <span className="text-[#008000] font-montserrat text-base leading-6"> ({p.status})</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer />
        </div>
    );
}
