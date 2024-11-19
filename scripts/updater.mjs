
import { context, getOctokit } from "@actions/github";
import { readFile } from "node:fs/promises";

const octokit = getOctokit(process.env.GITHUB_TOKEN);
if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not defined. Ensure it is set in the environment.");
}
const updateRelease = async () => {
    const latestTag = process.env.LATEST_TAG; // 获取传递的 tag
    const { data: release } = await octokit.rest.repos.getReleaseByTag({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag: latestTag,
    });
    const deletePromises = release.assets
        .filter((item) => item.name === "latest.json")
        .map(async (item) => {
            await octokit.rest.repos.deleteReleaseAsset({
                owner: context.repo.owner,
                repo: context.repo.repo,
                asset_id: item.id,
            });
        });

    await Promise.all(deletePromises);

    const file = await readFile("latest.json", { encoding: "utf-8" });

    await octokit.rest.repos.uploadReleaseAsset({
        owner: context.repo.owner,
        repo: context.repo.repo,
        release_id: release.id,
        name: "latest.json",
        data: file,
    });
};

updateRelease();
