export default async function TestPage() {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const table = 'SEO Tools';
  
  const url = `https://api.airtable.com/v0/${baseId}/${table}?maxRecords=10`;
  
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: 'no-store'
  });

  const data = await res.json();

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-4">Airtable Connection Test</h1>
      <p className="mb-4">Base ID being used: <code className="bg-gray-100 p-1">{baseId}</code></p>
      
      <h2 className="text-xl font-bold mt-6">Records Found:</h2>
      {data.records ? (
        <ul className="list-disc ml-5 mt-2">
          {data.records.map(record => (
            <li key={record.id}>
              <strong>{record.fields.toolName || record.fields['Tool Name'] || "No Name Found"}</strong> 
              (Status: {record.fields.Status})
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-red-100 p-4 mt-4 text-red-700">
          <p>Error: No records returned. Check your API Key and Base ID in Netlify.</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
