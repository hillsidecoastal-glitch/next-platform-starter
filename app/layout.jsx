import '../styles/globals.css';
import Script from 'next/script';

export const metadata = {
    title: 'HyperScale SEO — AI-Driven SEO at Scale',
    description: 'Scale your organic traffic with AI-driven SEO. Get started with the AI SEO Kickstart package.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <Script
                    src="https://www.paypal.com/sdk/js?client-id=BAA-8dx4tWet-ihYkm-IDEnAdtpL1Gqe074mEijnhGpifZnN_k_hd37mJfJUqB5r5MxeXZRl7mSOZlmw_E&components=hosted-buttons&enable-funding=venmo&currency=USD"
                    strategy="afterInteractive"
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
