class World{
    /**
     * 
     * @param {Context} ctx Canvas Context
     */
    constructor(ctx){
        this.ctx = ctx;
    }
    //Renders the main background
    init(){
        this.ctx.drawImage(background,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    }
}