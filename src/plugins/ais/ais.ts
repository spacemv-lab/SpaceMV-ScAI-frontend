import shipIcon from '@public/img/icons/ship.png';
import { EmbeddedPagePlugin } from '../embedded-page/embedded-page-plugin';

export class AisPlugin extends EmbeddedPagePlugin {
  readonly id = 'AisPlugin';
  dependencies_ = [];
  bottomIconImg = shipIcon;
  bottomIconLabel = 'AIS';
  bottomIconElementName = 'menu-ais';

  protected readonly envUrl = import.meta.env.SCAI_AIS_URL;
  protected readonly pageTitle = 'AIS';
  protected readonly pluginDisplayName = 'AIS';
}
