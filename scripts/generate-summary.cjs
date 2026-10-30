const fs = require('node:fs');
const path = require('node:path');

const esc = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[character]);

const rawStatus = process.env.TEST_JOB_RESULT || process.env.JOB_STATUS || '';
const status = ['success', 'failure', 'cancelled'].includes(rawStatus.toLowerCase())
  ? rawStatus
  : 'Chưa được cung cấp';
const commit = process.env.GITHUB_SHA || process.env.GH_SHA || 'Chưa được cung cấp';
const runId = process.env.GITHUB_RUN_ID || process.env.GH_RUN_ID || 'Chưa được cung cấp';
const outputDir = path.resolve(__dirname, '..', 'public-report');

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'index.html'), `<!doctype html>
<html lang="vi">
<head><meta charset="utf-8"><title>MVP 3 CI</title></head>
<body>
  <h1>Mini Message Board MVP 3</h1>
  <p>Trạng thái job: ${esc(status)}</p>
  <p>Commit: ${esc(commit)}</p>
  <p>Run ID: ${esc(runId)}</p>
</body>
</html>
`);
