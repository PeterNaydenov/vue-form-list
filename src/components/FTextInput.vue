<template>
<div :class="classList">
        <label :for="id">{{label}}</label>
        <input :id="id" :name="id" type="text" :value="value" @change="actChange">

        <p v-if="showDesc"  :class="fls-description">{{descVal}}</p>
        <p v-if="showError" :class="fls-error">{{errorVal}}</p>
    </div>
</template>

<script>
export default {
      name: 'FTextInput'
    , props : [ 'field', 'eBus' ]
    , data : function () {
                    const defaultLabel = '---';
                    let 
                          { id, label, value, description, error, customClasses } = this.$props.field

                        , showDesc  = false
                        , showError = false

                        , hasDescription = description ? true : false
                        , descWithVal    = hasDescription && description.length > 0
                        , descVal        = descWithVal ? description : ''
                        
                        , hasError       = error ? true : false
                        , errorWithVal   = hasError && error.length > 0
                        , errorVal       = errorWithVal ? error : ''
                        
                        , classList = []
                        ;

                    if ( customClasses )  classList = customClasses
                        
                    if ( !label )   label = defaultLabel
                    if ( !id    )   console.error ( 'Field description  "ID" is required' )
                    if ( !value )   value = ''

                    if ( descWithVal  )   showDesc  = true
                    if ( errorWithVal )   showError = true

                    return { 
                              id
                            , label
                            , value
                            , showDesc
                            , descVal
                            , showError
                            , errorVal
                            , classList
                        }
                } // data func.

    , methods : {
                 actChange (e) {
                            let
                                  val  = e.target.value
                                , id   = this.$data.id
                                , eBus = this.$props.eBus
                                ;
                            eBus.$emit ( 'form-ls:change', [id, val])
                    } // ins func.
        } // methods
    
    
}
</script>