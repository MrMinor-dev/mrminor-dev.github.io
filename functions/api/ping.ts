export async function onRequest({
  env,
}: {
  env: { INTAKE_SECRET?: string };
}): Promise<Response> {
  return new Response(
    JSON.stringify({
      secret_set: !!env.INTAKE_SECRET,
      secret_length: env.INTAKE_SECRET ? env.INTAKE_SECRET.length : 0,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
