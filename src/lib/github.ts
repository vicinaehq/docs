interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  content_type: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  assets: GitHubAsset[];
  published_at: string;
}

export async function getLatestReleaseDownloadUrl(
  owner: string,
  repo: string,
  assetPattern?: string | RegExp,
  token?: string
): Promise<string | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'MyApp/1.0'
    };

    // Add authorization header if token is provided
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/vicinaehq/vicinae/releases/latest`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const release: GitHubRelease = await response.json();

	console.log({ release });

    if (!release.assets || release.assets.length === 0) {
      throw new Error('No assets found in the latest release');
    }

    // If no pattern provided, return the first asset's download URL
    if (!assetPattern) {
      return release.assets[0].browser_download_url;
    }

    // Find asset matching the pattern
    const matchingAsset = release.assets.find(asset => {
      if (typeof assetPattern === 'string') {
        return asset.name.includes(assetPattern);
      } else {
        return assetPattern.test(asset.name);
      }
    });

    if (!matchingAsset) {
      throw new Error(`No asset found matching pattern: ${assetPattern}`);
    }

    return matchingAsset.browser_download_url;
  } catch (error) {
    console.error('Error fetching latest release:', error);
    return null;
  }
}
