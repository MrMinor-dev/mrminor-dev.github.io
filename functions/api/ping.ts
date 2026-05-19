export async function onRequest({
  env,
}: {
  env: { INTAKE_SECRET?: string };
}): Promise<Response> {
  const s = env.INTAKE_SECRET ?? "";
  return new Response(
    JSON.stringify({
      secret_set: !!s,
      secret_length: s.length,
      first3: s.slice(0, 3),
      last3: s.slice(-3),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
