import { execSync } from 'child_process';

console.log('Running GED build pipeline...');

try {
  console.log('\\n--- 1. Validation ---');
  execSync('npx tsx scripts/validate.ts', { stdio: 'inherit' });

  console.log('\\n--- 2. Dist Generation ---');
  execSync('npx tsx scripts/build-dist.ts', { stdio: 'inherit' });

  console.log('\\nBuild complete.');
} catch (error: any) {
  console.error('\\nBuild failed!', error.message);
  process.exit(1);
}
