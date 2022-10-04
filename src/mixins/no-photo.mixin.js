export default {
  methods: {
    getPhoto(photo){
      if (photo !== null) {
        return process.env.VUE_APP_BASE_MEDIA_URL+'storage/'+photo
      } else {
        return require('../assets/not-found-photo.png')
      }
    },
  },
}