let name = localStorage.getItem('name');
const vlaue = document.getElementById('enter').vlaue;
console.log(vlaue);
if(name != null){
    if(vlaue.length == 0){
        localStorage.setItem('name','User');
    }
    else{
        localStorage.setItem('name',vlaue);
    }
}
else{
    localStorage.setItem('name','User');
}