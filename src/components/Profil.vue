<template>
  <div>
    <div class="w-100 mt-3">
      <h2 class="fw-600">
        Welcome to Profil section
      </h2>
      <div class="profile">
        <img class="br-06" :src="photoUrl" width="100%" height="100%" />
        <label class="avatar">
          <i class="fas fa-pencil-alt"></i>
          <input
            type="file"
            name="upload"
            class="chosefile w-0"
            @change="changeAvater"
          />
        </label>
        <div class="form-group">
          <label>Name</label>
          <input type="text" name="name" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label for="">tell me abount yourself</label>
          <input
            type="text"
            class="form-control"
            name="aboutMe"
            v-model="aboutMe"
          />
        </div>
        <button type="button" class="btn btn-primary" v-on:click="uploadAvater">
          Save
        </button>
        <button type="button" class="btn btn-info" v-on:click="goBack">
          back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebase";
import Vue from "vue";
export default {
  data() {
    return {
      firebaseDocId: localStorage.getItem("FirebaseDocumentId"),
      id: localStorage.getItem("id"),
      // eslint-disable-next-line no-prototype-builtins
      name: localStorage.hasOwnProperty("name")
        ? localStorage.getItem("name")
        : "",
      // eslint-disable-next-line no-prototype-builtins
      aboutMe: localStorage.hasOwnProperty("description")
        ? localStorage.getItem("description")
        : "",
      photoUrl: localStorage.getItem("photoUrl"),
      newPhoto: null
    };
  },
  methods: {
    goBack() {
      this.$router.push("/chat");
    },
    changeAvater(event) {
      if (event.target.files && event.target.files[0]) {
        const filetype = event.target.files[0].type.toString();
        if (filetype.indexOf("image") != 0) {
          Vue.toasted.show("Please choose an image").goAway(1500);
          return;
        }
        this.newPhoto = event.target.files[0];
        this.photoUrl = URL.createObjectURL(event.target.files[0]);
      } else {
        Vue.toasted.show("Something went wrong").goAway(1500);
      }
    },
    uploadAvater() {
      if (this.photoUrl) {
        const upload = firebase
          .storage()
          .ref()
          .child(this.id)
          .put(this.photoUrl);

        // we need upload photo
        upload.on(
          "state changed",
          null,
          err => {
            console.log("erorr", err.message);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(url => {
              console.log(url);
              this.uploaduserinfo(true, url);
            });
          }
        );
      } else {
        this.uploaduserinfo(false, null);
      }
    },
    uploaduserinfo(isUrlPresent, dowloadUrl) {
      let newInfo = {};
      if (isUrlPresent) {
        newInfo = {
          name: this.name,
          description: this.aboutMe,
          URL: dowloadUrl
        };
      } else {
        newInfo = {
          name: this.name,
          description: this.aboutMe
        };
      }
      firebase
        .firestore()
        .collection("users")
        .doc(this.firebaseDocId)
        .update(newInfo)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          localStorage.setItem("name", this.name);
          localStorage.setItem("description", this.aboutMe);
          if (isUrlPresent) {
            localStorage.setItem("photoURL", dowloadUrl);
          }
        });
    }
  },
  created() {
    // eslint-disable-next-line no-prototype-builtins
    if (localStorage.hasOwnProperty("id")) this.$router.push("/");
  }
};
</script>

<style scoped>
input[type="text"] {
  margin: 0 auto;
}

label {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.fw-600 {
  font-weight: 600;
}

.w-100 {
  width: 100%;
}

.w-0 {
  width: 0px;
}

.br-06 {
  border-radius: 0.6rem;
}

.profile {
  margin: 20px auto;
  width: 150px;
  height: 150px;
  background-color: royalblue;
  position: relative;
  border-radius: 0.6rem;
}

.avatar {
  width: 35px;
  height: 35px;
  background: #f46e13;
  border-radius: 0.6rem;
  position: absolute;
  right: 0px;
  top: 115px;
  padding: 2px 0px 0px 7px;
}

.chosefile {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
