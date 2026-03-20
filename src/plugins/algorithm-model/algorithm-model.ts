import { KeepTrackPlugin } from '../KeepTrackPlugin';
import { keepTrackApi } from '@app/keepTrackApi';
import { SoundNames } from '../sounds/sounds';
import { ToastMsgType, KeepTrackApiEvents } from '@app/interfaces';
import industryAlgorithmsIcon from '@public/img/icons/industry-algorithms.png';
import thirdPartyToolsIcon from '@public/img/icons/third-party-tools.png';
import agentIcon from '@public/img/icons/agent.png';
import { authService } from '../../auth/authService';

interface ScaiUserInfo {
  id?: string;
  name: string;
  email: string;
  authToken: string;
}

export class AlgorithmModelPlugin extends KeepTrackPlugin {
  readonly id = 'AlgorithmModelPlugin';
  dependencies_ = [];
  bottomIconImg = industryAlgorithmsIcon;
  bottomIconLabel = '算法模型';
  bottomIconElementName = 'menu-algorithm-model';
  sideMenuElementName = 'algorithm-model-menu';
  sideMenuTitle = '算法与模型选择';

  sideMenuElementHtml = keepTrackApi.html`
    <div id="algorithm-model-menu" class="side-menu-parent start-hidden text-select">
      <div id="algorithm-model-content" class="side-menu">
        <div class="algorithm-model-grid">
          <div class="algorithm-model-item" data-type="third-party">
            <div class="algorithm-model-icon">
              <img src="${thirdPartyToolsIcon}" alt="第三方工具">
            </div>
            <div class="algorithm-model-title">第三方工具</div>
            <div class="algorithm-model-desc">集成外部服务工具</div>
          </div>

          <div class="algorithm-model-item" data-type="agent">
            <div class="algorithm-model-icon">
              <img src="${agentIcon}" alt="Agent">
            </div>
            <div class="algorithm-model-title">Agent</div>
            <div class="algorithm-model-desc">智能体服务</div>
          </div>
        </div>
      </div>
    </div>
  `;

  private handleModelSelection(modelType: string): void {
    switch (modelType) {
      case 'agent':
        this.openScaiAgent();
        break;
      case 'third-party':
        keepTrackApi.getUiManager().toast('此算法模型已集成于覆盖性分析插件', ToastMsgType.standby);
        break;
      default:
        break;
    }
  }

  private openScaiAgent(): void {
    const scaiUser = this.getScaiUser();
    if (!scaiUser) {
      keepTrackApi.getUiManager().toast('未找到登录用户信息，请重新登录后再试。', ToastMsgType.caution);
      return;
    }

    const scaiAgentUrl = this.getScaiAgentUrl(scaiUser);
    this.showIframeModal(scaiAgentUrl, 'ScAI Agent');
  }

  private getScaiUser(): ScaiUserInfo | null {
    const currentUser = authService.getCurrentUser() as unknown as Record<string, unknown> | null;
    let localUser: Record<string, unknown> = {};
    try {
      const savedUser = localStorage.getItem('user-info');
      if (savedUser) {
        localUser = JSON.parse(savedUser) as Record<string, unknown>;
      }
    } catch (error) {
      console.error('Failed to parse local ScAI user info for Agent SSO:', error);
    }

    const mergedUser = {
      ...localUser,
      ...(currentUser || {}),
    };

    const getValue = (keys: string[]): string => {
      for (const key of keys) {
        const value = mergedUser[key];
        if (typeof value === 'string' && value.trim()) {
          return value.trim();
        }
        if (typeof value === 'number' && Number.isFinite(value)) {
          return String(value);
        }
      }

      return '';
    };

    try {
      const name = getValue(['name', 'username', 'userName']);
      const email = getValue(['email', 'userEmail']);
      const rawId = getValue(['id', 'userId', 'uid']);
      const id = rawId || undefined;
      const authToken = localStorage.getItem('auth-token') ?? '';

      if (!name && !email && !id) {
        return null;
      }

      return {
        id,
        name: name || email || id || '',
        email,
        authToken,
      };
    } catch (error) {
      console.error('Failed to parse ScAI user info for Agent SSO:', error);
      return null;
    }
  }

  private getScaiAgentUrl(user: ScaiUserInfo): string {
    const settingsOverride = (window as Window & { settingsOverride?: { scaiAgentUrl?: string } }).settingsOverride;
    const envAgentUrl = import.meta.env.SCAI_AGENT_URL?.trim();
    const configuredAgentUrl = envAgentUrl || settingsOverride?.scaiAgentUrl || localStorage.getItem('scai-agent-url') || this.getDefaultAgentUrl_();
    const agentUrl = this.normalizeAgentUrl_(configuredAgentUrl);
    const payload = encodeURIComponent(JSON.stringify(user));

    agentUrl.searchParams.set('source', 'scai');
    agentUrl.searchParams.set('scai_user', payload);

    return agentUrl.toString();
  }

  private getDefaultAgentUrl_(): string {
    const configuredAgentUrl = import.meta.env.SCAI_AGENT_URL?.trim();

    if (configuredAgentUrl) {
      return configuredAgentUrl;
    }

    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';

    return `${protocol}//${window.location.hostname}:5173/`;
  }

  private normalizeAgentUrl_(configuredAgentUrl: string): URL {
    const agentUrl = new URL(configuredAgentUrl, window.location.origin);
    const hostname = agentUrl.hostname.toLowerCase();

    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      agentUrl.hostname = window.location.hostname;
    }

    return agentUrl;
  }

  private addCss(): void {
    const style = document.createElement('style');

    style.textContent = `
      #algorithm-model-content {
        color: #333;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .algorithm-model-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        padding: 20px 15px;
        overflow-y: auto;
        max-height: 100%;
      }

      .algorithm-model-item {
        background: #ffffff;
        border: 2px solid #ecf0f1;
        border-radius: 12px;
        padding: 20px 15px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
      }

      .algorithm-model-item:hover {
        border-color: #3498db;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .algorithm-model-item.selected {
        border-color: #27ae60;
        background-color: #f0f9f4;
        box-shadow: 0 5px 15px rgba(39, 174, 96, 0.15);
      }

      .algorithm-model-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .algorithm-model-icon img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        filter: brightness(0.7);
        transition: all 0.3s ease;
      }

      .algorithm-model-item:hover .algorithm-model-icon img {
        filter: brightness(1);
        transform: scale(1.1);
      }

      .algorithm-model-title {
        font-size: 14px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }

      .algorithm-model-desc {
        font-size: 13px;
        color: #7f8c8d;
        margin: 0;
        line-height: 1.4;
      }

      .agent-iframe-overlay {
        animation: fadeIn 0.3s ease;
      }

      .agent-iframe-modal {
        animation: scaleIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes scaleIn {
        from {
          transform: scale(0.95);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        .algorithm-model-grid {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .algorithm-model-item {
          padding: 15px 10px;
        }

        .algorithm-model-icon {
          width: 50px;
          height: 50px;
        }

        .algorithm-model-icon img {
          width: 30px;
          height: 30px;
        }

        .agent-iframe-modal {
          width: 95%;
          height: 95vh;
          max-width: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  addJs(): void {
    super.addJs();
    this.addCss();

    keepTrackApi.on(KeepTrackApiEvents.uiManagerFinal, () => {
      this.setupEventListeners();
    });
  }

  private setupEventListeners(): void {
    const modelItems = document.querySelectorAll('.algorithm-model-item');

    modelItems.forEach(item => {
      const modelItem = item as HTMLElement;
      if (modelItem.dataset.listenerBound === '1') {
        return;
      }

      modelItem.dataset.listenerBound = '1';
      modelItem.addEventListener('click', () => {
        this.clearModelSelection();
        modelItem.classList.add('selected');
        keepTrackApi.getSoundManager()?.play(SoundNames.TOGGLE_ON);

        const modelType = modelItem.getAttribute('data-type') || '';
        this.handleModelSelection(modelType);
      });
    });
  }

  private clearModelSelection(): void {
    const modelItems = document.querySelectorAll('.algorithm-model-item');
    modelItems.forEach(item => item.classList.remove('selected'));
  }

  private showIframeModal(url: string, title: string): void {
    const existingOverlay = document.getElementById('agent-iframe-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.id = 'agent-iframe-overlay';
    overlay.className = 'agent-iframe-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backdropFilter = 'blur(4px)';

    const modal = document.createElement('div');
    modal.className = 'agent-iframe-modal';
    modal.style.position = 'relative';
    modal.style.width = '90%';
    modal.style.maxWidth = '1400px';
    modal.style.height = '90vh';
    modal.style.maxHeight = '900px';
    modal.style.background = 'white';
    modal.style.borderRadius = '12px';
    modal.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
    modal.style.overflow = 'hidden';

    const modalHeader = document.createElement('div');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.padding = '15px 20px';
    modalHeader.style.background = '#f8f9fa';
    modalHeader.style.borderBottom = '1px solid #e9ecef';

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = title;
    modalTitle.style.margin = '0';
    modalTitle.style.color = '#2c3e50';
    modalTitle.style.fontSize = '18px';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.color = '#7f8c8d';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.width = '32px';
    closeBtn.style.height = '32px';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.transition = 'all 0.2s ease';
    closeBtn.onmouseover = () => {
      closeBtn.style.background = '#e9ecef';
      closeBtn.style.color = '#2c3e50';
    };
    closeBtn.onmouseout = () => {
      closeBtn.style.background = 'none';
      closeBtn.style.color = '#7f8c8d';
    };

    const iframeContainer = document.createElement('div');
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = 'calc(100% - 55px)';
    iframeContainer.style.overflow = 'hidden';

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    const closeModal = () => {
      this.hideIframeModal();
      document.removeEventListener('keydown', handleEsc);
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
    document.addEventListener('keydown', handleEsc);

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    iframeContainer.appendChild(iframe);
    modal.appendChild(modalHeader);
    modal.appendChild(iframeContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  private hideIframeModal(): void {
    const overlay = document.getElementById('agent-iframe-overlay');
    if (overlay) {
      overlay.remove();
    }

    this.clearModelSelection();
  }

  init(): void {
    super.init();
  }
}
