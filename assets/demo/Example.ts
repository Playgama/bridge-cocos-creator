import { _decorator, Component, EditBox, Node, RichText } from 'cc';
import { BANNER_STATE, INTERSTITIAL_STATE, REWARDED_STATE } from '../../extensions/playgama-bridge/PlaygamaBridge';
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
    @property(RichText)
    interstitialState: RichText;

    private _lastRewardedStates: REWARDED_STATE[] = [];
    @property(RichText)
    rewardedState: RichText;


    @property(EditBox)
    delayInputField: EditBox;


     @property(RichText)
    adBlockDetectedText: RichText;

    start() {

        bridge.advertisement.on('bannerStateChanged', this.onBannerStateChanged.bind(this));
        bridge.advertisement.on('interstitialStateChanged', this.onInterstitialStateChanged.bind(this));
        bridge.advertisement.on('rewardedStateChanged', this.onRewardedStateChanged.bind(this));

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
    }

    sendGameReadyMessage() {
        // bridge.platform.sendMessage(bridge.platform)
        //     .then(() => {
        //         console.log("Game ready message sent.");
        //     })
        //     .catch((error) => {
        //         console.error("Failed to send game ready message:", error);
        //     });


        bridge.platform.sendMessage('game_ready')
            .then(() => {
                console.log("Game ready message sent.");
            })
            .catch((error) => {
                console.error("Failed to send game ready message:", error);
            });
        
    }

    sendInGameLoadingStartedMessage() {
        bridge.platform.sendMessage('in_game_loading_started')
            .then(() => {
                console.log("In-game loading started message sent.");
            })
            .catch((error) => {
                console.error("Failed to send in-game loading started message:", error);
            });
    }

    sendInGameLoadingStoppedMessage() {
        bridge.platform.sendMessage('in_game_loading_stopped')
            .then(() => {
                console.log("In-game loading stopped message sent.");
            })
            .catch((error) => {
                console.error("Failed to send in-game loading stopped message:", error);
            });
    }

    sendGameplayStartedMessage() {
        bridge.platform.sendMessage('gameplay_started')
            .then(() => {
                console.log("Gameplay started message sent.");
            })
            .catch((error) => {
                console.error("Failed to send gameplay started message:", error);
            });
    }

    sendGameplayStoppedMessage() {
        bridge.platform.sendMessage('gameplay_stopped')
            .then(() => {
                console.log("Gameplay stopped message sent.");
            })
            .catch((error) => {
                console.error("Failed to send gameplay stopped message:", error);
            });
    }

    sendPlayerGotAchievementMessage() {
        bridge.platform.sendMessage('player_got_achievement')
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
    
        bridge.advertisement.showBanner(options);
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
}
