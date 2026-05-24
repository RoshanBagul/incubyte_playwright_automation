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

  const slowMo = Number( process.env.PW_SLOWMO ?? '0');

  const browserType = this.getBrowserType();

  this.browser = await browserType.launch({
      headless: false,

      slowMo: Number.isNaN(slowMo)
        ? 0
        : slowMo,

      channel: 'chrome', // IMPORTANT

      args: [
        '--disable-gpu',
        '--use-gl=swiftshader',
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--window-size=1920,1080',
        '--disable-features=VizDisplayCompositor',
        '--ozone-platform=x11'
      ]
    });

  this.context = await this.browser.newContext({
      viewport: {
        width: 1920,
        height: 1080
      }
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
