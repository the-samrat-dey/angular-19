const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

execSync('ng analytics off', { stdio: 'inherit' });
execSync('git config --global core.autocrlf input', { stdio: 'inherit' });

// Run husky init to set up Git hooks
execSync('npx husky', { stdio: 'inherit' });

// Path to the pre-commit hook file
const preCommitHookPath = path.resolve('.husky', 'pre-commit');
const preCommitJSPath = path.resolve('scripts', 'pre-commit.js');
const commitMsgPath = path.resolve('.husky', 'commit-msg');

// Create or overwrite the pre-commit hook file with the desired script
const preCommitScript = `node ./scripts/pre-commit.mjs`;

// Create or overwrite the commit-msg hook file with the desired script
const commitMsgScript = `# Run the commit-msg validation with the JavaScript file
node ./scripts/commit-msg.js "$1"
`;

// Ensure .husky directory exists
if (!fs.existsSync(path.resolve('.husky'))) {
  console.error(
    '❌ .husky directory not found! Please create the .husky directory first.'
  );
  process.exit(1); // Exit the script with an error code
}

// Write the pre-commit hook script
fs.writeFileSync(preCommitHookPath, preCommitScript, 'utf8');
// Write the commit-msg hook script
fs.writeFileSync(commitMsgPath, commitMsgScript, 'utf8');

// Check if we're on a Unix-like system (macOS/Linux) and only run chmod there
if (process.platform !== 'win32') {
  try {
    console.log('✅ Setting execute permissions on pre-commit hook...');
    execSync(`chmod +x ${preCommitHookPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${preCommitJSPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${commitMsgPath}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(
      '❌ Error setting execute permissions in your Unix-like system.'
    );
    process.exit(1);
  }
}

console.log('✅ Husky pre-commit hook setup with lint-staged completed!');
console.log('✅ Husky commit-msg hook setup with lint-staged completed!');
