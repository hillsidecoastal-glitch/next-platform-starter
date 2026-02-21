import { notFound } from 'next/navigation';

async function getAirtableData(slug) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableIdOrName = 'SEO Tools'; 
  const apiKey = process.env.AIRTABLE_API_KEY;

  // This line is the "Magic Fix" - it properly encodes the search formula
  const filter = encodeURIComponent(`{Tool Name}='${slug}'`);
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}?filterByFormula=${filter}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      console.error('Airtable Error:', await res.text());
      return null;
    }

    const data = await res.json();
    return data.records && data.records.length > 0 ? data.records[0] : null;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}

export default async function ReviewPage({ params }) {
  const { slug } = params;
  const record = await getAirtableData(slug);

  if (!record) return notFound();

  const { fields } = record;

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
          {fields['Category (Select)'] || 'SEO Tool'}
        </span>
      </div>
      <h1 className="text-5xl font-extrabold mb-6 text-slate-900">{fields['Tool Name']}</h1>
      <div className="prose lg:prose-xl text-slate-700">
        <p className="text-2xl leading-relaxed mb-8 border-l-4 border-blue-500 pl-4 italic">
          {fields['Review Summary']}
        </p>
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl mb-10">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Expert Verdict</h2>
          <p className="text-lg">{fields['SEO Review']}</p>
        </div>
      </div>
    </main>
  );
}
