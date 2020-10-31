let hi = localStorage.getItem('score');
name = localStorage.getItem('name');
if(hi == null){
    document.getElementById('display').innerHTML = "No game played yet"; 
}
else{
    hi = JSON.parse(hi);
    document.getElementById('display').innerHTML = "First Highest score is  " + hi[0];
    document.getElementById('display_2').innerHTML = "Second Highest score is  " + hi[1];
    document.getElementById('display_3').innerHTML = "Third Highest score is  " + hi[2] ;
}