⚡ API Endpoints
Get ⚡ All Levels
https://openapi.programming-hero.com/api/levels/all
Get ⚡ Words by Levels
https:// openapi.programming-hero.com/api/level/{id}
https://openapi.programming-hero.com/api/level/5
Get ⚡ Words Detail
https:// openapi.programming-hero.com/api/word/{id}
https://openapi.programming-hero.com/api/word/5
Get ⚡ All Words
https://openapi.programming-hero.com/api/words/all
Work To do
1. Show Levels on The UI
 Show a center-aligned heading as Figma
 Create dynamically generated buttons from API-01 for each lesson
 Lesson Buttons will be displayed on page load
2. Show Word Cards Based on Level
 Show a default text that will be displayed in the Vocabulary section initially

 on Clicking a Specific Lesson Button Load All the words from API-02

 Display all words for a selected lesson in a card format, showing:

 Word
 Word meaning & pronunciation
 Two buttons with relevant icons as per Figma
 Show *No Word Found message if no words exist for a lesson

 Create functionality to highlight the active lesson button
3. Use Different Color on The Active Level Button
 After Successfully Loading words of a level , diffirentiate the button so user can understand which button is active
4. Vocabulary Details
 Create functionality to open a modal when clicking the details icon
 Data will be load from API-03
 modal will displays:
 Word with pronunciation
 Example sentence
 Synonyms
 A "Complete Learning" button to close the modal
5. Handling Invalid Data
 avoid displaying falsy values like undefined or null
 display relevant words if no data is found
6. Loading Spinner
 Create a loading spinner that will be display when vocabulary is loading from API
7. Implement Search Functionality
 Take a input Box.
 on Changing value It will Search word and show in the UI.
 If anyone Do search reset active button
8. Save Word Feature
 in the UI of Card add a button Heart icon
 on Clicking it. Store the Word in the Saved Box
 Show Saved words in a Different Section.
9. Speak your Vocabularies
 Create functionality for voice pronunciation of vocabulary words
 Use below function and implement on clicking sound icon
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
For More >> you can explore this implementation 👉 https://codepen.io/Ferdous-Zihad/pen/PwoJMmJ

Bonus : How to create Private Repository for next assignments

Test Repo - : https://classroom.github.com/a/Fgjib-lr