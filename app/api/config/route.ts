export async function GET() {
  const url = 'https://drive.google.com/uc?export=download&id=1_pzxi2zuvFBSyBN1MZuN5kwM1sqk8dHC';
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Upstream fetch failed' }), { status: 502 });
  }

  const data = await res.json();
  return Response.json(data);

}
