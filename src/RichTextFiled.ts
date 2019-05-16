module egret {

    export class RichTextField extends egret.DisplayObjectContainer {
        private _textfiled: TextField;
        private _emojiplugin: EmojiPlugin;
        private _emojisMcs: { key: number, emoji: Emoji }[];
        private _richText: { result: string, emojis: { key: number, index: number }[] };
        private _matchWidth: number;
        /** 
        * 富文本
        * @param emoji 表情插件
        */
        constructor(emoji: EmojiPlugin) {
            super();
            this._textfiled = new TextField();
            this.addChild(this._textfiled);
            this._emojiplugin = emoji;
            this._emojisMcs = [];
        }

        public get emojiPlugin() {
            return this._emojiplugin;
        }

        public set width(value: number) {
            this._textfiled.width = value;
        }

        public get width(): number {
            return this._textfiled.width;
        }

        public set height(value: number) {
            this._textfiled.height = value;
        }

        public get height(): number {
            return this._textfiled.height;
        }

        public get textWidth(): number {
            return this._textfiled.textWidth;
        }

        public get textHeight(): number {
            return this._textfiled.textHeight;
        }

        public set text(value: string) {
            this._matchWidth = egret.sys.measureText(this._emojiplugin.match, this.fontFamily, this.size, this.bold, this.italic)
            this._richText = this._emojiplugin.parser(value);
            this._textfiled.text = this._richText.result;
            egret.callLater(this.updateEmojis, this);
        }

        public get text(): string {
            return this._textfiled.text;
        }

        public set textFlow(v: ITextElement[]) {
            this._matchWidth = egret.sys.measureText(this._emojiplugin.match, this.fontFamily, this.size, this.bold, this.italic)
            this._richText = { result: '', emojis: [] };
            var length: number = 0;
            for (var element of v) {
                var object = this._emojiplugin.parser(element.text);
                element.text = object.result;
                this._richText.result += object.result;
                for (var emoji of object.emojis) {
                    emoji.index += length
                    this._richText.emojis.push(emoji)
                }
                length += element.text.length;
            }
            this._textfiled.textFlow = v;
            egret.callLater(this.updateEmojis, this);
        }

        public get textFlow(): ITextElement[] {
            return this._textfiled.textFlow;
        }

        public set textAlign(value: string) {
            this._textfiled.textAlign = value;
        }
        public get textAlign(): string {
            return this._textfiled.textAlign;
        }

        public set size(value: number) {
            this._textfiled.size = value;
        }
        public get size(): number {
            return this._textfiled.size;
        }

        public set textColor(value: number) {
            this._textfiled.textColor = value;
        }
        public get textColor(): number {
            return this._textfiled.textColor;
        }

        public set stroke(value: number) {
            this._textfiled.stroke = value;
        }
        public get stroke(): number {
            return this._textfiled.stroke;
        }

        public set strokeColor(value: number) {
            this._textfiled.strokeColor = value;
        }
        public get strokeColor(): number {
            return this._textfiled.strokeColor;
        }

        public set lineSpacing(value: number) {
            this._textfiled.lineSpacing = value;
        }
        public get lineSpacing(): number {
            return this._textfiled.lineSpacing;
        }

        public set bold(value: boolean) {
            this._textfiled.bold = value;
        }
        public get bold(): boolean {
            return this._textfiled.bold;
        }

        public set italic(value: boolean) {
            this._textfiled.italic = value;
        }
        public get italic(): boolean {
            return this._textfiled.italic;
        }

        public set fontFamily(value: string) {
            this._textfiled.fontFamily = value;
        }
        public get fontFamily(): string {
            return this._textfiled.fontFamily;
        }

        public set emojis(value: { index: number, key: number }[]) {
            if (!this._richText) {
                this._richText = { result: '', emojis: null };
            }
            this._richText.emojis = value;
            egret.callLater(this.updateEmojis, this);
        }

        public add(value: { index: number, key: number }) {
            if (!this._richText) {
                this._richText = { result: '', emojis: [] };
            }
            this._richText.emojis.push(value);
            egret.callLater(this.updateEmojis, this);
        }

        public remove(value: { index: number, key: number }) {
            var that=this;
            if (that._richText && that._richText.emojis && that._richText.emojis.length) {
                for (var i = 0; i < that._richText.emojis.length; i++) {
                    if (that._richText.emojis[i].index == value.index && that._richText.emojis[i].key == value.key) {
                        that._richText.emojis.splice(i, 1);
                        break;
                    }
                }
                egret.callLater(that.updateEmojis, that);
            }
        }

        private clearEmojis() {
            while (this._emojisMcs.length) {
                var object = this._emojisMcs.pop();
                this._emojiplugin.toEmoji(object.key, object.emoji);
            }
        }

        private updateEmojis() {
            var that = this;
            var textfiled = that._textfiled;
            var plugin = that._emojiplugin;
            var mcs = that._emojisMcs;
            var fontFamily = that.fontFamily;
            var size = that.size;
            var bold = that.bold;
            var italic = that.italic;

            that.clearEmojis();
            var lines = textfiled.$getLinesArr();
            var matchLength: number = (plugin.match.length / 2) >> 0;
            var lineHeight: number = (textfiled.textHeight + textfiled.lineSpacing) / textfiled.numLines;
            for (var data of that._richText.emojis) {
                var emoji: Emoji = plugin.fromEmoji(data.key);
                that.addChild(emoji);
                var frontText = that._richText.result.substring(0, data.index + matchLength);
                var lineIndex: number = 0;
                var charNum: number = 0;
                for (var i = 0; i < lines.length; i++) {
                    var charLength: number = lines[i].elements[0].text.length;
                    if (frontText.length < (charNum + charLength)) {
                        lineIndex = i;
                        break;
                    }
                    charNum += charLength;
                }
                emoji.y = lineIndex * lineHeight + plugin.offY;
                frontText = frontText.substring(charNum, frontText.length);
                emoji.x = egret.sys.measureText(frontText, fontFamily, size, bold, italic) + plugin.offX - that._matchWidth / 2;

                mcs.push({
                    key: data.key,
                    emoji: emoji
                });
            }
        }
    }
    export interface IEmojiConfig {
        key: number,
        symbol?: string,
        res: string | Texture
    }
    export interface IEmojiAnimationConfig {
        key: number,
        symbol?: string,
        res: { tag: string, sheet: EmojiSpriteSheet }
    }
    export class EmojiConfig {
        public offx: number;
        public offy: number;
        public value: IEmojiConfig[];
        constructor(value: IEmojiConfig[], offx?: number, offy?: number) {
            this.value = value;
            this.offx = offx;
            this.offy = offy;
        }
    }
    export class EmojiAnimationConfig {
        public offx: number;
        public offy: number;
        public value: IEmojiAnimationConfig[];
        /** 
         * @param value 动画表情配置集合 
         * {key} 表情置换唯一键值 
         * {res} 资源描述 {tag 当前表情标识 sheet 当前表情图集 } 表情资源的命名规则:{{tag}_{...}_{oreder}.png
         * @param offX 表情实际显示的偏移位置X
         * @param offY 表情实际显示的偏移位置Y
         */
        constructor(value: IEmojiAnimationConfig[], offx?: number, offy?: number) {
            this.value = value;
            this.offx = offx;
            this.offy = offy;
        }
    }
    export class EmojiPlugin {
        private _emojiClazz: any;
        //匹配符
        private _match: string;
        //表情配置
        private _config: EmojiConfig | EmojiAnimationConfig;
        //表情缓存
        private _pool: Emoji[];
        //符号开始
        private _symbolBegin: string = '[';
        //符号结束
        private _symbolEnd: string = ']';
        private _ticker:{add:(caller:any,method:Function,fps:number,...args)=>void,remove:(caller:any,method:Function)=>void};
        /** 
         * 表情管理插件 当前类需要以单例形式处理
         * @param config 表情配置 key:唯一数字标识 res:表情资源
         * @param match 占位符 通常情况可设置为2个空格 具体视表情资源尺寸而定
         */
        constructor(config: EmojiConfig | EmojiAnimationConfig, matchtotal: number = -1) {
            this._config = config;
            if(matchtotal!=-1){
               this._match= this.getMatchChar(matchtotal)
            }else{
               this._match=this.getMatchChar((config instanceof EmojiAnimationConfig) ? 2 : 1);
            }
            this._pool = [];
            this._emojiClazz = (config instanceof EmojiAnimationConfig) ? EmojiAnimation : EmojiBitmap;
            for (var v of this._config.value) {
                v.symbol = `${this._symbolBegin}${v.key}${this._symbolEnd}`
            }
        }

        private getMatchChar(total:number){
            var result:string='';
            while(total--){
                result+=String.fromCharCode(12288);
            }
            return result;
        }

        public get offX() {
            return this._config.offx;
        }

        public get offY() {
            return this._config.offy;
        }

        public get match() {
            return this._match;
        }

        public getSymbol(key: number): string {
            for (var object of this._config.value) {
                if (object.key == key) return object.symbol;
            }
        }

        private search(text: string) {
            var index: number = -1;
            for (var object of this._config.value) {
                var i: number = text.indexOf(object.symbol);
                if (i >= 0) {
                    if (index == -1) {
                        index = i;
                    } else {
                        index = Math.min(i, index);
                    }
                }
            }
            return index;
        }

        /**解析文本 */
        public parser(text: string) {
            var emojis: {
                key: number,
                symbol: string,
                index: number
            }[] = [];
            while (true) {
                var index = this.search(text);
                if (index == -1) {
                    break;
                }
                var symbol = text.substring(index, text.indexOf(this._symbolEnd, index) + 1);
                var key = symbol.substring(1, symbol.length - 1);
                text = text.replace(symbol, this._match);

                emojis.push({
                    key: parseInt(key),
                    symbol: symbol,
                    index: index
                });
            }
            return {
                result: text,
                emojis: emojis
            };
        }

        private getConfig(key: number) {
            for (var object of this._config.value) {
                if (object.key == key) return object;
            }
            return null;
        }

        /**表情缓存出池 */
        public fromEmoji(key: number) {
            var config = this.getConfig(key);
            if (this._pool.length) {
                return this._pool.pop().initialize(config.res);
            }
            return new (this._emojiClazz)().initialize(config.res,this);
        }

        /**表情缓存入池 */
        public toEmoji(key: number, emoji: egret.Emoji) {
            emoji.reset();
            if (emoji.parent) {
                emoji.parent.removeChild(emoji);
            }
            this._pool.push(emoji);
        }

        /**注册表情渲染触发器 */
        public register(ticker:{add:(caller:any,method:Function,fps:number,...args)=>void,remove:(caller:any,method:Function)=>void}){
            this._ticker=ticker;
        }
        
        public getTicker(){
            return this._ticker;
        }
    }

    export class Emoji extends Bitmap {
        /** 
         * 当前表情显示对象 如有需要可扩展成动态表情显示
         * @param res 表情资源
         */
        constructor() {
            super(null);
        }

        public initialize(...args) {
            return this;
        }

        public reset() {
            return this;
        }
    }

    export class EmojiBitmap extends Emoji {
        /** 
         * 当前表情显示对象 如有需要可扩展成动态表情显示
         * @param res 表情资源
         */
        constructor() {
            super();
        }

        public initialize(res: string | Texture) {
            var texture: Texture;
            if (res instanceof Texture) {
                this.texture = res;
            }
            if (!texture) {
                RES.getResAsync(res as string, (texture) => {
                    this.texture = texture;
                }, this);
            }
            return this;
        }

        public reset() {
            this.texture = null;
            return this;
        }
    }

    export class EmojiAnimation extends Emoji {
        private _intervalId: number;
        private _frames: Texture[];
        private _index: number;
        private _plugin:EmojiPlugin;
        /** 
         * 当前表情显示对象 如有需要可扩展成动态表情显示
         * @param res 表情资源
         */
        constructor() {
            super();
            this.scaleX = this.scaleY = 1.2;
        }

        public initialize(res: { tag: string, sheet: EmojiSpriteSheet },plugin?:EmojiPlugin) {
            this._plugin=plugin;
            res.sheet.getFramesAsync(res.tag, (frames: Texture[]) => {
                this.texture = frames[0];
                this._frames = frames;
                this._index = 0;
                this.play();
            });
            return this;
        }

        public reset() {
            this.stop();
            this._plugin=null;
            return this;
        }

        public play() {
            if(this._plugin&&this._plugin.getTicker()){
                this._plugin.getTicker().add(this,this.render,12);
                return;
            }
            this._intervalId = egret.setInterval(this.render, this, 1000 / 12);
        }

        public stop() {
            if(this._plugin&&this._plugin.getTicker()){
                this._plugin.getTicker().remove(this,this.render);
                return;
            }
            if (this._intervalId) {
                egret.clearInterval(this._intervalId);
                this._intervalId = 0;
            }
        }

        private render() {
            this._index++;
            if (this._index >= this._frames.length) {
                this._index = 0;
            }
            this.texture = this._frames[this._index];
        }
    }


    export class EmojiSpriteSheet {
        private _spritesheet: SpriteSheet;
        private _map: any;
        private _completes: { tag: string, method: Function }[];
        constructor(sheetname: string) {
            RES.getResAsync(sheetname, (res: SpriteSheet) => {
                var map: any = {};
                var textures: any = res._textureMap;
                for (var key in textures) {
                    var array = key.split('_');
                    var tag: string = array[0];
                    var tail: string = array[array.length - 1];
                    if (!map[tag]) {
                        map[tag] = [];
                    }
                    map[tag].push({ order: this.getOrder(tail), texture: textures[key] });
                }
                this._map = {};
                for (var tag in map) {
                    var frames = map[tag];
                    frames.sort((a, b) => {
                        return a.order > b.order ? 1 : -1;
                    });
                    this._map[tag] = [];
                    frames.forEach((v) => {
                        this._map[tag].push(v.texture);
                    });
                }
                this._spritesheet = res;
                if (this._completes) {
                    for (var object of this._completes) {
                        object.method(this.getFrames(object.tag));
                    }
                    this._completes.length = 0;
                }
            }, this);
        }

        private getOrder(name) {
            var end = name.length - 1; var start = 0; var i = end;
            while (i >= 0) {
                if (isNaN(parseInt(name.charAt(i)))) { i++; break; }
                start = i; i--;
            }
            return parseInt(name.substring(start, end + 1));
        }

        public getFrames(tag: string) {
            return this._map[tag];
        }

        public getFramesAsync(tag: string, method: Function) {
            if (!!this._map) {
                method(this.getFrames(tag));
                return;
            }
            if (!this._completes) {
                this._completes = [];
            }
            this._completes.push({ tag: tag, method: method });
        }
    }
}