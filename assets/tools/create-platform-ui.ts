import {
    _decorator, Component, Node, Label, EditBox, Button, ScrollView,
    UITransform, Layout, Sprite, UIOpacity, Color, director
} from 'cc';

const { ccclass, executeInEditMode } = _decorator;

@ccclass('PlatformUIBuilder')
@executeInEditMode
export class PlatformUIBuilder extends Component {

    onLoad() {
        if (!this.node || this.node.getChildByName('ScrollView')) return;

        const scrollViewNode = new Node('ScrollView');
        scrollViewNode.setPosition(0, 0);
        const scrollViewTransform = scrollViewNode.addComponent(UITransform);
        scrollViewTransform.setContentSize(600, 800);
        const scrollView = scrollViewNode.addComponent(ScrollView);
        this.node.addChild(scrollViewNode);

        const content = new Node('Content');
        const contentTransform = content.addComponent(UITransform);
        contentTransform.setContentSize(600, 2000);
        const layout = content.addComponent(Layout);
        layout.type = Layout.Type.VERTICAL;
        layout.spacingY = 10;
        layout.resizeMode = Layout.ResizeMode.CONTAINER;
        scrollView.content = content;
        scrollViewNode.addChild(content);

        const addLabel = (text: string) => {
            const node = new Node('Label');
            const label = node.addComponent(Label);
            label.string = text;
            label.fontSize = 20;
            label.color = Color.WHITE;
            return node;
        };

        const addButton = (text: string) => {
            const node = new Node('Button');
            node.addComponent(Sprite);
            node.addComponent(Button);
            node.addComponent(UITransform).setContentSize(400, 50);

            const label = new Node('Label');
            const labelComp = label.addComponent(Label);
            labelComp.string = text;
            labelComp.fontSize = 18;
            label.setParent(node);
            label.setPosition(0, 0);

            return node;
        };

        const addEditBox = (placeholder: string) => {
            const node = new Node('EditBox');
            node.addComponent(Sprite);
            node.addComponent(EditBox);
            node.addComponent(UITransform).setContentSize(400, 50);
            const editBox = node.getComponent(EditBox)!;
            editBox.placeholder = placeholder;
            if (editBox.textLabel) editBox.textLabel.fontSize = 18;
            if (editBox.placeholderLabel) editBox.placeholderLabel.fontSize = 18;
            return node;
        };

        // SECTION 1: Platform Info
        content.addChild(addLabel("ID:"));
        content.addChild(addLabel("Language:"));
        content.addChild(addLabel("Payload:"));
        content.addChild(addLabel("TLD:"));
        content.addChild(addLabel("Is Get All Games Supported:"));
        content.addChild(addLabel("Is Get Game By ID Supported:"));

        // SECTION 2: Input
        content.addChild(addEditBox("Game ID"));

        // SECTION 3: Buttons
        content.addChild(addButton("Send Game Ready Message"));
        content.addChild(addButton("Send In-Game Loading Started Message"));
        content.addChild(addButton("Send In-Game Loading Stopped Message"));
        content.addChild(addButton("Send Gameplay Started Message"));
        content.addChild(addButton("Send Gameplay Stopped Message"));
        content.addChild(addButton("Send Player Got Achievement Message"));

        // SECTION 4: Server Time
        content.addChild(addLabel("Server Time (UTC): -"));
        content.addChild(addButton("Get Server Time"));

        // SECTION 5: Game APIs
        content.addChild(addButton("Get All Games"));
        content.addChild(addButton("Get Game By ID"));

        // Overlay (used during async loading)
        const overlay = new Node("Overlay");
        overlay.addComponent(Sprite);
        overlay.addComponent(UITransform).setContentSize(600, 800);
        overlay.addComponent(UIOpacity).opacity = 160;
        overlay.active = false;
        this.node.addChild(overlay);

        console.log("✅ Platform UI created.");
    }
}
