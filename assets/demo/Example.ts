import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property(RichText)
    platformIDText: RichText;
    @property(RichText)
    languageText: RichText;
    @property(RichText)
    payloadText: RichText;
    @property(RichText)
    tldText: RichText;


    start() {
        this.platformIDText.string = 'ID: ' + bridge.platform.id;
        this.languageText.string = 'Language: ' + bridge.platform.language;
        this.payloadText.string = 'Payload: ' + bridge.platform.payload;
        this.tldText.string = 'TLD: ' + bridge.platform.tld;
    
    }

    sendGameReadyMessage() {
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
        bridge.platform.sendMessage('player_got_achievement');
    }

}

