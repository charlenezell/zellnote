function main(){
    var g=[];
    // for(var i=0;i<10;i++){
    // for(var i=0;i<50000;i++){
    for(var i=0;i<10000000;i++){
    g.push(Math.ceil(Math.random()*10*Math.random()*10));
    }
    console.log(g.slice(0,10));
    // sort_p(g)
    sort_d(g)
    // sort_b(g);
    console.log(g.slice(0,10));
}
function sort_d(g){
    g.sort();
}
function swap(ref,i1,i2){
        var t=ref[i1];
        ref[i1]=ref[i2];
        ref[i2]=t;
}
function sort_b(g){//int&narrawRange
    if(g.length<=0){return false;}
    var t=[]
    for(var i=0;i<g.length;i++){
        if(t[g[i]]===void(0)){
            t[g[i]]=0;
        }
        t[g[i]]=t[g[i]]+1;

    }
    // console.log(t);
    var ind=0;
    for(var i=0;i<t.length;i++){
        for(var j=0;j<t[i];j++){
            if(t[i]){
                g[ind]=i;
                ind++;
            }
        }
    }
}
function sort_p(g){
    if(g.length<=0){return false;}
    for(var i=0;i<g.length-1;i++){
        for(var j=0;j<g.length-1;j++){
            if(g[j]<g[j+1]){
                swap(g,j,j+1);
            }
        }
    }
}
var g=new Date();
main();
console.log((new Date-g)/1000)