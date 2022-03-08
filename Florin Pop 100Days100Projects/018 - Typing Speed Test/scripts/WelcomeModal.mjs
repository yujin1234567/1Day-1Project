import RegesteredEventListener from './RegesteredEventListener.mjs';

export default class WelcomeModal {
  constructor() {
    this.LOCAL_STORAGE_LANGUAGE_KEY = "typing_speed_test_language_setting";
    this.target = document.querySelector(".welcome-modal");
    this.languageCheckboxes = document.querySelector(".language-checkboxes");
    this.startBtn = document.querySelector(".start-btn");
    this.regesteredEventListeners = [];
    this.languages = {
      "korean": true, 
      "english": true
    };
    this.setting();
  }

  setting() {
    const bindedFunction = this.changeSelectedLanguages.bind(this);
    this.languageCheckboxes.addEventListener("input", bindedFunction);
    this.regesteredEventListeners.push(new RegesteredEventListener(this.languageCheckboxes, "input", bindedFunction));
    this.restoreLanguageSetting();
  }

  restoreLanguageSetting() {
    this.languages = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_LANGUAGE_KEY)) || this.languages;
    for (let key of Object.keys(this.languages)) {
      if (!this.languages[key]) this.languageCheckboxes.querySelector(`[name="${key}"]`).checked = false;
    }
  }

  changeSelectedLanguages(e) {
    this.languages[e.target.name] = e.target.checked;
    localStorage.setItem(this.LOCAL_STORAGE_LANGUAGE_KEY, JSON.stringify(this.languages));
  }

  isAllLanguageDisabled() {
    return [...Object.values(this.languages)].every(value => !value);
  }

  show() {
    this.target.classList.remove("invisible");
  }

  hide() {
    this.target.classList.add("invisible");
    this.removeAllEventListeners();
  }

  removeAllEventListeners() {
    for (let regesteredEventListener of this.regesteredEventListeners) {
      regesteredEventListener.remove();
    }
    this.regesteredEventListeners = [];
  }

  getLanguage() {
    return this.languages;
  }

  addStartGameBtnClickEventListener(callback) {
    this.startBtn.addEventListener("click", callback);
    this.regesteredEventListeners.push(new RegesteredEventListener(this.startBtn, "click", callback));
  }
}