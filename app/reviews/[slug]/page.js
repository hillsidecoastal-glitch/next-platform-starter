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

// THE FIX: This unpacks Airtable's AI-generated text fields perfectly
function extractText(field) {
  if (!field) return '';
  
  // If it's a string, it might be a stringified JSON object from Airtable AI
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      if (parsed && parsed.value) return parsed.value;
    } catch (e) {
      // Not JSON, just a regular string
      return field;
    }
    return field;
  }
  
  // If it's a list (like a multi-select or lookup), join it with commas
  if (Array.isArray(field)) return field.join(', ');
  
  // If it's a raw Airtable object (like an AI field), grab the 'value'
  if (typeof field === 'object') {
    if (field.value) return field.value;
    return JSON.stringify(field); 
  }
  
  return String(field);
}

export default async function ReviewPage({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || Object.values(resolvedParams)[0] || '';
  const safeSlug = String(rawSlug).trim().toLowerCase();

  const data = await getAirtableData();

  if (data.error || !data.records || data.records.length === 0) {
    return <div className="p-10 text-red-800 font-bold">Airtable Connection Error</div>;
  }

  const record = data.records.find(r => {
     const nameField = r.fields.toolName || r.fields['Tool Name'] || r.fields['A toolName'] || '';
     return String(nameField).trim().toLowerCase() === safeSlug;
  });

  if (!record) {
     return (
       <div className="p-10 max-w-3xl mx-auto mt-10 bg-yellow-50 border border-yellow-300 rounded-lg text-slate-800">
         <h1 className="text-2xl font-bold text-yellow-700 mb-4">Tool Not Found</h1>
         <p className="text-lg">Searched for: <strong>"{rawSlug}"</strong></p>
       </div>
     );
  }

  const { fields } = record;
  
  const actualName = extractText(fields.toolName || fields['Tool Name'] || fields['A toolName'] || rawSlug);
  const category = extractText(fields['Category (Select)'] || 'SEO Tool');
  const summary = extractText(fields['Review Summary']);
  const price = extractText(fields['price'] || fields['Price'] || fields['Pricing'] || 'Contact for Pricing');
  const bestFor = extractText(fields['Best For'] || 'SEO Professionals');
  const seoReview = extractText(fields['SEO Review']);

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
          {category}
        </span>
      </div>
      
      <h1 className="text-5xl font-extrabold mb-6 text-slate-900">{actualName}</h1>
      
      <div className="prose lg:prose-xl text-slate-700">
        
        {summary && (
          <p className="text-2xl leading-relaxed mb-8 border-l-4 border-blue-500 pl-4 italic whitespace-pre-wrap">
            {summary}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-1">Pricing</h3>
            <p className="text-lg font-semibold">{price}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-1">Best For</h3>
            <p className="text-lg font-semibold">{bestFor}</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl mb-10 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Expert Verdict</h2>
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{seoReview || "Review coming soon!"}</p>
        </div>
      </div>
    </main>
  );
}
