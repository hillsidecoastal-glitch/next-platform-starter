'use client';

import { useEffect, useRef } from 'react';

export function PayPalButton() {
    const containerRef = useRef(null);
    const renderedRef = useRef(false);

    useEffect(() => {
        if (renderedRef.current) return;

        function renderButton() {
            if (window.paypal && containerRef.current && !renderedRef.current) {
                renderedRef.current = true;
                window.paypal
                    .HostedButtons({
                        hostedButtonId: 'T6GXDKVHN6L88',
                    })
                    .render('#paypal-container-T6GXDKVHN6L88');
            }
        }

        if (window.paypal) {
            renderButton();
        } else {
            const interval = setInterval(() => {
                if (window.paypal) {
                    clearInterval(interval);
                    renderButton();
                }
            }, 200);
            return () => clearInterval(interval);
        }
    }, []);

    return <div id="paypal-container-T6GXDKVHN6L88" ref={containerRef}></div>;
}
