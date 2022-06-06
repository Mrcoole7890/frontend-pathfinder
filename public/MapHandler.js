var MapHandler = function(twoDArray, playerPos, goalPos, direction) {

    this.playerPosition = [];

    if (direction == null) {
        this.playerPosition[0] = parseInt(playerPos[0]);
        this.playerPosition[1] = parseInt(playerPos[1]);
    }
    else if(direction == "Down") {
        this.playerPosition[0] = parseInt(playerPos[0]) + 1;
        this.playerPosition[1] = parseInt(playerPos[1]);
    }
    else if(direction == "Up") {
        this.playerPosition[0] = parseInt(playerPos[0]) - 1;
        this.playerPosition[1] = parseInt(playerPos[1]);
    }
    else if(direction == "Right") {
        this.playerPosition[0] = parseInt(playerPos[0]);
        this.playerPosition[1] = parseInt(playerPos[1]) + 1;
    }
    else if(direction == "Left") {
        this.playerPosition[0] = parseInt(playerPos[0]);
        this.playerPosition[1] = parseInt(playerPos[1]) - 1;
    }
    this.gameMap = [];
    twoDArray.forEach(line => {this.gameMap.push(line);})
    console.log(this.playerPosition[0]);
    this.goalPosition = goalPos;

    this.getDirection = function(newState) {
        if( this.playerPosition[0]-1 >= 0 && this.gameMap[this.playerPosition[0]-1][this.playerPosition[1]] == 'P' ) return "Up";
        else if( this.playerPosition[0]+1 < this.gameMap.length && this.gameMap[this.playerPosition[0]+1][this.playerPosition[1]] == 'P' ) return "Down";
        else if( this.playerPosition[1]-1 >= 0 && this.gameMap[this.playerPosition[0]][this.playerPosition[1]+1] == 'P' ) return "Right";
        else if( this.playerPosition[1]-1 < this.gameMap.length && this.gameMap[this.playerPosition[0]][this.playerPosition[1]-1] == 'P' ) return "Left";
        else return null;
    }
}
