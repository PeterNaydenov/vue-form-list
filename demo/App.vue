<template>
  <div id="app">
    <h1>vue-form-list Demo</h1>
    <FormList
      ref="hoho"
      :eBus="eBus"
      :list="fList"
    />
  </div>
</template>

<script>
import FormList from '../src/components/FormList.vue';

function notice() {
  const events = {};
  return {
    on(event, callback) {
      if (!events[event]) events[event] = [];
      events[event].push(callback);
    },
    emit(event, ...args) {
      (events[event] || []).forEach(cb => cb(...args));
    },
  };
}

const eBus = notice();

export default {
  name: 'App',
  components: { FormList },
  data: function () {
    return {
      eBus,
      fList: [
        {
          legend: 'Account',
          fields: [
            {
              id: 'username',
              label: 'Username',
              value: 'johndoe',
              description: 'Choose a unique username',
              required: true,
            },
            {
              id: 'email',
              label: 'Email',
              value: 'john@example.com',
              description: 'We will never share your email',
              required: true,
            },
            {
              id: 'role',
              label: 'Role',
              value: 'developer',
              options: [
                { text: 'Developer', value: 'developer' },
                { text: 'Designer', value: 'designer' },
                { text: 'Manager', value: 'manager' },
              ],
              required: true,
            },
          ],
        },
        {
          legend: 'Preferences',
          fields: [
            {
              id: 'bio',
              label: 'Bio',
              value: 'Hello world!',
              description: 'Tell us about yourself',
            },
            {
              id: 'timezone',
              label: 'Timezone',
              value: 'utc',
              options: [
                { text: 'UTC (Coordinated Universal Time)', value: 'utc' },
                { text: 'EST (Eastern Standard Time)', value: 'est' },
                { text: 'PST (Pacific Standard Time)', value: 'pst' },
              ],
            },
            {
              id: 'newsletter',
              label: 'Newsletter',
              value: 'yes',
              options: [
                { text: 'Yes, send me updates', value: 'yes' },
                { text: 'No, thanks', value: 'no' },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    function onlyRequired(x) {
      let isRequired = x.required ? x.required : false;
      if (isRequired) return [true, Object.assign({}, x)];
      else return [false, null];
    }

    eBus.on('form-ls:change', ([id, val]) => {
      let hoho = this.$refs.hoho;
      hoho.filter(onlyRequired);
    });
  },
};
</script>
