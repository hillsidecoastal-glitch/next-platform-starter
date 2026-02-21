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
    return { records: data.records };
  } catch (error) {
    return { error: 'Network Error' };
  }
}

export default async function ReviewPage({ params }) {
  const { slug } = params;
  const data = await getAirtableData();

  if (data.error || !data.records) {
    return <div className="p-10 text-red-600 font-bold">Error connecting to Airtable.</div>;
  }

  // Find the record and use .trim() to destroy hidden spaces!
  const record = data.records.find(r => {
     const name = r.fields.toolName || r.fields['Tool Name'] || r.fields['A toolName'] || '';
     return name.trim().toLowerCase() === slug.trim().toLowerCase();
  });

  // THE DETECTIVE MODE: Instead of a 404, tell us what went wrong!
  if (!record) {
     const availableNames = data.records.map(r => r.fields.toolName || r.fields['Tool Name'] || r.fields['A toolName'] || 'EmptyRow').join(', ');
     return (
       <div className="p-10 font-sans max-w-2xl mx-auto mt-10 bg-red-50 border border-red-200 rounded-lg">
         <h1 className="text-2xl font-bold text-red-700 mb-4">Detective Mode: Tool Not Found</h1>
         <p className="text-lg mb-2">The website tried to load the URL for: <strong className="bg-yellow-200 px-1">"{slug}"</strong></p>
         <p className="text-lg mb-4">But Airtable only sent over these tools: <strong className="bg-white px-1 border">{availableNames}</strong></p>
         <p className="text-sm text-gray-600">If you see Serpstat in the list above, there is a spelling mismatch. If the list is blank, Airtable is empty!</p>
       </div>
     );
  }

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
