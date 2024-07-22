export default function (){
    if(process.env.ENV !== 'stage'){
        return
    }
    console.log("GLOBAL SETUP")
}