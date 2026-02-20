import { PayPalButton } from 'components/paypal-button';

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        title: 'AI-Powered Analysis',
        description: 'Deep-learning models scan your site and competitors to find untapped keyword opportunities.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
        ),
        title: 'Traffic Growth Engine',
        description: 'Automated content strategies that compound your organic traffic month over month.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        title: 'Technical SEO Audit',
        description: 'Comprehensive crawl diagnostics, Core Web Vitals tracking, and schema markup validation.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 9.749c0 .243-.011.484-.034.724M18.157 7.582A8.959 8.959 0 003.034 10.473m15.123-2.891A8.959 8.959 0 0121 9.75c0 5.592-3.824 10.29-9 11.623-5.176-1.332-9-6.03-9-11.622a8.959 8.959 0 01.034-.724" />
            </svg>
        ),
        title: 'Global Rank Tracking',
        description: 'Monitor your rankings across 50,000+ locations with daily precision updates.',
    },
];

const checklist = [
    'Full site audit & keyword gap analysis',
    'AI-generated content strategy (30-day plan)',
    'Technical SEO fixes & implementation guide',
    'Competitor backlink analysis',
    'Core Web Vitals optimization report',
    'One 30-minute strategy call',
];

export default function Page() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 bg-grid bg-radial-glow pointer-events-none" />

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
                <div className="text-xl font-bold tracking-tight">
                    <span className="neon-text">Hyper</span>
                    <span className="text-white">Scale</span>
                    <span className="ml-1 text-sm font-medium text-white/50">SEO</span>
                </div>
                <a href="#pricing" className="btn-neon" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
                    Get Started
                </a>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium rounded-full glass" style={{ color: 'var(--color-neon)' }}>
                    <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                    AI-Powered SEO Platform
                </div>
                <h1 className="max-w-4xl gradient-text">
                    Scale Your Organic Traffic with AI-Driven SEO
                </h1>
                <p className="max-w-2xl mt-6 text-lg leading-relaxed text-white/60">
                    HyperScale SEO uses cutting-edge machine learning to analyze, optimize, and scale your
                    search engine performance — so you can focus on growing your business.
                </p>
                <div className="flex flex-col items-center gap-4 mt-10 sm:flex-row">
                    <a href="#pricing" className="btn-neon">
                        Start Your AI SEO Kickstart
                    </a>
                    <span className="text-sm text-white/40">No subscriptions. One-time package.</span>
                </div>

                {/* Stats bar */}
                <div className="grid max-w-3xl grid-cols-3 gap-6 p-6 mx-auto mt-20 glass sm:gap-12 sm:p-8">
                    <div className="text-center">
                        <div className="text-2xl font-bold neon-text sm:text-3xl">10x</div>
                        <div className="mt-1 text-xs text-white/50 sm:text-sm">Avg. Traffic Increase</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white sm:text-3xl">5,000+</div>
                        <div className="mt-1 text-xs text-white/50 sm:text-sm">Sites Optimized</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white sm:text-3xl">98%</div>
                        <div className="mt-1 text-xs text-white/50 sm:text-sm">Client Satisfaction</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 max-w-6xl px-6 py-20 mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="gradient-text">Everything You Need to Dominate Search</h2>
                    <p className="max-w-xl mx-auto mt-4 text-white/50">
                        Our AI engine handles the heavy lifting so you can focus on what matters — growing your business.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    {features.map((feature) => (
                        <div key={feature.title} className="p-6 transition-all duration-300 glass hover:neon-glow sm:p-8">
                            <div className="feature-icon mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-white">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 max-w-6xl px-6 py-20 mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="gradient-text">Get Started Today</h2>
                    <p className="max-w-xl mx-auto mt-4 text-white/50">
                        One package. Everything you need. No recurring fees.
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    <div className="relative p-8 glass-strong neon-glow sm:p-10">
                        {/* Badge */}
                        <div
                            className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                            style={{ background: 'linear-gradient(135deg, var(--color-neon), var(--color-neon-dark))', color: '#fff' }}
                        >
                            Most Popular
                        </div>

                        <div className="text-center">
                            <h3 className="mb-1 text-2xl font-bold text-white">AI SEO Kickstart</h3>
                            <p className="text-sm text-white/50">The complete starter package for serious growth</p>
                            <div className="flex items-baseline justify-center gap-1 mt-6 mb-8">
                                <span className="text-5xl font-extrabold neon-text">$29</span>
                                <span className="text-white/40">one-time</span>
                            </div>
                        </div>

                        {/* Checklist */}
                        <ul className="mb-8 space-y-3">
                            {checklist.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                                    <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-neon)' }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="h-px mb-8 bg-white/10" />

                        {/* PayPal Button */}
                        <div className="flex justify-center w-full min-w-0">
                            <PayPalButton />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 mt-20 border-t border-white/5">
                <div className="max-w-6xl px-6 mx-auto text-center">
                    <div className="mb-3 text-sm font-bold tracking-tight">
                        <span className="neon-text">Hyper</span>
                        <span className="text-white">Scale</span>
                        <span className="ml-1 text-xs font-medium text-white/50">SEO</span>
                    </div>
                    <p className="text-xs text-white/30">
                        &copy; {new Date().getFullYear()} HyperScale SEO. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
