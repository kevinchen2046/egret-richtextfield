# egret-RichTextField
  基于白鹭引擎的富文本RichTextField控件
## 例子
  https://kevinchen2046.github.io/egret-RichTextField/
## 如何使用
  ````javascript
  var emoji_static: egret.EmojiPlugin = new egret.EmojiPlugin(new egret.EmojiConfig([
            { key: 1, res: 'PW_png' },
            { key: 2, res: 'PY_png' },
            { key: 3, res: 'QA_png' },
            { key: 4, res: 'RO_png' },
            { key: 5, res: 'RS_png' },
            { key: 6, res: 'RU_png' },
            { key: 7, res: 'RW_png' },
            { key: 8, res: 'SA_png' },
            { key: 9, res: 'SB_png' },
            { key: 10, res: 'SC_png' },
            { key: 11, res: 'SD_png' },
            { key: 12, res: 'SE_png' },
        ], 6, -1));

        var sheet: egret.EmojiSpriteSheet = new egret.EmojiSpriteSheet('emoji_json');
        var emoji_dynamic: egret.EmojiPlugin = new egret.EmojiPlugin(new egret.EmojiAnimationConfig(
            [
                { key: 1, res: { tag: '1', sheet: sheet } },
                { key: 2, res: { tag: '2', sheet: sheet } },
                { key: 3, res: { tag: '3', sheet: sheet } },
                { key: 4, res: { tag: '4', sheet: sheet } },
                { key: 5, res: { tag: '5', sheet: sheet } },
                { key: 6, res: { tag: '6', sheet: sheet } },
                { key: 7, res: { tag: '7', sheet: sheet } },
                { key: 8, res: { tag: '8', sheet: sheet } },
                { key: 9, res: { tag: '9', sheet: sheet } },
                { key: 10, res: { tag: '10', sheet: sheet } },
                { key: 11, res: { tag: '11', sheet: sheet } },
                { key: 12, res: { tag: '12', sheet: sheet } },
                { key: 13, res: { tag: '13', sheet: sheet } },
                { key: 14, res: { tag: '14', sheet: sheet } },
                { key: 15, res: { tag: '15', sheet: sheet } }
            ], 8, -10));


        function getContent(p:egret.EmojiPlugin){
            return `${p.getSymbol(12)}十个相互陌生、${p.getSymbol(8)}身份各异的人受邀前往德文郡海岸边一座孤岛上的豪宅。${p.getSymbol(8)}${p.getSymbol(6)}客人到齐后，主人却没有出现。${p.getSymbol(1)}当晚，${p.getSymbol(5)}一个神秘的声音发出指控，${p.getSymbol(12)}分别说出每个人心中罪恶的秘密。${p.getSymbol(11)}`
        }

        let textfield1 = new egret.RichTextField(emoji_dynamic);
        this.addChild(textfield1);
        textfield1.width = 450;
        textfield1.lineSpacing = 20;
        textfield1.size = 24;
        textfield1.textColor = 0xffffff;
        textfield1.text = getContent(textfield1.emojiPlugin);
        textfield1.height = textfield1.textHeight + 5;
        textfield1.x = this.stage.stageWidth/2-textfield1.width-100;
        textfield1.y = this.stage.stageHeight/2-textfield1.height-100;
        

        let textfield2 = new egret.RichTextField(emoji_dynamic);
        this.addChild(textfield2);
        textfield2.width = 450;
        textfield2.lineSpacing = 20;
        textfield2.size = 24;
        textfield2.textColor = 0xffffff;
        textfield2.bold = true;
        textfield2.italic = true;
        textfield2.stroke = 3;
        textfield2.strokeColor = 0x0;
        textfield2.textFlow = [{
            text: getContent(textfield2.emojiPlugin),
            style: {
                textColor: 0xffff00
            }
        }];
        textfield2.height = textfield2.textHeight + 5;
        textfield2.x = this.stage.stageWidth/2+100;
        textfield2.y = this.stage.stageHeight/2-textfield2.height-100;

        let textfield3 = new egret.RichTextField(emoji_dynamic);
        this.addChild(textfield3);
        textfield3.width = 250;
        textfield3.lineSpacing = 20;
        textfield3.size = 24;
        textfield3.textColor = 0xffffff;
        textfield3.bold = true;
        textfield3.italic = true;
        textfield3.stroke = 3;
        textfield3.strokeColor = 0x0;
        var p=textfield3.emojiPlugin;
        textfield3.text = `${p.getSymbol(1)}${p.getSymbol(2)}${p.getSymbol(3)}${p.getSymbol(4)}${p.getSymbol(5)}${p.getSymbol(6)}${p.getSymbol(7)}${p.getSymbol(8)}${p.getSymbol(9)}${p.getSymbol(10)}${p.getSymbol(11)}${p.getSymbol(12)}${p.getSymbol(13)}${p.getSymbol(14)}${p.getSymbol(15)}`;
        textfield3.height = textfield3.textHeight + 5;
        textfield3.x = this.stage.stageWidth/2-textfield3.width-100;
        textfield3.y = this.stage.stageHeight/2+100;


        let textfield4 = new egret.RichTextField(emoji_static);
        this.addChild(textfield4);
        textfield4.width = 450;
        textfield4.lineSpacing = 20;
        textfield4.size = 24;
        textfield4.textColor = 0xffffff;
        textfield4.bold = true;
        textfield4.italic = false;
        textfield4.stroke = 3;
        textfield4.strokeColor = 0x0;
        textfield4.text = getContent(textfield4.emojiPlugin);
        textfield4.height = textfield4.textHeight + 5;
        textfield4.x = this.stage.stageWidth/2+100;
        textfield4.y = this.stage.stageHeight/2+100;
 ```
