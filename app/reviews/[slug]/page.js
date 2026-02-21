import { notFound } from 'next/navigation';

async function getAirtableData() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = 'SEO Tools'; 
  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = `https://api.airtable.com/v0/${baseId}/${table}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 10 }, 
    });
    if (!res.ok) return { error: 'API Error' };
    const data = await res.json();
    return { records: data.records || [] };
  } catch (error) {
    return { error: 'Network Error' };
  }
}

export default async function ReviewPage({ params }) {
  // FIX: Safely handles the URL parameter so the server never crashes
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || '';
  const safeSlug = String(rawSlug).trim().toLowerCase();

  const data = await getAirtableData();

  if (data.error || !data.records || data.records.length === 0) {
    return (
      <div className="p-10 font-sans max-w-2xl mx-auto mt-10 bg-red-50 border border-red-300 rounded-lg text-red-800">
        <h1 className="text-2xl font-bold mb-2">Airtable Connection Error</h1>
        <p>Could not load data from Airtable. Please check your API Key and Base ID.</p>
      </div>
    );
  }

  // Safe search that won't crash if a field is empty
  const record = data.records.find(r => {
     const nameField = r.fields.toolName || r.fields['Tool Name'] || r.fields['A toolName'] || '';
     const safeName = String(nameField).trim().toLowerCase();
     return safeName === safeSlug;
  });

  // THE DETECTIVE MODE UI
  if (!record) {
     const availableNames = data.records.map(r => r.fields.toolName || r.fields['Tool Name'] || r.fields['A toolName'] || 'EmptyRow').join(', ');
     return (
       <div className="p-10 font-sans max-w-3xl mx-auto mt-10 bg-yellow-50 border border-yellow-300 rounded-lg text-slate-800">
         <h1 className="text-2xl font-bold text-yellow-700 mb-4">Detective Mode: Tool Not Found</h1>
         <p className="text-lg mb-2">The website searched for: <strong className="bg-white px-2 py-1 border rounded text-red-600">"{rawSlug}"</strong></p>
         <p className="text-lg mb-4">But Airtable provided these tools: <strong className="bg-white px-2 py-1 border rounded block mt-2 leading-relaxed">{availableNames}</strong></p>
         <p className="text-sm text-gray-500 mt-4">If you see your tool in the list above, there is a typo between the URL and Airtable.</p>
       </div>
     );
  }

  const { fields } = record;
  const actualName = fields.toolName || fields['Tool Name'] || fields['A toolName'] || rawSlug;

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
          {fields['Category (Select)'] || 'SEO Tool'}
        </span>
      </div>
      
      <h1 className="text-5xl font-extrabold mb-6 text-slate-900">{actualName}</h1>
      
      <div className="prose lg:prose-xl text-slate-700">
        <p className="text-2xl leading-relaxed mb-8 border-l-4 border-blue-500 pl-4 italic">
          {fields['Review Summary']}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-1">Pricing</h3>
            <p className="text-lg font-semibold">{fields['price'] || fields['Price'] || fields['Pricing'] || 'Contact for Pricing'}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-1">Best For</h3>
            <p className="text-lg font-semibold">{fields['Best For'] || 'SEO Professionals'}</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl mb-10 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Expert Verdict</h2>
          <p className="text-lg leading-relaxed">{fields['SEO Review']}</p>
        </div>
      </div>
    </main>
  );
}
