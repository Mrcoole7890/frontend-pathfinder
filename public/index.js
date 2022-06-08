fetch("Resources//RenderingSpecs//testSpecs.json")
                .then(responce => responce.json())
                .then(data => {init(data)});

function init(specs) {

    let renderer = specs.renderer;
    let gui = specs.gui;

    
  
    let BoDownArray = [];
    let BoRightArray = [];
    let BoLeftArray = [];
    let BoUpArray = [];

    let BoDown  = specs.entities[0];
    let BoLeft  = specs.entities[2];
    let BoUp    = specs.entities[1];
    let BoRight = specs.entities[3];
    let hedge   = specs.entities[4];
    let dirt    = specs.entities[5];
    let midHedge= specs.entities[6];
    
    loadTextures(BoDownArray, BoDown.pathToFolder , BoDown.fileExtention, BoDown.numberOfFrames);
    loadTextures(BoRightArray, BoRight.pathToFolder , BoRight.fileExtention, BoRight.numberOfFrames);
    loadTextures(BoLeftArray, BoLeft.pathToFolder , BoLeft.fileExtention, BoLeft.numberOfFrames);
    loadTextures(BoUpArray, BoUp.pathToFolder , BoUp.fileExtention, BoUp.numberOfFrames);

  

    setTimeout(httpGetAsync, 1000 , "http://192.168.0.135:8080/astar", (res) => {



        var midhedgetexture = PIXI.Texture.from(midHedge.pathToFolder + midHedge.name + midHedge.fileExtention);
        var hedgetexture = PIXI.Texture.from(hedge.pathToFolder + hedge.name + hedge.fileExtention);
        var dirttexture = PIXI.Texture.from(dirt.pathToFolder + dirt.name + dirt.fileExtention);
        

        var my2dMaps = [];
        var initPlayer = [res.split(",")[0].split(" ")[0], res.split(",")[0].split(" ")[1]];
        var initGoal = [res.split(",")[1].split(" ")[0], res.split(",")[1].split(" ")[1]];


        var directions = [];    
        res.split(",").splice(2).forEach(e => {
                var my2dMap = [];
                e.split("\n").forEach(line => {my2dMap.push(line)});
                my2dMaps.push(my2dMap);            
        });

        var initMapHandler = new MapHandler(my2dMaps[0], initPlayer, initGoal, null);
        let app = new PIXI.Application({ width: BoDown.width * initMapHandler.gameMap[1].length , height: BoDown.height * (initMapHandler.gameMap.length - 1) });
        document.getElementById(renderer.idOfLocation).appendChild(app.view);

        for (i = 0; i < initMapHandler.gameMap.length; i++){

            for (j = 0; j < initMapHandler.gameMap[i].length; j++){
                if (initMapHandler.gameMap[i][j] == 'X')
                    if (i < initMapHandler.gameMap.length - 1 && initMapHandler.gameMap[i + 1][j] != 'X')
                        Tile(j * hedge.width, i * hedge.height, hedge.width, hedge.height, hedgetexture, app.stage);
                    else Tile(j * midHedge.width, i * midHedge.height, midHedge.width, midHedge.height, midhedgetexture, app.stage);
                else if (initMapHandler.gameMap[i][j] == ' ')
                    Tile(j * dirt.width, i * dirt.height, dirt.width, dirt.height, dirttexture, app.stage);
            }
            
        }

        for (i = 1; i < my2dMaps.length; i++){
            console.log(my2dMaps[i-1]);
            directions.push(initMapHandler.getDirection(my2dMaps[i]));
            initMapHandler = new MapHandler(my2dMaps[i], initMapHandler.playerPosition, initGoal, initMapHandler.getDirection(my2dMaps[i]));
        }

        var BoboboSprite = new Agent(initPlayer[1] * BoDown.width, initPlayer[0] * BoDown.height, BoDown.width, BoDown.height, null, 20, BoDown.animationSpeed , app.stage, directions);
        BoboboSprite.loadTextures(BoUpArray, BoDownArray, BoLeftArray, BoRightArray);   

        app.ticker.add((delta) => {
            BoboboSprite.update();
        });
    });

    
}

function loadTextures(textureArr, folderPath, fileExtention, numOfFrames){
    for (let i=0; i < numOfFrames; i++)
    {
        let texture = PIXI.Texture.from(folderPath + i + fileExtention);
        textureArr.push(texture);
    };
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}





