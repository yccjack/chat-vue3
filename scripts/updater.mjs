
import { context, getOctokit } from "@actions/github";
import { readFile } from "node:fs/promises";

const octokit = getOctokit(process.env.GITHUB_TOKEN);
if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not defined. Ensure it is set in the environment.");
}
const updateRelease = async () => {
    const { data: release } = await octokit.rest.repos.getReleaseByTag({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag: "updater",
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
