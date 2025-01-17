// #Przyklad js w kolos - nacisnij przycisk - wstaw tekst //
// Aplikacja ktora zlicza ilosc klikniec //


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

        document
            .querySelector("form")
            .addEventListener("submit", (event) => this.onSubmit(event));
        document
            .querySelector("#edit")
            .addEventListener("click", () => this.onEditImage());
        
        
        this.#bigImage = document.querySelector(".big>div>img");

        this.#indexDisplay = document.createElement('p');
        this.#indexDisplay.style.textAlign = "center";
        this.#indexDisplay.style.fontSize = '18px';
        this.#indexDisplay.style.fontWeight = 'bold';
        this.#indexDisplay.style.color = 'black';
        this.#bigImage.parentNode.insertBefore(this.#indexDisplay, this.#bigImage);
        
        this.changeBorderColor();

        this.div = document.querySelector("div.minis")
        this.miniImages = this.div.querySelectorAll('img');

        console.dir(this.div.children)
        console.log(this.#photoIndex);
        this.input = document.querySelector("input");
        this.setBigImage();
    }


    // Dodawanie zdjecia wybranego przez formularz. Wyswietlenie go w Big i Minis
    onSubmit(event) {
        event.preventDefault();
        const fileControl = event.target.querySelector("#file");
        const fileReader = new FileReader(); // Dzieki temu możemy wczytywać pliki w JS
        fileReader.addEventListener("load", (event) => {
            this.#bigImage.src = event.target.result;
            const newImage = document.createElement('img');

            newImage.src = event.target.result;
            newImage.onload = () => { this.div.appendChild(newImage); };

        });
        fileReader.readAsDataURL(fileControl.files[0]);
    }
    // Edycja zdjecia na czarno-biale #nie na kolosie#
    onEditImage() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.#bigImage.width;
        canvas.height = this.#bigImage.height;
        context.drawImage(this.#bigImage, 0, 0);
        const data = context.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < data.data.length; i += 4) {
            const newValue = data.data[i] + data.data[i + 1] + data.data[i + 2] / 3;
            data.data[i] = newValue;
            data.data[i + 1] = newValue;
            data.data[i + 2] = newValue;
        }
        context.putImageData(data, 0, 0);
        this.#bigImage.src = canvas.toDataURL();
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
    // Pokaz v2
    onSlideshow() {
        if (this.#timer === undefined) {
            this.#timer = setInterval(() => {
                this.onNextPhotoShow();
            }, 1000);
        }
    }

    onSetPhoto() {
        const index = parseInt(this.input.value);
        if (isNaN(index)){
            const p = document.querySelector("p");
            p.innerHTML = "Indeks jest za duzy!";
            p.style.color = "red";
        }
        else {
            this.photoIndex = index;
        }
    }

    // Dodawanie zdjęcia
    onAddPhotoClick()
    {
        const newImageSrc = './img/mikolaj2.jpg';
        const newImage = document.createElement('img');
        newImage.src = newImageSrc;
        newImage.onload = () => { this.div.appendChild(newImage); };


        //div.innerHTML += "<img src='./img/mikolaj2.jpg'";
    }

    // Zmiana obrazu glownego, wypisanie indexu
    onMiniClick(event)
    {
        if (event.target.nodeName === "IMG")
        {
            console.log(this)
            this.#bigImage.src = event.target.src;

            // Szukanie indexu zdjecia
            this.#photoIndex = Array.from(this.miniImages).indexOf(event.target);
            // Alternatywa
            //this.#photoIndex = [...this.miniImages].findIndex(img => img === event.target);
            
            // Zmiana tekstu i borderu
            this.#indexDisplay.textContent = `Aktualny index: ${this.#photoIndex}`;
            this.updateMiniBorders();
            this.changeBorderColor();
        }
    }

    get photoIndex() {return this.#photoIndex }

    set photoIndex(value) {
        if (0 <= value && value < this.div.children.length) {
            this.#photoIndex = value;
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
        this.updateMiniBorders();
        this.changeBorderColor();
    }
    changeBorderColor() {
        const colors = ['blue', 'purple', 'orange', 'yellow', 'cyan'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.#bigImage.style.border = `5px solid ${randomColor}`;
    }
    updateMiniBorders() {
        this.miniImages.forEach((img, index) => {
            if (index === this.#photoIndex) {
                img.style.border = '7px solid green';
            } else {
                img.style.border = '7px solid red';
            }
        });
    }

}

const app = new App()
app.init();
app.photoIndex = 2;
console.log(app.bigImage);

        //dodac funkcjonalnosc ze jesli poda poprawny indeks to zeby komunikat zniknal o bledzie i dodatkowo jesli uzytkownik poda cos co nie jest liczba to tez niech dostanie blad ze podal string (mozesz sprobowac zrobic to wyrazeniami regularnymi 
        //ronisz to robiac obiekt const re = regexp("\d+[\. ,]?\d*") i potem console.log(re.test(this.input.value)))
 
