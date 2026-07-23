// Type declarations for Playgama Bridge (playgama-bridge.js, loaded globally).
// Mirrors the public API of @playgama/bridge v2.

export enum PLATFORM_ID {
    VK = 'vk',
    OK = 'ok',
    YANDEX = 'yandex',
    CRAZY_GAMES = 'crazy_games',
    GAME_DISTRIBUTION = 'game_distribution',
    PLAYGAMA = 'playgama',
    STANDALONE = 'standalone',
    PLAYDECK = 'playdeck',
    TELEGRAM = 'telegram',
    Y8 = 'y8',
    LAGGED = 'lagged',
    FACEBOOK = 'facebook',
    POKI = 'poki',
    MOCK = 'mock',
    QA_TOOL = 'qa_tool',
    MSN = 'msn',
    MICROSOFT_STORE = 'microsoft_store',
    HUAWEI = 'huawei',
    GAMEPUSH = 'gamepush',
    DISCORD = 'discord',
    JIO_GAMES = 'jio_games',
    YOUTUBE = 'youtube',
    PORTAL = 'portal',
    REDDIT = 'reddit',
    XIAOMI = 'xiaomi',
    TIKTOK = 'tiktok',
    DLIGHTEK = 'dlightek',
    GAMESNACKS = 'gamesnacks',
    SAMSUNG = 'samsung',
}

export enum MODULE_NAME {
    CORE = 'core',
    PLATFORM = 'platform',
    PLAYER = 'player',
    STORAGE = 'storage',
    ADVERTISEMENT = 'advertisement',
    SOCIAL = 'social',
    DEVICE = 'device',
    LEADERBOARDS = 'leaderboards',
    PAYMENTS = 'payments',
    REMOTE_CONFIG = 'remote_config',
    CLIPBOARD = 'clipboard',
    ACHIEVEMENTS = 'achievements',
    ANALYTICS = 'analytics',
    DAILY_REWARDS = 'daily_rewards',
    TASKS = 'tasks',
    CROSS_PROMO = 'cross_promo',
}

export enum EVENT_NAME {
    INTERSTITIAL_STATE_CHANGED = 'interstitial_state_changed',
    REWARDED_STATE_CHANGED = 'rewarded_state_changed',
    BANNER_STATE_CHANGED = 'banner_state_changed',
    ADVANCED_BANNERS_STATE_CHANGED = 'advanced_banners_state_changed',
    AUDIO_STATE_CHANGED = 'audio_state_changed',
    PAUSE_STATE_CHANGED = 'pause_state_changed',
    ORIENTATION_STATE_CHANGED = 'orientation_state_changed',
    SCREEN_SIZE_CHANGED = 'screen_size_changed',
    PLATFORM_MESSAGE_SENT = 'platform_message_sent',
    PLATFORM_STORAGE_AVAILABILITY_CHANGED = 'platform_storage_availability_changed',
}

export enum DEVICE_TYPE {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
    TABLET = 'tablet',
    TV = 'tv',
}

export enum DEVICE_OS {
    WINDOWS = 'windows',
    MACOS = 'macos',
    LINUX = 'linux',
    ANDROID = 'android',
    IOS = 'ios',
    OTHER = 'other',
}

export enum DEVICE_ORIENTATION {
    PORTRAIT = 'portrait',
    LANDSCAPE = 'landscape',
}

export enum PLATFORM_MESSAGE {
    GAME_READY = 'game_ready',
    LEVEL_STARTED = 'level_started',
    LEVEL_COMPLETED = 'level_completed',
    LEVEL_FAILED = 'level_failed',
    LEVEL_PAUSED = 'level_paused',
    LEVEL_RESUMED = 'level_resumed',
    IN_GAME_LOADING_STARTED = 'in_game_loading_started',
    IN_GAME_LOADING_STOPPED = 'in_game_loading_stopped',
    GAMEPLAY_STARTED = 'gameplay_started',
    GAMEPLAY_STOPPED = 'gameplay_stopped',
    PLAYER_GOT_ACHIEVEMENT = 'player_got_achievement',
}

export enum INTERSTITIAL_STATE {
    LOADING = 'loading',
    OPENED = 'opened',
    CLOSED = 'closed',
    FAILED = 'failed',
}

export enum REWARDED_STATE {
    LOADING = 'loading',
    OPENED = 'opened',
    CLOSED = 'closed',
    FAILED = 'failed',
    REWARDED = 'rewarded',
}

export enum BANNER_STATE {
    LOADING = 'loading',
    SHOWN = 'shown',
    HIDDEN = 'hidden',
    FAILED = 'failed',
}

export enum BANNER_POSITION {
    TOP = 'top',
    BOTTOM = 'bottom',
}

export enum LEADERBOARD_TYPE {
    NOT_AVAILABLE = 'not_available',
    IN_GAME = 'in_game',
    NATIVE = 'native',
    NATIVE_POPUP = 'native_popup',
}

export enum LAUNCH_SOURCE {
    NOTIFICATION = 'notification',
}

export enum TASK_TYPE {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    PERMANENT = 'permanent',
}

export interface EventEmitter {
    on(eventName: string, callback: (...args: any[]) => void): void;

    once(eventName: string, callback: (...args: any[]) => void): void;

    off(eventName: string, callback?: (...args: any[]) => void): void;
}

export interface SafeAreaInsets {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface LeaderboardEntry {
    id: string;
    name: string;
    score: number;
    rank: number;
    photo: string | null;
}

export interface CatalogProduct {
    id: string;
    price?: string | number;
    priceValue?: number;
    priceCurrencyCode?: string;
    [key: string]: any;
}

export interface Purchase {
    id: string;
    [key: string]: any;
}

export interface Achievement {
    id: string;
    name?: string;
    description?: string;
    unlocked: boolean;
}

export interface Game {
    id?: string;
    name?: string;
    url: string;
    iconUrl?: string;
    coverUrl?: string;
    payload?: any;
}

export interface TaskTarget {
    id: string;
    amount: number;
    progress: number;
    completed: boolean;
}

export interface TaskReward {
    id: string;
    amount: number;
}

export interface Task {
    id: string;
    type: TASK_TYPE;
    targets: TaskTarget[];
    rewards: TaskReward[];
    completed: boolean;
    claimed: boolean;
}

export interface PlatformModule extends EventEmitter {
    id: PLATFORM_ID;
    sdk: any;
    language: string;
    payload: string | null;
    tld: string | null;
    launchSource: LAUNCH_SOURCE | null;

    isAudioEnabled: boolean;
    isPaused: boolean;
    isExternalCallsSupported: boolean;
    isExternalLinksAllowed: boolean;

    sendMessage(message: PLATFORM_MESSAGE | string, options?: any): Promise<any>;

    sendCustomMessage(id: string, options?: any): Promise<any>;

    getServerTime(): Promise<number>;
}

export interface PlayerModule {
    isAuthorizationSupported: boolean;
    isAuthorized: boolean;
    isGuest: boolean;
    id: string | null;
    name: string | null;
    photos: string[];
    extra: Record<string, any>;

    authorize(options?: any): Promise<any>;
}

export interface StorageModule {
    get(key: string | string[], tryParseJson?: boolean): Promise<any>;

    set(key: string | string[], value: any | any[]): Promise<void>;

    delete(key: string | string[]): Promise<void>;
}

export interface AdvertisementModule extends EventEmitter {
    isBannerSupported: boolean;
    bannerState: BANNER_STATE;
    isInterstitialSupported: boolean;
    interstitialState: INTERSTITIAL_STATE;
    isRewardedSupported: boolean;
    rewardedState: REWARDED_STATE;
    rewardedPlacement: string | null;
    isAdvancedBannersSupported: boolean;
    advancedBannersState: BANNER_STATE;
    minimumDelayBetweenInterstitial: number;

    setMinimumDelayBetweenInterstitial(delay: number): void;

    showBanner(position?: BANNER_POSITION, placement?: string): void;

    hideBanner(): void;

    preloadInterstitial(placement?: string): void;

    showInterstitial(placement?: string): void;

    preloadRewarded(placement?: string): void;

    showRewarded(placement?: string): void;

    showAdvancedBanners(placement?: string): void;

    hideAdvancedBanners(): void;

    checkAdBlock(): Promise<boolean>;
}

export interface SocialModule {
    isInviteFriendsSupported: boolean;
    isJoinCommunitySupported: boolean;
    isShareSupported: boolean;
    isCreatePostSupported: boolean;
    isAddToHomeScreenSupported: boolean;
    isAddToHomeScreenRewardSupported: boolean;
    isAddToFavoritesSupported: boolean;
    isAddToFavoritesRewardSupported: boolean;
    isRateSupported: boolean;

    inviteFriends(options?: any): Promise<any>;

    joinCommunity(options?: any): Promise<any>;

    share(options?: any): Promise<any>;

    createPost(options?: any): Promise<any>;

    addToHomeScreen(): Promise<any>;

    getAddToHomeScreenReward(): Promise<any>;

    addToFavorites(): Promise<any>;

    getAddToFavoritesReward(): Promise<any>;

    rate(): Promise<any>;
}

export interface DeviceModule extends EventEmitter {
    type: DEVICE_TYPE;
    os: DEVICE_OS;
    orientation: DEVICE_ORIENTATION | null;
    safeArea: SafeAreaInsets;
}

export interface LeaderboardsModule {
    type: LEADERBOARD_TYPE;

    setScore(id: string, score: number): Promise<any>;

    getEntries(id: string): Promise<LeaderboardEntry[]>;

    showNativePopup(id: string): Promise<any>;
}

export interface PaymentsModule {
    isSupported: boolean;

    purchase(id: string, options?: any): Promise<Purchase>;

    getPurchases(): Promise<Purchase[]>;

    getCatalog(): Promise<CatalogProduct[]>;

    consumePurchase(id: string): Promise<Purchase>;
}

export interface RemoteConfigModule {
    isSupported: boolean;

    setContext(parameters: Record<string, string | number | boolean>): void;

    get(): Promise<any>;
}

export interface ClipboardModule {
    isSupported: boolean;

    read(): Promise<string>;

    write(text: string): Promise<void>;
}

export interface AchievementsModule {
    unlock(id: string): Promise<any>;

    getAchievements(): Promise<Achievement[]>;
}

export interface AnalyticsModule {
    send(eventType: string, data?: Record<string, any>): void;
}

export interface DailyRewardsModule {
    getRewards(): Promise<string[]>;

    getCurrentDay(): Promise<number>;

    getCurrentReward(): Promise<string | null>;

    claimCurrentReward(): Promise<boolean>;
}

export interface TasksModule {
    getTasks(): Promise<Task[]>;

    addProgress(metric: string, amount?: number): Promise<void>;

    claimReward(taskId: string): Promise<boolean>;
}

export interface CrossPromoModule {
    isVisible: boolean;

    getGames(): Promise<Game[]>;

    show(): Promise<void>;

    hide(): void;
}

export interface PlaygamaBridgeInitOptions {
    configFilePath?: string;
    [key: string]: any;
}

export interface PlaygamaBridge extends EventEmitter {
    version: string;
    isInitialized: boolean;
    options: any;
    engine: string;
    gameVersion: string | null;

    platform: PlatformModule;
    player: PlayerModule;
    storage: StorageModule;
    advertisement: AdvertisementModule;
    social: SocialModule;
    device: DeviceModule;
    leaderboards: LeaderboardsModule;
    payments: PaymentsModule;
    remoteConfig: RemoteConfigModule;
    clipboard: ClipboardModule;
    achievements: AchievementsModule;
    analytics: AnalyticsModule;
    dailyRewards: DailyRewardsModule;
    tasks: TasksModule;
    crossPromo: CrossPromoModule;

    readonly PLATFORM_ID: typeof PLATFORM_ID;
    readonly PLATFORM_MESSAGE: typeof PLATFORM_MESSAGE;
    readonly MODULE_NAME: typeof MODULE_NAME;
    readonly EVENT_NAME: typeof EVENT_NAME;
    readonly INTERSTITIAL_STATE: typeof INTERSTITIAL_STATE;
    readonly REWARDED_STATE: typeof REWARDED_STATE;
    readonly BANNER_STATE: typeof BANNER_STATE;
    readonly DEVICE_TYPE: typeof DEVICE_TYPE;
    readonly DEVICE_ORIENTATION: typeof DEVICE_ORIENTATION;
    readonly LAUNCH_SOURCE: typeof LAUNCH_SOURCE;

    initialize(options?: PlaygamaBridgeInitOptions): Promise<void>;

    setGameLoadingProgress(percent: number): void;
}

declare global {
    var bridge: PlaygamaBridge;
}
