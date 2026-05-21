<template>
<div class="form-list">
    <fieldset ref="fieldsets" v-for="(item,num) in showList" :key="num" :class="item.customClasses" >
            <legend v-if=item.legend>{{item.legend}}</legend>
            <ChooseAField 
                        v-for = "field in item.fields" 
                        :key  = field.id
                        :field = field
                        :eBus = eBus
                    />
    </fieldset>
</div>
</template>










<script>
import ChooseAField from './ChooseAField.vue'



function fieldsManipulation (fields, fn ) {
        return fields.reduce ( (res, singleField) => {
                                    let [ check, obj ] = fn (singleField);
                                    if ( check )   res.push (obj)
                                    return res
                            },[])
} // fieldsManipulation func.



function listWalk ( list,fn ) {
        return list.reduce ( (res, {legend, fields, customClasses}) => {
                                let f = fieldsManipulation ( fields, fn );
                                if ( f.length > 0 )   res.push ({ legend, fields:f, customClasses })
                                return res
                        },[])
} // listWalk func.










export default {
          name : 'FormList'
        , props : [ 'list', 'eBus', 'name' ]
        , components : { ChooseAField }
        , data : function () {
                            let
                                  hiddenIDs   = []
                                , requiredIDs = []
                                , name = this.$props.name
                                , copyFields  = x => {
                                                        let 
                                                              isHidden   = x.hidden ? x.hidden : false
                                                            , isRequired = x.required ? x.required : false 
                                                            ;
                                                        if ( isHidden   )   hiddenIDs.push ( x.id )
                                                        if ( isRequired )   requiredIDs.push ( x.id )
                                                        return [ true,  Object.assign({},x) ] 
                                                }
                                , list   = this.$props.list
                                , ls     = listWalk ( list, copyFields )
                                , showList = []
                                ;
                            return {
                                          ls           // List of all available fields
                                        , hiddenIDs    // List of field-ids defined as hidden
                                        , requiredIDs  // List of field-ids defined as required
                                        , showList     // Visible elements on the page
                                }
                } // data func.
        , created () {
                        this.hide ( this.hiddenIDs )
                } // created func.
        , methods : {
                          setError ( errMsg ) {
                                    console.log ( 'test' )
                            } // test func.
                         , hide ( idList ) {
                                     // Add ids to hiddenIDs (avoid duplicates)
                                     idList.forEach(id => {
                                         if (!this.hiddenIDs.includes(id)) {
                                             this.hiddenIDs.push(id)
                                         }
                                     })
                                     // Update display based on hiddenIDs
                                     this.filter ( x => {
                                         if (this.hiddenIDs.includes(x.id)) return [ false, null ]
                                         else return [ true, Object.assign({},x) ]
                                     })
                             } // hide func.
                         , show ( idList ) {
                                     // Remove ids from hiddenIDs
                                     this.hiddenIDs = this.hiddenIDs.filter ( id => !idList.includes(id) )
                                     // Update display based on hiddenIDs
                                     this.filter ( x => {
                                         if (this.hiddenIDs.includes(x.id)) return [ false, null ]
                                         else return [ true, Object.assign({},x) ]
                                     })
                             } // show func.
                        , filter ( fx ) {
                                    this.showList = listWalk ( this.ls, fx )
                            }
                }
}
</script>