import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, X, RefreshCw } from 'lucide-react';

interface RFQ {
  id: number;
  company: string;
  name: string;
  email: string;
  phone: string;
  products: string;
  specifications: string;
  quantity: string;
  destination: string;
  incoterm: string;
  timeline: string;
  inspection_required: boolean;
  consolidation_needed: boolean;
  translation_needed: boolean;
  additional: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRfq, setSelectedRfq] = useState<RFQ | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = 'hargna2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadRfqs();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const loadRfqs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rfq_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRfqs(data || []);
    } catch (error) {
      console.error('Error loading RFQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRfqs();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Dashboard
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent mb-4"
            />
            <button
              type="submit"
              className="w-full bg-red-700 text-white px-4 py-3 rounded-lg hover:bg-red-800 transition-all font-semibold"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              RFQs Recibidos ({rfqs.length})
            </h1>
            <button
              onClick={loadRfqs}
              disabled={loading}
              className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {rfqs.map((rfq) => (
              <div
                key={rfq.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedRfq(rfq)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-red-700" />
                      <h3 className="text-xl font-bold text-gray-900">
                        {rfq.company}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-2">{rfq.products}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{rfq.name}</span>
                      <span>•</span>
                      <span>{rfq.email}</span>
                      <span>•</span>
                      <span>{rfq.phone}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(rfq.created_at).toLocaleDateString('es-DO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRfq && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-red-700 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedRfq.company}</h2>
                <button
                  onClick={() => setSelectedRfq(null)}
                  className="text-white hover:bg-red-800 p-2 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Información del Cliente</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Nombre:</strong> {selectedRfq.name}</p>
                      <p><strong>Email:</strong> <a href={`mailto:${selectedRfq.email}`} className="text-red-700 hover:underline">{selectedRfq.email}</a></p>
                      <p><strong>Teléfono:</strong> <a href={`tel:${selectedRfq.phone}`} className="text-red-700 hover:underline">{selectedRfq.phone}</a></p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Detalles del Pedido</h3>
                    <div className="space-y-2 text-gray-700">
                      {selectedRfq.quantity && <p><strong>Cantidad:</strong> {selectedRfq.quantity}</p>}
                      {selectedRfq.destination && <p><strong>Destino:</strong> {selectedRfq.destination}</p>}
                      {selectedRfq.incoterm && <p><strong>Incoterm:</strong> {selectedRfq.incoterm}</p>}
                      {selectedRfq.timeline && <p><strong>Plazo:</strong> {selectedRfq.timeline}</p>}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Productos/Equipos</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRfq.products}</p>
                </div>

                {selectedRfq.specifications && (
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-2">Especificaciones Técnicas</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRfq.specifications}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Servicios Adicionales</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>✓ Inspección en origen: {selectedRfq.inspection_required ? 'Sí' : 'No'}</p>
                    <p>✓ Consolidación: {selectedRfq.consolidation_needed ? 'Sí' : 'No'}</p>
                    <p>✓ Traducción técnica: {selectedRfq.translation_needed ? 'Sí' : 'No'}</p>
                  </div>
                </div>

                {selectedRfq.additional && (
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-2">Información Adicional</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRfq.additional}</p>
                  </div>
                )}

                <div className="text-sm text-gray-500 pt-4 border-t">
                  <p>Recibido: {new Date(selectedRfq.created_at).toLocaleString('es-DO')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
