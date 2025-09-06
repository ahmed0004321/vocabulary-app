//Now API nie asha kaj
const createElement = (arr) => {

    const htmlElements = arr.map( (el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}

const manageSpinner = (status) => {
    if(status === true){
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("word-container").classList.add('hidden');
    }
    else{
        document.getElementById("word-container").classList.remove('hidden');
        document.getElementById("spinner").classList.add('hidden');
    }
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const loadLessons = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/levels/all")
    const json = await response.json();
    displayLesson(json.data);
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove('active'));
}

/**
 * ai loadLevelWord function er kaj holo oke jokhon e lesson button click er maddhome call kora hobe lesson.level_no argument die oi level_no ta id hishebe dhukbe ai loadLevelWord function e and url e back tik use koray automatic vabe same id tai url e boshe jabe joto no lesson e id hishebe dhuklo and aivabe amio oi specific url ta peye jacci mane 5 number lesson e click korlei 5 number url ta mane level er word gula peye jacci
 * 
 */
const loadLevelWord = async (id) => {
    manageSpinner(true); 
    //so dynamic vabe ami je button e click korteci shei lesson.level_no ke ai id er vitor pathacci er
    const url = `https://openapi.programming-hero.com/api/level/${id}`;  //back tik use er time e fetch word and () use kora jabe na fetch er url er vitor back tik die id dici mane jakei click korbo  number id wala details pabo
    const response = await fetch(url)
    const json = await response.json()
    .then((json) => {
        removeActive();//remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`); 
        //console.log(clickBtn);
        clickBtn.classList.add('active')
        displayLevelWords(json.data);//add active class for all
    })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const response = await fetch(url);
    const details = await response.json(response);
    displayWordDetails(details.data);
}

const displayWordDetails = (words) => {
    console.log(words.word);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML =`
    <div class="text-2xl font-bold">
            <h2>${words.word}(<i class="fa-solid fa-microphone"></i>:${words.pronunciation})</h2>
          </div>

          <div class="text-2xl">
            <h2 class="font-bold">Meaning</h2>
            <p class="font-bangla">${words.meaning}</p>
          </div>

          <div class="text-2xl">
            <h2 class="font-bold">Example</h2>
            <p class="">${words.sentence}</p>
          </div>

          <div class="text-2xl space-x-2">
            <h2 class="font-bold">Synonym</h2>
            <div>
            ${createElement(words.synonyms)}
            </div>
          </div>
    `;
    document.getElementById("word_modal").showModal();
}


const displayLevelWords = (words) => {
    //same kaj 
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    //akhane je lesson e kono word add hoy nai shekane validate korbo
    //jodi word er length 0 hoy taile aita dekhao
    if(words.length === 0) {
        const noWordAdded = document.createElement("div");
        noWordAdded.innerHTML = `
        <div class="text-center col-span-full space-y-6 py-10 font-bangla mx-auto w-[1140px]">
        <img class="mx-auto" src="assets/alert-error.png"/>
        <p class="text-[15px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-[30px]">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        wordContainer.appendChild(noWordAdded);
        manageSpinner(false)
        return;
    }


    for(let word of words){
        const card = document.createElement('div')
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "word not found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-medium text-[#464649]">"${word.meaning ? word.meaning : "meaning not found"} /
            ${word.pronunciation ? word.pronunciation : "pronunciation not found"}"</div> 
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#ecf6fe] hover:bg-[#51bcfa]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#ecf6fe] hover:bg-[#51bcfa]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(card);
    }
    manageSpinner(false);
}


const displayLesson = (lessons) => {
    //1. get the container & and empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    //2. get to every element
    for(let lesson of lessons){

        //3. createElement
        const btnDiv = document.createElement('div');
       btnDiv.innerHTML = `
       <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" href=""><i class="fa-solid fa-book-tanakh"></i>Lesson-${lesson.level_no}</button>
       `
       //4.append the created div into the container
       levelContainer.appendChild(btnDiv);
    }
}



loadLessons();


document.getElementById('btn-search').addEventListener('click',
    function(){
        removeActive();
         const input = document.getElementById('input-search');
         const searchValue = input.value.trim().toLowerCase();
         console.log(searchValue);

         fetch("https://openapi.programming-hero.com/api/words/all")
         .then((response) => response.json())
         .then((words) => {

         const allwords = words.data;
         console.log(allwords);

        const filterWords = allwords.filter((word) => word.word.toLowerCase().includes(searchValue));

        displayLevelWords(filterWords);
         })
    }
)