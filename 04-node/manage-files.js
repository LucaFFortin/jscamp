import { log } from 'node:console';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const content = await readFile('archivo.txt', 'utf-8');
log(content);

const outputDir = join("data", "stuff");
await mkdir(outputDir, { recursive: true });

const upperCaseContent = content.toUpperCase()
const outputFilePath = join(outputDir, "archivo_upper.txt");

await writeFile(outputFilePath, upperCaseContent);