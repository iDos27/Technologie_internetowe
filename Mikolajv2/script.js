class App
{
    //Zmiana wartosci na prywatna
    #bigImage
    #photoIndex
    #timer
    #indexDisplay

    constructor()
    {
        this.#photoIndex = 0;
    }

    // Procedura obsługi zdarzen
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
            .addEventListener("click", ()=> this.onSetPhoto());

        document
            .querySelector("#slideshow-start")
            .addEventListener("click", () => this.onSlideshow());

        document
            .querySelector("#slideshow-stop")
            .addEventListener("click", () => this.onStopSlideshow());
        document
            .querySelector("#slideshow-reset")
            .addEventListener("click", () => this.onResetSlideshow());



        this.#bigImage = document.querySelector(".big>div>img");
        
        this.#indexDisplay = document.createElement('p');
        this.#indexDisplay.style.textAlign = "center";
        this.#indexDisplay.style.fontSize = '18px';
        this.#indexDisplay.style.fontWeight = 'bold';
        this.#bigImage.parentNode.insertBefore(this.#indexDisplay, this.#bigImage);

        this.div = document.querySelector("div.minis")
        console.dir(this.div.children)
        console.log(this.#photoIndex);
        this.input = document.querySelector("input");
        this.setBigImage();
    }

    // Konczymy pokaz
    onResetSlideshow() {
        this.onStopSlideshow();
        this.photoIndex = 0;
    }

    // Stopujemy pokaz
    onStopSlideshow() {
        if (this.#timer) {
            clearInterval(this.#timer);
            this.#timer = undefined;
        }
    }
    //Rozpoczynamy pokaz slajdow - wniosek: chujowe bo mozemy nakladac zegary na siebie
    /*onSlideshow() {
        this.#timer = setInterval(() => {
            this.onNextPhotoShow();
        }, 1000);
    }
    */
    // Pokaz v2
    onSlideshow() {
        if (this.#timer === undefined) {
            this.#timer = setInterval(() => {
                this.onNextPhotoShow();
            }, 1000);
        }
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
        //console.log(this.#photoIndex);
        //this.#bigImage.src = this.div.children[this.#photoIndex].src;
        this.setBigImage();

    }

    onNextPhotoShow() {
        this.#photoIndex++;
        if (this.#photoIndex === this.div.children.length) {
            this.#photoIndex = 0
        }
        //console.log(this.#photoIndex);
        //this.#bigImage.src = this.div.children[this.#photoIndex].src;
        //mozesz zamiast ciagle tych dwoch lini uzyc metody setBigImage()
        this.setBigImage();
        
    }

    setBigImage() {

        console.log(this.#photoIndex);
        this.#bigImage.src = this.div.children[this.#photoIndex].src;
        this.#indexDisplay.textContent = `Aktualny index: ${this.#photoIndex}`;
        this.changeBorderColor();
    }
    changeBorderColor() {
        const colors = ['red', 'green', 'blue', 'purple', 'organge'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.#bigImage.style.border = `5px solid ${randomColor}`;
    }

}

const app = new App()
app.init();
app.photoIndex = 2;
console.log(app.bigImage);

        //dodac funkcjonalnosc ze jesli poda poprawny indeks to zeby komunikat zniknal o bledzie i dodatkowo jesli uzytkownik poda cos co nie jest liczba to tez niech dostanie blad ze podal string (mozesz sprobowac zrobic to wyrazeniami regularnymi 
        //ronisz to robiac obiekt const re = regexp("\d+[\. ,]?\d*") i potem console.log(re.test(this.input.value)))
 
