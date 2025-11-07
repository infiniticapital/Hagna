import { useState } from 'react';
import { Calculator, Package, Ship, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CostCalculator() {
  const { t } = useLanguage();
  const [productValue, setProductValue] = useState<number>(10000);
  const [weight, setWeight] = useState<number>(1000);
  const [incoterm, setIncoterm] = useState<string>('FOB');

  const calculateCosts = () => {
    const baseFreight = weight * 0.8;
    const insurance = productValue * 0.015;
    const inspection = 500;
    const customs = productValue * 0.05;
    const hargnaFee = productValue * 0.03;

    let total = productValue;

    if (incoterm === 'EXW') {
      total += baseFreight + insurance + inspection + customs + hargnaFee;
    } else if (incoterm === 'FOB') {
      total += baseFreight + insurance + inspection + customs + hargnaFee * 0.7;
    } else if (incoterm === 'CIF') {
      total += inspection + customs + hargnaFee * 0.5;
    } else if (incoterm === 'DDP') {
      total += hargnaFee * 0.3;
    }

    return {
      product: productValue,
      freight: incoterm === 'EXW' || incoterm === 'FOB' ? baseFreight : 0,
      insurance: incoterm === 'EXW' || incoterm === 'FOB' ? insurance : 0,
      inspection,
      customs: incoterm === 'DDP' ? 0 : customs,
      hargnaFee: incoterm === 'EXW' ? hargnaFee : incoterm === 'FOB' ? hargnaFee * 0.7 : incoterm === 'CIF' ? hargnaFee * 0.5 : hargnaFee * 0.3,
      total
    };
  };

  const costs = calculateCosts();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Calculator className="w-8 h-8 text-red-700" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Costos
          </h2>
          <p className="text-xl text-gray-600">
            Estima el costo total de tu importación desde China
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Package className="inline w-4 h-4 mr-2" />
                Valor del Producto (USD)
              </label>
              <input
                type="number"
                value={productValue}
                onChange={(e) => setProductValue(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Ship className="inline w-4 h-4 mr-2" />
                Peso (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Incoterm
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['EXW', 'FOB', 'CIF', 'DDP'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setIncoterm(term)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      incoterm === term
                        ? 'bg-red-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Desglose de Costos</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Valor del producto</span>
                <span className="font-semibold text-gray-900">${costs.product.toLocaleString()}</span>
              </div>
              {costs.freight > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Flete marítimo</span>
                  <span className="font-semibold text-gray-900">${costs.freight.toLocaleString()}</span>
                </div>
              )}
              {costs.insurance > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Seguro</span>
                  <span className="font-semibold text-gray-900">${costs.insurance.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Inspección de calidad</span>
                <span className="font-semibold text-gray-900">${costs.inspection.toLocaleString()}</span>
              </div>
              {costs.customs > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aduanas e impuestos</span>
                  <span className="font-semibold text-gray-900">${costs.customs.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Servicios Hargna</span>
                <span className="font-semibold text-gray-900">${costs.hargnaFee.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Costo Total Estimado</span>
                <span className="text-2xl font-bold text-red-700">${costs.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Esta es una estimación. Los costos reales pueden variar según el tipo de producto,
              regulaciones específicas y fluctuaciones del mercado. Contáctanos para una cotización precisa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
