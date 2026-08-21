import { _decorator, Component, EditBox, Node, RichText } from 'cc';
import { BANNER_STATE, INTERSTITIAL_STATE, REWARDED_STATE, PLATFORM_MESSAGE, EVENT_NAME, BANNER_POSITION } from '../../extensions/playgama-bridge/playgama-bridge.ts';
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


    @property(EditBox)
    achievementIdInputField: EditBox;
    @property(EditBox)
    achievementNameInputField: EditBox;

    @property(EditBox)
    sendMessageOptionsInputField: EditBox;

    @property(EditBox)
    taskMetricInputField: EditBox;
    @property(EditBox)
    taskAmountInputField: EditBox;
    @property(EditBox)
    taskIdInputField: EditBox;
    @property(RichText)
    tasksResultText: RichText;

    @property(RichText)
    dailyRewardsResultText: RichText;

    @property(RichText)
    notificationsResultText: RichText;




    start() {

        bridge.advertisement.on(EVENT_NAME.BANNER_STATE_CHANGED, this.onBannerStateChanged.bind(this));
        bridge.advertisement.on(EVENT_NAME.INTERSTITIAL_STATE_CHANGED, this.onInterstitialStateChanged.bind(this));
        bridge.advertisement.on(EVENT_NAME.REWARDED_STATE_CHANGED, this.onRewardedStateChanged.bind(this));

        this.platformIDText.string = 'ID: ' + bridge.platform.id;
        this.languageText.string = 'Language: ' + bridge.platform.language;
        this.payloadText.string = 'Payload: ' + bridge.platform.payload;
        this.tldText.string = 'TLD: ' + bridge.platform.tld;


        this.isAuthorizationSupported.string = 'Is authorization supported: ' + bridge.player.isAuthorizationSupported;
        this.isAuthorized.string = 'Is authorized: ' + bridge.player.isAuthorized;

        this.deviceType.string = 'Device type: ' + bridge.device.type;

        this.isBannerSupported.string = 'Is banner supported: ' + bridge.advertisement.isBannerSupported;


        this.isShareSupported.string = 'Is share supported: ' + bridge.social.isShareSupported;
        this.isInviteFriendsSupported.string = 'Is invite friends supported: ' + bridge.social.isInviteFriendsSupported;
        this.isJoinCommunitySupported.string = 'Is join community supported: ' + bridge.social.isJoinCommunitySupported;
        this.isCreatePostSupported.string = 'Is create post supported: ' + bridge.social.isCreatePostSupported;
        this.isAddToHomeScreenSupported.string = 'Is add to home screen supported: ' + bridge.social.isAddToHomeScreenSupported;
        this.isAddToFavoritesSupported.string = 'Is add to favorites supported: ' + bridge.social.isAddToFavoritesSupported;
        this.isRateSupported.string = 'Is rate supported: ' + bridge.social.isRateSupported;
        this.isExternalLinksAllowed.string = 'Is external links allowed: ' + bridge.platform.isExternalLinksAllowed;

        this.leaderboardsType.string = 'Leaderboards Type: ' + bridge.leaderboards.type;

        this.isPaymentsSupported.string = 'Is payments supported: ' + bridge.payments.isSupported;

        this.isRemoteConfigSupported.string = 'Is remote config supported: ' + bridge.remoteConfig.isSupported;
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

    private getLevelMessageOptions() {
        const input = this.sendMessageOptionsInputField?.string;
        if (!input) return {};
        try {
            return JSON.parse(input);
        } catch (e) {
            console.error("Invalid JSON in options field:", e);
            return {};
        }
    }

    sendLevelStartedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.LEVEL_STARTED, this.getLevelMessageOptions())
            .then(() => {
                console.log("Level started message sent.");
            })
            .catch((error) => {
                console.error("Failed to send level started message:", error);
            });
    }

    sendLevelCompletedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.LEVEL_COMPLETED, this.getLevelMessageOptions())
            .then(() => {
                console.log("Level completed message sent.");
            })
            .catch((error) => {
                console.error("Failed to send level completed message:", error);
            });
    }

    sendLevelFailedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.LEVEL_FAILED, this.getLevelMessageOptions())
            .then(() => {
                console.log("Level failed message sent.");
            })
            .catch((error) => {
                console.error("Failed to send level failed message:", error);
            });
    }

    sendLevelPausedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.LEVEL_PAUSED, this.getLevelMessageOptions())
            .then(() => {
                console.log("Level paused message sent.");
            })
            .catch((error) => {
                console.error("Failed to send level paused message:", error);
            });
    }

    sendLevelResumedMessage() {
        bridge.platform.sendMessage(PLATFORM_MESSAGE.LEVEL_RESUMED, this.getLevelMessageOptions())
            .then(() => {
                console.log("Level resumed message sent.");
            })
            .catch((error) => {
                console.error("Failed to send level resumed message:", error);
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
        this._lastInterstitialStates.push(state);

        if (this._lastInterstitialStates.length > 3) {
            this._lastInterstitialStates.splice(0, this._lastInterstitialStates.length - 3);
        }

        this.interstitialState.string = `Last Interstitial States: ${this._lastInterstitialStates.join(" → ")}`;
    }

    onRewardedStateChanged(state: REWARDED_STATE) {
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
        // Pass canonical content fields ("text", "image", "url"); the bridge maps them
        // to each platform (e.g. VK uses "url" as the share link). Platform-specific
        // defaults can also be set in playgama-bridge-config.json under "social".
        const options: Record<string, any> = {
            text: "Check out this game!",
            url: "YOUR_GAME_URL",
        };

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

        // Canonical "text"/"url"; the bridge assembles the platform-native post (e.g.
        // OK builds its media attachment). "status" (publish to profile) can be set
        // per-platform in playgama-bridge-config.json under "social".
        const options: Record<string, any> = {
            text: "I'm playing this game!",
            url: "YOUR_GAME_URL",
        };

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

    onShowNativePopupButtonClicked() {

        var leaderboardId = "YOUR_LEADERBOARD_ID";

        bridge.leaderboards.showNativePopup(leaderboardId)
            .then(() => {

            })
            .catch(error => {
                console.error("Show native popup failed:", error);
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
        if (bridge.platform.id === "yandex") {
            bridge.remoteConfig.setContext({
                levels: "5",
            });
        }

        bridge.remoteConfig.get()
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

        // Platform-specific data is resolved from the achievements
        // section of playgama-bridge-config.json by the game-level id
        bridge.achievements.unlock("YOUR_ACHIEVEMENT_ID")
            .then(() => {
                console.log("OnUnlockCompleted, success: true");
            })
            .catch(error => {
                console.error("OnUnlockCompleted, success: false", error);
            });
    }

    onGetListButtonClicked() {

        bridge.achievements.getAchievements()
            .then((list: any[]) => {
                console.log("OnGetListCompleted, success: true, items:");

                for (const item of list) {
                    console.log("id:", item["id"]);
                    console.log("name:", item["name"]);
                    console.log("description:", item["description"]);
                    console.log("unlocked:", item["unlocked"]);
                }
            })
            .catch(error => {
                console.error("OnGetListCompleted, success: false", error);

            });
    }

    onGetTasksButtonClicked() {

        bridge.tasks.getTasks()
            .then((tasks: any[]) => {
                console.log("OnGetTasksCompleted, success: true, tasks:");

                const lines: string[] = [];
                for (const task of tasks) {
                    console.log("id:", task["id"], "type:", task["type"], "completed:", task["completed"], "claimed:", task["claimed"]);
                    lines.push(task["id"] + " (" + task["type"] + ") completed: " + task["completed"] + " claimed: " + task["claimed"]);

                    for (const target of task["targets"]) {
                        console.log("  target:", target["id"], target["progress"] + "/" + target["amount"]);
                        lines.push("  " + target["id"] + ": " + target["progress"] + "/" + target["amount"]);
                    }
                }

                if (this.tasksResultText) {
                    this.tasksResultText.string = lines.length > 0 ? lines.join("\n") : "no tasks";
                }
            })
            .catch(error => {
                console.error("OnGetTasksCompleted, success: false", error);
                if (this.tasksResultText) {
                    this.tasksResultText.string = "getTasks error: " + error;
                }
            });
    }

    onAddProgressButtonClicked() {

        // Reads the input fields when wired; otherwise falls back to defaults.
        const metric = this.taskMetricInputField?.string || "enemy_killed";
        const amount = parseInt(this.taskAmountInputField?.string) || 1;

        // addProgress resolves without data; read updated state via getTasks()
        bridge.tasks.addProgress(metric, amount)
            .then(() => {
                console.log("OnAddProgressCompleted, success: true");
                if (this.tasksResultText) {
                    this.tasksResultText.string = "added +" + amount + " to '" + metric + "'";
                }
            })
            .catch(error => {
                console.error("OnAddProgressCompleted, success: false", error);
                if (this.tasksResultText) {
                    this.tasksResultText.string = "addProgress error: " + error;
                }
            });
    }

    onClaimRewardButtonClicked() {

        // Reads the input field when wired; otherwise falls back to a default.
        const taskId = this.taskIdInputField?.string || "daily_kills";

        // claimReward resolves to a boolean; rewards to grant are on task.rewards
        bridge.tasks.claimReward(taskId)
            .then((claimed: boolean) => {
                console.log("OnClaimRewardCompleted, claimed:", claimed);
                if (this.tasksResultText) {
                    this.tasksResultText.string = "claim '" + taskId + "': " + claimed;
                }
            })
            .catch(error => {
                console.error("OnClaimRewardCompleted, success: false", error);
                if (this.tasksResultText) {
                    this.tasksResultText.string = "claimReward error: " + error;
                }
            });
    }

    onGetRewardsButtonClicked() {

        bridge.dailyRewards.getRewards()
            .then((rewards: string[]) => {
                console.log("OnGetRewardsCompleted, success: true, rewards:");

                const lines: string[] = [];
                for (const reward of rewards) {
                    console.log("reward:", reward);
                    lines.push(reward);
                }

                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = lines.length > 0 ? lines.join("\n") : "no rewards";
                }
            })
            .catch(error => {
                console.error("OnGetRewardsCompleted, success: false", error);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "getRewards error: " + error;
                }
            });
    }

    onGetCurrentDayButtonClicked() {

        bridge.dailyRewards.getCurrentDay()
            .then((day: number) => {
                console.log("OnGetCurrentDayCompleted, day:", day);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "current day: " + day;
                }
            })
            .catch(error => {
                console.error("OnGetCurrentDayCompleted, success: false", error);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "getCurrentDay error: " + error;
                }
            });
    }

    onGetCurrentRewardButtonClicked() {

        bridge.dailyRewards.getCurrentReward()
            .then((reward: string | null) => {
                console.log("OnGetCurrentRewardCompleted, reward:", reward);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "current reward: " + (reward !== null ? reward : "none");
                }
            })
            .catch(error => {
                console.error("OnGetCurrentRewardCompleted, success: false", error);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "getCurrentReward error: " + error;
                }
            });
    }

    onClaimCurrentRewardButtonClicked() {

        bridge.dailyRewards.claimCurrentReward()
            .then((claimed: boolean) => {
                console.log("OnClaimCurrentRewardCompleted, claimed:", claimed);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "claimed: " + claimed;
                }
            })
            .catch(error => {
                console.error("OnClaimCurrentRewardCompleted, success: false", error);
                if (this.dailyRewardsResultText) {
                    this.dailyRewardsResultText.string = "claimCurrentReward error: " + error;
                }
            });
    }

    onNotificationsScheduleButtonClicked() {

        if (!bridge.notifications.isSupported) {
            if (this.notificationsResultText) {
                this.notificationsResultText.string = "notifications are not supported";
            }
            return;
        }

        bridge.notifications.schedule({
            id: "come_back",
            title: "Ready for another round?",
            description: "Jump back in right where you left off.",
            delaySeconds: 86400,
            payload: "come_back",
        })
            .then(() => {
                console.log("OnNotificationsScheduleCompleted, success: true");
                if (this.notificationsResultText) {
                    this.notificationsResultText.string = "notification scheduled";
                }
            })
            .catch(error => {
                console.error("OnNotificationsScheduleCompleted, success: false", error);
                if (this.notificationsResultText) {
                    this.notificationsResultText.string = "schedule error: " + error;
                }
            });
    }

    onNotificationsCancelButtonClicked() {

        bridge.notifications.cancel("come_back")
            .then(() => {
                console.log("OnNotificationsCancelCompleted, success: true");
                if (this.notificationsResultText) {
                    this.notificationsResultText.string = "notification canceled";
                }
            })
            .catch(error => {
                console.error("OnNotificationsCancelCompleted, success: false", error);
                if (this.notificationsResultText) {
                    this.notificationsResultText.string = "cancel error: " + error;
                }
            });
    }

    onNotificationsCancelAllButtonClicked() {

        bridge.notifications.cancelAll()
            .then(() => {
                console.log("OnNotificationsCancelAllCompleted, success: true");
                if (this.notificationsResultText) {
                    this.notificationsResultText.string = "all notifications canceled";
                }
            })
            .catch(error => {
                console.error("OnNotificationsCancelAllCompleted, success: false", error);
                if (this.notificationsResultText) {
                    this.notificationsResultText.string = "cancel all error: " + error;
                }
            });
    }



}
