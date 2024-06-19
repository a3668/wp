GROQ_API_KEY=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

curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
     -H "Authorization: Bearer $GROQ_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "請問什麼是GPT,用中文回答"}], "model": "llama3-8b-8192"}'