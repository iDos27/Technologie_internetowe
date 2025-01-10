class App
{
    //Zmiana wartosci na prywatna
    #bigImage
    #photoIndex
    constructor()
    {
        this.#photoIndex = 0;
    }

    init()
    {
        document
            .querySelector("a")
            .addEventListener("click", () => this.onAddPhotoClick());
        document
            .querySelector("div.minis")
            .addEventListener("click", (event) => this.onMiniClick(event));

        document
            .querySelector("#prev")
            .addEventListener("click", () => this.onPrevPhotoShow());

        document
            .querySelector("#next")
            .addEventListener("click", () => this.onNextPhotoShow());

        document
            .querySelector("#setPhoto")
            .addEventListener("click", ()=> this.onSetPhoto() )

        this.#bigImage = document.querySelector(".big>div>img");
        this.div = document.querySelector("div.minis")
        console.dir(this.div.children)
        console.log(this.#photoIndex);
        this.input = document.querySelector("input");
        this.setBigImage();
    }

    onSetPhoto() {
        const index = parseInt(this.input.value)
        if (isNaN(index)) {
            const p = document.querySelector("p");
            p.innerHTML = "Indeks jest za duzy!";
            p.style.color = "red";
        }
        else {
            this.photoIndex = index;
        }
    }

    onAddPhotoClick()
    {
        div.innerHTML += "<img src='./img/mikolaj2.jpg'"
    }
    onMiniClick(event)
    {
        if (event.target.nodeName === "IMG")
        {
            console.log(this)
            this.#bigImage.src = event.target.src;
        }
    }

    get photoIndex() {return this.#photoIndex }

    set photoIndex(value) {
        if (0 <= value && value < this.div.children.length) {
            this.#photoIndex = value
            this.setBigImage();
        }
        else {
            console.error("Indeks jest poza zakresem!");
            //this.blad("Indeks jest poza zakresem!");
            const p = document.querySelector("p");
            p.innerHTML = "Indeks jest za duzy!";
            p.style.color = "red";
        }
    }




    onPrevPhotoShow() {
        if (this.#photoIndex > 0) {
            this.#photoIndex--;
        }
        
        else {
            this.#photoIndex = this.div.children.length - 1;
        }
        console.log(this.#photoIndex);
        this.#bigImage.src = this.div.children[this.#photoIndex].src;

    }

    onNextPhotoShow() {
        this.#photoIndex++;
        if (this.#photoIndex === this.div.children.length) {
            this.#photoIndex = 0
        }
        console.log(this.#photoIndex);
        this.#bigImage.src = this.div.children[this.#photoIndex].src;
        //mozesz zamiast ciagle tych dwoch lini uzyc metody setBigImage()
    }

    setBigImage() {

        console.log(this.#photoIndex);
        this.#bigImage.src = this.div.children[this.#photoIndex].src;
    }

}

const app = new App()
app.init();
app.photoIndex = 2;
console.log(app.bigImage);

        //dodac funkcjonalnosc ze jesli poda poprawny indeks to zeby komunikat zniknal o bledzie i dodatkowo jesli uzytkownik poda cos co nie jest liczba to tez niech dostanie blad ze podal string (mozesz sprobowac zrobic to wyrazeniami regularnymi 
        //ronisz to robiac obiekt const re = regexp("\d+[\. ,]?\d*") i potem console.log(re.test(this.input.value)))