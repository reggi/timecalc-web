import timeCalculator from "@reggi/timecalc"; // Adjust the path as necessary

export async function GET({ request }: { request: Request }) {
  if (request.method === "GET") {
    const url = new URL(request.url);
    const timezone = url.searchParams.get("timezone");
    const expression = url.searchParams.get("expression");
    
    if (timezone && expression) {
      try {
        const result = timeCalculator(timezone, expression);
        return new Response(JSON.stringify(result), {
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          return new Response(JSON.stringify({ error: error.message }), {
            headers: {
              "Content-Type": "application/json"
            },
            status: 400
          });
        }
      }
    } else {
      return new Response(JSON.stringify({ error: "Missing timezone or expression parameter" }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 400
      });
    }
  }
};
