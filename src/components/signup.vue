
<template>
  <div class="mt-4">
    <h2>Welcome Chat App</h2>
    <form class="details-box my-5" action="">
      <div class="form-group my-3">
        <h4>Signup to Chat</h4>
        <input
          @input="$v.name.$touch()"
          type="text"
          v-model="name"
          class="form-control mb-3 mt-4"
          :class="namechange($v)"
          placeholder="Enter Your Name"
        />
        <small v-if="!$v.name.minLength" class="from-text text-danger m-0"
          >Must have at least
          {{ $v.name.$params.minLength.min }} characters</small
        >
        <input
          @input="$v.email.$touch()"
          class="form-control mb-3"
          v-model="email"
          :class="emailcheck($v)"
          placeholder="Enter your Email"
          type="email"
        />

        <small v-if="!$v.email.email" class="from-text text-danger mb-4"
          >Email is not valid</small
        >
        <input
          class="form-control mb-4"
          v-model="password"
          placeholder="Enter your password"
          type="password"
          @input="$v.password.$touch()"
        />
        <small v-if="!$v.password.maxLength" class="from-text text-danger mb-4"
          >You must enter max
          {{ $v.password.$params.maxLength.max }} characters</small
        ><br />
        <small v-if="!$v.password.minLength" class="from-text text-danger mb-4"
          >You must enter min
          {{ $v.password.$params.minLength.min }} characters</small
        >
        <a href="/">
          <h6 class="mb-3">Back to Login</h6>
        </a>
        <button
          type="button"
          @click="signup"
          class="btn btn-primary"
          :disabled="$v.$invalid"
        >
          Signup
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import firebase from "../services/firebase";
import Vue from "vue";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  app: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
      const auth = firebase.auth();
      // eslint-disable-next-line no-unused-vars
      const name = this.name;
      const email = this.email;
      const password = this.password;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async res => {
          console.log("res", res);
          this.$router.push("/chat");
          await firebase
            .firestore()
            // eslint-disable-next-line no-undef
            .collection("users")
            .add({
              name,
              id: res.user.uid,
              password,
              URL: "",
              description: ""
            })
            .then(ref => {
              console.log("test");
              localStorage.setItem("id", res.user.uid);
              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
              localStorage.setItem("password", password);
              localStorage.setItem("photoUrl", "");
              localStorage.setItem("description", "");
              localStorage.setItem("FirebaseDocumentId", ref.id);
              this.name = "";
              this.password = "";
              this.email = "";
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          var errorkod = err.code;
          var eroorMessage = err.message;
          if (errorkod == "auth/weak-password") {
            Vue.toasted.show("Password to weak").goAway(1500);
          } else {
            Vue.toasted.show(eroorMessage).goAway(1500);
          }
          alert(errorkod);
        });
    },
    //name change invalid or valid
    namechange(v) {
      if (v.name.required) {
        if (v.name.$error) {
          return "is-invalid";
        } else {
          return "is-valid";
        }
      }
    },
    //Email change invalid or valid
    emailcheck(v) {
      if (v.email.required) {
        if (v.email.$error) {
          return "is-invalid";
        } else {
          return "is-valid";
        }
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(15)
    }
  }
};
</script>
<style scoped>
input[type="text"],
input[type="password"],
input[type="email"] {
  margin: 0 auto;
  width: 80%;
}
.details-box {
  padding: 5px;
  border: 1px solid lightgray;
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
}
</style>