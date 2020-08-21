<template>
<div :class="classList">
        <label :for="id">{{label}}</label>
        <select :id="id" :name="id" @change="actChange" class="fls-select" >
                <option v-for="(option,i) in options" :key="i" :selected="(option==value)?true:false">{{option}}</option>
        </select>

        <p v-if="showDesc"   class="fls-description">{{descVal}}</p>
        <p v-if="showError"  class="fls-error">{{errorVal}}</p>
    </div>
</template>

<script>
export default {
      name: 'FSelect'
    , props : [ 'field', 'eBus' ]
    , data : function () {
                    const defaultLabel = '---';
                    let 
                          { id, label, value, options, description, error, customClasses } = this.$props.field

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
                    if ( !value )   value = ''

                    if ( !options ) {
                                      options = []
                                      console.error ( `Field with id=${id} require property "options".`)
                                }
                    if ( !id      )   console.error ( 'Field description  "ID" is required' )

                    if ( descWithVal  )   showDesc  = true
                    if ( errorWithVal )   showError = true

                    return { 
                              id
                            , label
                            , value
                            , options
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