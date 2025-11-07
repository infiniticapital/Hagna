import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

interface RFQData {
  company: string;
  name: string;
  email: string;
  phone: string;
  products: string;
  specifications?: string;
  quantity?: string;
  destination?: string;
  incoterm?: string;
  timeline?: string;
  inspection_required?: boolean;
  consolidation_needed?: boolean;
  translation_needed?: boolean;
  additional?: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log('Resend API key not configured. Email would be sent to:', to);
    return { success: true, message: 'Email simulation (no API key)' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Hargna Limited <noreply@hargna.com>',
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  const data = await response.json();
  return { success: response.ok, data };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const rfqData: RFQData = await req.json();

    const emailToHargnaHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #b91c1c; color: white; padding: 20px; text-align: center; }
    .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #b91c1c; }
    .section h3 { margin-top: 0; color: #b91c1c; }
    .field { margin: 10px 0; }
    .field strong { color: #374151; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nueva Solicitud de Cotización (RFQ)</h1>
    </div>

    <div class="section">
      <h3>Información del Cliente</h3>
      <div class="field"><strong>Empresa:</strong> ${rfqData.company}</div>
      <div class="field"><strong>Nombre:</strong> ${rfqData.name}</div>
      <div class="field"><strong>Email:</strong> <a href="mailto:${rfqData.email}">${rfqData.email}</a></div>
      <div class="field"><strong>Teléfono:</strong> ${rfqData.phone}</div>
    </div>

    <div class="section">
      <h3>Detalles de la Solicitud</h3>
      <div class="field"><strong>Productos/Equipos:</strong> ${rfqData.products}</div>
      ${rfqData.specifications ? `<div class="field"><strong>Especificaciones:</strong> ${rfqData.specifications}</div>` : ''}
      ${rfqData.quantity ? `<div class="field"><strong>Cantidad:</strong> ${rfqData.quantity}</div>` : ''}
      ${rfqData.destination ? `<div class="field"><strong>Destino:</strong> ${rfqData.destination}</div>` : ''}
      ${rfqData.incoterm ? `<div class="field"><strong>Incoterm:</strong> ${rfqData.incoterm}</div>` : ''}
      ${rfqData.timeline ? `<div class="field"><strong>Plazo:</strong> ${rfqData.timeline}</div>` : ''}
    </div>

    <div class="section">
      <h3>Servicios Adicionales</h3>
      <div class="field">✓ Inspección en origen: ${rfqData.inspection_required ? 'Sí' : 'No'}</div>
      <div class="field">✓ Consolidación: ${rfqData.consolidation_needed ? 'Sí' : 'No'}</div>
      <div class="field">✓ Traducción técnica: ${rfqData.translation_needed ? 'Sí' : 'No'}</div>
    </div>

    ${rfqData.additional ? `
    <div class="section">
      <h3>Información Adicional</h3>
      <p>${rfqData.additional}</p>
    </div>
    ` : ''}

    <div class="footer">
      <p>Recibido: ${new Date().toLocaleString('es-DO', { timeZone: 'America/Santo_Domingo' })}</p>
      <p>Hargna Limited | Hong Kong SAR | República Dominicana</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailToClientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #b91c1c; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #ffffff; }
    .highlight { background: #f9fafb; padding: 15px; border-left: 4px solid #b91c1c; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hemos recibido su solicitud</h1>
    </div>

    <div class="content">
      <p>Estimado/a <strong>${rfqData.name}</strong>,</p>

      <p>Hemos recibido su solicitud de cotización para:</p>
      <p><strong>${rfqData.products}</strong></p>

      <p>Nuestro equipo está revisando su requerimiento y nos contactaremos con usted en las próximas <strong>24-48 horas</strong> con opciones verificadas.</p>

      <div class="highlight">
        <h3 style="margin-top: 0; color: #b91c1c;">Resumen de su solicitud</h3>
        <p><strong>Empresa:</strong> ${rfqData.company}</p>
        <p><strong>Productos:</strong> ${rfqData.products}</p>
        ${rfqData.destination ? `<p><strong>Destino:</strong> ${rfqData.destination}</p>` : ''}
        ${rfqData.incoterm ? `<p><strong>Incoterm:</strong> ${rfqData.incoterm}</p>` : ''}
      </div>

      <p>Mientras tanto, si tiene alguna pregunta urgente, puede contactarnos:</p>
      <p>📧 <a href="mailto:info@hargna.com">info@hargna.com</a><br>
      📱 WhatsApp: [Agregar número]</p>

      <p>Gracias por confiar en Hargna Limited.</p>
    </div>

    <div class="footer">
      <p><strong>Hargna Limited</strong></p>
      <p>Hong Kong SAR | República Dominicana</p>
      <p><a href="https://www.hargna.com">www.hargna.com</a></p>
    </div>
  </div>
</body>
</html>
    `;

    const results = await Promise.allSettled([
      sendEmail(
        'info@hargna.com',
        `Nueva RFQ de ${rfqData.company} - ${rfqData.products.substring(0, 50)}`,
        emailToHargnaHtml
      ),
      sendEmail(
        rfqData.email,
        'Hemos recibido su solicitud - Hargna Limited',
        emailToClientHtml
      ),
    ]);

    console.log('Email results:', results);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notifications sent',
        results: results.map(r => r.status === 'fulfilled' ? r.value : { success: false, error: r.reason })
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing RFQ notification:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
