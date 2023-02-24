/** @type {Uint32Array} */
let array = null;

function populate(){
    let length=document.getElementById('length').value;
    try{
        length=parseInt(length);
        if(!Number.isInteger(length)){
            throw Error('Array length must be an integer!');
        }
        if(length < 0){
            throw Error('Array length must be 0 or larger!');
        }
    }catch(e){
        let container=document.getElementById('container');
        container.innerText='Invalid array length';
        return;
    }
    array = new Uint32Array(length);

    function generate(len){
        for(let i=0;i<len;++i){
            const val=Math.floor(Math.random() * (10**10));
            array[i]=val;
        }
    }
    generate(length);

    container.innerText=`Populated an array of length ${length}`;
}
document.getElementById('populate_button').onclick=populate;

function sort(){
    const start_time=Date.now();
    let container=document.getElementById('container');
    container.innerText=`Main worker sorting...`;
    array=array.sort((a, b)=> a-b);

    container.innerText=`Sorting ${array.length} items took ${Date.now()-start_time} ms\n\n`;
}
document.getElementById('sort_button').onclick=sort;

function worker_sort(){
    let container=document.getElementById('container');
    container.innerText=`Web worker sorting...`;
    let now=Date.now();
    const start_time=Date.now();
    /**
     * Create worker instance with javascript file path as an argument.
     * Can also pass a string of javascript code instead of a file path.
     */
    const worker=new Worker('./sort_worker.js');
    worker.postMessage(array);
    now=Date.now();
    worker.onmessage=(e)=>{
        array=e.data;
        container.innerText=`Sorting ${array.length} items took ${Date.now()-start_time} ms\n\n`;
    }
}
document.getElementById('worker_sort_button').onclick=worker_sort;

function validate(){
    let result=true;
    array.reduce((prev, cur)=>{if(prev>cur) result=false; return cur;});
    let container=document.getElementById('container');
    container.innerText=`${result? 'Array is sorted.' : 'Array is not sorted.'}`;
}
document.getElementById('validate_button').onclick=validate;
