import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import {
  Browser,
  BrowserContext,
  BrowserType,
  Page,
  chromium,
  firefox,
  webkit,
} from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  browserName!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  private getBrowserType(): BrowserType {
    this.browserName = (process.env.BROWSER ?? 'chromium').toLowerCase();

    switch (this.browserName) {
      case 'firefox':
        return firefox;
      case 'webkit':
        return webkit;
      default:
        this.browserName = 'chromium';
        return chromium;
    }
  }

 async launchBrowser(): Promise<void> {

  const isHeadless = process.env.PW_HEADLESS === 'true';

  const slowMo = Number(process.env.PW_SLOWMO ?? '0');

  const browserType = this.getBrowserType();

  const launchOptions: any = {
    headless: isHeadless,

    slowMo: Number.isNaN(slowMo)
      ? 0
      : slowMo,
  };

  // Chromium-specific config
  if (this.browserName === 'chromium') {

    launchOptions.channel = 'chrome';

    launchOptions.args = [
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--window-size=1920,1080',
    ];
  }

  // Firefox-specific config
  if (this.browserName === 'firefox') {

    launchOptions.args = [
      '--width=1920',
      '--height=1080',
    ];
  }

  // WebKit should NOT receive chromium args

  this.browser = await browserType.launch(launchOptions);

  this.context = await this.browser.newContext({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });

  this.page = await this.context.newPage();
}

  async closeBrowser(): Promise<void> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
