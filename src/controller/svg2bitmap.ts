import { Request, Response } from 'express';
import { Cluster } from 'playwright-cluster';

export interface IPlaywrightData {
  url?: string;
  html?: string;
  locator?: string;
}

export const instanceConf: { cluster: Cluster<IPlaywrightData> | null; maxConcurrency: number } = {
  cluster: null,
  maxConcurrency: 5,
};

(async () => {
  console.log(`starting playwright cluster...`);
  instanceConf.cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: instanceConf.maxConcurrency,
    pageOptions: {
      javaScriptEnabled: false,
    },
  });
  console.log(`starting ${instanceConf.maxConcurrency} instance playwright cluster successfully`);
  await instanceConf.cluster.task(async ({ page, data: { url, html, locator } }) => {
    console.log(`queue task opening ${url ? url : 'html content'} with locator ${locator}`);
    await (html ? page.setContent(html) : page.goto(url!));
    const pageItem = locator ? page.locator(locator) : page;
    const screen = await pageItem.screenshot({
      animations: 'disabled',
      type: 'jpeg',
      fullPage: true,
    });
    return screen;
  });
  console.log(`setup playwright cluster task successfully`);
})();

export async function svg2bitmap(req: Request<IPlaywrightData>, res: Response) {
  const params = Object.assign({}, req.query, req.params, req.body);
  if (!params?.url && !params?.html) {
    return res.end(`Please specify url like this: ?url=example.com`);
  }
  if (!instanceConf.cluster) {
    return res.end('Cluster init...');
  }
  try {
    const execData: IPlaywrightData = {
      locator: params?.locator,
    };
    if (params.url) execData.url = params.url;
    else if (params.html) execData.html = decodeURIComponent(params.html);
    const screen = await instanceConf.cluster.execute(execData);

    // respond with image
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': screen.length,
    });
    res.end(screen);
  } catch (err: any) {
    // catch error
    res.end(`Error: ${err.message}`);
  }
}
