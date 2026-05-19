export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: { INTAKE_SECRET: string };
}): Promise<Response> {
  const body = await request.text();
  const upstream = await fetch(
    "https://mrminor.app.n8n.cloud/webhook/agency-intake",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-intake-secret": env.INTAKE_SECRET,
        "cf-connecting-ip":
          request.headers.get("cf-connecting-ip") ?? "",
      },
      body,
    }
  );
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
