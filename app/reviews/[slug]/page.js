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

// Unpacks Airtable's AI-generated text fields
function extractText(field) {
  if (!field) return '';
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      if (parsed && parsed.value) return parsed.value;
    } catch (e) {
      return field;
    }
    return field;
  }
  if (Array.isArray(field)) return field.join(', ');
  if (typeof field === 'object') {
    if (field.value) return field.value;
    return JSON.stringify(field); 
  }
  return String(field);
}

// THE FIX: This turns raw AI symbols into beautiful HTML formatting!
function formatMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2 text-slate-800">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-3 text-slate-900">$1</h2>')
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc mb-1">$1</li>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/\n/gim, '<br />');
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

  if (!record) return notFound();

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
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded shadow-sm">
          {category}
        </span>
      </div>
      
      <h1 className="text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">{actualName}</h1>
      
      <div className="prose lg:prose-xl text-slate-700">
        
        {/* We moved the massive Review Summary down here where the Expert Verdict was! */}
        {summary && (
          <div className="bg-white border border-slate-200 p-8 rounded-2xl mb-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Our Evaluation</h2>
            {/* This special tag allows our Markdown Formatter to inject the bolding and lists safely */}
            <div 
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(summary) }} 
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Pricing</h3>
            <p className="text-xl font-semibold text-slate-800">{price}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Best For</h3>
            <p className="text-xl font-semibold text-slate-800">{bestFor}</p>
          </div>
        </div>

        {/* This will show if you ever fill out the SEO Review column in Airtable */}
        {seoReview && (
          <div className="bg-slate-900 text-white p-8 rounded-2xl mb-10 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Expert Verdict</h2>
            <div 
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(seoReview) }} 
            />
          </div>
        )}
      </div>
    </main>
  );
}
