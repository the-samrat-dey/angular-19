import { createRequire } from 'module';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Create a require function for loading packages (ES modules)
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url)); // Get current script directory
const projectRoot = resolve(__dirname, '..');

// Check if required packages are available
try {
  require.resolve('lint-staged');
} catch (error) {
  console.error(
    'Required packages are missing. Please run "npm install" first.'
  );
  process.exit(1);
}

// Configure lint-staged options
const lintStagedConfig = {
  allowEmpty: false, // Fail if there are no staged files
  relative: true, // Use relative paths
  concurrent: true, // Run tasks concurrently when possible
  maxArgLength: null, // Don't limit command line arguments
  configPath: resolve(projectRoot, '.lintstagedrc.json'),
};

async function runLintStaged() {
  try {
    const lintStaged = await import('lint-staged');

    const lintStagedConfig = {
      allowEmpty: false,
      relative: true,
      concurrent: true,
      maxArgLength: null,
      configPath: resolve(projectRoot, '.lintstagedrc.json'),
    };

    const success = await lintStaged.default(lintStagedConfig);

    if (!success) {
      console.error(
        '\x1b[1m\x1b[31m%s\x1b[0m',
        '❌ Lint errors found. Fix them before committing.'
      );

      process.exit(1);
    }
  } catch (error) {
    console.error('\x1b[1m\x1b[31m%s\x1b[0m', '❌ Failed to run lint-staged.');
    console.error(error);
    process.exit(1);
  }
}

runLintStaged();

// Fetch the current branch name
const branchName = execSync('git symbolic-ref --short HEAD').toString().trim();

// Define the regular expression for valid branch names
// Pattern: #[a-z,A-Z]_[0-9], #[0-9]_[a-z,A-Z], #[0-9]_[0-9], #[a-z,A-Z]_[a-z,A-Z], #[0-9], #[a-z,A-Z], #[0-9,a-z,A-Z], #[a-z, A-Z, 0-9]. Below is the regex
// /^(feature|bugfix|hotfix|release)\/#[a-zA-Z]_[0-9]|#[0-9]_[a-zA-Z]|#[0-9]_[0-9]|#[a-zA-Z]_[a-zA-Z]|#[0-9]|#[a-zA-Z]|#[0-9a-zA-Z]|#[a-zA-Z0-9]-[\w-]+$/;
// Pattern: #[0-9]. Regex: /^(feature|bugfix|hotfix|release)\/#(\d+)-[\w-]+$/
const branchRegex =
  /^(feature|bugfix|hotfix|release|master|main)\/#(\d+)-[\w-]+$/;

if (
  !branchRegex.test(branchName) &&
  !(branchName === 'master' || branchName === 'main')
) {
  console.log(
    '\x1b[31m\x1b[1m❌ Invalid Branch Name!\x1b[0m\n' +
      `\x1b[33mBranch name "${branchName}" does not follow the convention.\x1b[0m\n` +
      '\x1b[34mValid formats are:\x1b[0m\n' +
      '\x1b[32m  feature/Task1-123-feature-name\x1b[0m\n' +
      '\x1b[32m  bugfix/456-task2-bug-fix\x1b[0m\n' +
      '\x1b[32m  hotfix/789-hotfix-description\x1b[0m\n' +
      '\x1b[31mPlease rename your branch to follow the correct naming convention.\x1b[0m'
  );
  process.exit(1); // Block commit
}
