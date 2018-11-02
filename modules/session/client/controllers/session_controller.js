import InlineController from "../../../../src/bases/inline_controller";
import { getHtml, postData } from "../../../../src/services/ajax";
import { getDefaultEventNameForElement } from "@stimulus/core/dist/src/action";

export default class extends InlineController {
  static targets = ["email",
    "organization",
    "password",
    "confirmPassword",
    "container",
    "signInEmail",
    "signInPassword"]

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

  pwdNoMatchErr() {
    this.showError("The password and confirmation pwd don't match");
  }

  orgExists() {
    this.showError("The organization already exists.<br/>You should ask the organization owner to send you an invitation.");
  }

  userExist() {
    this.showError("There is already a user with that email in our system.<br/>If you forgot your password use the reset pwd option in the sign in page.");
  }

  invalidLogin() {
    this.showError("The email is not in our database or the password doesn't match.");
  }

  pwdMatch() {
    return this.passwordTarget.value === this.confirmPasswordTarget.value
  }

  signIn() {
    event.preventDefault();
    postData("/api/signin", {
      email: this.signInEmailTarget.value,
      password: this.signInPasswordTarget.value,
    })
    .then(() => {
      location.assign("/pages/projects");
    })
    .catch((err) => {
      if (err.errorCode === "NOT_FOUND") {
        this.invalidLogin();
        return;
      }
      this.genericError();
    });
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
    .then(() => {
      location.assign("/pages/projects");
    })
    .catch((err) => {
      if (err.errorCode === "PWD_NO_MATCH") {
        this.pwdNoMatchErr();
        return;
      }
      if (err.errorCode === "ORG_EXIST") {
        this.orgExists();
        return;
      }
      if (err.errorCode === "USR_EXIST") {
        this.userExist();
        return;
      }
      this.genericError();
    });
  }
}