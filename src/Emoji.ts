module egret {
    export class EmojiPlugin {
        private _regexp: RegExp;
        private _match: string;
        private _config: { key: number, symbol: string, res: string | Texture, reg: RegExp }[];
        private _pool: {};
        private _symbolBegin: string = '[';
        private _symbolEnd: string = ']';
        /** 
         * @param config key:
         */
        constructor(config: { key: number, res: string | Texture }[], match: string = "__") {
            this._config = config as { key: number, symbol: string, res: string | Texture, reg: RegExp }[];
            this._match = match;
            this._pool = {};

            this._config.forEach((v) => {
                v.symbol = `${this._symbolBegin}${v.key}${this._symbolEnd}`
                v.reg = new RegExp(`${v.symbol}`);
            });
        }

        public get match(){
            return this._match;
        }

        public getSymbol(key: number): string {
            for (var object of this._config) {
                if (object.key == key) return object.symbol;
            }
        }

        private search(text: string) {
            var index: number = -1;
            for (var object of this._config) {
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

        public parser(text) {
            var emojis = [];
            while (true) {
                var index = this.search(text);
                if (index == -1) {
                    break;
                }
                var symbol = text.substring(index, text.indexOf(this._symbolEnd, index) + 1);
                var key = symbol.substring(1, symbol.length - 1);
                text = text.replace(symbol, this._match);

                emojis.push({
                    key: key,
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
            for (var object of this._config) {
                if (object.key == key) return object;
            }
            return null;
        }

        public fromEmoji(key: number) {
            if (this._pool[key] && this._pool[key].length) {
                return this._pool[key].pop();
            }
            var config = this.getConfig(key);
            return new Emoji(config.res);
        }

        public toEmoji(key: number, emoji: egret.Emoji) {
            if (!this._pool[key]) {
                this._pool[key] = [];
            }
            if (emoji.parent) {
                emoji.parent.removeChild(emoji);
            }
            this._pool[key].push(emoji);
        }
    }

    export class Emoji extends Bitmap {
        constructor(res: string | Texture) {
            var texture: Texture;
            if (res instanceof Texture) {
                texture = res;
            }
            super(texture);
            if (!texture) {
                RES.getResAsync(res as string, (texture) => {
                    this.texture = texture;
                }, this);
            }
        }
    }
}