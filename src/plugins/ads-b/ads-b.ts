import airplaneIcon from '@public/img/icons/airplane.png';
import { EmbeddedPagePlugin } from '../embedded-page/embedded-page-plugin';

export class AdsbPlugin extends EmbeddedPagePlugin {
  readonly id = 'AdsbPlugin';
  dependencies_ = [];
  bottomIconImg = airplaneIcon;
  bottomIconLabel = 'ADS-B';
  bottomIconElementName = 'menu-ads-b';

  protected readonly envUrl = import.meta.env.SCAI_ADSB_URL;
  protected readonly pageTitle = 'ADS-B';
  protected readonly pluginDisplayName = 'ADS-B';
}
