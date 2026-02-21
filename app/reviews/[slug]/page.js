import { notFound } from 'next/navigation';

async function getAirtableData(slug) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = 'SEO Tools'; 
  const apiKey = process.env.AIRTABLE_API_KEY;

  // We removed the finicky Airtable "filter" entirely. 
  // Now we just grab the table and let the website do the work!
  const url = `https://api.airtable.com/v0/${baseId}/${table}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 10 }, 
    });

    if (!res.ok) return null;

    const data = await res.json();
    
    // The website looks through the list and finds the matching tool
    if (data.records) {
      return data.records.find(record => {
         // This line checks every possible way your column might be named
         const name = record.fields.toolName || record.fields['Tool Name'] || record.fields['A toolName'] || '';
         return name.toLowerCase() === slug.toLowerCase();
      });
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default async function ReviewPage({ params }) {
  const { slug } = params;
  const record = await getAirtableData(slug);

  if (!record) return notFound();

  const { fields } = record;
  const actualName = fields.toolName || fields['Tool Name'] || fields['A toolName'] || slug;

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
