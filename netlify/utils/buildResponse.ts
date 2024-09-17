const buildResponse = (body: Record<string, unknown>, status: number): Response => {
  return new Response(JSON.stringify(body), { status });
}

export default buildResponse;
