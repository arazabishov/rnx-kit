import path from "path";
import {
  createLicenseFileContents,
  extractLicenses,
  ILicense,
} from "../src/write-third-party-notices";

async function getSampleLicenseData(): Promise<{
  licenses: ILicense[];
  map: Map<string, string>;
}> {
  const map = new Map();
  // License data in package.json
  map.set("@rnx-kit/cli", path.resolve("../../node_modules/@rnx-kit/cli"));
  // License data package.json and LICENCE file
  map.set("react-native", path.resolve("../../node_modules/react-native"));
  // License data package.json and LICENSE file
  map.set("react", path.resolve("../../node_modules/react"));

  const licenses = await extractLicenses(map);

  // Hack versions to not depend on
  for (const license of licenses) {
    license.version = "1.2.3-fixedVersionForTesting";
  }

  return { licenses, map };
}

describe("license", () => {
  test("extractLicenses", async () => {
    const { licenses } = await getSampleLicenseData();

    // normalize the paths for stable and cross platform snapshots
    for (const license of licenses) {
      license.path = license.path
        .replace(path.resolve(__dirname, "../../.."), "~")
        .replace(/[/\\]/g, "/");
    }

    expect(licenses).toMatchSnapshot();
  });

  test("createLicenseFileContents", async () => {
    const { licenses, map } = await getSampleLicenseData();

    const licenseText = createLicenseFileContents(map, licenses);

    expect(licenseText).toMatchSnapshot();
  });

  test("createLicenseFileContentsWithWrappers", async () => {
    const { licenses, map } = await getSampleLicenseData();

    const licenseText = createLicenseFileContents(
      map,
      licenses,
      ["preamble 1\n2\r\n3\r4", "Preamble 2"],
      ["additional 1\n2\r\n3\r4", "additional 2"]
    );

    expect(licenseText).toMatchSnapshot();
  });
});
