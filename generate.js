import { Configuration, OpenAIApi } from 'openai';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt = 'a swarm of mutant nerds in outer space';

try {
  const result = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
    user: 'klekanger',
  });

  const url = result.data.data[0].url;

  const imgResult = await fetch(url);
  const blob = await imgResult.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  writeFileSync(`./img/${Date.now()}.png`, buffer);
} catch (error) {
  console.error(error.message);
}
