import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scanner } from "./Scanner";

export default function MerchantScanPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800">Scanner un MADEV Pass</h2>
      
      <Card className="max-w-2xl mx-auto shadow-sm">
        <CardHeader className="text-center">
          <CardTitle>Validation de présence</CardTitle>
          <CardDescription>
            Demandez à l'étudiant de présenter son QR Code sur son smartphone et scannez-le pour valider l'avantage et historiser le passage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Scanner />
        </CardContent>
      </Card>
    </div>
  );
}
