import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AdsButton')
export class AdsButton extends Component {
    showInterstitial() {
        bridge.advertisement.showInterstitial();
    }

    showRewarded() {
        bridge.advertisement.showRewarded();
    }
}

