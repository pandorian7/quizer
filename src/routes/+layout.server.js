import { REPO, DOWNLOAD_BTN_POINTER } from "$env/static/private";

export async function load({ locals: { user } }) {
  const githubres = await fetch(
    `https://api.github.com/repos/${REPO}/releases/latest`
  );
  const data = await githubres.json();
  const assets = data.assets;
  const asset = assets.find((asset) => asset.name == DOWNLOAD_BTN_POINTER);
  const download = asset.browser_download_url;
  return { user, download };
}
