function Agent(x,y,width,height, direction, framesPerDirectionUnit, animationSpeed, location, path) {

    this.spriteToRender = null;
    this.path = path;

    this.upTextures = null;
    this.downTextures = null;
    this.leftTextures = null;
    this.rightTextures = null;
    this.location = location;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentDirection = direction;
    this.animationSpeed = animationSpeed;
    this.animatedSpriteFramesTillMoveDoneConst = framesPerDirectionUnit;
    this.animatedSpriteFramesTillMoveDone = framesPerDirectionUnit;
    this.animatedSpriteMoveSpeed = height / this.animatedSpriteFramesTillMoveDoneConst;

    this.loadTextures = function(upTexture, downTexture, leftTexture, rightTexture) {
        this.upTextures = upTexture;
        this.downTextures = downTexture;
        this.leftTextures = leftTexture;
        this.rightTextures = rightTexture;
        this.spriteToRender = new PIXI.AnimatedSprite(this.downTextures);
        this.spriteToRender.x = this.x;
        this.spriteToRender.y = this.y;
        this.spriteToRender.width = this.width;
        this.spriteToRender.height = this.height;
        this.spriteToRender.animationSpeed = this.animationSpeed;
        this.location.addChild(this.spriteToRender);
        this.spriteToRender.play();
    }

    this.replaceSprite = function(sprite, newTexture, location) {

        let width = sprite.width;
        let height= sprite.height;
        let x     = sprite.x;
        let y     = sprite.y;
        let aSpeed= sprite.animationSpeed;

        sprite.destroy();
        let newSprite = new PIXI.AnimatedSprite(newTexture);
        
        newSprite.x     = x;
        newSprite.y     = y;
        newSprite.width = width;
        newSprite.height= height;
        newSprite.animationSpeed = aSpeed;
        
        location.addChild(newSprite);
        newSprite.play();

        return newSprite;
    }

    this.move = (direction) => {
        if (direction == this.animatedSpriteDirection) {
            this.animatedSpriteFramesTillMoveDone = this.animatedSpriteFramesTillMoveDoneConst;
            return;
        }
        switch(direction) {
            case "Left":
                this.spriteToRender = this.replaceSprite(this.spriteToRender, this.leftTextures, this.location);
                break; 
            case "Right":
                this.spriteToRender = this.replaceSprite(this.spriteToRender, this.rightTextures, this.location);
                break; 
            case "Up":
                this.spriteToRender = this.replaceSprite(this.spriteToRender, this.upTextures, this.location);
                break;
            case "Down":
                this.spriteToRender = this.replaceSprite(this.spriteToRender, this.downTextures, this.location);
                break;          
        }
        this.animatedSpriteFramesTillMoveDone = this.animatedSpriteFramesTillMoveDoneConst;
        this.animatedSpriteDirection = direction;
    };

    this.update = function () {
            switch(this.currentDirection){
                case "Up":
                    if(this.animatedSpriteFramesTillMoveDone > 0) {
                        this.spriteToRender.y -= this.animatedSpriteMoveSpeed;
                        this.animatedSpriteFramesTillMoveDone--;
                    } 
                    else {
                        this.currentDirection = null;
                        //animatedSprite.update(0);
                    }              
                    break;
                case "Down":
                    if(this.animatedSpriteFramesTillMoveDone > 0) {
                        this.spriteToRender.y += this.animatedSpriteMoveSpeed;
                        this.animatedSpriteFramesTillMoveDone--;
                    } 
                    else {
                        this.currentDirection = null;
                        //animatedSprite.update(0);
                    }              
                    break;
                case "Left":
                    if(this.animatedSpriteFramesTillMoveDone > 0) {
                        this.spriteToRender.x -= this.animatedSpriteMoveSpeed;
                        this.animatedSpriteFramesTillMoveDone--;
                    } 
                    else {
                        this.currentDirection = null;
                        //animatedSprite.update(0);
                    }               
                    break;
                case "Right":
                    if(this.animatedSpriteFramesTillMoveDone > 0) {
                        this.spriteToRender.x += this.animatedSpriteMoveSpeed;
                        this.animatedSpriteFramesTillMoveDone--;
                    } 
                    else {
                        this.currentDirection = null;
                        //animatedSprite.update(0);
                    }          
                                   
                    break;
            }
            if (this.currentDirection == null) {
                console.log(this.path[0]);
                this.currentDirection = this.path.shift();
                this.move(this.currentDirection);
            } 
    };
}
