import { Controller } from "stimulus"
import { getHtml, postData } from "../../../../src/services/ajax";
import { getDefaultEventNameForElement } from "@stimulus/core/dist/src/action";

export default class extends Controller {
  static targets = ["email",
    "organization",
    "password",
    "confirmPassword",
    "container",
    "serverError"]

  navigate() {
    if (this.hash !== location.hash) {
      const fn = location.hash.replace("#/", "");
      if (typeof this[fn] === "function") {
        this[fn]();
      }
    }
  }

  updateHash() {
    this.hash = location.hash;
  }

  connect() {
    this.hash = "";
    this.navigate();
    window.onhashchange = () => {
      this.navigate();
    };
  }

  startSignIn() {
    getHtml("/content/session/signin")
      .then((html) => {
        this.updateHash();
        this.containerTarget.innerHTML = html;
      })
      .catch(console.log)
  }

  startSignUp() {
    getHtml("/content/session/signup")
      .then((html) => {
        this.updateHash();
        this.containerTarget.innerHTML = html;
      })
      .catch(console.log);
  }

  showError() {
    this.serverErrorTarget.className += " filled";
  }
  pwdNoMatchErr() {
    this.serverErrorTarget.innerHTML = "The password and confirmation pwd don't match";
    this.showError()
  }

  orgExists() {
    this.serverErrorTarget.innerHTML = "The organization already exists.<br/>You should ask the organization owner to send you an invitation.";
    this.showError()
  }

  userExist() {
    this.serverErrorTarget.innerHTML = "There is already a user with that email in our system.<br/>If you forgot your password use the reset pwd option in the sign in page.";
    this.showError()
  }

  pwdMatch() {
    return this.passwordTarget.value === this.confirmPasswordTarget.value
  }

  signUp(event) {
    event.preventDefault();
    if (!this.pwdMatch()) {
      this.pwdNoMatchErr();
      return;
    }
    postData("/api/signup", {
      organization: this.organizationTarget.value,
      email: this.emailTarget.value,
      password: this.passwordTarget.value,
      confirmPassword: this.confirmPasswordTarget.value
    })
    .then((result) => {
      location.assign("/pages/projects");
    })
    .catch((err) => {
      if (err.errorCode === "PWD_NO_MATCH") {
        this.pwdNoMatchErr();
      }
      if (err.errorCode === "ORG_EXISTS") {
        this.orgExists();
      }
      if (err.errorCode === "USR_EXISTS") {
        this.userExist();
      }
    });
  }
}