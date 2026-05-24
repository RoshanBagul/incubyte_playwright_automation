import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';

import { ensureDirectory } from './file-utils';
import { CustomWorld } from './world';

setDefaultTimeout(120 * 1000);

Before(async function (this: CustomWorld) {
  await this.launchBrowser();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotDir = 'test-outputs/screenshots';
    await ensureDirectory(screenshotDir);

    const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9-_]/g, '_');
    const screenshotPath = `${screenshotDir}/${safeName}-${Date.now()}.png`;

    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    const screenshot = await this.page.screenshot({ fullPage: true });

    await this.attach(screenshot, 'image/png');
  }

  await this.closeBrowser();
});
