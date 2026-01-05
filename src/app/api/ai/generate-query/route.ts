import { NextRequest, NextResponse } from 'next/server';

interface SchemaContext {
  table: string;
  columns: string;
}

interface RequestBody {
  prompt: string;
  schemas: SchemaContext[];
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, schemas }: RequestBody = await request.json();

    // Build schema context for the AI
    const schemaText = schemas.map(schema =>
      `Table: ${schema.table}\nColumns: ${schema.columns}`
    ).join('\n\n');

    const systemPrompt = `
      You are a SQL query generator. Given a database schema and a natural language request, generate a valid SQL query.

      Database Schema:
      ${schemaText}

      Rules:
      1. Generate only the SQL query, no explanations
      2. Use proper SQL syntax
      3. Include appropriate WHERE clauses when needed
      4. Use JOINs when multiple tables are involved
      5. Add LIMIT clauses for large result sets when appropriate
      6. Use proper column aliases for readability

      User Request: ${prompt}

      SQL Query:`;

    // Call Ollama API
    const ollamaResponse = await fetch(process.env.NEXT_PUBLIC_OLLAMA_API || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2', // or your preferred model
        prompt: systemPrompt,
        stream: false,
        options: {
          temperature: 0.1, // Low temperature for more consistent SQL generation
          top_p: 0.9,
        }
      })
    });

    if (!ollamaResponse.ok) {
      throw new Error('Failed to connect to Ollama');
    }

    const ollamaData = await ollamaResponse.json();
    let generatedQuery = ollamaData.response;

    // Clean up the generated query
    generatedQuery = generatedQuery
      .replace(/```sql/g, '')
      .replace(/```/g, '')
      .trim();

    // Basic validation
    if (!generatedQuery.toLowerCase().includes('select')) {
      throw new Error('Generated query does not appear to be valid SQL');
    }

    return NextResponse.json({ query: generatedQuery });
  } catch (error) {
    console.error('Error generating query:', error);
    return NextResponse.json(
      { error: 'Failed to generate query' },
      { status: 500 }
    );
  }
}