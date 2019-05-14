module egret{
    
    export class RichTextField extends egret.DisplayObjectContainer{
        private _textfiled:TextField;
        private _emojiplugin:EmojiPlugin;
        private _emojisData:{index:number,key:number}[];
        private _emojisMcs:{key:number,emoji:Emoji}[];
        private _richText:{result:string,emojis:{key: number,index: number}[]};
        private _matchWidth:number;
        /** 
        * 富文本
        * @param emoji 表情插件
        */
        constructor(emoji:EmojiPlugin){
            super();
            this._textfiled=new TextField();
            this.addChild(this._textfiled);
            this._emojiplugin=emoji;
            this._emojisMcs=[];
        }
        
        public set width(value:number){
            this._textfiled.width=value;
        }
        
        public get width():number{
            return this._textfiled.width;
        }

        public set height(value:number){
            this._textfiled.height=value;
        }
        
        public get height():number{
            return this._textfiled.height;
        }
        
        public get textWidth():number{
            return this._textfiled.textWidth;
        }
        
        public get textHeight():number{
            return this._textfiled.textHeight;
        }

        public set text(value:string){
            this._matchWidth=egret.sys.measureText(this._emojiplugin.match,this.fontFamily,this.size,this.bold,this.italic)
            this._richText=this._emojiplugin.parser(value);
            this._textfiled.text=this._richText.result;
            this.emojis=this._richText.emojis;
        }

        public get text():string{
            return this._textfiled.text;
        }

        public set textAlign(value:string){
            this._textfiled.textAlign=value;
        }
        public get textAlign():string{
            return this._textfiled.textAlign;
        }

        public set size(value:number){
            this._textfiled.size=value;
        }
        public get size():number{
            return this._textfiled.size;
        }

        public set textColor(value:number){
            this._textfiled.textColor=value;
        }
        public get textColor():number{
            return this._textfiled.textColor;
        }

        public set bold(value:boolean){
            this._textfiled.bold=value;
        }
        public get bold():boolean{
            return this._textfiled.bold;
        }

        public set italic(value:boolean){
            this._textfiled.italic=value;
        }
        public get italic():boolean{
            return this._textfiled.italic;
        }

        public set fontFamily(value:string){
            this._textfiled.fontFamily=value;
        }
        public get fontFamily():string{
            return this._textfiled.fontFamily;
        }

        public set emojis(value:{index:number,key:number}[]){
            this._emojisData=value;
            egret.callLater(this.updateEmojis,this);
        }

        public add(value:{index:number,key:number}){
            this._emojisData.push(value);
            egret.callLater(this.updateEmojis,this);
        }

        public remove(value:{index:number,key:number}){
            for(var i=0;i<this._emojisData.length;i++){
                if(this._emojisData[i].index==value.index&&this._emojisData[i].key==value.key){
                    this._emojisData.splice(i,1);
                    break;
                }
            }
            egret.callLater(this.updateEmojis,this);
        }

        private clearEmojis(){
            while(this._emojisMcs.length){
                var object=this._emojisMcs.pop();
                this._emojiplugin.toEmoji(object.key,object.emoji);
            }
        }

        private updateEmojis(){
            this.clearEmojis();
            var lines=this._textfiled.$getLinesArr();
            var lineHeight:number=this._textfiled.textHeight/this._textfiled.numLines;
            for(var data of this._emojisData){
                var emoji:Emoji=this._emojiplugin.fromEmoji(data.key);
                this.addChild(emoji);
                var frontText=this._richText.result.substring(0,data.index);
                var lastCharNum:number=frontText.length;
                var lineIndex:number=0;
                var charNum:number=0;
                for(var i=0;i<lines.length;i++){
                    var charLength:number=lines[i].elements[0].text.length;
                    if(frontText.length<(charNum+charLength)){
                        lastCharNum=frontText.length-charNum
                        lineIndex=i;
                        break;
                    }
                    charNum+=charLength;
                }
                emoji.y=lineIndex*lineHeight;
                frontText=frontText.substr(frontText.length-lastCharNum,lastCharNum);
                var off:number=(emoji.width>0)?(this._matchWidth-emoji.width)/2:0;
                emoji.x=egret.sys.measureText(frontText,this.fontFamily,this.size,this.bold,this.italic)+off;

                this._emojisMcs.push({
                    key:data.key,
                    emoji:emoji
                });
            }
        }
    }
}