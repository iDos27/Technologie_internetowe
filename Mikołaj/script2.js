// alert("<text>") - popup alertowy
// document - globalny obiekt opisujacy strone
// console.log(document.querySelector(".big>img"))
// querySelector - wybiera jeden
// querySelectorAll - wybiera wszystkie i wrzuca je do tablicy

/* // Dodanie czerwonej ramki do duzego zdjecia wersja xD
document.querySelector(".big>img").style.borderWidth = 12
document.querySelector(".big>img").style.borderColor = "red"
document.querySelector(".big>img").style.borderStyle = "solid"
*/
/* // Lepsza wersja powyzszego
const bigImage = document.querySelector(".big>img")

bigImage.style.borderWidth = 12
bigImage.style.borderColor = "red"
bigImage.style.borderStyle = "dotted"
*/

// console.dir(bigImage) <- info o elemencie bigImage który był cosstem wyzej

/* // wszystkie fory
for (let i = 0; i < minis.length; i++ ){
    console.log(minis[i]);
}
for (let mini of minis)
{
    console.log(mini);
}
for (let mini in minis)
{
    console.log(mini);
}
*/

function click(event)
{
    bigImage.src = event.target.src;
    console.log(event.target.src);
}


const bigImage = document.querySelector(".big>img")
const minis = document.querySelectorAll(".minis img")
const div = document.querySelector("div.minis")

/*// dzialanie okienek v1
for (let mini of minis)
    {
        mini.addEventListener("click", click);
    }
*/
// Dzialanie okienek v2 tym raze funkcyjnie
minis.forEach((mini) => 
    {
        mini.addEventListener("click", (event) => {
            bigImage.src = event.target.src;
            console.log(event.target.src);
        });
    }
);
