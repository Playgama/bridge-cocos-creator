import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Initialization')
export class Initialization extends Component {

    start() {
        console.log('Inside Game platform id');
        console.log(bridge.platform.id);
        console.log('Achievements supported: ' + bridge.achievements.isSupported);
        console.log('Achievements getList supported: ' + bridge.achievements.isGetListSupported);
        console.log('Achievements showNativePopup supported: ' + bridge.achievements.isNativePopupSupported);

        console.log('LeaderBoard : ' + bridge.leaderboard.isSupported);

        console.log('Device' + bridge.device.type);
        console.log('Payments' + bridge.payments.isSupported);
        console.log('Get purchases' + bridge.payments.getPurchases());
        console.log('Get catalog' + bridge.payments.getCatalog());
        console.log('Get server time' + bridge.platform.getServerTime());
    }
}

