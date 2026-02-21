import { notFound } from 'next/navigation';

async function getAirtableData(slug) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableIdOrName = 'SEO Tools'; // Make sure this matches your Airtable table name exactly
  const apiKey = process.env.AIRTABLE_API_KEY;

  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}?filterByFormula={Tool Name}='${slug}'`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 60 }, // Refresh every minute
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.records[0] || null;
}

export default async function ReviewPage({ params }) {
  const { slug } = params;
  const record = await getAirtableData(slug);

  if (!record) {
    notFound();
  }

  const { fields } = record;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{fields['Tool Name']}</h1>
      <div className="prose lg:prose-xl">
        <p className="text-xl text-gray-600 mb-8">{fields['Review Summary']}</p>
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">Verdict</h2>
          <p>{fields['Verdict']}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <strong>Pricing:</strong> {fields['Pricing']}
          </div>
          <div>
            <strong>Best For:</strong> {fields['Best For']}
          </div>
        </div>
        <a 
          href={fields['Affiliate Link']} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Try {fields['Tool Name']} Now
        </a>
      </div>
    </main>
  );
}
