import { ToastMsgType } from '@app/interfaces';
import { keepTrackApi } from '@app/keepTrackApi';
import { openColorbox } from '@app/lib/colorbox';
import { getEl } from '@app/lib/get-el';
import { KeepTrackPlugin } from '../KeepTrackPlugin';

const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//u;

export abstract class EmbeddedPagePlugin extends KeepTrackPlugin {
  isForceHideSideMenus = true;

  protected abstract readonly envUrl: string | undefined;
  protected abstract readonly pageTitle: string;
  protected abstract readonly pluginDisplayName: string;

  bottomIconCallback = (): void => {
    if (!this.isMenuButtonActive) {
      return;
    }

    const targetUrl = this.resolveTargetUrl_();

    if (!targetUrl) {
      keepTrackApi.getUiManager().toast(
        `${this.pluginDisplayName} page URL is not configured. Please set it in .env.`,
        ToastMsgType.caution,
        true,
      );
      this.setBottomIconToUnselected(false);

      return;
    }

    settingsManager.isPreventColorboxClose = true;
    setTimeout(() => {
      settingsManager.isPreventColorboxClose = false;
    }, 2000);

    openColorbox(targetUrl, {
      title: this.pageTitle,
      callback: this.handleColorboxClose_.bind(this),
      skipLoading: true,
    });
  };

  private resolveTargetUrl_(): string | null {
    const configuredUrl = this.envUrl?.trim();

    if (!configuredUrl) {
      return null;
    }

    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const normalizedInput = ABSOLUTE_URL_REGEX.test(configuredUrl) ? configuredUrl : `${protocol}//${configuredUrl}`;
    const targetUrl = new URL(normalizedInput, window.location.origin);
    const host = targetUrl.hostname.toLowerCase();

    if (host === 'localhost' || host === '127.0.0.1') {
      targetUrl.hostname = window.location.hostname;
    }

    return targetUrl.toString();
  }

  private handleColorboxClose_(): void {
    if (this.isMenuButtonActive) {
      this.isMenuButtonActive = false;
      getEl(this.bottomIconElementName)?.classList.remove('bmenu-item-selected');
    }
  }
}
