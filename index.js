const { execSync } = require('child_process');
execSync('PORT=3876 npx serve static', { stdio: 'inherit' });
