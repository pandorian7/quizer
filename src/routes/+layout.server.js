import {
  REPO,
  DOWNLOAD_BTN_POINTER,
  ENABLE_DOWNLOAD_BTN,
} from "$env/static/private";

export async function load({ locals: { user } }) {
  let download = null;
  if (ENABLE_DOWNLOAD_BTN == 1) {
    const githubres = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`
    );
    const data = await githubres.json();
    const assets = data.assets;
    const asset = assets.find((asset) => asset.name == DOWNLOAD_BTN_POINTER);
    download = asset.browser_download_url;
  }

  return { user, download };
}
