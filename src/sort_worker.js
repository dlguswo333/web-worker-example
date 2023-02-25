/**
 * onmessage function will be called automatically when a Worker instance is created.
 * investigate event argument if you want to differentiate onmessage event.
 */
onmessage=(e)=>{
    const s=Date.now();
    var array=e.data;
    array=array.sort((a, b)=> a-b);
    console.log(`worker sort: ${Date.now()-s} ms`);
    postMessage(array);
}