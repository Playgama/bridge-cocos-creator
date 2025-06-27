export enum PLATFORM_ID {
    VK = 'vk',
    OK = 'ok',
    YANDEX = 'yandex',
    CRAZY_GAMES = 'crazy_games',
    ABSOLUTE_GAMES = 'absolute_games',
    GAME_DISTRIBUTION = 'game_distribution',
    PLAYGAMA = 'playgama',
    PLAYDECK = 'playdeck',
    TELEGRAM = 'telegram',
    Y8 = 'y8',
    LAGGED = 'lagged',
    FACEBOOK = 'facebook',
    POKI = 'poki',
    MOCK = 'mock',
    QA_TOOL = 'qa_tool',
    MSN = 'msn',
}

export enum EVENT_NAME {
    INTERSTITIAL_STATE_CHANGED = 'interstitial_state_changed',
    REWARDED_STATE_CHANGED = 'rewarded_state_changed',
    BANNER_STATE_CHANGED = 'banner_state_changed',
    VISIBILITY_STATE_CHANGED = 'visibility_state_changed'
}

export enum STORAGE_TYPE {
    LOCAL_STORAGE = 'local_storage',
    PLATFORM_INTERNAL = 'platform_internal'
}

export enum DEVICE_TYPE {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
    TABLET = 'tablet',
    TV = 'tv',
}

export enum PLATFORM_MESSAGE {
    GAME_READY = 'game_ready',
    IN_GAME_LOADING_STARTED = 'in_game_loading_started',
    IN_GAME_LOADING_STOPPED = 'in_game_loading_stopped',
    GAMEPLAY_STARTED = 'gameplay_started',
    GAMEPLAY_STOPPED = 'gameplay_stopped',
    PLAYER_GOT_ACHIEVEMENT = 'player_got_achievement',
}

export enum VISIBILITY_STATE {
    VISIBLE = 'visible',
    HIDDEN = 'hidden'
}

export enum INTERSTITIAL_STATE {
    LOADING = 'loading',
    OPENED = 'opened',
    CLOSED = 'closed',
    FAILED = 'failed'
}

export enum REWARDED_STATE {
    LOADING = 'loading',
    OPENED = 'opened',
    CLOSED = 'closed',
    FAILED = 'failed',
    REWARDED = 'rewarded'
}

export enum BANNER_STATE {
    LOADING = 'loading',
    SHOWN = 'shown',
    HIDDEN = 'hidden',
    FAILED = 'failed'
}

export enum LEADERBOARD_TYPE {
    NOT_AVAILABLE = 'not_available',
    IN_GAME = 'in_game',
    NATIVE = 'native',
}

export enum BANNER_POSITION{
    TOP = 'top',
    BOTTOM = 'bottom'
}


export interface ModuleBase {
    constructor(platformBridge: any);

    _platformBridge: any;

    initialize(): any;
}

export interface DeviceModule extends ModuleBase {
    type: DEVICE_TYPE;
}

export interface AdvertisementModule extends ModuleBase {
    isBannerSupported: boolean;
    bannerState: BANNER_STATE;
    interstitialState: INTERSTITIAL_STATE;
    rewardedState: REWARDED_STATE;
    minimumDelayBetweenInterstitial: number;

    setMinimumDelayBetweenInterstitial(delay: number): void;

    showBanner(position?: BANNER_POSITION, placement?: string): void;

    hideBanner(): void;

    showInterstitial(placement?: string): void;

    showRewarded(placement?: string): void;

    checkAdBlock(): Promise<boolean>;

    on(event: string, listener: (...args: any[]) => void): this;

    once(event: string, listener: (...args: any[]) => void): this;

    off(event: string, listener: (...args: any[]) => void): this;

    emit(event: string, ...args: any[]): boolean;
}

export interface RemoteConfigModule extends ModuleBase {
   isSupported: boolean;
   get(options): any;
}

export interface LeaderboardsModule extends ModuleBase {
    type: LEADERBOARD_TYPE;

    setScore(id: string, score: number): any;

    getEntries(id: string): any;
}

export interface StorageModule extends ModuleBase {
    defaultType: STORAGE_TYPE;

    isSupported(options: any): boolean | any;

    isAvailable(options: any): boolean | any;

    get(key: string|string[]): any | Promise<unknown>;

    set(key: string|string[], value: any, options?: any): any;

    delete(key: string|string[], options?: any): any;
}

export interface SocialModule extends ModuleBase {
    isInviteFriendsSupported: boolean;
    isJoinCommunitySupported: boolean;
    isShareSupported: boolean;
    isCreatePostSupported: boolean;
    isAddToHomeScreenSupported: boolean;
    isAddToFavoritesSupported: boolean;
    isRateSupported: boolean;
    isExternalLinksAllowed: boolean;

    inviteFriends(options?: any): any | Promise<never>;

    joinCommunity(options: any): any | Promise<never>;

    share(options: any): any | Promise<never>;

    createPost(options: any): any | Promise<never>;

    addToHomeScreen(): any | Promise<never>;

    addToFavorites(): any | Promise<never>;

    rate(): any | Promise<never>;
}

export interface GameModule extends ModuleBase {
    visibilityState: VISIBILITY_STATE;

    on(event: string, listener: (...args: any[]) => void): this;

    once(event: string, listener: (...args: any[]) => void): this;

    off(event: string, listener: (...args: any[]) => void): this;

    emit(event: string, ...args: any[]): boolean;
}

export interface PlatformModule extends ModuleBase {
    id: string;
    sdk: unknown;
    language: string;
    payload: unknown;
    tld: string;

    isGetAllGamesSupported: boolean;
    isGetGameByIdSupported: boolean;

    sendMessage(message: string): any | Promise<any>;
    sendMessage(message: PLATFORM_MESSAGE): Promise<any>;

    getServerTime(): Promise<number>;

    getAllGames(): Promise<any>;

    getGameById(options?: any): Promise<any>;
}

export interface PlayerModule extends ModuleBase {
    isAuthorizationSupported: boolean;
    isAuthorized: boolean;
    id: number | string;
    name: string;
    photos: string[];

    authorize(options?: any): Promise<any>;
}

export interface AchievementsModule extends ModuleBase {
    isSupported: boolean;
    isGetListSupported: boolean;
    isNativePopupSupported: boolean;

    unlock(options?: any): any | Promise<any>;
    getList(options?: any): any | Promise<any>;
    showNativePopup(options?: any): any | Promise<any>;
}

export interface ClipboardModule extends ModuleBase {
    isSupported: boolean;

    read(): Promise<string>;

    write(text: string): Promise<void>;
}

export interface PaymentsModule extends ModuleBase {
    isSupported: boolean;

    purchase(id: string): Promise<any>;

    getPurchases(): Promise<any>;

    getCatalog(): Promise<any>;

    consumePurchase(id: string): Promise<any>;
}

export interface PlaygamaBridge {
    version: string;
    isInitialized: boolean;
    platform: PlatformModule;
    player: PlayerModule;
    game: GameModule;
    storage: StorageModule;
    advertisement: AdvertisementModule;
    achievements: AchievementsModule;
    social: SocialModule;
    device: DeviceModule;
    leaderboards: LeaderboardsModule;
    remoteConfig: RemoteConfigModule;
    clipboard: ClipboardModule;
    payments: PaymentsModule;
    initialize(): any | Promise<void>;
}

declare global {
    var bridge: PlaygamaBridge;
    var platformMessage: PLATFORM_MESSAGE;
}
