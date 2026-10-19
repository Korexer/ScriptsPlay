// Retired worker welcome email. Keep the old URL inert.
Deno.serve(() => new Response(
  JSON.stringify({ error: "This endpoint is no longer in use." }),
  { status: 410, headers: { "Content-Type": "application/json" } },
));
