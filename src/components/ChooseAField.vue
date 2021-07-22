<template>
<component 
        :is="selected"
        :field = "field" 
        :eBus = eBus
        class = "fls-field" 
    />
</template>





<script>
import FTextInput from './FTextInput.vue'
import FSelect    from './FSelect.vue'

export default {
      name: 'ChooseAField'
    , props      : [ 'field', 'eBus' ]
    , components : { FTextInput, FSelect }
    , data       : function () {
                                let 
                                      field       = this.$props.field
                                    , hasOptions = field.options ? true : false 
                                    , selected
                                    ;
                                
                                if ( hasOptions )   selected = 'FSelect'
                                else                selected = 'FTextInput'
                                
                                return { selected }
                        } // data func.
}
</script>