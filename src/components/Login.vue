<template>
  <div class="mt-4">
    <h1>Welcome To Chat App</h1>
    <form class="details-box my-5" action="">
      <div class="form-group my-3">
        <h3>Login to Chat</h3>
        <input
          v-model="email"
          class="form-control mb-4 "
          placeholder="Enter your name"
          type="text"
        />
        <input
          v-model="password"
          class="form-control mb-4 "
          placeholder="Enter your password"
          type="password"
          v-on:keyup.enter="login"
        />
        <a href="/signup">
          <h6 class="mb-3">
            Create to account
          </h6>
        </a>
        <button
          variant="success"
          @click="makeToast('success')"
          class=" mb-2 btn btn-primary"
          v-on:click="login"
          type="button"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import firebase from "../services/firebase";
import Vue from "vue";
//import Vue from "vue";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const auth = firebase.auth();
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async res => {
          console.log(res);
          if (res.user) {
            await firebase
              .firestore()
              .collection("users")
              .where("id", "==", res.user.uid)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  let userdate = doc.data();
                  localStorage.setItem("id", userdate.id);
                  localStorage.setItem("name", userdate.name);
                  localStorage.setItem("email", userdate.email);
                  localStorage.setItem("password", userdate.password);
                  localStorage.setItem("photoUrl", "");
                  localStorage.setItem("description", "");
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              });
            //this.$router.push("/profil");
          }
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
    makeToast(variant = null) {
      this.$bvToast.toast("Toast body content", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    }
  }
};
</script>
<style>
body {
  color: #fff;
}
h1,
h2 {
  color: #fff;
}
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