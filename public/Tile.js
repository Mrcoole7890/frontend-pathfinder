function Tile (x, y, width, height, texture, location) {
    newHedge = new PIXI.Sprite(texture);
    newHedge.width = width;
    newHedge.height = height;
    newHedge.x = x;
    newHedge.y = y;
    location.addChild(newHedge);
}
