"use client";

import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { processScan } from "./actions";
import { Button } from "@/components/ui/button";

export function Scanner() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        if (!loading && !result) {
          setLoading(true);
          scannerRef.current?.pause(true);
          
          try {
            const res = await processScan(decodedText);
            if (res.success) {
              setResult({ success: true, message: `Pass valide ! Bienvenue à ${res.studentName}.` });
            } else {
              setResult({ success: false, message: res.error || "Erreur de scan" });
            }
          } catch (error) {
            setResult({ success: false, message: "Une erreur s'est produite." });
          } finally {
            setLoading(false);
          }
        }
      },
      (error) => {
        // Erreurs de scan continuelles ignorées
      }
    );

    return () => {
      scannerRef.current?.clear().catch(console.error);
    };
  }, [loading, result]);

  const resetScanner = () => {
    setResult(null);
    window.location.reload(); // Solution simple et robuste pour réinitialiser le flux vidéo
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-6">
      <div className={result ? "hidden" : "w-full"}>
        <div id="reader" className="w-full rounded-lg overflow-hidden border-2 border-slate-200 bg-black"></div>
      </div>
      
      {result && (
        <div className={`p-6 rounded-lg w-full text-center ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          <h3 className="text-xl font-bold mb-2">{result.success ? "✅ Validé" : "❌ Refusé"}</h3>
          <p className="mb-4">{result.message}</p>
          <Button onClick={resetScanner} variant={result.success ? "default" : "destructive"}>
            Scanner un autre Pass
          </Button>
        </div>
      )}
      {loading && <p className="text-slate-500 animate-pulse font-medium">Validation en cours...</p>}
    </div>
  );
}
