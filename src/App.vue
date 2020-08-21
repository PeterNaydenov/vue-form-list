<template>
  <div id="app">
    <FormList 
            ref="hoho"
            :eBus=eBus 
            :list=fList 
          />
  </div>
</template>





<script>
import FormList from  './components/FormList'
import Vue from 'vue';

const eBus = new Vue ();

export default {
            name: 'App'
          , components: { FormList }
          , data: function () { return {
                          eBus
                        , fList : [
                                    {
                                          legend : 'ala-bala'
                                        , fields  : [
                                                      {
                                                          id     : 'initial'
                                                        , value  : 'main'
                                                        , options : [ 'main', 'alt1', 'alt2']
                                                        , label  : 'first'
                                                        // , customClasses: [ 'test1', 'test2' ]
                                                      }
                                                    , {
                                                          id    : 'second'
                                                        , value : 'yo'
                                                        , label : 'second'
                                                      }
                                              ]
                                    }
                              ]
                     }} // data func.
            , created () {
                        function onlyRequired ( x ) {
                                  let isRequired = x.required ? x.required : false;
                                  if ( isRequired )   return [ true, Object.assign({},x) ]
                                  else                return [ false, null ]
                            } // onlyRequired func.

                        eBus.$on ( 'form-ls:change', ([id,val]) => {
                                          let hoho = this.$refs.hoho;
                                          hoho.filter ( onlyRequired )
                                    })
                    } // created func.
}
</script>


