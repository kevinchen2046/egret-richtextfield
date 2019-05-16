//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        });
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")

    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

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
        textfield1.width = 250;

        textfield1.lineSpacing = 20;
        textfield1.size = 24;
        textfield1.textColor = 0xffffff;
        textfield1.x = 122;
        textfield1.y = 135;
        textfield1.text = getContent(textfield1.emojiPlugin);
        textfield1.height = textfield1.textHeight + 5;

        let textfield2 = new egret.RichTextField(emoji_dynamic);
        this.addChild(textfield2);
        textfield2.width = 450;
        textfield2.lineSpacing = 20;
        textfield2.size = 24;
        textfield2.textColor = 0xffffff;
        textfield2.x = 472;
        textfield2.y = 135;
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

        let textfield3 = new egret.RichTextField(emoji_dynamic);
        this.addChild(textfield3);
        textfield3.width = 250;
        textfield3.lineSpacing = 20;
        textfield3.size = 24;
        textfield3.textColor = 0xffffff;
        textfield3.x = 122;
        textfield3.y = 635;
        textfield3.bold = true;
        textfield3.italic = true;
        textfield3.stroke = 3;
        textfield3.strokeColor = 0x0;
        var p=textfield3.emojiPlugin;
        textfield3.text = `${p.getSymbol(1)}${p.getSymbol(2)}${p.getSymbol(3)}${p.getSymbol(4)}${p.getSymbol(5)}${p.getSymbol(6)}${p.getSymbol(7)}${p.getSymbol(8)}${p.getSymbol(9)}${p.getSymbol(10)}${p.getSymbol(11)}${p.getSymbol(12)}${p.getSymbol(13)}${p.getSymbol(14)}${p.getSymbol(15)}`;
        textfield3.height = textfield3.textHeight + 5;


        let textfield4 = new egret.RichTextField(emoji_static);
        this.addChild(textfield4);
        textfield4.width = 450;
        textfield4.lineSpacing = 20;
        textfield4.size = 24;
        textfield4.textColor = 0xffffff;
        textfield4.x = 472;
        textfield4.y = 635;
        textfield4.bold = true;
        textfield4.italic = false;
        textfield4.stroke = 3;
        textfield4.strokeColor = 0x0;
        textfield4.text = getContent(textfield4.emojiPlugin);
        textfield4.height = textfield4.textHeight + 5;
    }
}