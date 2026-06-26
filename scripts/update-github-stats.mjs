import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const statsPath = resolve(__dirname, "../src/data/github-stats.json");
const githubToken = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "suibi-build",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (githubToken) {
  headers.Authorization = `Bearer ${githubToken}`;
}

const readExistingStats = async () => {
  try {
    return JSON.parse(await readFile(statsPath, "utf8"));
  } catch {
    return { repos: {} };
  }
};

const fetchRepoStats = async (repo) => {
  const response = await fetch(`https://api.github.com/repos/${repo}`, { headers });

  if (!response.ok) {
    throw new Error(`${repo}: GitHub API returned ${response.status}`);
  }

  const data = await response.json();

  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language ?? "Unknown",
  };
};

const existingStats = await readExistingStats();
const repos = projects.filter((project) => project.github);
const nextRepos = {};

for (const project of repos) {
  try {
    nextRepos[project.github] = await fetchRepoStats(project.github);
  } catch (error) {
    const fallback = existingStats.repos?.[project.github] ?? project.stats;
    nextRepos[project.github] = fallback;
    console.warn(`[github-stats] ${error.message}; using fallback for ${project.github}`);
  }
}

if (JSON.stringify(existingStats.repos ?? {}) === JSON.stringify(nextRepos)) {
  console.log(`[github-stats] no changes for ${repos.length} repo(s)`);
  process.exit(0);
}

const nextStats = {
  updatedAt: new Date().toISOString(),
  repos: nextRepos,
};

await writeFile(statsPath, `${JSON.stringify(nextStats, null, 2)}\n`);
console.log(`[github-stats] updated ${repos.length} repo(s)`);
