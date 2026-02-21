import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
    onScanSuccess: (decodedText: string) => void;
}

export const BarcodeScanner = ({ onScanSuccess }: BarcodeScannerProps) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Initialize scanner
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                // To prevent multiple scans firing rapidly
                if (scannerRef.current) {
                    scannerRef.current.clear();
                }
                onScanSuccess(decodedText);
            },
            () => {
                // Ignore scanning errors (often just "no code found" frame by frame)
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode scanner", error);
                });
            }
        };
    }, [onScanSuccess]);

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden rounded-3xl border-4 border-emerald-500/20 bg-zinc-900 shadow-xl">
            <div id="reader" className="w-full text-zinc-900"></div>
            <style>{`
                #reader button {
                    background-color: #10b981 !important;
                    color: white !important;
                    border: none !important;
                    padding: 8px 16px !important;
                    border-radius: 8px !important;
                    font-weight: 600 !important;
                    margin-top: 10px !important;
                    cursor: pointer;
                }
                #reader a {
                    color: #10b981 !important;
                }
                #reader__scan_region {
                    background: #18181b !important;
                }
            `}</style>
        </div>
    );
};
