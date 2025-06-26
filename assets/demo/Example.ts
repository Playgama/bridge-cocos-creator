import { _decorator, Component, EditBox, Node, RichText } from 'cc';
import { VISIBILITY_STATE,BANNER_STATE, INTERSTITIAL_STATE, REWARDED_STATE, STORAGE_TYPE, PLATFORM_MESSAGE, ACTION_NAME, EVENT_NAME, BANNER_POSITION } from '../../extensions/playgama-bridge/playgama-bridge.ts';
const { ccclass, property } = _decorator;

@ccclass('Example')
export class Example extends Component {

    @property(RichText)
    platformIDText: RichText;
    @property(RichText)
    languageText: RichText;
    @property(RichText)
    payloadText: RichText;
    @property(RichText)
    tldText: RichText;
    @property(RichText)
    serverTime: RichText;
    @property(RichText)
    isGetAllGamesSupported: RichText;
    @property(RichText)
    isGetGameByIdSupported: RichText;
    @property(EditBox)
    gameIdInputField: EditBox;
    @property(RichText)
    isAuthorizationSupported: RichText;
    @property(RichText)
    isAuthorized: RichText;
    @property(RichText)
    id: RichText;
    @property(RichText)
    playerName: RichText;
    @property(RichText)
    photos: RichText;
    @property(RichText)
    deviceType: RichText;
    @property(RichText)
    isBannerSupported: RichText;
    private _lastBannerStates: BANNER_STATE[] = [];
    @property(RichText)
    bannerState: RichText;

    private _lastInterstitialStates: INTERSTITIAL_STATE[] = [];

    private rewardedStateNew: REWARDED_STATE;

    @property(RichText)
    interstitialState: RichText;

    private _lastRewardedStates: REWARDED_STATE[] = [];
    @property(RichText)
    rewardedState: RichText;


    @property(EditBox)
    delayInputField: EditBox;


    @property(RichText)
    adBlockDetectedText: RichText;

    @property(RichText)
    defaultTypeText: RichText;
    @property(RichText)
    isLocalStorageSupportedText: RichText;
    @property(RichText)
    isPlatformInternalSupportedText: RichText;
    @property(RichText)
    isLocalStorageAvailableText: RichText;
    @property(RichText)
    isPlatformInternalAvailableText: RichText;
    @property(EditBox)
    coinsInputField: EditBox;
    @property(EditBox)
    levelInputField: EditBox;

    private readonly coinsKey = "coins";
    private readonly levelKey = "level";


    @property(RichText)
    isShareSupported: RichText;
    @property(RichText)
    isInviteFriendsSupported: RichText;
    @property(RichText)
    isJoinCommunitySupported: RichText;
    @property(RichText)
    isCreatePostSupported: RichText;
    @property(RichText)
    isAddToHomeScreenSupported: RichText;
    @property(RichText)
    isAddToFavoritesSupported: RichText;
    @property(RichText)
    isRateSupported: RichText;
    @property(RichText)
    isExternalLinksAllowed: RichText;

    @property(RichText)
    leaderboardsType: RichText;

    @property(RichText)
    isPaymentsSupported: RichText;

    @property(RichText)
    isRemoteConfigSupported: RichText;


    @property(RichText)
    isAchievementSupported: RichText;
    @property(RichText)
    isAchievementGetListSupported: RichText;
    @property(RichText)
    isAchievementNativePopupSupported: RichText;

    @property(EditBox)
    achievementIdInputField: EditBox;
    @property(EditBox)
    achievementNameInputField: EditBox;





    start() {

        bridge.advertisement.on(EVENT_NAME.BANNER_STATE_CHANGED, this.onBannerStateChanged.bind(this));
        bridge.advertisement.on(EVENT_NAME.INTERSTITIAL_STATE_CHANGED, this.onInterstitialStateChanged.bind(this));
        bridge.advertisement.on(EVENT_NAME.REWARDED_STATE_CHANGED, this.onRewardedStateChanged.bind(this));

        this.platformIDText.string = 'ID: ' + bridge.platform.id;
        this.languageText.string = 'Language: ' + bridge.platform.language;
        this.payloadText.string = 'Payload: ' + bridge.platform.payload;
        this.tldText.string = 'TLD: ' + bridge.platform.tld;
        this.isGetAllGamesSupported.string = 'Is get all games supported: ' + bridge.platform.isGetAllGamesSupported;
        this.isGetGameByIdSupported.string = 'Is get game by id supported: ' + bridge.platform.isGetGameByIdSupported;


        this.isAuthorizationSupported.string = 'Is authorization supported: ' + bridge.player.isAuthorizationSupported;
        this.isAuthorized.string = 'Is authorized: ' + bridge.player.isAuthorized;

        // this.id.string = 'ID: ' + bridge.player.id;
        // this.playerName.string = 'Player name: ' + bridge.player.name;
        // this.photos.string = 'Photo: ' + bridge.player.photos;

        this.deviceType.string = 'Device type: ' + bridge.device.type;

        this.isBannerSupported.string = 'Is banner supported: ' + bridge.advertisement.isBannerSupported;

        this.defaultTypeText.string = 'Default type: ' + bridge.storage.defaultType;

        console.log('Local = ', STORAGE_TYPE.LOCAL_STORAGE);
        console.log('Platform internal = ', STORAGE_TYPE.PLATFORM_INTERNAL);

        this.isLocalStorageSupportedText.string = 'Is local storage supported: ' + bridge.storage.isSupported(STORAGE_TYPE.LOCAL_STORAGE);
        this.isPlatformInternalSupportedText.string = 'Is platform internal supported: ' + bridge.storage.isSupported(STORAGE_TYPE.PLATFORM_INTERNAL);
        this.isLocalStorageAvailableText.string = 'Is local storage available: ' + bridge.storage.isAvailable(STORAGE_TYPE.LOCAL_STORAGE);
        this.isPlatformInternalAvailableText.string = 'Is platform internal available: ' + bridge.storage.isAvailable(STORAGE_TYPE.PLATFORM_INTERNAL);

        this.isShareSupported.string = 'Is share supported: ' + bridge.social.isShareSupported;
        this.isInviteFriendsSupported.string = 'Is invite friends supported: ' + bridge.social.isInviteFriendsSupported;
        this.isJoinCommunitySupported.string = 'Is join community supported: ' + bridge.social.isJoinCommunitySupported;
        this.isCreatePostSupported.string = 'Is create post supported: ' + bridge.social.isCreatePostSupported;
        this.isAddToHomeScreenSupported.string = 'Is add to home screen supported: ' + bridge.social.isAddToHomeScreenSupported;
        this.isAddToFavoritesSupported.string = 'Is add to favorites supported: ' + bridge.social.isAddToFavoritesSupported;
        this.isRateSupported.string = 'Is rate supported: ' + bridge.social.isRateSupported;
        this.isExternalLinksAllowed.string = 'Is external links allowed: ' + bridge.social.isExternalLinksAllowed;

        this.leaderboardsType.string = 'Leaderboards Type: ' + bridge.leaderboards.type;

        this.isPaymentsSupported.string = 'Is payments supported: ' + bridge.payments.isSupported;

        this.isRemoteConfigSupported.string = 'Is remote config supported: ' + bridge.remoteConfig.isSupported;

        this.isAchievementSupported.string = 'Is achievement supported: ' + bridge.achievements.isSupported;
        this.isAchievementNativePopupSupported.string = 'Is achievement native popup supported: ' + bridge.achievements.isNativePopupSupported;
        this.isAchievementGetListSupported.string = 'Is achievement get list supported: ' + bridge.achievements.isGetListSupported;

        // this.visibilityState.string = 'Visibility state: ' + bridge.game.visibilityState;
        console.log("Default storage type: ", bridge.storage.defaultType);
    }

    sendGameReadyMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.GAME_READY)
            .then(() => {
                console.log("Game ready message sent.");
            })
            .catch((error) => {
                console.error("Failed to send game ready message:", error);
            });


    }

    sendInGameLoadingStartedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.IN_GAME_LOADING_STARTED)
            .then(() => {
                console.log("In-game loading started message sent.");
            })
            .catch((error) => {
                console.error("Failed to send in-game loading started message:", error);
            });
    }

    sendInGameLoadingStoppedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.IN_GAME_LOADING_STOPPED)
            .then(() => {
                console.log("In-game loading stopped message sent.");
            })
            .catch((error) => {
                console.error("Failed to send in-game loading stopped message:", error);
            });
    }

    sendGameplayStartedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.GAMEPLAY_STARTED)
            .then(() => {
                console.log("Gameplay started message sent.");
            })
            .catch((error) => {
                console.error("Failed to send gameplay started message:", error);
            });
    }

    sendGameplayStoppedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.GAMEPLAY_STOPPED)
            .then(() => {
                console.log("Gameplay stopped message sent.");
            })
            .catch((error) => {
                console.error("Failed to send gameplay stopped message:", error);
            });
    }

    sendPlayerGotAchievementMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.PLAYER_GOT_ACHIEVEMENT)
            .then(() => {
                console.log("Player got achievement message sent.");
            })
            .catch((error) => {
                console.error("Failed to send player got achievement message:", error);
            });
    }

    getServerTime(){
        bridge.platform.getServerTime()
            .then((time) => {
                console.log("Server time: ", time);
                this.serverTime.string = 'Server time:(UTC) ' + time;
            })
            .catch((error) => {
                console.error("Failed to get server time:", error);
            });
    }

    onVisibilityStateChanged(state: VISIBILITY_STATE) {
        console.log("Visibility state changed: ", state);
    }


    getAllGames(){
        bridge.platform.getAllGames()
            .then((games) => {
                console.log("All games: ", games);
            })
            .catch((error) => {
                console.error("Failed to get all games:", error);
            });
    }

    async getGamyById() {
        const gameId = this.gameIdInputField.string;
        try {
            const game = await bridge.platform.getGameById({ gameId });
            console.log(`onGetGameByIdCompleted, success: true, game:`);
            console.log(`App ID: ${game["appID"]}`);
            console.log(`Title: ${game["title"]}`);
            console.log(`URL: ${game["url"]}`);
            console.log(`Cover URL: ${game["coverURL"]}`);
            console.log(`Icon URL: ${game["iconURL"]}`);
        } catch (error) {
            console.error(`onGetGameByIdCompleted, success: false, error:`, error);
        }
    }

    async authorize() {

        const options: Record<string, any> = {};
        if (bridge.platform.id === "yandex") {
            options.scopes = true;
        }

        try {
            await bridge.player.authorize(options);
            this.updateValues();
            console.log("Authorization successful.");
        } catch (error) {
            console.error("Authorization failed:", error);
        }

    }

    updateValues() {
        this.isAuthorizationSupported.string = `Is Authorization Supported: ${bridge.player.isAuthorizationSupported}`;
        this.isAuthorized.string = `Is Authorized: ${bridge.player.isAuthorized}`;
        this.id.string = `ID: ${bridge.player.id}`;
        this.playerName.string = `Name: ${bridge.player.name}`;

        if (bridge.player.photos.length > 0) {
            this.photos.string = `Photo: ${bridge.player.photos[0]}`;
        }
    }

    onShowBannerButtonClicked() {
        const options: Record<string, any> = {};

        switch (bridge.platform.id) {
            case "vk":
                options.position = "bottom";
                options.layoutType = "resize";
                options.canClose = false;
                break;
        }

        bridge.advertisement.showBanner(BANNER_POSITION.BOTTOM);
    }

    onHideBannerButtonClicked() {
        bridge.advertisement.hideBanner();
    }

    onShowInterstitialButtonClicked() {
        bridge.advertisement.showInterstitial();
    }

    onShowRewardedButtonClicked() {
        bridge.advertisement.showRewarded();
    }


    onBannerStateChanged(state: BANNER_STATE) {
        this._lastBannerStates.push(state);

        if (this._lastBannerStates.length > 3) {
            this._lastBannerStates.splice(0, this._lastBannerStates.length - 3);
        }

        this.bannerState.string = `Last Banner States: ${this._lastBannerStates.join(" → ")}`;
    }

    onSetMinimumDelayBetweenInterstitialButtonClicked() {
        const delay = parseInt(this.delayInputField.string);
        bridge.advertisement.setMinimumDelayBetweenInterstitial(delay);
    }

    onInterstitialStateChanged(state: INTERSTITIAL_STATE) {
        // console.log("Interstitial state: ", state);
        switch (state) {
            case 'loading':
                break;

            case 'closed':
            case 'failed':
                break;
        }

        this._lastInterstitialStates.push(state);

        if (this._lastInterstitialStates.length > 3) {
            this._lastInterstitialStates.splice(0, this._lastInterstitialStates.length - 3);
        }

        this.interstitialState.string = `Last Interstitial States: ${this._lastInterstitialStates.join(" → ")}`;
    }

    onRewardedStateChanged(state: REWARDED_STATE) {

        console.log("Rewarded state: ", state);
        switch (state) {
            case 'loading':
                break;

            case 'closed':
            case 'failed':
                break;
        }

        this._lastRewardedStates.push(state);

        if (this._lastRewardedStates.length > 3) {
            this._lastRewardedStates.splice(0, this._lastRewardedStates.length - 3);
        }

        this.rewardedState.string = `Last Rewarded States: ${this._lastRewardedStates.join(" → ")}`;
    }

    async onCheckAdBlockButtonClicked() {
        try {
            const isAdBlockDetected = await bridge.advertisement.checkAdBlock();
            this.adBlockDetectedText.string = `AdBlock Detected: ${isAdBlockDetected}`;
        } catch (error) {
            console.error("Failed to check AdBlock:", error);
        }
    }

    async onSetStorageDataButtonClicked() {

        const coins = parseInt(this.coinsInputField.string) || 0;
        const level = this.levelInputField.string;

        try {
            await bridge.storage.set(
                [this.coinsKey, this.levelKey],
                [coins, level]
            );
        } catch (error) {
            console.error("Failed to set storage data:", error);
        }

    }

    async onGetStorageDataButtonClicked() {


        const keys = [this.coinsKey, this.levelKey];

        try {
            const data = await bridge.storage.get(keys);

            const coins = parseInt(data[0]) || 0;
            this.coinsInputField.string = coins.toString();

            this.levelInputField.string = data[1] ?? "default_level";
        } catch (error) {
            console.error("Failed to get storage data:", error);
            this.coinsInputField.string = "0";
            this.levelInputField.string = "default_level";
        }

    }

    async onDeleteStorageDataButtonClicked() {

        const keys = [this.coinsKey, this.levelKey];

        try {
            await bridge.storage.delete(keys);
        } catch (error) {
            console.error("Failed to delete storage data:", error);
        }

        this.coinsInputField.string = '';
        this.levelInputField.string = '';
    }

    onShareButtonClicked() {
        const options: Record<string, any> = {};

        if (bridge.platform.id === "vk") {
            options.link = "YOUR_LINK";
        }

        bridge.social.share(options)
            .then(() => {
                // Optionally handle success
                console.log("Share successful");
            })
            .catch(error => {
                console.error("Share failed:", error);
            });

    }

    async onInviteFriendsButtonClicked() {


        const options: Record<string, any> = {};
        if (bridge.platform.id === "ok") {
            options.text = "Hello World!";
        }

        try {
            await bridge.social.inviteFriends(options);
        } catch (error) {
            console.error("Invite friends failed:", error);
        }


    }

    async onJoinCommunityButtonClicked() {


        const options: Record<string, any> = {};
        if (bridge.platform.id === "vk") {
            options.groupId = 199747461;
        } else if (bridge.platform.id === "ok") {
            options.groupId = 62984239710374;
        }

        try {
            await bridge.social.joinCommunity(options);
        } catch (error) {
            console.error("Join community failed:", error);
        }


    }

    async onAddToFavoritesButtonClicked() {


        try {
            await bridge.social.addToFavorites();
        } catch (error) {
            console.error("Add to favorites failed:", error);
        }


    }

    async onAddToHomeScreenButtonClicked() {


        try {
            await bridge.social.addToHomeScreen();
        } catch (error) {
            console.error("Add to home screen failed:", error);
        }


    }

    async onCreatePostButtonClicked() {

        const options: Record<string, any> = {};

        if (bridge.platform.id === "vk") {
            options.message = "Hello World!";
            options.attachments = "photo-199747461_457239629";
        } else if (bridge.platform.id === "ok") {
            options.media = [
                {
                    type: "text",
                    text: "Hello World!",
                },
                {
                    type: "link",
                    url: "https://apiok.ru",
                },
                {
                    type: "poll",
                    question: "Do you like our API?",
                    answers: [
                        { text: "Yes" },
                        { text: "No" },
                    ],
                    options: "SingleChoice,AnonymousVoting",
                },
            ];
        }

        try {
            await bridge.social.createPost(options);
        } catch (error) {
            console.error("Create post failed:", error);
        }


    }

    async onRateButtonClicked() {
        try {
            await bridge.social.rate();
        } catch (error) {
            console.error("Rate failed:", error);
        }
    }

    onSetScoreButtonClicked() {

        var leaderboardId = "YOUR_LEADERBOARD_ID";
        var score = 42;

        bridge.leaderboards.setScore(leaderboardId, score)
            .then(() => {

            })
            .catch(error => {
                console.error("Set score failed:", error);
            });

    }

    onGetEntriesButtonClicked() {

        var leaderboardId = "YOUR_LEADERBOARD_ID";

        bridge.leaderboards.getEntries(leaderboardId)
            .then(entries => {
                console.log(`OnGetEntriesCompleted, success: true, entries:`);

                for (const entry of entries) {
                    console.log("ID:", entry["id"]);
                    console.log("Score:", entry["score"]);
                    console.log("Rank:", entry["rank"]);
                    console.log("Name:", entry["name"]);
                    console.log("Photo:", entry["photo"]);
                }
            })
            .catch(error => {
                console.error("Get entries failed:", error);
            });
    }

    onGetCatalogButtonClicked() {

        bridge.payments.getCatalog()
            .then((list: any[]) => {
                console.log("OnGetCatalogCompleted, success: true, items:");
                for (const item of list) {
                    console.log("Common ID:", item["commonId"]);
                    console.log("Price:", item["price"]);
                    console.log("Price Currency Code:", item["priceCurrencyCode"]);
                    console.log("Price Value:", item["priceValue"]);
                }
            })
            .catch(error => {
                console.error("OnGetCatalogCompleted, success: false", error);
            })
            .then(() => {

            });
    }

    onGetPurchasesButtonClicked() {

        bridge.payments.getPurchases()
            .then((list: any[]) => {
                console.log("OnGetPurchasesCompleted, success: true, items:");
                for (const purchase of list) {
                    console.log("Common ID:", purchase["commonId"]);
                }
            })
            .catch(error => {
                console.error("OnGetPurchasesCompleted, success: false", error);
            })
            .then(() => {

            });
    }

    onPurchaseButtonClicked() {

        bridge.payments.purchase("test_product")
            .then(() => {
                console.log("OnPurchaseCompleted, success: true");
            })
            .catch(error => {
                console.error("OnPurchaseCompleted, success: false", error);
            })
            .then(() => {

            });
    }

    onConsumePurchaseButtonClicked() {

        bridge.payments.consumePurchase("test_product")
            .then(() => {
                console.log("OnConsumePurchaseCompleted, success: true");
            })
            .catch(error => {
                console.error("OnConsumePurchaseCompleted, success: false", error);
            })
            .then(() => {

            });
    }

    onGetRemoteConfigButtonClicked() {
        const options: Record<string, any> = {};

        if (bridge.platform.id === "yandex") {
            options.clientFeatures = [
                {
                    name: "levels",
                    value: "5",
                },
            ];
        }

        bridge.remoteConfig.get(options)
            .then((values: Record<string, string>) => {
                console.log("OnRemoteConfigGetCompleted, success: true, items:");
                for (const key in values) {
                    if (Object.prototype.hasOwnProperty.call(values, key)) {
                        console.log(`key: ${key}, value: ${values[key]}`);
                    }
                }
            })
            .catch(error => {
                console.error("OnRemoteConfigGetCompleted, success: false", error);
            });
    }

    onUnlockButtonClicked() {

        const options: Record<string, any> = {};
        switch (bridge.platform.id) {
            case "y8":
                options.achievement = "YOUR_ACHIEVEMENT_NAME";
                options.achievementkey = "YOUR_ACHIEVEMENT_KEY";
                break;
            case "lagged":
                options.achievement = "YOUR_ACHIEVEMENT_ID";
                break;
        }

        bridge.achievements.unlock(options)
            .then(() => {
                console.log("OnUnlockCompleted, success: true");
            })
            .catch(error => {
                console.error("OnUnlockCompleted, success: false", error);
            });
    }

    onShowAchievementNativePopupButtonClicked() {

        const options: Record<string, any> = {};

        bridge.achievements.showNativePopup(options)
            .then(() => {
                console.log("OnShowNativePopupCompleted, success: true");
            })
            .catch(error => {
                console.error("OnShowNativePopupCompleted, success: false", error);
            });
    }

    onGetListButtonClicked() {

        const options: Record<string, any> = {};

        bridge.achievements.getList(options)
            .then((list: any[]) => {
                console.log("OnGetListCompleted, success: true, items:");

                if (bridge.platform.id === "y8") {
                    for (const item of list) {
                        console.log("achievementid:", item["achievementid"]);
                        console.log("achievement:", item["achievement"]);
                        console.log("achievementkey:", item["achievementkey"]);
                        console.log("description:", item["description"]);
                        console.log("icon:", item["icon"]);
                        console.log("difficulty:", item["difficulty"]);
                        console.log("secret:", item["secret"]);
                        console.log("awarded:", item["awarded"]);
                        console.log("game:", item["game"]);
                        console.log("link:", item["link"]);
                        console.log("playerid:", item["playerid"]);
                        console.log("playername:", item["playername"]);
                        console.log("lastupdated:", item["lastupdated"]);
                        console.log("date:", item["date"]);
                        console.log("rdate:", item["rdate"]);
                    }
                }
            })
            .catch(error => {
                console.error("OnGetListCompleted, success: false", error);

            });
    }



}
