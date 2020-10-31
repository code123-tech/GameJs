let theme = localStorage.getItem('theme');
if(theme == null){
    setTheme('white');
}else{
    setTheme(theme);
}
let themeDot = document.getElementsByClassName('theme-dot');
for(var i=0; themeDot.length>i; i++){
    themeDot[i].addEventListener('click',function(){
        var mode = this.dataset.mode;
        // console.log('option clicked',mode);
        setTheme(mode);
        document.getElementById('submit').innerHTML = "changed successfully"
    })
}
function setTheme(mode){
    console.log(mode);
    localStorage.setItem('theme',mode);
}