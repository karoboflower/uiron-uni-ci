import { execSync } from 'child_process';

export function prettierTemplate(root: string,) {
  execSync(`npx prettier --write "${root}/**/*.{ts,js,vue,json,md}"`, {
    stdio: 'inherit',
  });
}