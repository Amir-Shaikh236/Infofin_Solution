import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
    const [location] = useLocation();

    useEffect(() => {
        // Snap the window viewport immediately back to the top coordinate on route change
        window.scrollTo(0, 0);
    }, [location]);

    return null; // This component doesn't render any UI; it just handles the browser behavior
}