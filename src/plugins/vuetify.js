import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        lightBg: '#1e2228',
        darkBg: '#171c22',
        darkBtn: '#2c3137',
        cardBlue: '#4a617b',
        greyText: '#8b8d90',
        greyTextLight: '#a4b0bd'
      },
    },
  },
})
