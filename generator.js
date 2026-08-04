const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
// Usage: node generator.js [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--min 3] [--max 10] [--push]
const args = process.argv.slice(2);
function getArg(flag, defaultValue) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return defaultValue;
}

const shouldPush = args.includes('--push');
const minCommits = parseInt(getArg('--min', '3'), 10);
const maxCommits = parseInt(getArg('--max', '10'), 10);

// Default to 1 year ago up to today
const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

const startDateStr = getArg('--start', oneYearAgo.toISOString().split('T')[0]);
const endDateStr = getArg('--end', today.toISOString().split('T')[0]);

const startDate = new Date(startDateStr);
const endDate = new Date(endDateStr);

const activityFilePath = path.join(__dirname, 'activity.log');

console.log(`==================================================`);
console.log(`  GitHub Contribution Greening Generator`);
console.log(`==================================================`);
console.log(`Start Date : ${startDateStr}`);
console.log(`End Date   : ${endDateStr}`);
console.log(`Min Commits: ${minCommits} / day`);
console.log(`Max Commits: ${maxCommits} / day`);
console.log(`Auto Push  : ${shouldPush ? 'Yes' : 'No'}`);
console.log(`==================================================\n`);

let totalCommits = 0;
let totalDays = 0;

let currentDate = new Date(startDate);
while (currentDate <= endDate) {
  totalDays++;
  // Random number of commits for the day
  const commitsForToday = Math.floor(Math.random() * (maxCommits - minCommits + 1)) + minCommits;

  for (let i = 0; i < commitsForToday; i++) {
    // Random hour (08:00 to 22:00) and random min/sec
    const hour = Math.floor(Math.random() * 14) + 8;
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    const commitDate = new Date(currentDate);
    commitDate.setHours(hour, minute, second);

    const formattedDate = commitDate.toISOString();

    // Write to activity log file
    fs.appendFileSync(activityFilePath, `[${formattedDate}] Contribution #${i + 1}\n`, 'utf8');

    // Run git add
    execSync('git add activity.log', { cwd: __dirname });

    // Run git commit with custom GIT_AUTHOR_DATE & GIT_COMMITTER_DATE
    const gitCommand = `git commit -m "chore: activity contribution update ${formattedDate}"`;
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: formattedDate,
      GIT_COMMITTER_DATE: formattedDate,
    };

    execSync(gitCommand, { cwd: __dirname, env, stdio: 'ignore' });
    totalCommits++;
  }

  const dateStr = currentDate.toISOString().split('T')[0];
  if (totalDays % 30 === 0 || currentDate >= endDate) {
    console.log(`[Progress] Processed up to ${dateStr} | Total Commits so far: ${totalCommits}`);
  }

  // Next day
  currentDate.setDate(currentDate.getDate() + 1);
}

console.log(`\nCompleted! Generated ${totalCommits} commits across ${totalDays} days.`);

if (shouldPush) {
  console.log(`\nPushing commits to GitHub (origin main)...`);
  try {
    execSync('git push origin main', { cwd: __dirname, stdio: 'inherit' });
    console.log(`Successfully pushed all commits to GitHub!`);
  } catch (error) {
    console.error(`Failed to push commits. You can run 'git push origin main' manually.`);
  }
} else {
  console.log(`\nTo push these commits to GitHub, run:\n   git push origin main`);
}
