import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateBlog = async (req, res) => {
    try {
        const { title, subtitle } = req.body;

        if (!title) {
            return res.json({ success: false, message: 'Title is required to generate a blog' });
        }

        const prompt = `Write a comprehensive, engaging, and well-structured blog post. 
Title: ${title}
Subtitle: ${subtitle || "Not provided"}

Instructions:
1. Write 3-5 engaging paragraphs.
2. Include appropriate HTML tags (like <h2>, <h3>, <p>, <strong>) so it can be directly injected into a rich text editor.
3. DO NOT wrap the output in markdown blocks like \`\`\`html. Return ONLY the raw HTML string.
4. Ensure the tone is professional yet accessible.`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = response.choices[0].message.content.trim();

        res.json({ success: true, content });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.json({ success: false, message: error.message || "Failed to generate blog content" });
    }
};
